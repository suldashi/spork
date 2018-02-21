const gulp = require('gulp');
const browserify = require('browserify');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const runSequence = require("run-sequence");
const exec = require('child_process').exec;
const del = require("del");

gulp.task("clean",() => {
	return del("tmp", {force:true});
});

gulp.task('apply-prod-environment', function() {
	process.env.NODE_ENV = 'production';
});

gulp.task("ui-babel", () => {
	return gulp.src(["src/ui/**/*.jsx","src/ui/**/*.js"])
	.pipe(babel({
		presets: ["react","env","modern-browsers"],
		plugins:["transform-runtime"]
	}))
	.pipe(gulp.dest("tmp/ui/"));
});

gulp.task("browserify", () => {
	return browserify({entries:"tmp/ui/ui.js",debug:false})
		.bundle()
		.pipe(source("ui.js"))
		.pipe(buffer())
		.pipe(gulp.dest("public/js"));
});

gulp.task("minify", () => {
	return gulp.src('public/js/ui.js')
		.pipe(minify({
			ext:{
				src:'.js',
				min:'.min.js'
			}
		}))
		.pipe(gulp.dest("public/js"));
});

gulp.task("ui-min", () => {
	runSequence("apply-prod-environment","ui-babel","browserify","minify","clean");
});

gulp.task("ui", () => {
	return runSequence("ui-babel","browserify","clean");
});

gulp.task("watch-ui", () => {
	return gulp.watch("src/ui/**/*.jsx",["ui"]);
})

gulp.task("default", () => {
	return runSequence("ui");
});

gulp.task("db-dump", () => {
	var dbConfig = require("./app/config").db;
	var env = process.env;
	env.PGPASSWORD=dbConfig.password;
	return exec(`pg_dump -Ox -U ${dbConfig.username} -h ${dbConfig.host} ${dbConfig.dbName} > database.sql`,{env:env});
});

gulp.task("db-restore", () => {
	var dbConfig = require("./app/config").db;
	var env = process.env;
	env.PGPASSWORD=dbConfig.password;
	if(process.platform==="win32") {
		return exec(`dropdb --if-exists -U ${dbConfig.username} ${dbConfig.dbName} & createdb -U ${dbConfig.username} ${dbConfig.dbName} & psql -h ${dbConfig.host} -U ${dbConfig.username} -f database.sql ${dbConfig.dbName}`,{env:env});
	}
	else {
		return exec(`dropdb --if-exists -U ${dbConfig.username} ${dbConfig.dbName}; createdb -U ${dbConfig.username} ${dbConfig.dbName}; psql -h ${dbConfig.host} -U ${dbConfig.username} -f database.sql ${dbConfig.dbName}`,{env:env});
	}
});