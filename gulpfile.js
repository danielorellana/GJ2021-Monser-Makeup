const gulp = require("gulp");
const del = require("del");
const ts = require("gulp-typescript");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const changed = require("gulp-changed");
const browserSync = require("browser-sync");
const merge = require("merge2");

const debug = false;

const settings = {
  paths : {
    dest : "./dist/",
    srcAssets : "./assets/",
    tgtAssets : "assets/",
    lib : "./lib/",
  },
  tsconfig : 'tsconfig.json',
  bundle : "game.js",
  main : "game.js",
}


if (debug) { console.log("=== DEBUG Environment ===") }
else { console.log("=== RELEASE Environment ==="); }
function gulpErr(msg) {
  console.log(msg);
  return true;
}

function browserReloadPromise() {
  return new Promise(function(resolve, reject) {
    browserSync.reload();
    resolve();
  });
}

// Clean destination directory
gulp.task("clean", () => {
    let files = ["./.cache.json", "./*.log"];
    files.push(settings.paths.dest + "*");

    return del(files);
});

// Clean destination directory for all environnements
gulp.task("clean:all", () => {
    let files = ["./.cache.json", "./*.log"];
    files.push(settings.paths.dest + "*");

    return del(files);
});

// Compile TypeScript files
gulp.task("compile", () => {
    let config = settings.tsconfig;
    let dest = settings.paths.dest;

    let tsProject = ts.createProject(config);
    const tsResult = tsProject.src()
        .pipe(gulpif(debug, sourcemaps.init()))
        .pipe(tsProject());

    return merge([
        tsResult.js
            .pipe(gulpif(debug, sourcemaps.write()))
            .pipe(gulp.dest(dest)),
        tsResult.dts
            .pipe(gulp.dest(dest))])
        //.on("error", gutil.log);
});

// Bundle JavaScript files into a single file
gulp.task("bundle", gulp.series("compile", () => {
    const bundleFilename = settings.bundle;
    const mainFilename = settings.main;
    let dest = settings.paths.dest;


    return browserify({
            "entries": dest + mainFilename,
            "debug": false,
            "cache": "./.cache.json"
        })
        .bundle()
        .pipe(source(bundleFilename))
        .pipe(buffer())
        .pipe(gulp.dest(dest))
        .on("error", gulpErr)
        .on("finish", () => {
            if (!debug) {
                del([dest + "*.js", "!" + dest + bundleFilename]);
            }
        });
}));

// Copy all static assets
gulp.task("copy", () => {
    let dest = settings.paths.dest;
    
    gulp.src("./index.html")
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));

    gulp.src(settings.paths.lib + "*.js")
        .pipe(changed(dest))
        .pipe(gulp.dest(dest + 'lib/'));

    return gulp.src(settings.paths.srcAssets + "**")
        .pipe(changed(dest))
        .pipe(gulp.dest(dest + settings.paths.tgtAssets));
});

// Rebuild on change
gulp.task("watch", () => {
  gulp.parallel("serve", gulp.series( "bundle", "copy", browserReloadPromise))();
  gulp.watch(['./components/**', './scenes/**', './types/**'], gulp.series("bundle", "copy", browserReloadPromise));
});

// Launch the HTTP server
gulp.task("serve", () => {
    let dest = "./dist/"
    let port = 8080;    
    browserSync.init({
        "port": port,
        "server": dest
    });
});

// Default task
gulp.task("default", gulp.series("bundle", "copy"));