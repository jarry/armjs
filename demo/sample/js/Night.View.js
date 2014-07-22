/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Night.View.js
 * @path:   demo/arm2/js/
 * @desc:   Night模块下页面业对象类
 * @author: yangpengfei@qiyi.com
 * @date:   2014-7-14
 */

define(
    [
        'js/Night'
    ],
    function(Night) {
        Night.View = Arm.create('View', {
            name: 'Night.View',
            // module: 'Night',
            // name: 'Night.View',
            properties: {
                rowsData: null,
                class: null
            },

            options: {
                element: null,
                templateSelector: '#TemplateRow',
                btnAddSelector: '#btn-add',
                removeSelector: '.d-operation'
            },

            init: function() {
                this.class = this.class || this.getAction().getClass({
                    // 也可以在实例化时直接传递ArrayList，见class中rowsData声明处
                    rowsData: new Arm.ArrayList(this.options.rowsData)
                });
                this.bindEvent();
            },

            bindTableEvent: function() {
                var self = this;
                this.click('table tr .d-operation a', function(evt) {
                    var $tr = $(evt.target).closest('tr');
                    empno = $tr.data('empno');
                    if (confirm('Are you sure to remove this item?')) {
                        self.getClass().getItems().removeBy('empno', empno);
                        console.log(self.getClass().getItems());
                        $tr.fadeOut(500, $tr.remove);
                    }
                    return false;
                });
            },

            bindEvent: function() {
                var self = this;

                this.click('#btn-add', function(evt) {
                    // TODO get form value
                    var _name = $('input[name=name]').val();
                    var _empno = parseInt($('input[name=empno]').val(), 10);
                    var _sex = parseInt($('input[name=sex]:checked').val(), 10);
                    var _item = {
                        name: _name,
                        empno: _empno,
                        sex: _sex
                    };
                    if (self.getClass().getItems().getBy('empno', _empno).length < 1) {
                        self.getClass().getItems().add(_item);
                        self.renderTable();
                    } else {
                        alert("Empno exists.");
                    }
                });

                self.bindTableEvent();
            },

            renderTable: function(data) {
                data = data || this.class.getProcessItems();
                var $tbody = this.find('table').find('tbody');
                var $template = $(this.options.templateSelector);
                this.render($tbody[0], $template[0], data);
            },

            triggerRun: function() {

            },

            run: function() {
                this.renderTable();
                this.triggerRun();
            }
        });
    }
);