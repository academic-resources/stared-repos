module.exports = function (grunt) {


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		lodash: {
			build: {
				dest: 'lib/lodash.custom.js',
				options: {
					modifier: 'modern',
					include: ['cloneDeep', 'map', 'filter', 'uniq', 'sortByOrder','isNumber','isString','isFunction','isBoolean','isDate','has']
				}
			}
		},
		uglify: {
			minfile: {
				options: {
					sourceMap: true,
					sourceMapName: '<%= pkg.name %>.map'
				},
				files: {
					'<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: false,
				node: true,
				strict: false,
				quotmark: 'single'
			},
			globals: {}
		},
		mochaTest: {
			files: ['test/*-test.js']
		},
		watch: {
			scripts: {
				files: ['lib/*.js'],
				tasks: ['uglify'],
				options: {
					spawn: false,
				},
			},
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-lodash');


	// Default task.
	grunt.registerTask('default', ['jshint', 'uglify']);

	// Build task
	grunt.registerTask('build', ['lodash']);



};