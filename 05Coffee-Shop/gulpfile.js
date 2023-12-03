const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// Compilar sass
function css(done) {
    // Pasos: Encontrar el archivo sass, 2- Compilarlo, 3- Guardarlo en una carpeta

    src("src/scss/app.scss")
        .pipe(sass()) // nested, expanded, compact, compressed {outputStyle: 'compressed'}
        .pipe(postcss([autoprefixer()]))
        .pipe(dest("build/css"));

    done();
}

// Optimizar imagenes
function images() {

    return src("src/img/**/*")
        // .pipe(imagemin())
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
// exports.default = series(css, dev);
exports.default = series(images, css, dev);

// series() -> Ejecuta las tareas en serie, se inicia una tarea y cuando termina se ejecuta la siguiente
// parallel() -> Ejecuta las tareas en paralelo, se inician todas las tareas al mismo tiempo