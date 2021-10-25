const {src, dest, parallel, series, watch} = require("gulp");
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');
var sass = require('gulp-sass')(require('sass'));
sass.compiler =  require('node-sass');
var sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const changed = require('gulp-changed');

// Sökvägar

const files = {
    // Nedanstående är platser där vi vill läsa våra filer från
    htmlPath: "src/**/*.html",
    cssPath: "src/css/*.css",
    jsPath: "src/js/*.js",
    imagePath: "src/images/*",
    sassPath: "src/sass/*.scss",
}

// HTML-Task, kopierar HTML
function copyHTML(){
    // läser in alla html filer
    return src(files.htmlPath)
    .pipe(browserSync.stream())
    // Metod för att skriva till pub mappen
    .pipe(dest('pub'))
    // Metod för att ladda om browsern
    .pipe(livereload());
}

// CSS task
function cssTask(){
    // läser in alla css filer
    return src(files.cssPath)
    .pipe(browserSync.stream())
    // Slår ihop alla css filer till en
    .pipe(concat('main.css'))
    // Minify CSS
    .pipe(cssnano())
    // Skriver nya filerna till css mappen
    .pipe(dest('pub/css'))
    
}

// JS task
function jsTask(){
    return src(files.jsPath)
    .pipe(browserSync.stream())
    // Metod för att slå ihop js-filer till ett
    .pipe(concat('main.js'))
    // Minify JS genom att tag bort onödiga rader och kommentarer
    .pipe(terser())
    .pipe(dest('pub/js'))
   
}
// Image task

function imageTask(){
    return src(files.imagePath)
    // Komprimerar bilder
    .pipe(imagemin())
    .pipe(dest('pub/images'));
}
// Sass task

function sassTask(){
    return src(files.sassPath)
        .pipe(browserSync.stream())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(changed('pub/css', {hasChanged: changed.compareContents}))
        .pipe(dest('pub/css'))
    }

        // Watch  task
        function watchTask(){
            browserSync.init({
                server: {
                    baseDir: 'pub/'
                }
            });
            // Håller koll på våra filer och känner av när något ändras
            watch([files.htmlPath,files.cssPath,files.sassPath,files.jsPath,files.imagePath],parallel(copyHTML,cssTask,sassTask,jsTask,imageTask));
            //watch('/*.html').on('change',browserSync.reload);
        }

        exports.default = series(
            // kör nedanstående task parallet för att sedan även köra watchtask
            parallel(copyHTML,cssTask,sassTask,jsTask,imageTask),
            watchTask
        );



