/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Simple.View.js
 * @path:   js-src/simple/
 * @desc:   Simple模块下页面业对象类
 * @author: jarry@baobaoyun.com
 * @date:   2014-7-14
 */

define(
    [
        'simple/Simple'
    ],
    function(Simple) {
        Simple.View = Arm.create('View', {
            name: 'Simple.View',
            // 类属性
            properties: {
                rowsData: null,
                class: null,
                $table: null,
                $form: null,
                $templateRow: null
            },

            // 构造器的形参，一般用来控制可变项目
            options: {
                // 实例化view时必须传递element
                // element: null,
                templateSelector: '#TemplateRow',
                btnAddSelector: '#BtnAdd',
                tableSelector: 'table.list',
                sortFieldAttr: 'data-sort-field'
            },

            // 初始化函数，每个view都有，在实例化时会自动执行
            // init主要用来准备容器当中的元素、数据与事件
            init: function() {
                this.$form = this.getContainer();
                // 模板一般不在container内，需要相对document查找
                this.$templateRow = $(this.options.templateSelector);
                this.$table = this.find(this.options.tableSelector);
                // 在int时初始化需要关联的class
                this.class = this.class || this.getAction().getClass({
                    // 也可以在实例化时直接传递ArrayList，见class中rowsData声明处
                    // view中的rowsData与employeeList基本相同，所不同的是
                    // employeeList是面向具体业务的ArrayList, rowsData更加抽象，面向DOM渲染
                    // employeeList: new Arm.ArrayList(this.options.rowsData)
                    employeeList: this.options.rowsData
                });

                // 设定数据更新行为
                this.bindFetch();
                // 调用bindEvent事件，初始化需要执行的都可以放在此
                this.bindEvent();
            },

            // 代理事件统一定义,Arm会自动设定这些事件
            // '事件名 相对容器的选择符': '函数名'，所有事件均是代理
            events: {
                'click label [name="sex"]': 'checkSexRadio',
                'click .operation .btn-remove': 'removeItem',
                'click div .btn-update': 'updateContent',
                'click table thead th.sort': 'sortTableData'
            },

            // bindFetch 用来给本View需要操作的数据对象bind更新事件
            bindFetch: function() {
                var self = this;
                // 设定数据对象的onFetch事件，由数据更新来驱动行为
                self.class.getEmployeeList().onFetch = function(data) {
                    console.log('Simple.View.bindFetch:', arguments);
                    self.action.getDao().success();
                    self.preprocessEmployeeList();
                    var list = self.class.getEmployeeList().orderBy('id', 'desc');
                    self.renderTable(list);
                    self.onTableUpdated();

                    // 这里再测试下继承、组合与函数bind的应用，list1来自OtherClass
                    var list1 = self.action.get('OtherClass').getEmployeeList().orderBy('id', 'desc');
                    // 组合测试，list2来自class调用自OtherClass的方法
                    var list2 = self.class.getOrignEmployeeList().orderBy('id', 'desc');
                    // 分别打印Class的List与OtherClass的list的list对比下, OtherClass里是原始值
                    console.log('Simple.View.bindFetch第一次对比:', list, list1, list2);

                    // 现在给getEmployeeList函数添加bind，更改this为class，再对比下数据
                    var getList = self.action.get('OtherClass').getEmployeeList.bind(self.class);
                    console.log('Simple.View.bindFetch再次对比:', list.get(0), getList().orderBy('id', 'desc').get(0), list1.get(0), list2[0]);
                    // 可以看到list与getList()数据一致了，list1与list2还是原来的数据
                    // 这就是通过bind来改变函数的调用，以及通过组合来调用方法

                };
            },

            // bindEvent事件属于自行添加事件，一般由init来调用
            // 把需要事件bind放在一起便于管理
            // 大部分事件放在events中，个别可能更改DOM选择符的事件可以放在这里
            bindEvent: function() {
                var self = this;
                // 本事件不是代理，而是页面必然存在改按钮，且不会被移动
                // 这种事件通过bindEvent单独添加亦可，find是内置方法相对element查找
                self.find(self.options.btnAddSelector).on('click', function(evt, ele) {
                    self.addItem(evt, ele);
                });

            },

            // 形参: (事件, DOM元素)
            checkSexRadio: function(evt, ele) {
                // 获取可变文本时最好通过util的方法根据config来返回值。
                // 本例说明下config,util与view之间的用法
                value = $.trim(ele.value);
                var sexText = this.action.getUtil().getGenderTextByValue(value);
                console.log('Simple.View.checkSexRadio:点击了"' + sexText + '"按钮');
                // id,value的判断都通过方法来实现
                if (this.action.getUtil().isFemale(value)) {
                    console.log('Simple.View.checkSexRadio:', '你确实点的是female。');
                }
            },

            /**
             * 添加一个雇员(这是一个标准的注释)
             * @function
             * @param {event} evt, 事件
             * @param {Element} ele, DOM
             * @returns void
             */
            addItem: function(evt, ele) {
                var self = this;
                var id = parseInt(this.find('input[name=id]').val(), 10);
                // 逐个获取form元素
                // var name = this.find('input[name=name]').val();
                // var sex = parseInt(this.find('input[name=sex]:checked').val(), 10);
                // var data = {
                //     name: name,
                //     id: id,
                //     sex: sex
                // };

                // 通过专门的表单处理控件来获取字段，比如过滤项，取data-id
                var data = this.action.getUtil().paramToJSON(this.$form.serialize());
                var list = self.getClass().getEmployeeList();

                // 如果没有相同的id的则添加
                if (list.getBy('id', id).length < 1) {
                    list.add(data);

                    // 建议每次通过数据变动之后来渲染,使用数据来驱动DOM的更改
                    // self.renderTable();

                    // 也可以每次手工操作DOM，如下：
                    var $ele = $('<div/>');
                    // 也可也进行规则处理
                    var _data = new Arm.HashMap(data).format('sex', function(value, obj) {
                        return self.sexProcessor(value, obj);
                    });
                    // render参数: Element, 模板Element, 数据, 处理器
                    self.render($ele[0], self.$templateRow[0], _data, function(content) {
                        // process函数，通过处理函数来渲染，默认会直接填入到ele中
                        // 参数：content, ele, tmplElement, data
                        self.$table.find('tbody').append(content);
                    });

                } else {
                    alert("id exists.");
                }
            },

            onTableUpdated: function() {
                console.log('Simple.View.onTableUpdated:',  this, '更新完成，可以执行有关操作了', arguments);
            },

            // 从后端获取数据并更新table的方法
            updateContent: function(evt, ele) {
                var self = this;
                // 定义传递参数
                var data = {
                    userId: 12345,
                    time: new Date().getTime()
                };
                // 定义回调函数，再回调后更新table以及执行相应的提示
                var callback = function(data) {
                    console.log('Simple.View.updateContent.callback:', data, self.class.getEmployeeList());
                    
                    // 直接用回调得到response的数据来执行render，这样的数据是原始数据
                    // self.renderTable(data);
                    self.preprocessEmployeeList();
                    // 建议直接取自calss里面的EmpolyeeList，可以对数据进行预处理，List还可以进行排序
                    self.renderTable(self.class.getEmployeeList().orderBy('id', 'desc'));
                    
                    // render之后的方法
                    self.onTableUpdated();
                };

                // 调用class的数据更新方法, 传入回调后，通过class来回调
                // 但如果使用onFetch则可以不用该回调，即通过ArrayList中的onFetch来执行回调
                self.action.get('Class').updateEmpolyeeList(data, callback);
                // self.action.get('Class').updateEmpolyeeList(data);
            },

            // 移除一个条目，DOM操作行为
            removeItem: function(evt, ele) {
                var self = this;
                var $tr = $(evt.target).closest('tr');
                id = $tr.data('id');
                if (confirm('Are you sure to remove this item?')) {
                    self.getClass().getEmployeeList().removeBy('id', id);
                    $tr.fadeOut(500, $tr.remove);
                }
                return false;
            },

            // 性别格式化处理器
            sexProcessor: function(value, obj) {
                var self = this;
                var html = [];
                var isFemale = self.action.getUtil().isFemale(value);
                var className = isFemale ? 'alarm' : '';
                // 女性增加醒目颜色
                html.push('<span class="' + className + '">');
                html.push(self.action.getUtil().getGenderTextByValue(value));
                html.push('</span>');
                return html.join('');
            },

            // 展现层也可以再次干预class中的数据,这里因为不同view需要的dom可能不同
            // 如果足够通用可以放到Utli里面的formatter中
            preprocessEmployeeList: function(formatter) {
                var self = this;
                formatter = $.extend({
                    // sex方法会覆盖class中preprocessEmployeeList对应的处理器
                    // 从而本view数据预处理规则与其他view可以不同
                    sex: function(value, obj) {
                        return self.sexProcessor(value, obj);
                    }
                }, formatter);

                this.class.preprocessEmployeeList(formatter);
            },

            // 排序事件
            sortTableData: function(evt, ele) {
                var self = this;
                var order = self.action.getUtil().getTableOrder(ele) || 'desc';
                var field = $(ele).attr(self.options.sortFieldAttr);
                self.renderTable(self.class.getEmployeeList().orderBy(field, order));
                self.action.getUtil().setTableOrder(ele);
                console.log('Simple.View.sortTableData', field, order);
                // evt.preventDefault();
                // evt.stopPropagation();
                return false;
            },

            // 渲染该table
            renderTable: function(data) {
                // 若非直接传递的data则对数据进行预处理加工
                if (!data) {
                    this.preprocessEmployeeList();
                    data = this.class.getEmployeeList();
                }
                var $tbody = this.$table.find('tbody');
                var $template = this.$templateRow;
                this.render($tbody[0], $template[0], data);
            },

            // 统一的trigger调用
            triggerRun: function() {
                // trigger是内置方法，与on类似。形参(事件，选择器，参数)
                // 本例在页面load后触发sex radio value为1的按钮
                this.trigger('click', '[name="sex"][value="1"]');
            },

            // 执行函数，由调用方通过action来执行
            // 与init不同run用来trigger事件、render DOM，执行方法，run手工执行
            run: function() {
                this.renderTable();
                this.triggerRun();
            }
        });
    }
);
