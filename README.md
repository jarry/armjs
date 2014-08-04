armjs
=====
# Description:
### A lightweight, object-oriented JS framework for quickly creating clearly and structured web applications.
*          <ol>
*          <li>basic objects type: HashMap, ArrayList, Model</li>
*          <li>built-in objects: Module, Util, Config, Action, Dao, Class, View</li>
*          <li>create objects</li>
*          <li>run action</li>
*          </ol>

## [armjs manual](/doc/ "参考手册")

## one javascript mvc framework for enterprise application
```JavaScript
    Arm._ = _;
    Arm.View = View;
    Arm.Action = Action;
    Arm.Class = Class;
    Arm.Dao = Dao;
    Arm.Util = Arm.Config = HashMap;
    Arm.Collection = Arm.ArrayList = ArrayList;
    Arm.Model = Model;
```

# structure
    Action -> View -> Class -> Dao -> Model
        
    # Module, defined module info
    # Action,  control some Object and instancing Class, View
    # View, DOM process and Event bind
    # Class, JSON parse, and service logic
    # Dao, ajax request
    # Model, JSON object or Object-Class
    # Config, JSON object, module config
    # Util, JSON object, static method list
    
# usage

## create object

    1. create Module
```JavaScript
    var Module = Arm.create('Module', {
        name: 'Module',
        SubModule: {}
    });
```
    2. create Action
```JavaScript
    Module.Action = Arm.create('Action', {
        name: 'Module.Action'
    });
```
    3. create View
```JavaScript
    Module.View = Arm.create('View', {
        name: 'Module.View',
        element: document,
        properties: {
        
        },
        options: {
        
        }
    });

    // XView
    Module.XView = Arm.create('View', {
        name: 'Module.XView',
        element: document,
        properties: {
        },
        options: {
        }
    });

    // SubModule.View
    Module.SubModule.XView = Arm.create('View', {
        name: 'Module.SubModule.XView',
        element: document,
        properties: {
        },
        options: {
        }
    });
```
    4. create Class
```JavaScript
    Module.Class = Arm.create('Class', {
        name: 'Module.Class',
        properties: {
        
        },
        options: {
        
        }
    });

    // XClass
    Module.XClass = Arm.create('Class', {
        name: 'Module.XClass',
        properties: {
        
        },
        options: {
        
        }
    });

    // SubModule.XClass
    SubModule.XClass = Arm.create('Class', {
        name: 'SubModule.XClass',
        properties: {
        
        },
        options: {
        
        }
        // hiherits from class 
    }).inherits(Module.XClass);
```
    4. create Dao
```JavaScript
    Module.Dao = Arm.create('Dao', {
        name: 'Module.Dao',
        getName: function(data, callback) {
            // ajax
        }
    });

    // XDao
    Module.XDao = Arm.create('Dao', {
        name: 'Module.XDao',
        // don no extend from Base module
        extendBase: false,
        getName: function(data, callback) {
            // ajax
        }
    }); 
```

## use instance
```JavaScript
    // extends
    Module.Action.get('Class').extend({});
    // run view
    Module.Action.run({});

    // TODO:
```

# speical
 
  ## tradition multi pages, such as struts of Java Web
  ## also support one page, likes backbone


# Example: 
```html
    <b> see demo and test, require jQuery, jQuery Tmpl, and Qunit </b>
```
