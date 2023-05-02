var gulp  			 = require('gulp'),
	concat			 = require('gulp-concat'),
    config           = require('../../config/resources'),
    path 		     = require('path'),
    stripCssComments = require('gulp-strip-css-comments'),
	flatten      	 = require('gulp-flatten'),
	filter       	 = require('gulp-filter'),
	autoprefixer	 = require('gulp-autoprefixer'),
	cleanCSS     	 = require('gulp-clean-css'),
	cssmin      	 = require('gulp-cssmin'),
	rename      	 = require('gulp-rename'),
	csso        	 = require('gulp-csso'),
	size        	 = require('gulp-size'),
	debug        	 = require('gulp-debug'),
	$            	 = require('gulp-load-plugins')(),
	uglify 			 = require('gulp-uglify'),
	ngAnnotate       = require('gulp-ng-annotate'),
	minifyHTML   	 = require('gulp-minify-html'),
	templateCache    = require('gulp-angular-templatecache'),
	removeHtmlComments = require('gulp-remove-html-comments'),
	nodemon    		 = require('gulp-nodemon'),
	runSequence      = require('run-sequence'),
	gulpCopy 		 = require('gulp-copy'),
	clean            = require('gulp-clean'),
	gutil            = require('gulp-util'),
    cachebust 		 = require('gulp-cache-bust');


gulp.task('serve-stage', function(done) {
	process.env.NODE_ENV = 'staging';
	console.log(process.env.NODE_ENV);
		 runSequence('cleanStage','vendorStylesStage','dynamicStylesStage','dynamicColorStyleStage','fontsStage','vendorScriptsStage','AppScriptsStage','templateCacheStage','indexStage','imagesStage','nodemonStage','CacheBustingStage', function() {    	
		        done();        
		    });
	});
gulp.task('cleanStage', function () {
	  return gulp.src('dist', {read: false})
	    .pipe(clean({force: true}));
});

gulp.task('templateCacheStage', function () {
	
	  return gulp.src([  'app/**/*.html', '!app/vendor/**/*.html','!app/index.html','!app/staging.html'])
	  	.pipe(removeHtmlComments())
	    .pipe(minifyHTML({ quotes: true }))
	    .pipe(templateCache('htmlTemplateCache.js', { module:'HtmlTemplateCache', standalone:true }))
	    .pipe(gulp.dest('dist/src/scripts'));
	   
	});
gulp.task('imagesStage',function(){
	return gulp.src('app/assets/global/img/*')
	.pipe(gulp.dest('dist/assets/global/img/'));
	
});
gulp.task('indexStage', function () {
	  return gulp.src('app/staging.html')
	  	.pipe(removeHtmlComments())
	    .pipe(minifyHTML({ quotes: true }))
	    .pipe(rename('index.html'))
	    .pipe(gulp.dest('dist'));
	   
	});

gulp.task('vendorScriptsStage', function() {
    return gulp.src(config.vendorScripts)
    	.pipe(debug())
    	.pipe(ngAnnotate())
        .pipe(concat('vendorScripts.js'))
        .pipe(gulp.dest('dist/src/scripts'))
        .pipe(rename('vendorScripts.min.js'))
        .pipe(uglify()).on('error', function(err) {
        	gutil.log(gutil.colors.red('[Error]'), err.toString());
        	this.emit('end');
        	})
        .pipe(gulp.dest('dist/src/scripts'))
        .pipe(size());
});
gulp.task('AppScriptsStage', function() {
    return gulp.src(config.AppScripts)
    	.pipe(debug())
    	.pipe(ngAnnotate())
        .pipe(concat('AppScripts.js'))
        .pipe(gulp.dest('dist/src/scripts'))
        .pipe(rename('AppScripts.min.js'))
        .pipe(uglify()).on('error', function(err) {
        	gutil.log(gutil.colors.red('[Error]'), err.toString());
        	this.emit('end');
        	})
        .pipe(gulp.dest('dist/src/scripts'))
        .pipe(size());
});
gulp.task('vendorStylesStage', function(){
	
	gulp.src(config.staticStyles)
    .pipe(concat('staticStyles.css'))
    .pipe(autoprefixer('last 2 version'))
    .pipe(stripCssComments({preserve: false}))
    .pipe(csso())
    .pipe(cssmin())
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/src/styles'))
    .pipe(size());
	
});	
gulp.task('dynamicStylesStage', function(){
	gulp.src(config.dynamicStyles)
    .pipe(concat('dynamicStyles.css'))
    .pipe(autoprefixer('last 2 version'))
    .pipe(stripCssComments({preserve: false}))
    .pipe(csso())
    .pipe(cssmin())
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/src/styles'))
    .pipe(size());
	
	
});	

gulp.task('dynamicColorStyleStage', function(){
	gulp.src(config.dynamicColorStyle)
    .pipe(concat('dynamicColorChange.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/src/styles'))
    .pipe(size());
	
	
});	

gulp.task('CacheBustingStage',function () {
	gulp.src('dist/index.html')
    .pipe(cachebust({
        type: 'MD5'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('fontsStage', function ()
			{
			   gulp.src(['app/**/**'])
			        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
			        .pipe(flatten())
			        .pipe(gulp.dest(path.join('dist/src/fonts/')));
			}); 	
gulp.task('nodemonStage', function (cb) {
	  var called = false;
	  return nodemon({
	    script: 'app.js',
	    ignore: [
	      'AuditDetails/**/*.*',
	      'gulpfile.js',
	      'node_modules/',
	      'app/**/*.*',
	      'staging/**/*.*'
	    ]
	  })
	  .on('start', function () {
	    if (!called) {
	      called = true;
	      cb();
	    }
	  })
	  .on('restart', function () {
	   
	  })
	  .on('crash', function() {
			 console.log('server crashed..exiting application');
			 process.exit();
		})
	  .on('restart', function() {
			 console.log('server restarted');
		})
	  .once('quit', function () {
			// handle ctrl+c without a big weep
		    console.log('server stopped..application closed');
			process.exit();
		});
	});
