/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Simple.js
 * @path:   js-src/simple/
 * @desc:   Simple模块中对象与版本声明
 * @author: jarry@baobaoyun.com
 * @date:   2014-7-14
 */

///import js-src/lib/
///import js-src/com/

define(
    [],
    function() {
        // 创建一个模块，可以参见shell/create-module.sh自动创建
        var Simple = Arm.create('Module', {
            name: 'Simple',
            version: '1.0'
        });

        return Simple;
    }
);