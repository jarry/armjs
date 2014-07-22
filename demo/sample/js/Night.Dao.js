/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Night.Dao.js
 * @path:   demo/arm2/js/
 * @desc:   负责Night模块远程调用的静态对象
 * @author: yangpengfei@qiyi.com
 * @date:   2014-7-14
 */

define(
    [
        'js/Night'
    ],
    function(Night) {
        Night.Dao = Arm.create('Dao', {
            name: 'Night.Dao'
            // Nothing
        });
    }
);