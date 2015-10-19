module.exports = function (grunt) {

  grunt.initConfig({
    peg: {
      markdown: {
        src: 'grammar/markdown.peg',
        dest: 'public/javascripts/markdownParser.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-peg');
};