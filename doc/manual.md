Arm开发说明
---
###  简介
ArmJS是一套适合Web开发的JS MVC轻量级框架，提供一套view-service-model的分层机制与相关约束，让代码更加清晰、简单与可维护

###  相关链接
 [armjs源码下载](/jarry/armjs/blob/master/src/arm.js "下载源码")
 [armjs测试用例](/jarry/armjs/tree/master/test "测试用例")
 [armjs测试DEMO](/jarry/armjs/tree/master/demo "测试DEMO")


### 基本数据类型

#### HashMap

```javascript
    var data = {
        age: 19,
        no: 19,
        name: 'kity'
    };
    var map = new Arm.HashMap(data);
    map.getByValue(19); // 返回数组 ['age', 'no']

```
*size   
集合的长度

```javascript
   var data ={
       name: "Tom",
       age: 23,
       gender: "male"
   };
  var map = new Arm.HashMap(data);
  map.size(); //返回数组的长度3

```
*containsKey   
是否包含此主键key，是返回true,否返回false

```javascript
   var data ={
       name: "Tom",
       age: 23,
       gender: "male"
   };
  var map = new Arm.HashMap(data);
  map.containsKey("name"); //返回true
  map.containsKey(name);   //返回false

```
*containsValue    
是否包含value,是返回true,否返回false

```javascript
   var data ={
       name: "Tom",
       age: 23,
       gender: "male"
   };
  var map = new Arm.HashMap(data);
  map.containsValue("Tom"); //返回true
  map.containsValue(23);   //返回true

```
*unset(attr, options)   
隐藏某键值，形参可传键，也可以传一个对象（options可选参数）

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
 //map.unset({name:"Tom",age:23}); //返回结果{gender: "male"}
   map.unset("name"); //返回结果{age: 23, gender: "male"}
 		
```

*has(attr)   
是否包含某键值

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
   map.has("age");	//返回true

```

*get(attr)   
取值

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
// map.get("age");	//返回23
   map.get("gender")	//返回"male"

```

*format(keyMap, formater)    
修改某一键的值，第一个形参代表键，第二个形参传一个方法

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
   map.format("name",function(){return "Toy"});//返回结果是{name: "Toy", age: 23, gender: "male"}

```

*getByAttribute(key)   
根据key取值，形参传递的是一个数组

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
 //map.getByAttribute(["name"]);         //返回结果["Tom"]
   map.getByAttribute(["age","gender"]); //返回结果[23, "male"]

```

*getByValue(value)   
根据值取键，传一个数组为形参

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
 //map.getByValue(["Tom"]);         //返回结果["name"]
   map.getByValue(["23","male"]);   //返回结果["age", "gender"]

```

*clone()   
复制，返回一个对象

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
   map.clone();   //返回的结果是一个Object {name: "Tom", age: 23, gender: "male"}

```

*put(key, value)
添加key/value

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
   map.put("Id",1656);    //返回的结果 {name: "Tom", age: 23, gender: "male", Id: 1656}

```

*set(key, val, options)   
设置新的属性，或修改旧属性

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
   map.set({name:"Toy",ID:1656});  //返回结果{name: "Toy", age: 23, gender: "male", ID: 1656}

```

*isEmpty()    
判断是否含有属性,有返回fasle,无返回true

```javascript
   var data={  };
   var map = new Arm.HashMap(data);
   map.isEmpty(); //返回true

```

*remove(attr, options)    
删除指定的属性，（options是一个可选项，可以传递多个属性，但是以对象形式）

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
   map.remove("name");	//返回结果{age: 23, gender: "male"}
  //或
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
   map.remove({name:"Tom",age:23});	//返回结果{gender: "male"}

```

*clear()
清除value值

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
   map.clear(); //返回结果{name: undefined, age: undefined, gender: undefined}
   
```

*toString()
返回此对象本身

```javascript
   var data={
   name:"Tom",
   age:23,
   gender:"male"
   };
   var map = new Arm.HashMap(data);
   map.toString();  //返回结果{"name":"Tom","age":23,"gender":"male"}

```

#### ArrayList

```javascript
   ar data = [{ name: "Tom"},{age: 23}, {gender: "male"}]; 
   var list = new Arm.ArrayList(data);
   list.length; //返回结果3

```

*valueOf()

```javascript
   var data = [
	{ name: "Tom"},
	{age: 23}, 
	{gender: "male"}
	]; 
   var list = new Arm.ArrayList(data);
   list.valueOf();    //返回结果[{ name: "Tom"},{age: 23}, {gender: "male"}]

```

*size()
返回集合长度

```javascript
   var data = [
	{name: "Tom",age: 23,gender: "male"},
	{name: "Lucy",age:19,gender: "female"}, 
	{name: "Joy",age: 24,gender: "male"}
	]; 
   var list = new Arm.ArrayList(data);
   list.size();   //返回结果3

```

*get(index)
通过传入的角标得到对应的值

```javascript
   ar data = [
	{name: "Tom",age: 23,gender: "male"},
	{name: "Lucy",age:19,gender: "female"}, 
	{name: "Joy",age: 24,gender: "male"}
	]; 
   var list = new Arm.ArrayList(data);
   list.get(2);  //返回的结果是{name: "Joy",age: 24,gender: "male"}

```

*getBy(attr, value)
通过传入的参数得到对应组的值,如果没有匹配返回[]

```javascript
   var data = [
	{name: "Tom",age: 23,gender: "male"},
	{name: "Lucy",age:19,gender: "female"}, 
	{name: "Joy",age: 24,gender: "male"}
	]; 
   var list = new Arm.ArrayList(data);
   list.getBy("age",24);  //返回的结果是[{name: "Joy",age: 24,gender: "male"}]

```
*getById(id)
根据id获取对应的值

```javascript
   var data = [
	{id:1,name: "Tom",age: 23,gender: "male"},
	{id:2,name: "Lucy",age:19,gender: "female"}, 
	{id:3,name: "Joy",age: 24,gender: "male"}
	]; 
   var list = new Arm.ArrayList(data);
   list.getById(2); //返回结果是{id: 2, name: "Lucy", age: 19, gender: "female"}

```

*getByAttribute(key)
根据key,得到相应的值，返回的是数组

```javascript
   var data = [
	{name: "Tom",age: 23,gender: "male",hobby:"basketball"},
	{name: "Lucy",age:19,gender: "female",country:"USA"}, 
	{name: "Joy",age: 24,gender: "male",work:"IT"}
	]; 
   var list = new Arm.ArrayList(data);
   list.getByAttribute("work");  //返回结果[{name: "Joy",age: 24,gender: "male",work:"IT"}]

```
*getByValue(value)
根据value得到相应的值，返回的是数组

```javascript
   var data = [
	{name: "Tom",age: 23,gender: "male",hobby:"basketball"},
	{name: "Lucy",age:19,gender: "female",country:"USA"}, 
	{name: "Joy",age: 24,gender: "male",work:"IT"}
	]; 
   var list = new Arm.ArrayList(data);
   list.getByValue(24);   //返回结果[{name: "Joy",age: 24,gender: "male",work:"IT"}]

```
*validModel(item)
判断原数据是否有修改，有返回true，无返回false

```javascript
   var data = [
	{name: "Tom",age: 23,gender: "male",hobby:"basketball"},
	{name: "Lucy",age:19,gender: "female",country:"USA"}, 
	{name: "Joy",age: 24,gender: "male",work:"IT"}
	]; 
   var list = new Arm.ArrayList(data);
   list.validModel("name");  //返回false

```

*add(item, valid)
添加数据,valid为boonlean值,是可选项，当为true时，不会去添加，为false时添加

```javascript
   var data = [
	{name: "Tom",NO: 23,gender: "male",hobby:"basketball"},
	{name: "Lucy",age:19,gender: "female",country:"USA"}, 
	{name: "Joy",age: 24,gender: "male",work:"IT"}
	]; 
   var list = new Arm.ArrayList(data);
   list.add([{name: "Lily",age: 23},{name: "Jone",age: 21}]);/*返回结果
                                                               [{name: "Tom",NO: 23,gender: "male",hobby:"basketball"},
								{name: "Lucy",age:19,gender: "female",country:"USA"}, 
								{name: "Joy",age: 24,gender: "male",work:"IT"}，
								{name: "Lily",age: 23}，
								{name: "Jone",age: 21}]; */

```

*addAll(list)

```javascript
   var data = [
	{name: "Tom",NO: 23,gender: "male"},
	{name: "Lucy",age:19,gender: "female"}, 
	{name: "Joy",age: 24,gender: "male"}
	]; 
   var list1 = new Arm.ArrayList(data);
var mo = [
   {name: "Lily",age: 23},
   {name: "Mimi",age: 25}
];
   var list = new Arm.ArrayList(mo);
   list1.add(list);  /*返回结果是
                                 [{name: "Tom",NO: 23,gender: "male"},
				  {name: "Lucy",age:19,gender: "female"},
				  {name: "Joy",age: 24,gender: "male"},
				  {name: "Lily",age: 23},
				  {name: "Mimi",age: 25}]*/

```

*set(index, item)
根据角标设置新的选项

```javascript
   var data = [
	{name: "Tom",NO: 23,gender: "male"},
	{name: "Lucy",age:19,gender: "female"}, 
	{name: "Jone",age: 24,gender: "male"}
	]; 
   var list = new Arm.ArrayList(data);
   list.set(1,{name:"Joy",work:"IT",country:"USA"});/*返回结果
                                                           [{name: "Tom",NO: 23,gender: "male"},
						            {name:"Joy",work:"IT",country:"USA"}, 
						            {name: "Jone",age: 24,gender: "male"}]*/

```

*update(origin, item)    
修改角标处数据

```javascript
   var data = [
	{name: "Tom",age: 23,gender: "male"},
	{name: "Lucy",age:19,gender: "female"}, 
	{name: "Joy",age: 24,gender: "male"}
	]; 
   var list = new Arm.ArrayList(data);
   list.update(list[0],{name:"Makle",age:26,gender:"male"});/*返回结果
                                                                [{name:"Makle",age:26,gender:"male"},
							         {name: "Lucy",age:19,gender: "female"}, 
						                 {name: "Joy",age: 24,gender: "male"}]*/

```

*insert(index, item)    
在index角标处，添加新的数据

```javascript
   var data = [
   {name: "Tom",NO: 23,gender: "male"},
   {name: "Lucy",age:19,gender: "female"}, 
   {name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.insert(0,{name:"Makle",age:26,gender:"male"}); /*返回的结果
                                                       [{name:"Makle",age:26,gender:"male"},
						        {name: "Tom",NO: 23,gender: "male"},
						        {name: "Lucy",age:19,gender: "female"}, 
						        {name: "Jone",age: 24,gender: "male"}]*/


```

*has(item, comparer)   
是否包含该数据，如果包含返回true，否则返回false

```javascript
   var data = [
   {name: "Tom",NO: 23,gender: "male"},
   {name: "Lucy",age:19,gender: "female"}, 
   {name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.has(list[2]);   //返回true

```
*contains(item, comparer)   
是否包含该数据，如果包含返回true，否则返回false

```javascript
   var data = [
   {name: "Tom",NO: 23,gender: "male"},
   {name: "Lucy",age:19,gender: "female"}, 
   {name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.contains(list[2]);   //返回true

```

*indexOf(item, from, comparer)   
返回传递参数的角标,from从什么地方顺时开始

```javascript
   var data = [
   {name: "Tom",NO: 23,gender: "male"},
   {name: "Lucy",age:19,gender: "female"}, 
   {name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.indexOf(list[2]);  //返回角标2
   //或
   var data = [
   {name: "Tom",NO: 23,gender: "male"},
   {name: "Lucy",age:19,gender: "female"}, 
   {name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.indexOf(new Arm.Model({name: "Tom",NO: 23,gender: "male"}),2); //返回角标0

```

*lastIndexOf(item, from, comparer)    
返回传递参数的角标,from从什么地方逆时开始

```javascript
   var data = [
   {name: "Tom",NO: 23,gender: "male"},
   {name: "Lucy",age:19,gender: "female"}, 
   {name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.lastIndexOf(list[2],1);  //返回-1，表示从角标1开始未找到符合数据
   //或
   var data = [
   {name: "Tom",NO: 23,gender: "male"},
   {name: "Lucy",age:19,gender: "female"}, 
   {name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.lastIndexOf(new Arm.Model({name: "Tom",NO: 23,gender: "male"}),2); //返回角标0

```

*each(iterator, scope)    
遍历list

```javascript
    var data = [
   {id:1,name: "Tom",NO: 23},
   {id:2,name: "Lucy",age:19}, 
   {id:3,name: "Jone",age: 24}
   ];
   var list = new Arm.ArrayList(data);
   list.each(function(i,item){console.log(item,i)});/*返回结果  
                                                     0 {id:1,name: "Tom",NO: 23}
						     1 {id:2,name: "Lucy",age:19}
                                                     2 {id:3,name: "Jone",age: 24}*/


```

*remove(start, end)   
删除从start到end的数据，返回的是被删除的数据,删除规则(包头不包尾)

```javascript
   var data = [
   {name: "Tom",NO: 23,gender: "male"},
   {name: "Lucy",age:19,gender: "female"}, 
   {name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.remove(0,2);  //返回结果[{name: "Tom",NO: 23,gender: "male"},{name: "Lucy",age:19,gender: "female"}]

```

*removeItem(item)    
删除传入的数据，返回被删除数据

```javascript
   var data = [
   {name: "Tom",NO: 23,gender: "male"},
   {name: "Lucy",age:19,gender: "female"}, 
   {name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.removeItem(list[0]);  //返回的结果[{name: "Tom",NO: 23,gender: "male"}]

```

*removeBy(attr, value)   
根据传入的参数删除对应组的数据，返回未删除数据

```javascript
   var data = [
   {name: "Tom",NO: 23,gender: "male"},
   {name: "Lucy",age:19,gender: "female"}, 
   {name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.removeBy("name","Tom"); //返回的结果[{name: "Lucy",age:19,gender: "female"},{name: "Jone",age: 24,gender: "male"}]

```

* removeById(id)   
根据传入的id删除数据 

```javascript
   var data = [
   {id:1,name: "Tom",NO: 23,gender: "male"},
   {id:2,name: "Lucy",age:19,gender: "female"}, 
   {id:3,name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.removeById(2); //返回结果[{id:1,name: "Tom",NO: 23,gender: "male"},{id:3,name: "Jone",age: 24,gender: "male"}]

```

*clear()    
清除所有数据

```javascript
   var data = [
   {id:1,name: "Tom",NO: 23,gender: "male"},
   {id:2,name: "Lucy",age:19,gender: "female"}, 
   {id:3,name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.clear();

```

*isEmpty()    
判断是否为空，如果为空返回true,否则返回false

```javascript
   var data = [
   {id:1,name: "Tom",NO: 23,gender: "male"},
   {id:2,name: "Lucy",age:19,gender: "female"}, 
   {id:3,name: "Jone",age: 24,gender: "male"}
   ];
   var list = new Arm.ArrayList(data);
   list.isEmpty();  //返回false

```

*empty()    
判断是否空，若为空返回[]，若不为空返回所有值

```javascript
   var data = [
   {id:1,name: "Tom",NO: 23},
   {id:2,name: "Lucy",age:19}, 
   {id:3,name: "Jone",age: 24}
   ];
   var list = new Arm.ArrayList(data);
   list.empty();   //返回结果[{id:1,name: "Tom",NO: 23},{id:2,name: "Lucy",age:19},{id:3,name: "Jone",age: 24}]

```

*clone()    
复制到新的数据

```javascript
   var data = [
   {id:1,name: "Tom",NO: 23},
   {id:2,name: "Lucy",age:19}, 
   {id:3,name: "Jone",age: 24}
   ];
   var list = new Arm.ArrayList(data);
   list.clone();  //返回结果[{id:1,name: "Tom",NO: 23},{id:2,name: "Lucy",age:19},{id:3,name: "Jone",age: 24}]

```

*toString()   
以对象的形式输出

```javascript
   var data = [
   {name: "Tom",NO: 23},
   {name: "Lucy",age:19}, 
   {name: "Jone",age: 24}
   ];
   var list = new Arm.ArrayList(data);
   list.toString(); //返回结果{"0":{"name":"Tom","NO":23},"1":{"name":"Lucy","age":19},"2":{"name":"Jone","age":24},"length":3}

```

*toArray()   
以数组的形式返回结果

```javascript
   var data = [
   {name: "Tom",NO: 23},
   {name: "Lucy",age:19}, 
   {name: "Jone",age: 24}
   ];
   var list = new Arm.ArrayList(data);
   list.toArray();  //返回结果[{name: "Tom",NO: 23},{name: "Lucy",age:19},{name: "Jone",age: 24}]

```

*format(keyMap, formater)   
修改某属性值

```javascript
   var data = [
   {name: "Tom",NO: 12},
   {name: "Lucy",age:19}, 
   {name: "Jone",age: 24}
   ];
   var list = new Arm.ArrayList(data);
   list.format("NO",function(){return 23}); //返回结果[{name: "Tom",NO: 23},{name: "Lucy",age:19},{name: "Jone",age: 24}]

```

*unique(comparer)   
去重，comparer是一个方法，可以根据自己设定的函数进行去重

```javascript
    var data = [
   {name: "Tom",NO: 23},
   {name: "Tom",NO: 23},
   {name: "Lucy",age:19}, 
   {name: "Jone",age: 24}
   ];
   var list = new Arm.ArrayList(data);
   list.unique();  //返回结果[{name: "Tom",NO: 23},{name: "Lucy",age:19}, {name: "Jone",age: 24}]

```

*uniqueBy(filed)   
根据传入的参数进行去重

```javascript
   var data = [
   {name: "Lucy",age:19},
   {name: "Tom", No: 23},
   {name: "Tom", No: 23}, 
   {name: "Jone",age: 23}
   ];
   var list = new Arm.ArrayList(data);
   list.uniqueBy('No'); //返回的结果[{name: "Lucy",age:19},{name: "Tom", No: 23},{name: "Jone",age: 23}]

```

*intersection(arr, comparer)   
比较两个集合，返回重复的数据,comparer是一个function(自定义比较器)

```javascript
   var data = [
   {name: "Lucy",age:19},
   {name: "Tom", No: 23},
   {name: "Jone",age: 23}
   ];
   var list = new Arm.ArrayList(data);
var num = [
   {ID:12,hobby:"swimming"},
   {ID:13,hobby:"basketball"},
   {name:"Jone",age: 23}
];
   var _list = new Arm.ArrayList(num);
   list.intersection(_list);  //返回结果[{name:"Jone",age: 23}]

```

*union(arr, comparer)    
取两个集合并集，重复的归一，comparer是一个function(自定义比较器)

```javascript
   var data = [
   {name: "Lucy",age:19},
   {name: "Tom", No: 23},
   {name: "Jone",age: 23}
   ];
   var list = new Arm.ArrayList(data);
var num = [
   {ID:12,hobby:"swimming"},
   {ID:13,hobby:"basketball"},
   {name:"Jone",age: 23}
];
   var _list = new Arm.ArrayList(num);
   list.union(_list); /*返回结果
                        [{name: "Lucy",age:19},
		        {name: "Tom", No: 23},
		        {{ID:12,hobby:"swimming"},{ID:13,hobby:"basketball"},{name:"Jone",age: 23}}]*/

```

*indexBy(filed)   
根据传入的参数，返回相应的值

```javascript
   var data = [
   {name: "Lucy",age:19},
   {name: "Tom", No: 23},
   {name: "Jone",age: 23}
   ];
   var list = new Arm.ArrayList(data);
   list.indexBy('No');//返回结果{23:{name:"Tom",No:23}}

```

*groupBy(filed)   
根据传入的参数进行分组

```javascript
   var data = [
   {name: "Lucy",age:19},
   {name: "Tom", No: 23},
   {name: "Jone",age: 23}
   ];
   var list = new Arm.ArrayList(data);
   list.groupBy('age');  //返回结果{19:[{name: "Lucy",age:19}],23:[{name: "Jone",age: 23}]}

```

*sortBy(filed, order)    
根据传入的值进行排序

```javascript
   var data = [
   {name: "Lucy",age:19},
   {name: "Tom", age:24},
   {name: "Jone",age:23}
   ];
   var list = new Arm.ArrayList(data);
   list.sortBy('age');  //返回的结果[{name: "Lucy",age:19},{name: "Jone",age:23},{name: "Tom", age:24}]

```

*orderBy(filed, order)   
根据传入的值进行排序

```javascript
   var data = [
   {name: "Lucy",age:19},
   {name: "Tom", age:24},
   {name: "Jone",age:23}
   ];
   var list = new Arm.ArrayList(data);
   list.orderBy('age');  //返回的结果[{name: "Lucy",age:19},{name: "Jone",age:23},{name: "Tom", age:24}]


```

*onFetch(data)   
fetch事件，配合fetch函数使用        
当执行完fetch函数后，会触发该事件，实现一些其他的效果 

```javascript
   var data = [
   {name: "Lucy",age:19},
   {name: "Tom", age:24},
   {name: "Jone",age:23}
   ];
   var list = new Arm.ArrayList(data);
   list.onFetch = function() {
        alert(1);
   };
   list.fetch('./list.json','get','12323'); /*返回结果
                                                  [{"name": "Arm","age": 20, "id": 1111, "value": 16},
					           {"name": "Backbone", "age": 25,"id": 2222, "value": 26},
					           {"name": "angularjs","age": 15, "id": 333,"value": 6}]*/


```

#### Model

```javascript
   var obj = {
   name:"Makle",
   age:23,
   ID:1656
   };
   var model = new Arm.Model(obj);
   model.keys();  //返回结果["name", "age", "ID"]

```

*update(key, value, options)
修改

```javascript
   var obj = {
   name:"Makle",
   age:23,
   ID:1656
   };
   var model = new Arm.Model(obj);
   model.update({name:"Tom",age:33,ID:233});
   model.values();  //返回的结果["Tom", 33, 233]

```

*equals(obj)
将传入的对象与指定的对象比较，并且与指定对象的序列相同，返回true

```javascript
   var item = {
   name:"Makle",
   age:23,
   ID:1656
   };
   var model = new Arm.Model(item);
   model.equals({name:"Makle",age:23,ID:1656}); //返回结果true

```

*fetch(url, type, data, handle)
替换相同属性的值，或添加到新属性，第三个形参并没有实际意义

```javascript
   var obj = {
   name:"Makle",
   age:23,
   ID:1656
   };
   var model = new Arm.Model(obj);
   model.fetch('./data.json','get','123131');  //返回结果{name: "Arm", age: 25,ID:1656, id: 1111, value: 56}

```

*onFetch    
fetch事件，配合fetch函数使用   
当执行完fetch函数后，会触发该事件，实现一些其他的效果    

```javascript
  var obj = {
   name:"Makle",
   age:23,
   ID:1656
   };
   var model = new Arm.Model(obj);
   model.onFetch = function() {
        alert(1);
   };
   model.fetch('./data.json','get','12323');

```

*inherits(Child, Parent, copy)与extend(first, obj, source)        
继承与重写

```javascript
   function Parent(options) {
    this.options = options || {
        word: 'parent_word'
    };
    this.name = 'parent_name';
    this.age = 'parent_age';
    this.arr = ['parent_arr'];
};
Parent.static = {
    a: 'a',
    b: [1, 2, 3]
}
Parent.prototype.getName = function() {
    return this.name + '_from_parent.';
};
Parent.prototype.getAge = function() {
    return this.age + '_from_parent.';
};
Parent.prototype.obj = { 'o1' : 'o1' };
function Child() {
    this.name = 'Jarry';
};
// 直接继承属性会被继承下来
Child.prototype.getName = function() {
    return this.name + '_from_child.';
}
Child.prototype.getAge = function() {
    return this.age + '_from_child.';
}
// Child.prototype直接赋值后，Parent.prototype后面更改都将影响实例
//Child.prototype = new Parent();
//inherits方法新定义function，故属性和之后追加的方法都不会受到影响
//Child = Arm._.inherits(Child, Parent);
// Child = 
Arm._.inherits(Child, Parent).extend({
    say: function() {
        console.log('hello', this.name);
        return 'hello ' + this.name + '';
    }
});
// 重写的父类影响子类
Parent.prototype.getName = function() {
    return this.name + '_from_parent_change.';
};
// 追加的父类方法影响子类
/*
Parent.prototype.say = function() {
    return this.name + '_say_from_parent_change.';
};*/
var child2 = new Child();
// inherits不会影响到属性里引用对象的变更，prototype方法如果是object，则会受到影响
if (child2.obj) {
    child2.obj.o2 = 'change_obj_111';
}
if (child2.arr) {
    child2.arr.push('change_arr_111');
}
child2.getName = function() {
    console.log('chhild2' + this.name);
}
var child1 = new Child();
test( "inherits", function() {
  equal(child1.say(), 'hello Jarry', "测试inherits." );
});

```

#### Create Module    
通过Arm.create()来创建, 传入类型与options     
明确name、子模块等

```javascript
   var ModuleTest = Arm.create('Module', {
    name: 'ModuleTest',
    version: '1.0.1',
    SubModule: {}
});

```

#### Create Action    
通过Arm.create()来创建, 传入类型与options   
明确name   
可以在options声明新方法，也可以覆盖get、run函数   

```javascript
   ModuleTest.Action = Arm.create('Action', {
	name: ‘ModuleTest.Action’,
	methodA: function() { 
	     // something   
              }
  });


```
##### Action的常用方法:    
+getModule(name) 获取Module        
+getInstance() 获取实例     
+getClass(name, options, isNew, type) 获取类名    
+getView(name, options, isNew) 获取View    
+getDao(name, options, isNew) 获取Dao    
+getUtil(name, options, isNew) 获取Util    
+getConfig(name, options, isNew) 获取Config        
+get(name, options, isNew, moduleInfo)    
+init() 初始化    
+run(name, options, instanceOption)    

#### Create View    
通过Arm.create()来创建, 传入类型与options    
明确name，从而找到模块名与action    
properties表示类的属性, options也是属性，在实例化是被覆盖。Options中至少要有$container或element    
bindEvent,run需要加上    

```javascript
var Mo = Arm.create('Module',{
     name:'Mo',
     Sub:{}
});
Mo.Action = Arm.create('Action',{name:'Mo.Action'});
Mo.View = Arm.create('View',{
    name:'Mo.View',
    show:function(){console.log("I'm a parent class!")}
});
Mo.Sub.View = Arm.create('View',{
    name:'Mo.Sub.View'
}).inherits(Mo.View);   //这里是一个模板之间的继承，会实现父的一些方法与属性,不会被覆盖
Mo.Action.get('Mo.View').show(); 


```

#### Create Class   
通过Arm.create()来创建, 传入类型与options    
明确action    
properties表示类的属性, options也是属性，在实例化是被覆盖    

```javascript
   ModuleTest.Class = Arm.create('Class', {
    name: ‘ModuleTest.Class’,
    properties: {},
    options: {
            dataList: Arm.create(‘ArrayList');
    }
});

```

##### Class的常用方法：    
+update(options, properties) 修改    
+extend(methods) 继承    
+getAction() 获取Action    
+getClass(name) 获取Class    
+getView(name) 获取View    
+getUtil(name) 获取Util    
+getConfig(name) 获取Config    
+getDao(Dao) 获取Dao   

#### Create Dao    
通过Arm.create()来创建, 传入类型与options    
明确module    
可以在options声明新方法，主要用于ajax传递    
每个业务都建议写一个Base模块，其中Base.Dao将会被所有的Dao继承    

```javascript
   ModuleTest.Dao = Arm.create('Dao', {
              name: ‘ModuleTest.Dao’,
              // extendBase: false, 
	methodA: function() {            
	     // something   
              }
});

```

#### Create Config/Util    
通过Arm.create()来创建, 传入类型与options    
Config与Util都是静态对象，且没有提供默认的方法    
也无需指定action, module，他们是为了统一以及继承Base.Config与Base.Util，以便扩展     

```javascript
   ModuleTest.Config = Arm.create('Config', {
        name: ‘ModuleTest.Config’,
        MESSAGE: {}  // 配置项 
   });
   ModuleTest.Util = Arm.create(‘Util', {
         name: ‘ModuleTest.Util’,
         MethodA: function() {} // 函数集合
   });


```
##### 以上以ModuleTest.XXX创建对应的对象，这样可以直接数据关联

#### Create Data

##### HashMap， 用在明确的Key-Value数据    

```javascript
   var item = { 
   id: 1001, type: 1, 
   name: "Edward", 
   value: 21, 
   age: 23 
   };
   var map = Arm.create('HashMap', item);

```
##### Model，某个JSON Object或前端自定模型     

```javascript
  var item = { 
   id: 1001, type: 1, 
   name: "Edward", 
   value: 21, 
   age: 23 
   };
   var model = Arm.create(Model', item);


```

##### ArrayList, JSON集合以及需要操作的数据, items的成员会自动转成Model    

```javascript
   var items = [
  { id: 1001, type: 1, name: "Edward", value: 21, age: 23 },
  { id: 1002, type: 2, name: "Sharpe"},
  { id: 1003, type: 3, name: "And", value: 4, age: 16},
  { id: 1004, type: 4, name: "The", value:null, age: 14 },
  { id: 1005, type: 5, name: "Magnetic", age: 45 },
  { id: 1006, type: 6, name: "Zeros", value: 37, age: 4 },
  { id: 1007, type: 7, name: "Jarry", value: 4, age: 16}
  ];
  var list = Arm.create('ArrayList', items);


```



