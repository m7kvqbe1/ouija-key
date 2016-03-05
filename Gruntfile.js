module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			options: {
				sourceMap: true,
				separator: ';'
			},
			
			lib: {
				src: [
					'./application/vendor/**/*.js'
				],
				
				dest: './public/js/lib.js'
			},

			app: {
				src: [
					'./application/*.js', 
					'./application/**/*.js'
				],
				
				dest: './public/js/app.js'
			}
		},
		
		uglify: {
			options: {
				banner: '/* <%= pkg.name %>, built <%=  grunt.template.today() %> */',
				compress: true,
				mangle: true,
				sourceMap: true
			},
			
			dist: {
				files: {
					'./public/js/lib.min.js': ['<%= concat.lib.dest %>'],
					'./public/js/app.min.js': ['<%= concat.app.dest %>']
				}
			}
		},
		
		watch: {			
			js: {
				files: ['./application/**/**/*.js', './application/**/*.js', './application/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
	});

	// Load the plugins that prvide the various Grunt tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify']);
}
