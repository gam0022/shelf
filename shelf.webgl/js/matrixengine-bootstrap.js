//------------------------------------------------------------------------------------------------------------
//
// MatrixEngine Bootstrap
// build number 1.0.20130326
//
//------------------------------------------------------------------------------------------------------------

function bootMatrixEngine (fileList) {
    var files = [
        'js/glMatrix-0.9.5.min.js',
        'js/webgl-utils.js',
        'js/matrixengine-core.js',
    ];
    
    if(fileList){
        files = files.concat(fileList);
    }
    
    var script;
    var item = document.getElementsByTagName('head').item(0);
    var i=0;
    
    var loadNext = function() {
        script = document.createElement('script');
        script.src = files[i];
        script.type = 'text/javascript';
        script.defer = true;
        script.onload = onScriptLoaded;
        item.appendChild(script);
    };
    
    var onScriptLoaded = function() {
        i++;
        if(i < files.length) {
            loadNext();
        }else if('onloadmatrixengine' in window) {
            window.onloadmatrixengine();
        }
    };
    
    loadNext();
};
