var gulp  		= require('gulp'),
    gutil 		= require('gulp-util'),
    jshint     	= require('gulp-jshint'),
    sourcemaps 	= require('gulp-sourcemaps'),
    concat 		= require('gulp-concat'),
    uglify 		= require('gulp-uglify'),
    watch 		= require('gulp-watch');


var files = {

	analysers : [
		'combat',
		'graphicoutput',
		'hunt',
		'textoutput'
	],

	lib : [
		'account',
		'ajax',
		'army',
		'console',
		'coordinates'
	],

	page : [
		'alliancedescription',
		'army',
		'attacklauncher',
		'colony',
		'convoy',
		'enemy',
		'forum',
		'hunt',
		'huntsimulator',
		'messaging',
		'ranking',
		'report'
	],

	zzzelp : [
		'alliancemanager',
		'frame',
		'ghosthelp',
		'help',
		'menu',
		'multiflood',
		'ressourcessender',
		'smileys',
		'tracer'
	],

	zzzelpfloods : [
		'attack',
		'launcher',
		'main',
		'optimization',
		'player'
	],

	main : [
		'main',
		'Synchronisation',
		'Divers'
	]

};

function filesBuilder(mode) {
	var filesTemp,
		filesToMerge = [
		'./Javascript/base_zzzelp.js'
	];
	if(typeof mode == 'undefined') {
		filesTemp = files;
	}
	else {
		filesTemp = [files[mode]];
	}
	for(var area in filesTemp) {
		var suffix = './ZzzelpScript/' + ((area == 'main') ? '' : area + '/');
		for(var i=0; i<filesTemp[area].length; i++) {
			filesToMerge.push(suffix + filesTemp[area][i] + '.js');
		}
	}
	return filesToMerge;
}


gulp.task('watcher', function() {
	gulp.watch('ZzzelpScript/**/*.js', ['build-js']);
	gulp.watch('Javascript/*.js', ['build-js']);
});

gulp.task('build-js', function() {
	setTimeout(function(){
		console.log('Gulp build-js');
		return gulp.src(filesBuilder())
			.pipe(sourcemaps.init())
			.pipe(concat('zzzelpscript.js'))
			//only uglify if gulp is ran with '--type production'
			//.pipe(uglify()) 
		    .pipe(sourcemaps.write({addComment: false}))
		    .pipe(gulp.dest('Userscripts'));
	},2000);
});