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

const compiledTemplates = {};

const tsproj = $gulp.typescript.createProject("tsconfig.json");

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
    compiledTemplates[filepath] = jade.compile(file.contents.toString())();
}

gulp.task("build:jade", function () {
    return gulp.src("src/**/*.jade")
        .pipe(errorHandler("Failed to load templates"))
        .pipe($gulp.cached("jade"))
        .pipe(through2.obj(function(file, encode, callback) {
            try {
                loadTemplate(file);
                callback(null, file);
            }
            catch (e) {
                callback(e, file);
            }
      }));
});

gulp.task("build", ["build:jade"], function () {
    return gulp.src(["src/**/*.ts", "typings/**/*.ts"])
        .pipe(errorHandler("Failed to build typescript"))
        .pipe($gulp.typescript(tsproj))
        .pipe($gulp.babel({
            plugins: [
                [makeTemplateInline, { compiledTemplates: compiledTemplates }]
            ]
        }))
        .pipe(gulp.dest("dist"));
});

function buildExample(watch) {
    const bundler = browserify("example/src/main.ts", {
        transform: ["stringify"],
        cache: {},
        packageCache: {}
    }).plugin("tsify", {
        typescript: require("typescript"),
        project: "tsconfig.example.json"
    });
    function build() {
        const notifyError = errorNotifier("Failed to browserify");
        return bundler.bundle()
            .on("error", function(arg) {
                $gulp.util.log("Browserify error", arg);
                notifyError(arg);
            })
            .pipe(source("build.js"))
            .pipe(buffer())
            .pipe(gulp.dest("example/dist"));
    }
    if (watch) {
        bundler.plugin(watchify)
            .on("update", function () {
                $gulp.util.log($gulp.util.colors.gray("Building scripts..."));
                build();
            })
            .on("time", function (time) {
                $gulp.util.log($gulp.util.colors.gray("Finished buildExample after"),
                    $gulp.util.colors.magenta(time.toLocaleString() + " ms"));
            });
    }
    build();
}

gulp.task("build:example", ["build"], function () {
    return buildExample();
});

gulp.task("watch", ["build"], function() {
    gulp.watch(["src/**/*.ts", "src/**/*.jade"], ["build"]);
    return buildExample(true);
});

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
                if (arg.type !== "StringLiteral" || !arg.value.match(/^\..*\.jade$/)) {
                    return;
                }
                const jadepath = normalizePath(path.join(path.dirname(p.hub.file.opts.filename), arg.value));
                p.replaceWith(babel.types.stringLiteral(compiledTemplates[jadepath]));
            }
        }
    }
}
