module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify : {
	  app : {
	    files: { 
	    	'public/js/bundle.js' : ['public/js/app.js']
	    },
	    options: {
	    	transform: ['reactify']
	    }
	  }
	},
	watch: {
		scripts: {
			files: ['public/js/**/*.js'],
			tasks: ['browserify']
		},
	},
	uglify: {
	    main: {
	      files: {
	        'public/js/bundle.min.js': ['public/js/bundle.js']
	      }
	    }
	},
	express: {
	    background: {
	    	options: {
		        script: 'server.js',
		        background: true
		    }
	    }
	}
  })

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['browserify', 'uglify', 'express:background', 'watch']);
  grunt.registerTask('dev', ['browserify', 'express:background', 'watch']);
  grunt.registerTask('travis', ['browserify', 'uglify']);

}