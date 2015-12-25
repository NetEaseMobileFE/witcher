var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var gutil = require("gulp-util");
var minifyCSS = require('gulp-minify-css');
var vftp = require( 'vinyl-ftp' );
var autoprefixer = require('gulp-autoprefixer');
var htmlreplace = require('gulp-html-replace');

var ftppass = JSON.parse(fs.readFileSync('./.ftppass', 'utf-8'));
var package = require('fs').readFileSync("package.json", "utf8")
package = JSON.parse(package)
var developer = require('fs').readFileSync(".developer", "utf8")
gulp.task('clean', function(callback) {
	exec('npm run clean', function(err, stdout) {
		if (err) throw new gutil.PluginError("clean", err);
		gutil.log(stdout);
		callback();
	});
});

gulp.task('compass', ['clean'], function(callback) {
	exec('compass compile --http-path http://c.3g.163.com/nc/qa/witcher/ -e production --force', function(err, stdout) {
		if (err) throw new gutil.PluginError("compass", err);
		gutil.log(stdout);
		callback();
	});
});

gulp.task('css', ['compass'], function() { // todo
	gulp.src('app/css/*.css')
		.pipe(autoprefixer({
			browsers: ["last 2 version", "Android >= 4.0"],
			cascade: false
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css'));
});


gulp.task('img', ['compass'], function() {
	gulp.src(['app/img/**', '!app/img/{base64,base64/**}', '!app/img/{sp-*,sp-*/**}'])
		.pipe(gulp.dest('dist/img'));
});

gulp.task('js', ['clean'], function(callback) {
	exec('npm run build:webpack', function(err, stdout) {
		if (err) throw new gutil.PluginError("webpack", err);
		gutil.log(stdout);
		callback();
	});
});

gulp.task('upload', ['css', 'img', 'js'], function () {
	var conn = vftp.create({
		host: '220.181.29.249',
		port: 16321,
		user: ftppass.pro.username,
		password: ftppass.pro.username,
		parallel: 5,
		log: gutil.log
	});

	return gulp.src(['app/{mocks,mocks/**}', 'dist/**', '!dist/js/**/*.map'], { buffer: false })
		.pipe(conn.dest('/witcher'));
});
gulp.task('test',['f2e'],  function(cb){
	var prefix = 'http://f2e.developer.163.com/' + developer + '/witcher/'
  return gulp.src('./app/index.html')
    .pipe(htmlreplace({
      'css': prefix + 'css/app.css',
      'js': prefix + 'js/bundle.js',
      'vendor': prefix + 'js/vendor.bundle.js'
    }))
    .pipe(gulp.dest('./dist/'))
})
gulp.task('f2e', ['css', 'img', 'js'], function(cb){
	exec('scp -r -P 16322 dist/* ' + developer + '@223.252.197.245:/home/' + developer + '/' + package.name + '/', function(err){
    if (err) return cb(err); // return error
    cb();
  })
})
gulp.task('default', ['upload'], function() {
	gutil.log('Done!');
});