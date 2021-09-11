/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
                dest: 'public/dist/js/<%= pkg.name %>.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>', 'public/**/*.js'],
                dest: 'public/dist/js/<%= pkg.name %>.min.js'
            }
        },
        cssmin: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>', 'public/**/*.css'],
                dest: 'public/dist/css/<%= pkg.name %>.min.css'
            }
        },
        uglify: {}
    });


    //Load the css minification plugin
    grunt.loadNpmTasks('grunt-css');


    // Default task.
    grunt.registerTask('default', 'min cssmin');


};