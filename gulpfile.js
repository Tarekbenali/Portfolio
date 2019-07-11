//Importing dependencies
const gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  del = require("del"),
  htmlmin = require("gulp-htmlmin"),
  imagemin = require("gulp-imagemin"),
  babel = require("gulp-babel"),
  mozjpeg = require("imagemin-mozjpeg"),
  pngquant = require("imagemin-pngquant"),
  uglify = require("gulp-uglify");

// imageminWebp = require('imagemin-webp'),
// imageminJpegtran = require('imagemin-jpegtran'),
// imageminPngquant = require('imagemin-pngquant'),
// imageminGifSicle = require('imagemin-gifsicle'),
// imageminOptiPng = require('imagemin-optipng'),
// imageminSvgo = require('imagemin-svgo'),

//Declaring Paths
const paths = {
  css: {
    src: "./src/scss/*.scss",
    dest: "./dist/css"
  },
  js: {
    src: "./src/*.js",
    dest: "./dist/js"
  },
  html: {
    src: "./src/*.html",
    dest: "./dist/"
  },
  images: {
    src: "./src/images/*.+(png|jpg|jpeg|gif|svg)",
    dest: "./dist/images"
  },
  bootstrap: {
    Btsrp_Css: "node_modules/bootstrap/dist/css/bootstrap.min.css",
    Btsrp_Js: "node_modules/bootstrap/dist/js/bootstrap.min.js",
    Btsrp_Jq: "node_modules/jquery/dist/jquery.slim.js",
    Btsrp_popr: "node_modules/popper.js/dist/umd/popper.min.js"
  },
  fonts: {
    src: [
      "./node_modules/@fortawesome/fontawesome-free/**/*",
      "!./node_modules/@fortawesome/fontawesome-free/{less,less/*}",
      "!./node_modules/@fortawesome/fontawesome-free/{scss,scss/*}",
      "!./node_modules/@fortawesome/fontawesome-free/.*",
      "!./node_modules/@fortawesome/fontawesome-free/*.{txt,json,md}"
    ],
    dest: "./dist/fonts/font-awesome"
  },
  typed: {
    src: "node_modules/typed.js/lib/typed.js ",
    dest: "./dist/js/typed"
  },
  gmaps:{
    src:"node_modules/gmaps/gmaps.js"
  },
  particles:{
    src:"node_modules/particles.js/particles.js"
  },
  swiper:{
    swiper_css:"node_modules/swiper/dist/css/swiper.css",
    swiper_js:"node_modules/swiper/dist/js/swiper.js"
  },
  owl:{
    owl_css:"node_modules/owl.carousel/dist/assets/owl.carousel.css",
    owl_js:"node_modules/owl.carousel/dist/owl.carousel.js"
  }
};

// Fonts Awesome
function custom_fonts() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}

// BrowserSync init
function serve(done) {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 8080
  });
  done();
}

// BrowserSync Reload
function reload(done) {
  browserSync.reload();
  done();
}

// Moving Css files to dist folder  (Bootstrap css files)
function move_css() {
  return gulp.src([
    paths.bootstrap.Btsrp_Css,
    paths.swiper.swiper_css,
    paths.owl.owl_css  
  ]).pipe(gulp.dest(paths.css.dest));
}

// Moving and compiling sass files
function custom_sass() {
  return gulp
    .src(paths.css.src)
    .pipe(sass({ outputStyle: "expanded" }))
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        flexbox: `no-2009`,
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.css.dest));
}

//Moving js files to dist folder (Bootstrap and jquery je files )
function move_js() {
  return gulp
    .src([
      paths.bootstrap.Btsrp_Js,
      paths.bootstrap.Btsrp_Jq,
      paths.bootstrap.Btsrp_popr,
      paths.typed.src,
      paths.gmaps.src,
      paths.particles.src,
      paths.swiper.swiper_js,
      paths.owl.owl_js
    ])
    .pipe(gulp.dest(paths.js.dest));
}

//Move and uglify main js files
function custom_js() {
  return gulp
    .src(paths.js.src)
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest));
}

//custom html pages
function custom_html() {
  return gulp
    .src(paths.html.src)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest(paths.html.dest));
}

//custom images
function custom_images() {
  return (
    gulp
      .src(paths.images.src)
      .pipe(
        imagemin([
          pngquant(
            { quality: [0.5, 0.5] }),
          mozjpeg(
            { quality: 50 })
          ],
          {
                 verbose: true
          }))
      .pipe(gulp.dest(paths.images.dest))
  );
}

// clean ./dist folder
function clean() {
  return del(["dist"]);
}

//Watching File
function watch() {
  gulp.watch(paths.css.src, gulp.series(custom_sass, reload));
  gulp.watch(paths.images.src, gulp.series(custom_images, reload));
  gulp.watch(paths.js.src, gulp.series(custom_js, reload));
  gulp.watch(paths.html.src, gulp.series(custom_html, reload));
}

// building files
const build = gulp.series(
  clean,
  gulp.parallel(move_js, custom_js),
  custom_fonts,
  custom_html,
  gulp.parallel(move_css, custom_sass),
  custom_images,
  gulp.parallel(serve, watch)
);
gulp.task(build);
gulp.task("default", build);
