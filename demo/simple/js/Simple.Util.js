/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Simple.Util.js
 * @path:   js-src/simple/
 * @desc:   Simple静态公共方法
 * @author: jarry@baobaoyun.com
 * @date:   2014-7-14
 */

define(
    [
        'simple/Simple'
    ],
    function(Simple) {
        Simple.Util = Arm.create('Util', {
            name: 'Simple.Util',
            // function list
            /**
             * 将URL参数变成Object
             * @param  {string} param   参数字符串
             * @returns {object} JSON
             */
            paramToJSON: function(param) {
                // 可以调用自Com或Util中相同方法
                // return Com.string.paramToJSON(param);
                var obj = {};
                var pairs = param.split('&');
                for (var key in pairs) {
                    var p = pairs[key].split('=');
                    if (p[0]) {
                        obj[decodeURIComponent(p[0])] = p[1] ? decodeURIComponent(p[1]) : null;
                    }
                }
                return obj;
            },

            getGenderTextByValue: function(value, obj) {
                // if (value === 1) {
                //     return 'Male';
                // }
                // if (value === 0) {
                //     return 'Female';
                // }
                // 直接使用配置项中的枚举示例，
                // 尽量把逻辑中用到的配置项抽取到config中
                // util里面不要直接写this, 你不知道调用方可能会是谁
                return Simple.Config.GENDER_ENUM[value];
            },

            isMale: function(value) {
                return value == 1;
            },

            isFemale: function(value) {
                return value == '0';
            },

            setTableOrder: function(ele) {
                var $ele = $(ele);
                var $order = $ele.find('b');
                var order = $ele.attr('data-order');
                if (order == 'asc') {
                    $ele.attr('data-order', 'desc');
                    $order.html('↓');
                } else {
                    $ele.attr('data-order', 'asc');
                    $order.html('↑');
                }
                return $ele.attr('data-order');
            },
            
            getTableOrder: function(ele) {
                var $ele = $(ele);
                var order = $ele.attr('data-order');
                return order;
            },

            formatter: {
                defaultProcessor: function(value, obj) {
                    return (value === undefined || value === null || value === '') ? 'none' : value;
                }
            }

        });
    }
);