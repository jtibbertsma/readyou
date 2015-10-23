module.exports = function (grunt) {

  grunt.initConfig({
    jison: {
      markdown: {
        files: { 'public/javascripts/markdownParser.js': 'grammar/markdown.y' }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jison');
};