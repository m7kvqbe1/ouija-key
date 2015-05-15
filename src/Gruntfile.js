module.exports = function(grunt) {
	grunt.initConfig({
		uglify: {
			options: {
				banner: '/* Ouija v0.0.1, built <%=  grunt.template.today() %> */'
			},

			lib: {
				src: [
					'./application/vendor/*/*.js'
				],
				
				dest: './public/js/vendor.min.js'
			},

			app: {
				src: [
					'./application/components/*.js',
					'./application/app.js'
				],

				dest: './public/js/app.min.js'
			}
		}
	});

	// Load the plugin that prvides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);
}
