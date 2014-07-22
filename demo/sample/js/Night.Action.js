/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Night.Action.js
 * @path:   demo/arm2/js/
 * @desc:   Action静态对象，声明对象以及绑定事件、对外接口等
 * @author: yangpengfei@qiyi.com
 * @date:   2014-7-14
 */

define(
    [
        'js/Night'
    ],
    function(Night) {
        Night.Action = Arm.create('Action', {
            name: 'Night.Action'
        });
    }
);