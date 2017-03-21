/**
 * Created by Asion on 2017/3/21.
 */
module.exports = function(grunt) {
    // 使用严格模式
    'use strict';

    // 这里定义我们需要的任务
    grunt.initConfig({

        // 设置任务，删除文件夹
        clean: {
            dist: 'themes/maupassant/source/css'
        },


        // 通过sass编译成css文件
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: 'themes/maupassant/source/css',
                    ext: '.css'
                }]
            }
        },

        // 检测改变，自动跑sass任务
        watch: {
            scripts: {
                files: ['themes/maupassant/source/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // 一定要引用着3个模块
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 把需要跑的任务注册到default这里每次运行grunt的时候先删除dist，然后重新编译，最后监测文件夹的情况。
    grunt.registerTask('default', ['clean:dist', 'sass:dist', 'watch:scripts']);
};