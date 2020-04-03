define(
    [
        'js/Simple',
        'js/Simple.Config',
        'js/Simple.Util',
        'js/Simple.Action',
        'js/Simple.Class',
        'js/Simple.OtherClass',
        'js/Simple.View',
        'js/Simple.Dao'
    ],
    function(o) {
        console.log('simple module loaded.', o)
        return o
    }
);