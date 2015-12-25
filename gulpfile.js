var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var gutil = require("gulp-util");
var minifyCSS = require('gulp-minify-css');
var vftp = require( 'vinyl-ftp' );
var autoprefixer = require('gulp-autoprefixer');
var htmlreplace = require('gulp-html-replace');
var imageisux = require('gulp-imageisux');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.prod');
var version = Date.now();

var ftppass = JSON.parse(fs.readFileSync('./.ftppass', 'utf-8'));
var package = require('fs').readFileSync("package.json", "utf8")
package = JSON.parse(package)
var developer = require('fs').readFileSync(".developer", "utf8")

var assetOrigin = 'http://img4.cache.netease.com';
var assetPath = '/utf8/3g/witcher/' + version;
var assetFullPath = assetOrigin + assetPath;
webpackConfig.output.publicPath = assetFullPath + '/js/';
process.env.NODE_ENV = 'production';

gulp.task('clean', function(callback) {
	exec('npm run clean', function(err, stdout) {
		if (err) throw new gutil.PluginError("clean", err);
		gutil.log(stdout);
		callback();
	});
});

gulp.task('compass', ['clean'], function(callback) {
	exec('compass compile --http-path ' + assetFullPath + ' -e production --force', function(err, stdout) {
		if (err) throw new gutil.PluginError("compass", err);
		gutil.log(stdout);
		callback();
	});
});

gulp.task('css', ['compass'], function() {
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
		.pipe(imageisux('../../dist/img/', false));

	gulp.src(['app/img/sp-*.png'])
		.pipe(imageisux('../../dist/img/', false));
});

gulp.task('js', ['clean'], function(callback) {
	//exec('npm run build:webpack', function(err, stdout) {
	//	if (err) throw new gutil.PluginError("webpack", err);
	//	gutil.log(stdout);
	//	callback();
	//});

	webpack(webpackConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString());
		callback();
	})
});

gulp.task('html', ['clean'], function() {
	return gulp.src('./app/index.html')
		.pipe(htmlreplace({
			'css': assetFullPath + '/css/app.css',
			'js': assetFullPath + '/js/bundle.js',
			'vendor': assetFullPath + '/js/vendor.bundle.js'
		}))
		.pipe(gulp.dest('./dist/'))
});

gulp.task('upload', ['html', 'css', 'img', 'js'], function () {
	var conn = vftp.create({
		host: '61.135.251.132',
		port: 16321,
		user: ftppass.pro.username,
		password: ftppass.pro.password,
		parallel: 5,
		log: gutil.log,
		secure: true,
		secureOptions: {
			requestCert: true,  //请求证书
			rejectUnauthorized: false   //拒绝未经授权
		}
	});

	gulp.src(['dist/**', '!dist/*.html', '!dist/js/**/*.map'], { buffer: false })
		.pipe(conn.dest(assetPath));
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