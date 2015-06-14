module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			options: {
				sourceMap: true,
				separator: ';'
			},

			dist: {
				src: ['./application/**/*.js', './application/*.js'],
				
				dest: './public/js/app.js'
			}
		},
		
		uglify: {
			options: {
				banner: '/* <%= pkg.name %>, built <%=  grunt.template.today() %> */\n',
				compress: true,
				mangle: true,
				sourceMap: true
			},
			
			dist: {
				files: {
					'./public/js/app.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		
		watch: {			
			js: {
				files: ['./application/**/*.js', './application/*.js'],
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
