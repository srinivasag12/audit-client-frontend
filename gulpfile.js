
'use strict';

// gulp plugins
var gulp     = require('gulp'),
wrench       = require('wrench');

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
	  return (/\.(js)$/i).test(file);
	}).map(function(file) {
	  require('./gulp/' + file);
	});

