var gulp  			 = require('gulp'),
	concat			 = require('gulp-concat'),
    config           = require('../../config/resources'),
    path 		     = require('path'),
    browserSync      = require('browser-sync').create(),
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
	minifyHTML   = require('gulp-minify-html'),
	templateCache= require('gulp-angular-templatecache'),
	removeHtmlComments = require('gulp-remove-html-comments'),
	nodemon    		 = require('gulp-nodemon'),
	runSequence 	 = require('run-sequence'),
	gutil            = require('gulp-util'),
	clean            = require('gulp-clean'),
	jshint			 = require('gulp-jshint');
    
    
 
gulp.task('default', function(done) {
	process.env.NODE_ENV = 'development';
	console.log(process.env.NODE_ENV);
		
		 runSequence('clean','removeTemplateCache','vendorStyles','dynamicStyles','fonts','vendorScripts','AppScripts','templateCache','index','nodemon','browser-sync',function() {    	
				
			 gulp.watch("app/**/**/**/*.html",['templateCache']).on("change",browserSync.reload);
				
			 done();  
		        
		    });
	});

gulp.task('clean', function () {
	  return gulp.src('dev', {read: false})
	    .pipe(clean({force: true}));
});

gulp.task('removeTemplateCache', function () {
	  return gulp.src('app/src/htmlTemplateCache.js', {read: false})
	    .pipe(clean({force: true}));
});





gulp.task('templateCache', function () {
	
	
	  return gulp.src([  'app/**/*.html', '!app/vendor/**/*.html','!app/index.html','!app/staging.html'])
	  	.pipe(removeHtmlComments())
	    .pipe(minifyHTML({ quotes: true }))
	    .pipe(templateCache('htmlTemplateCache.js', { module:'HtmlTemplateCache', standalone:true }))
	    .pipe(gulp.dest('app/src/'));
	   
	});

gulp.task('index', function () {
	  return gulp.src('app/index.html')
	  	.pipe(removeHtmlComments())
	    .pipe(minifyHTML({ quotes: true }))
	    .pipe(gulp.dest('dev'));
	   
	});

gulp.task('vendorScripts', function() {
    return gulp.src(config.vendorScripts)
    	.pipe(debug())
    	.pipe(ngAnnotate())
        .pipe(concat('vendorScripts.js'))
        .pipe(gulp.dest('dev/src/scripts'))
        .pipe(rename('vendorScripts.min.js'))
        .pipe(uglify()).on('error', function(err) {
        	gutil.log(gutil.colors.red('[Error]'), err.toString());
        	this.emit('end');
        	})
        .pipe(gulp.dest('dev/src/scripts'))
        .pipe(size());
});
gulp.task('AppScripts', function() {
    return gulp.src(config.AppScripts)
    	.pipe(debug())
		.pipe(ngAnnotate())
		.pipe(jshint('./.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('default'))
        .pipe(concat('AppScripts.js'))
        .pipe(gulp.dest('dev/src/scripts'))
        .pipe(rename('AppScripts.min.js'))
        .pipe(uglify()).on('error', function(err) {
        	gutil.log(gutil.colors.red('[Error]'), err.toString());
        	this.emit('end');
        	})
        .pipe(gulp.dest('dev/src/scripts'))
        .pipe(size());
});
gulp.task('vendorStyles', function(){
	
	gulp.src(config.staticStyles)
    .pipe(concat('staticStyles.css'))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dev/src/styles'))
    .pipe(stripCssComments({preserve: false}))
    .pipe(csso())
    .pipe(cssmin())
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dev/src/styles'))
    .pipe(size());
	
});	
gulp.task('dynamicStyles', function(){
	gulp.src(config.dynamicStyles)
    .pipe(concat('dynamicStyles.css'))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dev/src/styles'))
    .pipe(stripCssComments({preserve: false}))
    .pipe(csso())
    .pipe(cssmin())
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dev/src/styles'))
    .pipe(size());
	
	
});	


gulp.task('browser-sync', function() {

	browserSync.init({
		/*proxy: {
		    target: "https://localhost:8082/login"
		}*/
		proxy : "https://localhost:8888",
	    port  : 4444,
	    browser: "Chrome.exe"
		
		
    });


});




gulp.task('fonts', function ()
			{
			   gulp.src(['app/**/**'])
			        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
			        .pipe(flatten())
			        .pipe(gulp.dest(path.join('dev/src/styles/fonts/')));
			}); 

gulp.task('nodemon', function (cb) {
	  var called = false;
	  return nodemon({
	    script: 'app.js',
	    ignore: [
	      'AuditDetails/**/*.*',
	      'gulpfile.js',
	      'node_modules/',
	      'app/**/*.*',
	      'staging/**/*.*',
	      'dev/**/*.*'
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