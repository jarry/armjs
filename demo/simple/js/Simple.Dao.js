/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Simple.Dao.js
 * @path:   js-src/simple/
 * @desc:   负责Simple模块远程调用的静态对象
 * @author: jarry@baobaoyun.com
 * @date:   2014-7-14
 */

define(
    [
        './Simple'
    ],
    function(Simple) {
        Simple.Dao = Arm.create('Dao', {
            name: 'Simple.Dao',
            // TODO: ajax list
            getList: function(data, handle, url) {
                url = url || './data/list.json';
                console.log('Simple.Dao.getList:', arguments);
                // 不使用this，则在class调用时可以直接调用，而无须闭包调用
                // Simple.Dao.ajax(url, 'GET', data, handle);
                // this.ajax 继承自Base.Dao
                // 静态方法集合里使用this，要注意this指针可能更改的问题
                $.ajax(url, 'GET', data, handle);
            }
        });
    }
);