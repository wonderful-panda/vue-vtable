const path = require("path").posix;
const gulp = require("gulp");
const $gulp = require("gulp-load-plugins")();
const watchify = require("watchify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

const jade = require("jade");

const compiledTemplates = {};

const tsproj = $gulp.typescript.createProject("tsconfig.json");

function normalizePath(filepath) {
    return path.normalize(filepath.replace(new RegExp("\\\\", "g"), "/"));
}

function errorHandler() {
    return $gulp.plumber({ errorHandler: $gulp.notify.onError("<%= error.message %>") });
}

gulp.task("build:jade", function () {
    return gulp.src("src/**/*.jade")
        .pipe(errorHandler())
        .pipe($gulp.cached("jade"))
        .pipe($gulp.tap(function (file) {
            const filepath = normalizePath(file.path);
            compiledTemplates[filepath] = jade.compile(file.contents.toString())();
        }));
});

gulp.task("build", ["build:jade"], function () {
    return gulp.src(["src/**/*.ts", "typings/**/*.ts"])
        .pipe(errorHandler())
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
        return bundler.bundle()
            .on("error", $gulp.util.log.bind($gulp.util, "Browserify error"))
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
