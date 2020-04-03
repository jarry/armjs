/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Simple.OtherClass.js
 * @path:   js-src/simple/
 * @desc:   Simple模块下基础业对象类
 * @author: jarry@baobaoyun.com
 * @date:   2014-7-14
 */

define(
    [
        './Simple'
    ],
    function(Simple) {
        Simple.OtherClass = Arm.create('Class', {
            name: 'Simple.OtherClass',
            properties: {
            },

            options: {
                employeeList: null
            },

            init: function() {
                this.setEmployeeList(this.options.employeeList);
            },

            // setEmployeeList: function(data) {
            //     var employeeList = this.options.employeeList;
            //     if (employeeList instanceof Arm.ArrayList) {
            //         employeeList.empty().add(data);
            //     } else {
            //         this.options.employeeList = new Arm.ArrayList(data);
            //     }
            // },

            // getEmployeeList: function() {
            //     // 这个方法用来bind示例，通过更改this来改变options.employeeList
            //     return this.options.employeeList;
            // }

        // 这里是继承示范，其中只有方法会继承。 init一般自己重写更好
        }).inherits(Simple.Class);
    }
);