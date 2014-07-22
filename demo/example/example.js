/**
 * Copyright 2014 Qiyi.com All rights reserved.
 *
 * file: lego
 * path: js-src/
 * description: lego业务合并文件，通过该文件引入业务功能模块的js文件
 *              配置文件将用来生成合并文件
 * author: Smyle
 * date: 2014-06-25
 */
define(
    'example', [
        '../../../js-src/base/Base',
        '../../../js-src/base/Base.Config',
        '../../../js-src/base/Base.Util',
        '../../../js-src/base/Base.Action',
        '../../../js-src/base/Base.Class',
        '../../../js-src/base/Base.View',
        '../../../js-src/base/Base.Dao',
        'js/Example'
    ],
    function() {
    
    }
);