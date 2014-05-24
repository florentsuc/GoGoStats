module.exports = function (grunt) {

    /**
     * Project tasks configuration
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        scp: {
            options: {
                host: 'customers.ubleam.com',
                username: 'ubleam',
                password: 'ubleamisstrong'
            },
            your_target: {
                files: [{
                    cwd: './',
                    src: ['**/*','!node_modules/**/*'],
                    filter: 'isFile',
                    // path on the server
                    dest: '/srv/<%= pkg.name %>/'
                }]
            }
        }
    });

    /**
    * Load npm tasks modules
    */
    grunt.loadNpmTasks('grunt-scp');

    /**
    * Register batch tasks
    */

    grunt.registerTask('deploy', ['scp']);

};