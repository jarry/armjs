armjs
=====
# Description:
** A lightweight, object-oriented JS framework for quickly creating clearly and structured web applications.
 *          <ol>
 *          <li>basic objects type: HashMap, ArrayList, Model</li>
 *          <li>built-in objects: Module, Util, Config, Action, Dao, Class, View</li>
 *          <li>create objects</li>
 *          <li>run action</li>
 *          </ol>

one javascript mvc framework for enterprise application
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
    
# usage

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
        module: 'Module'
    });
```
    3. create View
```JavaScript
    Module.View = Arm.create('View', {
        action: Module.Action,
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
        action: 'Module.Action',
        view: 'Module.view',
        properties: {
        
        },
        options: {
        
        }
    });
```
    4. create Dao
```JavaScript
    Module.Dao = Arm.create('Dao', {
        action: 'Module.Action',
        getName: function(data, callback) {
            // ajax
        }
    }); 
```

# speical
 
  ## tradition multi pages, such as struts of Java Web
  ## also support one page, likes backbone


# Example: 
```html
    <b> see demo and test, require jQuery, jQuery Tmpl, and Qunit </b>
```
