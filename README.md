# DT173G Projekt

Detta projekt bygger på automatisering genom GULP för att konsumera en webbtjänst.
Automatisering är att vi skriver kod för att datorn skall utföra vissa task åt oss automatiskt. Detta är praktiskt om vi exempelvis vill att alla bilder skall komprimeras utan att vi gör någonting. Då kan vi installera en metod som automatiserar denna process åt oss. 

Detta projekt Innehåller följande paket:

* gulp-concat
* gulp-terser
* gulp-cssnano
* gulp-imagemin
* gulp-livereload
* gulp-sass
* browsersync
* changed

Jag har valt dessa paket för dessa var som rekommendation för uppgiften men andra lades även till för att utöka funktionalitet.

Nedanstående är funktioner och metoder som detta projekt använder:

```
const files = {
    // Nedanstående är platser där vi vill läsa våra filer från
    htmlPath: "src/**/*.html",
    cssPath: "src/css/*.css",
    jsPath: "src/js/*.js",
    imagePath: "src/images/*"
    sassPath: "src/sass/*.scss",
}
```

```
function copyHTML(){
    // läser in alla html filer
    return src(files.htmlPath)
    // Metod för att skriva till pub mappen
    .pipe(dest('pub'))
    // Metod för att ladda om browsern
    .pipe(livereload());
}
```

```
function cssTask(){
    // läser in alla css filer
    return src(files.cssPath)
    // Slår ihop alla css filer till en
    .pipe(concat('main.css'))
    // Minify CSS
    .pipe(cssnano())
    // Skriver nya filerna till css mappen
    .pipe(dest('pub/css'))
}
```

```
function jsTask(){
    return src(files.jsPath)
    // Metod för att slå ihop js-filer till ett
    .pipe(concat('main.js'))
    // Minify JS genom att tag bort onödiga rader och kommentarer
    .pipe(terser())
    .pipe(dest('pub/js'));
}
```

```
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
```

```
function imageTask(){
    return src(files.imagePath)
    // Komprimerar bilder
    .pipe(imagemin())
    .pipe(dest('pub/images'));
}
```

```
function watchTask(){
    // Event som lyssnar efter uppdatering
    livereload.listen();
    // Håller koll på våra filer och känner av när något ändras
    watch([files.htmlPath,files.cssPath,files.jsPath,files.imagePath],copyHTML,cssTask,jsTask,imageTask);
}
```

```
exports.default = series(
    // kör nedanstående task parallet för att sedan även köra watchtask
    parallel(copyHTML,cssTask,jsTask,imageTask),
    watchTask
);
```

### Installation

* Installera Gulp lokalt/globalt på datorn genom kommandot npm install --global gulp-cli
* Installera alla paket från package.json med kommandot *npm install*
* För att starta automatiseringen och optimeringen kan kommandot gulp anropas i terminalen ståendes i projektets mapp.
* Den färdiga webbsidan skickas till mappen pub och kan användas för publicering på lokal server.

