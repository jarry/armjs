/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Simple.Action.js
 * @path:   js-src/simple/
 * @desc:   Action静态对象，声明对象以及绑定事件、对外接口等
 * @author: jarry@baobaoyun.com
 * @date:   2014-7-14
 */

define(
    [
        'simple/Simple'
    ],
    function(Simple) {
        Simple.Action = Arm.create('Action', {
            name: 'Simple.Action'
            // TODO: static method for exchange
        });
    }
);