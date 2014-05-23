armjs
=====

one javascript mvc framework for enterprise application

    Arm._ = _;
    Arm.View = View;
    Arm.Action = Action;
    Arm.Class = Class;
    Arm.Dao = Dao;
    Arm.Util = Arm.Config = HashMap;
    Arm.Collection = Arm.ArrayList = ArrayList;
    Arm.Model = Model;
    
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
    var Module = Arm.create('Module', {
        name: 'Module',
        SubModule: {}
    });
    2. create Action
    Module.Action = Arm.create('Action', {
        module: 'Module'
    });
    3. create View
    Module.View = Arm.create('View', {
        action: Module.Action,
        element: document,
        properties: {
        
        },
        options: {
        
        }
    });
    4. create Class
    Module.Class = Arm.create('Class', {
        action: 'Module.Action',
        view: 'Module.view',
        properties: {
        
        },
        options: {
        
        }
    });
    4. create Dao
    Module.Dao = Arm.create('Dao', {
        action: 'Module.Action',
        getName: function(data, callback) {
            // ajax
        }
    }); 
           
# speical
 
  ## tradition multi pages, such as struts
  ## one page, likes backbone
