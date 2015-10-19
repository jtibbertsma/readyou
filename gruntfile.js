module.exports = function (grunt) {

  grunt.initConfig({
    jison: {
      markdown: {
        files: { 'grammar/markdown.jison': 'public/javascripts/markdownParser.js' }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jison');
};