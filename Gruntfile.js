module.exports = function(grunt) {
  grunt.initConfig({
    jscs: {
      src: [
        '*.js',
        'spec/**/*.js',
        'Gruntfile.js'
      ],
      options: {
        config: '.jscsrc'
      }
    },
    jasmine: {
      src: [
        'store.js',
        'helpers.js'
      ],
      options: {
        keepRunner: true,
        vendor: [
          'node_modules/react/dist/react.js',
          'node_modules/react-dom/dist/react-dom.js',
          'node_modules/redux/dist/redux.js'
        ],
        specs: 'spec/**/*_spec.js',
        helpers: 'spec/helpers.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', ['jscs', 'jasmine']);
};
