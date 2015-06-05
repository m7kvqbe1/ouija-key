module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			options: {
				banner: '/* Ouija Key, built <%=  grunt.template.today() %> */'
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

	// Load the plugin that prvides the "concat" task.
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('default', ['concat']);
}
