/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Night.js
 * @path:   demo/arm2/js/
 * @desc:   Night模块中对象与版本声明
 * @author: jarry@baobaoyun.com
 * @date:   2014-7-14
 */

///import js-src/lib/
///import js-src/com/

define(
    [],
    function() {
        window.Night = Arm.create('Module', {
            name: 'Night',
            version: '1.0'
        });

        return Night;
        /*
        exports.module = {
            Ngight: Night
        };
        */
    }
);