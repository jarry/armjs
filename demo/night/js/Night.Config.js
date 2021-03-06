/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Night.Config.js
 * @path:   demo/arm2/js/
 * @desc:   Night公共配置集合
 * @author: jarry@baobaoyun.com
 * @date:   2014-7-14
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'js/Night'
    ],
    function(Night) {
        Night.Config = Arm.create('Config', {
            name: 'Night.Config'
        });
    }
);