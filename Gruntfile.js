module.exports = function(grunt){
	grunt.initConfig({
		concat:{
			dist: {
			  src: ['src/userscriptheader.js', 'dist/wkss.js'],
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
