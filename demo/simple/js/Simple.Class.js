/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Simple.Class.js
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
        Simple.Class = Arm.create('Class', {
            name: 'Simple.Class',
            properties: {
                otherClass: null
            },
            // 定义具体业务数据对象，用来进行数据预处理
            // 所有供处理的对象应为ArrayList或HashMap(Model)
            options: {
                employeeList: null
            },

            // 初始化函数，包括数据初始化，属性赋值等
            init: function() {
                this.setEmployeeList(this.options.employeeList);

                // 当有其他类需要调用时可以这样来组合应用，在初始化时实例化其他的类
                // 这里用Simple.Class作为示例，就会得到该类的实例化对象，且传入了employeeList
                this.otherClass = this.action.get('Simple.OtherClass', {
                    otherVariable: 'otherVariable',
                    employeeList: this.options.employeeList.toArray()
                }, true);
            },

            // 设置数据对象时如果之前不是Arm数据类型，则需要设为Arm数据类型
            // 这样可以给该数据对象提前bind一些事件，比如onFetch事件
            setEmployeeList: function(data) {
                var list = this.options.employeeList;
                if (list instanceof Arm.ArrayList) {
                    // 支持链式调用
                    list.empty().add(data);
                } else {
                    this.options.employeeList = new Arm.ArrayList(data);
                }
            },

            // 组合应用示例。这里调用其他类里面的方法来替代自己的方法
            getOrignEmployeeList: function() {
                // return this.action.getView().options.rowsData; // 最原始数据
                return this.otherClass.getEmployeeList();
            },

            getEmployeeList: function() {
                return this.options.employeeList;
            },

            // 数据预处理之后再交给view去render，支持处理规则
            // { process: function() {}, sex: function() { } }
            // 支持格式化函数的传递来解决表现层复杂多变的情况
            preprocessEmployeeList: function(formatter) {
                var self = this;
                formatter = $.extend({
                    // 通用字段按照以下方式对数据进行预处理
                    defaultProcessor: self.action.getUtil().formatter.defaultProcessor,
                    // sex字段自定义规则器，util里根据config获取对应的显示汉字
                    sex: function(value, obj) {
                        return self.action.getUtil().getGenderTextByValue(value) || value || 'unknow';
                    }
                }, formatter);

                self.getEmployeeList().format({
                    'name': null,
                    'empno': null,
                    'sex': formatter.sex
                }, formatter.defaultProcessor);

                return self.options.employeeList;
            },

            updateEmpolyeeList: function(data, callback) {
                var self = this;
                // 数据驱动事件来更新view内容
                // fetch参数有两种情况
                // 1: call function, data, handle[callback]
                // 2: url, type, data, handle. handle is an object or callback
                console.log('Simple.Class.updateEmpolyeeList:', arguments);

                // 更新数据有以下三种方式

                // 1. 使用fetch来更新, 直接使用onFetch后，不用callback来执行回调,自动触发onFetch
                // 当有明确的数据对象更新时建议使用此方式。这样可以通过class来控制页面需要管理的数据对象(ArrayList与HashMap)
                // 这个handle是一个函数集合(success,fail,error，支持覆盖)，
                // handle里默认含有success方法，success默认会更新List，并调用onFetch
                // 另：这里的fetch如果直接传入Dao里面的getList方法，但是需要将getList方法里面的this指针指向Dao
                // 如：self.getEmployeeList().fetch(self.getDao().getList, data);
                self.getEmployeeList().fetch(function(handle) {
                    self.getDao().getList(data, handle);
                });

                // 2. 使用fetch来更新, 接管success的方式，数据的update与onFetch将不会自动执行
                // 当要保留原始的response数据时，手工处理成功失败时可以通过这种方式
                // self.getEmployeeList().fetch(function() {
                //     self.getDao().getList(data, {
                //         // Dao回调集合包含success, fail, error，参见Base.Dao
                //         // 故需要手工指定对response数据进行再处理操作
                //         success: function(response) {
                //             self.action.getDao().success();
                //             self.setEmployeeList(response.data);
                //             callback.call(self, response.data);
                //         }
                //     });
                // });

                // 3. 通用写法，通过dao手动执行回调再手工更新数据，效果与fetch一样
                // 对于非数据获取比较合适，比如删除，通知等。
                // self.getDao().getList(data, {
                //     success: function(response) {
                //         // 呼出操作成功提示框
                //         self.action.getDao().success();
                //         // 手工更新数据
                //         self.setEmployeeList(response.data);
                //         // 执行成功回调
                //         callback.call(self, response.data);
                //     }
                // });

            }

        });
    }
);