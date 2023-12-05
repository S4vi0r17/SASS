const { src, dest, watch, series, parallel } = require("gulp");
const plumber = require("gulp-plumber"); // Para que no se detenga el proceso cuando hay un error

// CSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// sourcemaps
const sourcemaps = require("gulp-sourcemaps");

// Para minificar el css
const cssnano = require("cssnano");

// Imagenes
// npm install --save-dev gulp-imagemin@7.1.0
const imagemin = require("gulp-imagemin");
// npm install --save-dev gulp-webp@4.0.0
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// Compilar sass
function css(done) {
    // Pasos: Encontrar el archivo sass, 2- Compilarlo, 3- Guardarlo en una carpeta

    src("src/scss/app.scss")
        .pipe(plumber()) // Para que no se detenga el proceso cuando hay un error
        .pipe(sourcemaps.init()) // Inicializar sourcemaps
        .pipe(sass()) // nested, expanded, compact, compressed {outputStyle: 'compressed'}
        .pipe(postcss([autoprefixer(), cssnano()])) // los prefijos son para que el css sea compatible con todos los navegadores, es necesario configurarlo en package.json
        .pipe(sourcemaps.write(".")) // Escribir los sourcemaps
        .pipe(dest("build/css"));

    done();
}

// Optimizar imagenes
function images() {

    return src("src/img/**/*")
        .pipe(imagemin({ optimizationLevel: 3 })) // 0 to 7
        .pipe(dest("build/img"));
}

// Version webp
function versionWebp() {
    return src("src/img/**/*.{png,jpg}")
        .pipe(webp())
        .pipe(dest("build/img"));
}

// Version avif
function versionAvif() {
    // Tambien funciona en webp
    const options = {
        quality: 50
    }

    return src("src/img/**/*.{png,jpg}")
        .pipe(avif(options))
        .pipe(dest("build/img"));
}

function dev() {
    // Vigilar cambios en los archivos scss
    watch("src/scss/**/*.scss", css);
    // css es la funcion para compilar sass

    // watch para las imagenes
    watch("src/img/**/*", images);
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(css, dev);
// exports.default = series(images, versionWebp, versionAvif, css, dev);

// series() -> Ejecuta las tareas en serie, se inicia una tarea y cuando termina se ejecuta la siguiente
// parallel() -> Ejecuta las tareas en paralelo, se inician todas las tareas al mismo tiempo