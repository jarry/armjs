/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Night.Class.js
 * @path:   demo/arm2/js/
 * @desc:   Night模块下基础业对象类
 * @author: yangpengfei@qiyi.com
 * @date:   2014-7-14
 */

define(
    [
        'js/Night'
    ],
    function(Night) {
        Night.Class = Arm.create('Class', {
            name: 'Night.Class',
            properties: {},
            options: {
                rowsData: null
            },

            getProcessItems: function() {
                var self = this;
                self.options.rowsData = new Arm.ArrayList(self.options.rowsData);
                // console.log(self.options.rowsData);
                self.options.rowsData.format({
                    'name': null,
                    'empno': null,
                    'sex': function(value, obj) {
                        if (value === 0) {
                            return "Male";
                        }
                        if (value === 1) {
                            return "Female";
                        }
                        return value || "-";
                    }
                }, function(value, obj) {
                    return value || "-";
                });
                // console.log(self.options.rowsData);
                return self.options.rowsData;
            },

            getItems: function() {
                var self = this;
                return self.options.rowsData;
            }
        });
    }
);