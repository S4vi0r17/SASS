const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


function css(done){
    // Compilar sass

    // Pasos: 1- Encontrar el archivo sass, 2- Compilarlo, 3- Guardarlo en una carpeta

    src('assets/scss/app.scss')
        .pipe(sass()) // nested, expanded, compact, compressed {outputStyle: 'compressed'}
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'));

    done();
}

function dev(){
    // Vigilar cambios en los archivos scss
    watch('assets/scss/**/*.scss', css);
}


exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);

// series() -> Ejecuta las tareas en serie, se inicia una tarea y cuando termina se ejecuta la siguiente
// parallel() -> Ejecuta las tareas en paralelo, se inician todas las tareas al mismo tiempo