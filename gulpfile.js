const path = require("path").posix;
const gulp = require("gulp");
const $gulp = require("gulp-load-plugins")();
const watchify = require("watchify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const _ = require("lodash");
const through2 = require("through2");
const jade = require("jade");
const del = require("del");
const typescript = require("typescript");

const log = $gulp.util.log;
const colors = $gulp.util.colors;

const compiledTemplates = {};

function normalizePath(filepath) {
    return path.normalize(filepath.replace(new RegExp("\\\\", "g"), "/"));
}

function errorNotifier(message) {
    return _.debounce($gulp.notify.onError(message), 100);
}

function errorHandler(message) {
    return $gulp.plumber({ errorHandler: errorNotifier(message) });
}

function loadTemplate(file) {
    const filepath = normalizePath(file.path);
    const transforms = {
        ".jade": text => jade.compile(text)()
    };
    const contents = (transforms[path.extname(filepath)] || (t => t))(file.contents.toString());
    compiledTemplates[filepath] = contents;
}

gulp.task("clean", del.bind(null, ["dist", "example/.temp", "example/dist"]));

gulp.task("load-templates", () => loadTemplates("src/**/*.jade"));

gulp.task("load-templates:demo", () => loadTemplates("example/src/**/*.html"));

function loadTemplates(src) {
    return gulp.src(src)
        .pipe(errorHandler("Failed to load templates(" + src + ")"))
        .pipe($gulp.cached("templates:" + src))
        .pipe(through2.obj(function (file, encode, callback) {
            try {
                loadTemplate(file);
                callback(null, file);
            }
            catch (e) {
                callback(e, file);
            }
        }));
}

const tsproj = $gulp.typescript.createProject("tsconfig.json", { typescript });
gulp.task("build", ["load-templates"],
    () => buildTsProject("src/**/*.ts", "dist", tsproj));

const demoproj = $gulp.typescript.createProject("tsconfig.example.json", { typescript });
gulp.task("build:demo", ["load-templates:demo"],
    () => buildTsProject("example/src/**/*.ts", "example/.temp", demoproj));

function buildTsProject(src, dest, proj) {
    return gulp.src(src)
        .pipe(errorHandler("Failed to build typescript(" + src + ")"))
        .pipe($gulp.typescript(proj))
        .pipe($gulp.babel({
            plugins: [
                [makeTemplateInline, { compiledTemplates: compiledTemplates }]
            ]
        }))
        .pipe(gulp.dest(dest));
};

gulp.task("bundle:demo", ["build", "build:demo"], () => bundleDemoProject(false));

gulp.task("watch", ["build", "build:demo"], () => {
    gulp.watch("src/**/*.{ts,jade}", ["build"]);
    gulp.watch("example/src/**/*.{ts,html}", ["build:demo"]);
    bundleDemoProject(true);
});

function bundleDemoProject(watch) {
    const notifyError = errorNotifier("Failed to browserify");
    const b = browserify("example/.temp/main.js", { cache: {}, packageCache: {} });
    function bundle() {
        return b.bundle()
            .on("error", arg => {
                log(colors.magenta("Failed to Browserify"), arg);
                notifyError(arg);
            }).pipe(source("build.js"))
            .pipe(buffer())
            .pipe(gulp.dest("example/dist"));
    }
    if (watch) {
        b.plugin(watchify)
            .on("update", bundle)
            .on("time", time => {
                const timeValue = time < 1000 ? time.toString() + " ms" : (time / 1000).toString() + " s";
                log(colors.gray("Finished Browserify after"), colors.magenta(timeValue));
            });
    }
    bundle();
}

// babel plugin: replace `require("xxx.jade")` with html string compiled from xxx.jade.
function makeTemplateInline(babel) {
    return {
        visitor: {
            CallExpression(p, state) {
                const compiledTemplates = state.opts.compiledTemplates;
                const node = p.node;
                if (node.callee.name !== "require" || node.arguments.length !== 1) {
                    return;
                }
                const arg = node.arguments[0];
                if (arg.type !== "StringLiteral" || !arg.value.match(/^\..*\.[a-z0-9]+$/)) {
                    return;
                }
                const templatePath = normalizePath(path.join(path.dirname(p.hub.file.opts.filename), arg.value));
                if (templatePath in compiledTemplates) {
                    p.replaceWith(babel.types.stringLiteral(compiledTemplates[templatePath]));
                }
            }
        }
    }
}
