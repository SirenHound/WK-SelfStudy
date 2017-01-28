module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat:{
			options: {
			  stripBanners: true,
			  banner: '// ==UserScript==\r\n' +
				'// @name        Wanikani Self-Study Plus RC\r\n' +
				'// @namespace   wkselfstudyplus\r\n' +
				'// @description Adds an option to add and review your own custom vocabulary\r\n' +
				'// @include     *.wanikani.com/*\r\n' +
				'// @include     *.wanikani.com/chat/*\r\n' +
				'// @exclude	    *.wanikani.com\r\n' +
				'// @include     *.wanikani.com/dashboard*\r\n' +
				'// @include     *.wanikani.com/community*\r\n' +
				'// @version     <%= pkg.version %>\r\n' +
				'// @author      shudouken and Ethan\r\n' +
				'// @run-at      document-end\r\n' +
				'// @grant       none\r\n' +
				'// ==/UserScript==\r\n' +
				'/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			/**  This script is licensed under the Creative Commons License
			 *  "Attribution-NonCommercial 3.0 Unported"
			 *
			 *  More information at:
			 *  http://creativecommons.org/licenses/by-nc/3.0/
			 */

			dist: {
			  src: ['dist/wkss.js'],
			  dest: 'dist/wkssp.js',
			}
		},
		browserify: {
			main:{
				options: {
					browserifyOptions:{
						//debug: true
					}
				},
				src: 'src/trunk.js',
				dest: 'dist/wkss.js'
			},
		},
		jshint: {
			// define the files to lint
			files: ['Gruntfile.js',
			'src/**/*.js',
			],
			// configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
				// more options here if you want to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},

		dependo: {
			main: {
				file: 'local.js',
				fileName: 'local.js',
				targetPath: './javascript/src'
			},
			secondarylib: {
				fileName : 'secondarylib.html',
				targetPath: './js/'
			},
			options: {
				outputPath: './doc',
				fileName : 'dependoGraph.html',
				format: 'cjs'
			}
		}
	});
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', [
		//'dependo',
		'jshint',
		'browserify:main',
		'concat'
	]);

};
