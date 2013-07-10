//------------------------------------------------------------------------------------------------------------
//
// MatrixEngine Core Program
// build number 1.0.20130523
//
//------------------------------------------------------------------------------------------------------------

var MxeProject = function() {
    this.contentsFile = null;
    this.contentsClass = null;
    this.controllerFile = null;
    this.controllerClass = null;
    this.requiredFiles = [];
};

var MxePlayer = function() {
    this.initialize.apply(this, arguments);
};

MxePlayer.prototype.initialize = function(canvas) {
    this.options = {
        imageSync: false,
        imageBulkLoad: true,
        controllFPS: true,
        normalizeTouchID: false,
        enableRuntimeIK: true,
    };
    
    this.project = null;
    this.canvas = canvas;
    /* test context lost
    this.canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(this.canvas);
    setTimeout(function(){ canvas.loseContextInNCalls(5); }, 10000);
    */
    
    this.touchIDNormalizer = new MxeTouchIDNormalizer(this);
    
    this.touchObjects = {length:0};
    
    this.onClickListenerCount = 0;
    this.contents = null;
    
    this.fpsElement = null;
    
    this.waitingImages = false;
    this.frameCount = 0;
    this.lastUpdate = 0.0;
    this.startTime = 0.0;

    this.glContextValid = false;
    this.render = new MxeRender(this);
    
    this.isSmartPhone = MxeUtil.detectSmartPhone();
    
    this.pauseStatus = 0; //0:none 1:request 2:paused
    
    var player = this;
    
    this.canvas.addEventListener(
        'touchstart',
        function(e) {
            //-------------------------------------------------
            e.preventDefault();
            if(player.options.normalizeTouchID){
                player.touchIDNormalizer.onTouchStart(e);
            }
            for(var i=0; i<e.changedTouches.length; i++){
                var id = e.changedTouches[i].identifier;
                if(player.options.normalizeTouchID){
                    id = player.touchIDNormalizer.normalize(id);
                }
                var touch = e.changedTouches[i];
                var sf = player.getCanvasScaleFactor();
                var mouseX = touch.pageX * sf;
                var mouseY = touch.pageY * sf;
                //-------------------------------------------------
                player.onMouseDownHandler(mouseX, mouseY, id, e.touches.length, e);
            }
        },
        false);
    var touchEndAndCancelListener = function(e){
        e.preventDefault();
        for(var i=0; i<e.changedTouches.length; i++){
            var id = e.changedTouches[i].identifier;
            if(player.options.normalizeTouchID){
                id = player.touchIDNormalizer.normalize(id);
            }
            var touchObject = player.getTouchObject(0);
            player.onMouseUpHandler(touchObject.mouseX, touchObject.mouseY, id, e.touches.length, e);
            player.deleteTouchObject(id);
        }
        if(player.options.normalizeTouchID){
            player.touchIDNormalizer.onTouchEnd(e);
        }
    };
    this.canvas.addEventListener(
        'touchend',
        touchEndAndCancelListener,
        false);
    this.canvas.addEventListener(
        'touchcancel',
        touchEndAndCancelListener,
        false);
    this.canvas.addEventListener(
        'touchmove',
        function(e) {
            e.preventDefault();
            for(var i=0; i<e.changedTouches.length; i++){
                var id = e.changedTouches[i].identifier;
                if(player.options.normalizeTouchID){
                    id = player.touchIDNormalizer.normalize(id);
                }
                var touch = e.changedTouches[i];
                var sf = player.getCanvasScaleFactor();
                var mouseX = touch.pageX * sf;
                var mouseY = touch.pageY * sf;
                player.onMouseMoveHandler(mouseX, mouseY, id, e.touches.length, e);
            }
        },
        false);
    this.canvas.addEventListener(
        'mousedown',
        function(e) {
            //-------------------------------------------------
            var rect = e.target.getBoundingClientRect();
            var sf = player.getCanvasScaleFactor();
            var mouseX = (e.clientX - rect.left) * sf;
            var mouseY = (e.clientY - rect.top) * sf;
            //-------------------------------------------------
            player.onMouseDownHandler(mouseX, mouseY, 0, 1, e);
        },
        false);
        
    var mouseUpListener = function(e) {
        //-------------------------------------------------
        var rect = e.target.getBoundingClientRect();
        var sf = player.getCanvasScaleFactor();
        var mouseX = (e.clientX - rect.left) * sf;
        var mouseY = (e.clientY - rect.top) * sf;
        //-------------------------------------------------
        player.onMouseUpHandler(mouseX, mouseY, 0, 1, e);
    };

    this.canvas.addEventListener(
        'mouseup',
        mouseUpListener,
        false);
    this.canvas.addEventListener(
        'mouseout',
        function(e) {
            var touchObject = player.getTouchObject(0);
            if(touchObject.mouseStatus === 1)
                mouseUpListener(e);
        },
        false);
    this.canvas.addEventListener(
        'mousemove',
        function(e) {
            //-------------------------------------------------
            var rect = e.target.getBoundingClientRect();
            var sf = player.getCanvasScaleFactor();
            var mouseX = (e.clientX - rect.left) * sf;
            var mouseY = (e.clientY - rect.top) * sf;
            //-------------------------------------------------
            player.onMouseMoveHandler(mouseX, mouseY, 0, 1, e);
        },
        false);
    
    this.canvas.addEventListener(
        'webglcontextlost',
        function(e) {
            e.preventDefault();
            player.glContextValid = false;
        },
        false);
    this.canvas.addEventListener(
        'webglcontextrestored',
        function(e) {
            MxeUtil.log("gl context restored."); 
            e.preventDefault();
            player.initGL();
            //player.animationFrame(player)();
            player.update();
        },
        false);
};

MxePlayer.prototype.createTouchObject = function(id) {
    var to = this.touchObjects[id] = {
        mouseStatus: 0, //1:down
        mouseX: 0,
        mouseY: 0,
        tagObject: {},
    };
    ++this.touchObjects.length;
    return to;
};

MxePlayer.prototype.deleteTouchObject = function(id) {
    delete this.touchObjects[id];
    --this.touchObjects.length;
    //TODO check length===touches.length
};

MxePlayer.prototype.getTouchObject = function(id) {
    var to = this.touchObjects[id];
    if(to) return to;
    return this.createTouchObject(id);
};

MxePlayer.prototype.getTouchTag = function(id) {
    if(! this.touchObjects[id]) return null;
    return this.touchObjects[id].tagObject;
};

MxePlayer.prototype.initGL = function() {
    var i, j;
    this.glContextValid = this.render.initGL();
    if(! this.glContextValid) return;
    var castArray = [
        this.contents.modelCasts,
        this.contents.textureCasts,
        this.contents.bitmapCasts,
        this.contents.textCasts,
        this.contents.movieCasts,
        this.contents.shaderCasts,
    ];
    var casts;
    for(i=0; i<castArray.length; i++){
        casts = castArray[i];
        for(j=0; j<casts.length; j++){
            if(casts[j] == null) continue;
            casts[j].initGL(this.render.gl);
        }
    }
};

MxePlayer.loadScriptQueue = [];

MxePlayer.registerContentsClass = function(contentsClass){
    var req = MxePlayer.loadScriptQueue[0];
    if(req)
        req.contentsClass = contentsClass;
};

MxePlayer.registerControllerClass = function(controllerClass){
    var req = MxePlayer.loadScriptQueue[0];
    if(req)
        req.controllerClass = controllerClass;
};

//for sequencial load
MxePlayer.loadScript = function(path, callback) {
    var item = document.getElementsByTagName('head').item(0);
    
    var loadExec = function(path_, onload_, onerror_){
        var script = document.createElement('script');
        script.src = path_;
        script.type = 'text/javascript';
        script.defer = true;
        script.onload = onload_;
        script.onerror = onerror_;
        item.appendChild(script);
    };
    
    var onError = function() {
        var req = MxePlayer.loadScriptQueue[0];
        var msg = "can't load script ";
        if(req)
            msg = msg + "'" + req.path + "'.";
        else 
            msg = msg + "'(unknown)'.";
        throw new MxeException("loadscript", msg);
    };
    
    var onLoad = function() {
        var result = MxePlayer.loadScriptQueue.shift();
        if(result.callback)
            result.callback(result);
        
        if(MxePlayer.loadScriptQueue.length > 0)
            loadNext();
    };
    
    var loadNext = function(){
        var req = MxePlayer.loadScriptQueue[0];
        loadExec(req.path, onLoad, onError);
    };
    
    MxePlayer.loadScriptQueue.push({ path: path, callback: callback });
    if(MxePlayer.loadScriptQueue.length === 1)
        loadNext();
}

MxePlayer.prototype.loadProject = function() {
    var loadCounter = 0;
    var requiredCounter = 0;
    var player = this;
    if(this.project.requiredFiles)
        requiredCounter+= this.project.requiredFiles.length;
    
    if(! this.project.contentsClass){
        if(window.MxeDefaultContents){
            this.project.contentsClass = window.MxeDefaultContents; //for legacy
        }else{
            if(! this.project.contentsFile){
                this.project.contentsFile = "js/matrixengine-contents.js"; //default
            }
            requiredCounter++;
        }
    }
    if(! this.project.controllerClass){
        if(this.project.controllerFile){
            requiredCounter++;
        }
    }

    var onLoad = function(result) {
        if(result.contentsClass){
            player.project.contentsClass = result.contentsClass;
        }
        if(result.controllerClass){
            player.project.controllerClass = result.controllerClass;
        }
        
        loadCounter++;
        if(loadCounter === requiredCounter)
            player.startPlay();
    };
    
    if(requiredCounter === 0){
        player.startPlay();
        return;
    }
    
    for(var i=0; i<this.project.requiredFiles.length; i++){
        MxePlayer.loadScript(this.project.requiredFiles[i], onLoad);
    }
    if(this.project.contentsFile)
        MxePlayer.loadScript(this.project.contentsFile, onLoad);
    if(this.project.controllerFile)
        MxePlayer.loadScript(this.project.controllerFile, onLoad);
    
    
};

MxePlayer.prototype.setProject = function(project) {
    if(this.project !== null){
        //TODO project jump
        //error
        MxeUtil.log("ERROR: player already has a project.");
        return;
    }
    this.project = project;
    
    /*
    if(this.contents !== null){
        //TODO project jump
        //error
        MxeUtil.log("ERROR: player already has a project.");
        return;
    }

    var contentsClass = project.contentsClass;
    if(contentsClass === null){
        contentsClass = MxeDefaultContents;
    }
    this.contents = new contentsClass(this);
    if(project.controllerClass !== null){
        this.contents.controller = new project.controllerClass(this.contents); 
    }
    */
    
};

MxePlayer.prototype.startPlay = function() {
    this.contents = new this.project.contentsClass(this);
    if(this.project.controllerClass !== null){
        this.contents.controller = new this.project.controllerClass(this.contents); 
    }

    this.initGL();
    
    if(this.options.imageBulkLoad)
        this.contents.loadAllImages();

    this.update();
};

MxePlayer.prototype.start = function() {
    this.loadProject();
};

MxePlayer.prototype.update = function(){
    if(this.options.imageSync && this.contents.countLoadingImages() > 0){
        this.loadingFrame(this)();
        return;
    }
    this.animationFrame(this)();
};

MxePlayer.prototype.pause = function(){
    if(this.pauseStatus === 0){
        this.pauseStatus = 1; //request pause
    }
};

MxePlayer.prototype.resume = function(){
    if(this.pauseStatus === 2 || this.pauseStatus === 1){ //paused or request pause
        this.pauseStatus = 0;
        this.update();
    }
};

MxePlayer.prototype.makeFrame = function() {
    var i;
    var scoreLength = this.contents.scores.length;
    for(var i=0; i<scoreLength; i++)
        this.contents.scores[i].makeFrame(-1);
};

MxePlayer.prototype.prepareRender = function() {
    this.render.render3D.currentCameraTrack = null;
    this.render.render3D.clearLightList();
    this.render.render3D.clearRenderList();
    this.render.render2D.clearRenderList();
    var i;
    var scoreLength = this.contents.scores.length;
    
    //depth-first search
    this.contents.scores[0].prepareRender(this.render, this.options.enableRuntimeIK);
    
    this.render.prepare();
    for(var i=0; i<scoreLength; i++)
        this.contents.scores[i].applyCamera(this.render.render3D.viewMatrix);
};

MxePlayer.prototype.enterFrame = function() {
    var me = new MxeEvent(null);
    var score;
    for(var i=0; i<this.contents.scores.length; i++){
        score = this.contents.scores[i];
        score.onEnterFrameHandler(me);
    }
};

MxePlayer.prototype.exitFrame = function() {
    this.render.validSelectionBuffer = false;
    var score;
    var me = new MxeEvent(null);
    for(var i=0; i<this.contents.scores.length; i++){
        score = this.contents.scores[i];
        score.onExitFrameHandler(me);
    }
};

MxePlayer.prototype.drawScene = function() {
    this.render.drawScene(MxeRender.def.RM_DEFAULT);
};

MxePlayer.prototype.loadingFrame = function(player) {
    return function(){
        if(player.pauseStatus === 1 || player.pauseStatus === 2){ //request pause or paused
            player.pauseStatus = 2;
            return;
        }
        if(player.options.imageSync && player.contents.countLoadingImages() > 0){
            requestAnimFrame(player.loadingFrame(player));
        }else{
            requestAnimFrame(player.animationFrame(player));
        }
    };
}

MxePlayer.prototype.animationFrame = function(player) {
    return function(){
        if(player.glContextValid){
            player.mainTask();
            if(player.pauseStatus === 1 || player.pauseStatus === 2){ //request pause or paused
                player.pauseStatus = 2;
                return;
            }
            requestAnimFrame(player.animationFrame(player));
            //var loopInterval = setTimeout(player.animationFrame(player),
            //                   1000 / 30.0);
        }
    };
};

MxePlayer.prototype.updateViewport = function(){
    this.render.updateViewport();
};

MxePlayer.prototype.checkTime = function() {
    var result = false;
    if(this.frameCount === 0){
        result = true;
        this.startTime = this.lastUpdate = (new Date()).getTime();
    }else{
        var now = (new Date()).getTime();
        var past = now - this.lastUpdate;
        var frameTime = 0.0;
        if(this.options.controllFPS) frameTime = 1000.0/this.contents.frameRate;
        var diff = frameTime - past;
        if(diff <= 0){
            result = true;
            this.lastUpdate = now + Math.max(diff, -frameTime);
            this.updateFPS(now);
        }
    }
    return result;
};

MxePlayer.prototype.getTime = function() {
    return this.lastUpdate-this.startTime;
};

MxePlayer.prototype.mainTask = function() {
    if(! this.checkTime()) return;
    if(! this.waitingImages){
        this.updateViewport();
        this.makeFrame();
        this.enterFrame();
        this.prepareRender();
    }
    if(this.options.imageSync && this.contents.countLoadingImages() > 0){
        this.waitingImages = true;
        return;
    }
    this.waitingImages = false;
    this.drawScene();
    this.exitFrame();
    this.frameCount++;
};

MxePlayer.prototype.getCanvasScaleFactor = function (){
    return this.canvas.width/this.canvas.clientWidth;
};

MxePlayer.prototype.onMouseDownHandler = function(mouseX, mouseY, id, touchCount, e) {
    /* test context lost
    //this.canvas.loseContext();
    this.canvas.setRestoreTimeout(5000);  // recover in 5 seconds
    */
    if(this.contents === null) return;
    
    if(this.onClickListenerCount > 0){
        var selectionID = this.render.getSelectionID(mouseX, mouseY);
        var renderItem = this.render.getRenderItemBySelectionID(selectionID);
        if(renderItem === null){
            //no object or error
        }else{
            /*
            MxeUtil.log("-------");
            MxeUtil.log('('+mouseX+','+mouseY+')'+pix[0]+','+pix[1]+','+pix[2]+','+pix[3]);
            MxeUtil.log("selectionID="+selectionID);
            MxeUtil.log("sector="+renderItem[1].index);
            MxeUtil.log("track="+renderItem[2].index);
            */
            var me;
            var track;
            if(renderItem[0] === 0){ //CT_MODEL
                track = renderItem[2][0];
                if(track.boneInfo !== null) track = track.boneInfo.modelTrack;
                me = new MxeEvent(e);
                me.sector = renderItem[1];
                me.x = mouseX;
                me.y = mouseY;
                track.onClickHandler(me);
            }else if(renderItem[0] === 1){ //CT_TEXTURE(billboard)
                track = renderItem[1];
                me = new MxeEvent(e);
                me.x = mouseX;
                me.y = mouseY;
                track.onClickHandler(me);
            }else if(renderItem[0] === 2 || renderItem[0] === 3 || renderItem[0] === 29){ //CT_BITMAP, CT_TEXT, CT_PROCEDURAL
                track = renderItem[1];
                me = new MxeEvent(e);
                me.x = mouseX;
                me.y = mouseY;
                track.onClickHandler(me);
            }else{
                //not support
            }
        }
    }    

    var touchObject = this.getTouchObject(id);
    touchObject.mouseStatus = 1;
    touchObject.mouseX = mouseX;
    touchObject.mouseY = mouseY;
    
    var mouseDownEvent = new MxeEvent(e);
    mouseDownEvent.x = mouseX;
    mouseDownEvent.y = mouseY;
    mouseDownEvent.touchID = id;
    mouseDownEvent.touchTag = touchObject.tagObject;
    mouseDownEvent.touchCount = touchCount;
    
    for(var i=0; i<this.contents.scores.length; i++){
        this.contents.scores[i].onMouseDownHandler(mouseDownEvent);
    }
};

MxePlayer.prototype.onMouseUpHandler = function(mouseX, mouseY, id, touchCount, e) {
    if(this.contents === null) return;
    
    var mouseUpEvent = new MxeEvent(e);
    var touchObject = this.getTouchObject(id);
    mouseUpEvent.x = mouseX;
    mouseUpEvent.y = mouseY;
    mouseUpEvent.touchID = id;
    mouseUpEvent.touchTag = touchObject.tagObject;
    mouseUpEvent.touchCount = touchCount;
    touchObject.mouseStatus = 0;

    for(var i=0; i<this.contents.scores.length; i++){
        this.contents.scores[i].onMouseUpHandler(mouseUpEvent);
    }
};

MxePlayer.prototype.onMouseMoveHandler = function(mouseX, mouseY, id, touchCount, e) {
    if(this.contents === null) return;
    
    var mouseMoveEvent = new MxeEvent(e);
    var touchObject = this.getTouchObject(id);
    mouseMoveEvent.x = mouseX;
    mouseMoveEvent.y = mouseY;
    mouseMoveEvent.touchID = id;
    mouseMoveEvent.touchTag = touchObject.tagObject;
    mouseMoveEvent.touchCount = touchCount;
    touchObject.mouseX = mouseX;
    touchObject.mouseY = mouseY;
    
    for(var i=0; i<this.contents.scores.length; i++){
        this.contents.scores[i].onMouseMoveHandler(mouseMoveEvent);
    }
};

MxePlayer.prototype.addEventListener = function(eventType, listener, userObj) {
    var func = this.addEventListenerFuncs[eventType];
    if(func === undefined) return false;
    func.apply(this, [listener, userObj]);
    return true;
};

MxePlayer.prototype.addOnMouseDownListener = function(listener, userObj) {
    if(this.onMouseDownListeners === null){
        this.onMouseDownListeners = new Array();
    }
    this.onMouseDownListeners.push([listener, userObj]);
};

MxePlayer.prototype.addOnMouseUpListener = function(listener, userObj) {
    if(this.onMouseUpListeners === null){
        this.onMouseUpListeners = new Array();
    }
    this.onMouseUpListeners.push([listener, userObj]);
};

MxePlayer.prototype.addOnMouseMoveListener = function(listener, userObj) {
    if(this.onMouseMoveListeners === null){
        this.onMouseMoveListeners = new Array();
    }
    this.onMouseMoveListeners.push([listener, userObj]);
};

MxePlayer.prototype.showFPS = function() {
    if(this.fpsElement !== null) return;
    this.fpsElement = document.createElement('span');
    //this.fpsElement.id = "id";
    this.fpsElement.innerHTML = "FPS:00.00";
    this.fpsElement.style.backgroundColor = '#000088';
    this.fpsElement.style.color = '#ccccdc';
    this.fpsElement.style.position = "absolute";
    this.fpsElement.style.top = this.canvas.offsetTop;
    this.fpsElement.style.left = this.canvas.offsetLeft;
    this.fpsElement.style.zIndex = 0;
    var parent = this.canvas.offsetParent;
    //var parent = document.getElementsByTagName("body").item(0);
    parent.appendChild(this.fpsElement);
    
    this.fpsElement.fpsAvrTime = 0.0;
    this.fpsElement.fpsPreTime = (new Date()).getTime();
    this.fpsElement.fpsUpdateCounter = 0;
};

MxePlayer.prototype.hideFPS = function() {
    if(this.fpsElement === null) return;
    var parent = this.canvas.offsetParent;
    parent.removeChild(this.fpsElement);
    this.fpsElement = null;
};

MxePlayer.prototype.updateFPS = function(nowTime) {
    if(this.fpsElement === null) return;
    var diffTime = nowTime - this.fpsElement.fpsPreTime;
    this.fpsElement.fpsAvrTime = this.fpsElement.fpsAvrTime*0.9 + diffTime*0.1;
    this.fpsElement.fpsPreTime = nowTime;
    if(this.fpsElement.fpsUpdateCounter === 30){
        this.fpsElement.fpsUpdateCounter = 0;
        var fps = 0.0;
        if(this.fpsElement.fpsAvrTime > 0.0){
            fps = 1000/this.fpsElement.fpsAvrTime;
            fps = Math.round(fps*100)/100;
        }
        this.fpsElement.innerHTML = "FPS:"+fps;
    }
    this.fpsElement.fpsUpdateCounter++;
};

//TODO remove listener


var MxeCast = function () {
    this.initialize.apply(this, arguments);
};

MxeCast.prototype.initialize = function(contents, index, label) {
    this.contents = contents;
    this.index = index;
    this.label = label;
    this.tag = 0;
    this.castType = -1;
};

MxeCast.def = {
    // cast type ID
    CT_MODEL       : 0,
    CT_TEXTURE     : 1,
    CT_BITMAP      : 2,
    CT_TEXT        : 3,
    CT_WAVE        : 4,
    CT_MIDI        : 5,
    CT_SCRIPT      : 6,
    CT_CAMERA      : 7,
    CT_LIGHT       : 8,
    CT_AVI         : 9,
    CT_LINK        : 10,
    CT_3DSOUND     : 11,
    CT_WAVEEX      : 12,
    CT_LISTENER    : 13,
    CT_AVICTRL     : 14,
    CT_MATERIAL    : 15,
    CT_AVIBILL     : 16,
    CT_BILTEXANM   : 17,
    CT_TEXNUMANM   : 18,
    CT_MODELWRAP   : 19,
    CT_MODELNUM    : 20,
    CT_TRANSFORM   : 21,
    CT_LOOPTRACK   : 22,
    CT_FREEBITMAP  : 23,
    CT_SHADER      : 24,
    CT_BMPBILL     : 25,
    CT_PARTICLE    : 26,
    CT_RESOURCE    : 27,
    CT_METACAST    : 28,
    CT_PROCEDURAL  : 29,
    CT_PROCEDURAL3D: 30,
};

MxeCast.prototype.prepareRender = function(render, frame) {
};

var MxeContents = function() {
    this.initialize.apply(this, arguments);
};

MxeContents.prototype.initialize = function() {
    this.player = null;
    this.controller = null;
    this.backgroundColor = null;
    this.modelCasts = null;
    this.modelCastsL = null;
    this.cameraCasts = null;
    this.cameraCastsL = null;
    this.textureCasts = null;
    this.textureCastsL = null;
    this.bitmapCasts = null;
    this.bitmapCastsL = null;
    this.textCasts = null;
    this.textCastsL = null;
    this.proceduralCasts = null;
    this.proceduralCastsL = null;
    this.movieCasts = null;
    this.movidCastsL = null;
    this.shaderCasts = null;
    this.shaderCastsL = null;
    this.scores = null;
    this.scoresL = null;
    
    //contents properties
    this.frameRate = 0.0;
    this.presetWidth = 0;
    this.presetHeight = 0;
};

MxeContents.prototype.loadAllImages = function() {
    var i;
    var cast;
    for(i=0; i<this.textureCasts.length; i++){
        cast = this.textureCasts[i];
        if(cast == null) continue;
        cast.prepare();
    }
    for(i=0; i<this.bitmapCasts.length; i++){
        cast = this.bitmapCasts[i];
        if(cast == null) continue;
        cast.prepare();
    }
};

MxeContents.prototype.countLoadingImages = function() {
    var i;
    var result = 0;
    var cast;
    for(i=0; i<this.textureCasts.length; i++){
        cast = this.textureCasts[i];
        if(cast == null) continue;
        if(cast.prepareStatus === 1) result++; //preparing now
    }
    for(i=0; i<this.bitmapCasts.length; i++){
        cast = this.bitmapCasts[i];
        if(cast == null) continue;
        if(cast.prepareStatus === 1) result++; //preparing now
    }
    return result;
};

var MxeRender2D = function() {
    this.initialize.apply(this, arguments);
};

MxeRender2D.prototype.initialize = function(render) {
    this.render = render;
    this.gl = null;
    this.backRenderList = [];
    this.backRenderCount = 0;
    this.frontRenderList = [];
    this.frontRenderCount = 0;
    this.vertBuffer = null;
    this.uvBuffer = null;
    this.indexBuffer = null;
    this.pMatrix = mat4.create();
    mat4.identity(this.pMatrix);
    this.vMatrix = mat4.create();
    mat4.identity(this.vMatrix);
    this.textureUVMargin = new Float32Array(2);
    this.textureUVScale = new Float32Array(2);
    this.shaderRequestOptions = new MxeShaderRequestOptions();
    this.shaderRequestOptions.useLighting = false;
    this.ofsCanvas = null;
    this.ofsContext = null;
    this.polygonColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);
    this.transparentColor = new Float32Array([0, 0, 0, 0]);
};

MxeRender2D.prototype.initGL = function(gl) {
    this.gl = gl;
    var x1 = -1.0;
    var x2 = 1.0;
    var y1 = -1.0;
    var y2 = 1.0;
    var vertices;
    this.vertBuffer = gl.createBuffer();
    if(this.vertBuffer !== null){
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
        vertices = [ x1, y1, 0.0, x2, y1, 0.0, x2, y2, 0.0, x1, y2, 0.0 ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.vertBuffer.itemSize = 3;
        this.vertBuffer.numItems = 4;
    }
    
    this.uvBuffer = gl.createBuffer();
    if(this.uvBuffer !== null){
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        vertices = [ 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0 ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.uvBuffer.itemSize = 2;
        this.uvBuffer.numItems = 4;
    }
    
    this.indexBuffer = gl.createBuffer();
    if(this.indexBuffer !== null){
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        //var indices = [ 0, 1, 3, 2 ];
        var indices = [ 3, 1, 0, 1, 3, 2 ];
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        this.indexBuffer.itemSize = 1;
        this.indexBuffer.numItems = 6;
    }
};

MxeRender2D.prototype.clearRenderList = function() {
    this.backRenderCount = 0;
    this.frontRenderCount = 0;
};

MxeRender2D.prototype.addBackRenderList = function(renderList) {
    for(var i=0; i<renderList.length; i++){
        this.backRenderList[this.backRenderCount++] = renderList[i];
    }
};

MxeRender2D.prototype.addFrontRenderList = function(renderList) {
    for(var i=0; i<renderList.length; i++){
        this.frontRenderList[this.frontRenderCount++] = renderList[i];
    }
};

MxeRender2D.prototype.prepare = function() {
};

MxeRender2D.prototype.getOffscreenContext = function() {
    if(this.ofsCanvas) return this.ofsContext;
    this.createOffscreenCanvas(256, 256);
    this.ofsContext = this.ofsCanvas.getContext("2d");
    return this.ofsContext;
};

MxeRender2D.prototype.createOffscreenCanvas = function(w, h) {
    this.ofsCanvas = document.createElement("canvas");
    this.resizeOffscreenCanvas(w, h);
};

MxeRender2D.prototype.resizeOffscreenCanvas = function(w, h) {
    this.ofsCanvas.width = w;
    this.ofsCanvas.height = h;
    //this.ofsContext = this.ofsCanvas.getContext("2d");
};

MxeRender2D.prototype.drawBackRenderList = function(renderMode, selectionOffset) {
    for(var i=0; i<this.backRenderCount; i++){
        this.drawItem(this.backRenderList[i], renderMode, i+selectionOffset);
    }
    return this.backRenderCount;
};

MxeRender2D.prototype.drawFrontRenderList = function(renderMode, selectionOffset) {
    for(var i=0; i<this.frontRenderCount; i++){
        this.drawItem(this.frontRenderList[i], renderMode, i+selectionOffset);
    }
    return this.frontRenderCount;
};

MxeRender2D.prototype.setAlphaBlend = function(frame, renderMode) {
    var gl = this.gl;
    if(renderMode === MxeRender.def.RM_SELECTION){
        gl.disable(gl.BLEND);
        return;
    }
    var cast = frame.cast;
    if(! cast.alphaBlendable){
        gl.disable(gl.BLEND);
        return;
    }
    var useBlend =
        frame.useBlending ||
        (cast.castType === MxeCast.def.CT_TEXT) ||
        frame.alpha < 1.0 ||
        (cast.alphaType !== 0);
    if(useBlend){
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(
            frame.blendFactorSrc,
            frame.blendFactorDst,
            frame.blendFactorAlphaSrc,
            frame.blendFactorAlphaDst);
    }else{
        gl.disable(gl.BLEND);
    }
};

MxeRender2D.prototype.setScissor = function(frame, renderMode) {
    var gl = this.gl;
    if(frame.clippingMode === 0){
        gl.disable(gl.SCISSOR_TEST);
        return;
    }
    if(frame.clippingMode === 1){ //world mode
        var left = frame.clippingRect[0];
        var top = frame.clippingRect[1];
        var right = frame.clippingRect[2];
        var bottom = frame.clippingRect[3];
        gl.scissor(left, this.render.viewportHeight-bottom, right-left, bottom-top);
        gl.enable(gl.SCISSOR_TEST);
        return;
    }
    if(frame.clippingMode === 2){ //local mode
        //TODO
        gl.disable(gl.SCISSOR_TEST);
        return;
    }
    gl.disable(gl.SCISSOR_TEST);
};

MxeRender2D.prototype.drawItem = function(renderItem, renderMode, selectionID) {
    this.drawFrame(renderItem[1].frame, renderMode, selectionID);
};

MxeRender2D.prototype.drawFrame = function(frame, renderMode, selectionID) {
    if(this.vertBuffer === null) return;
    if(! frame.worldVisible) return;
    if(renderMode !== MxeRender.def.RM_SELECTION && frame.alpha === 0.0) return;
    
    var cast = frame.cast;
    if(cast === null) return;
    
    if(cast.onDraw){ //PRPCEDURAL
        cast.onDraw(this.render, frame, renderMode, selectionID);
        return;
    }
    
    if(! cast.getPrepared()) return;
    if(! cast.glTexture) return;
    
    var gl = this.gl;
    
    this.shaderRequestOptions.renderMode = renderMode;
    if(frame.enableTransparentDiscard)
        this.shaderRequestOptions.alphaType = cast.alphaType;
    else
        this.shaderRequestOptions.alphaType = cast.alphaType & 2;
    var isText = this.shaderRequestOptions.isText = (cast.castType == MxeCast.def.CT_TEXT);
    var shaderProgram = this.render.requestShaderProgram(this.shaderRequestOptions);
    this.render.setShaderProgram(shaderProgram);
    
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.depthMask(false);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, cast.glTexture);
    gl.uniform1i(shaderProgram.uniforms.uTexture0, 0);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, frame.magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, frame.minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, frame.wrap_s);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, frame.wrap_t);
    
    //set bufferes
               
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
    gl.enableVertexAttribArray(shaderProgram.attributes.atVertex);
    gl.vertexAttribPointer(shaderProgram.attributes.atVertex, this.vertBuffer.itemSize, gl.FLOAT, false, 0, 0);

    //if(shaderProgram.attributes.atNormal > -1){
    //    gl.disableVertexAttribArray(shaderProgram.attributes.atNormal);
    //}
    
    if(shaderProgram.attributes.atUV[0] > -1){
        gl.enableVertexAttribArray(shaderProgram.attributes.atUV[0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.vertexAttribPointer(shaderProgram.attributes.atUV[0], this.uvBuffer.itemSize, gl.FLOAT, false, 0, 0);
    }
    
    //if(shaderProgram.attributes.atWeight0 > -1){
    //    gl.disableVertexAttribArray(shaderProgram.attributes.atWeight0);
    //}
    //if(shaderProgram.attributes.atWeight1 > -1){
    //    gl.disableVertexAttribArray(shaderProgram.attributes.atWeight1);
    //}
    //if(shaderProgram.attributes.atVColor > -1){
    //    gl.disableVertexAttribArray(shaderProgram.attributes.atVColor);
    //    if(shaderProgram.uniforms.uEnableVColor !== null){
    //        gl.uniform1i(shaderProgram.uniforms.uEnableVColor, 0);
    //    }
    //}
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    
    gl.uniform1i(shaderProgram.uniforms.uBlendMode[0], 1);
    gl.uniformMatrix4fv(shaderProgram.uniforms.uProjMatrix, false, this.pMatrix);
    gl.uniformMatrix4fv(shaderProgram.uniforms.uViewMatrix, false, this.vMatrix);
    gl.uniform1i(shaderProgram.uniforms.uNBlend, 0);
    
    gl.uniformMatrix4fv(shaderProgram.uniforms.uWorldMatrix, false, frame.viewMatrix);
    
    if(shaderProgram.uniforms.uFogStart !== null){
        gl.uniform1f(shaderProgram.uniforms.uFogStart, 0.0);
    }
    if(shaderProgram.uniforms.uFogEnd !== null){
        gl.uniform1f(shaderProgram.uniforms.uFogEnd, 0.0);
    }
    if(shaderProgram.uniforms.uFogFactor !== null){
        gl.uniform1f(shaderProgram.uniforms.uFogFactor, 0.0);
    }
    if(shaderProgram.uniforms.uEnableVColor !== null){
        gl.uniform1i(shaderProgram.uniforms.uEnableVColor, 0);
    }
    if(renderMode === MxeRender.def.RM_SELECTION){
        /*
        //32bit case
        var sred =   ((selectionID >> 16))/255.0;
        var sgreen = (((selectionID >> 8) & 0xff))/255.0;
        var sblue =  ((selectionID & 0xff))/255.0;
        gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [sred, sgreen, sblue, 1.0]);
        */
        //16bit case
        if(selectionID > 0xffff){
            //error overflow
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [1.0, 1.0, 1.0, 1.0]);
        }else{
            var sa = (( selectionID >> 12)       )/15.0;
            var sb = (((selectionID >> 8 ) & 0xf))/15.0;
            var sg = (((selectionID >> 4 ) & 0xf))/15.0;
            var sr = (( selectionID        & 0xf))/15.0;
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [sr, sg, sb, sa]);
        }
    }else{
        if(isText){
            gl.uniform4fv(shaderProgram.uniforms.uTextColor, cast.color);
            if(cast.bgTransparent){
                this.transparentColor[0] = cast.color[0];
                this.transparentColor[1] = cast.color[1];
                this.transparentColor[2] = cast.color[2];
                gl.uniform4fv(shaderProgram.uniforms.uTextBgColor, this.transparentColor);
            }else{
                gl.uniform4fv(shaderProgram.uniforms.uTextBgColor, cast.backgroundColor);
            }
        }
        if(shaderProgram.uniforms.uMatDiffuse !== null){
            this.polygonColor[3] = frame.alpha;
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, this.polygonColor);
        }
    }
    
    if(shaderProgram.uniforms.uTextureMargin[0] !== null){
        this.textureUVMargin[0] = 0.0;
        this.textureUVMargin[1] = 0.0;
        gl.uniform2fv(shaderProgram.uniforms.uTextureMargin[0], this.textureUVMargin);
    }
    if(shaderProgram.uniforms.uTextureScale[0] !== null){
        this.textureUVScale[0] = cast.getWidth() / cast.textureWidth;
        this.textureUVScale[1] = cast.getHeight() / cast.textureHeight;
        gl.uniform2fv(shaderProgram.uniforms.uTextureScale[0], this.textureUVScale);
    }

    this.setAlphaBlend(frame, renderMode);
    this.setScissor(frame, renderMode);
    gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

};

var MxeRender3D = function() {
    this.initialize.apply(this, arguments);
};

MxeRender3D.prototype.initialize = function(render) {
    this.render = render;
    this.gl = null;
    this.renderList = [];
    this.renderCount = 0;
    this.alphaRenderList = [];
    this.alphaRenderCount = 0;
    this.lightList = [];
    this.lightCount = 0;
    this.currentCameraTrack = null;
    this.projMatrix = mat4.create();
    this.viewProjMatrix = mat4.create();
    //this.viewMatrix = mat4.create();
    this.viewMatrix = mat4.create();
    this.identityMatrix = mat4.create();
    mat4.identity(this.identityMatrix);
    //this.identityMatrix[10] = -1.0;
    this.workMatrix = mat4.create();
    this.workVector = new Float32Array(4);
    this.workPole = new Int8Array(3);
    this.textureUVMargin = new Float32Array(2);
    this.textureUVScale = new Float32Array(2);
    this.clipBoxes = new Array(2); //for clipping work
    this.shaderOptions = new MxeShaderRequestOptions();
    //for shader--
    this.blendMatricesBuffer = new Float32Array((MxeRender.def.MAX_BONE-1)*16);
    this.lightTypeBuffer = new Int32Array(MxeRender.def.MAX_LIGHT);
    this.lightColBuffer = new Float32Array(MxeRender.def.MAX_LIGHT*3);
    //this.lightMatricesBuffer = new Float32Array(MxeRender.def.MAX_LIGHT*16);
    this.lightDirBuffer = new Float32Array(MxeRender.def.MAX_LIGHT*3);
    this.lightPosBuffer = new Float32Array(MxeRender.def.MAX_LIGHT*3);
    this.lightAmbient = new Float32Array(3);
    this.lightAtt0Buffer = new Float32Array(MxeRender.def.MAX_LIGHT);
    this.lightAtt1Buffer = new Float32Array(MxeRender.def.MAX_LIGHT);
    this.lightAtt2Buffer = new Float32Array(MxeRender.def.MAX_LIGHT);
    this.lightRangeBuffer = new Float32Array(MxeRender.def.MAX_LIGHT);
    this.spotExpBuffer = new Float32Array(MxeRender.def.MAX_LIGHT);
    this.spotCutOffBuffer = new Float32Array(MxeRender.def.MAX_LIGHT);
    this.cameraPos = new Float32Array(3); //camera pos dummy
    //--for shader
    
    //init billboard model
    this.initBillboardModel();
};

MxeRender3D.prototype.initBillboardModel = function() {
    this.billboardModel = new MxeModel(null, -1, "BillboadModel");
    this.billboardModel.sectors = new Array(1);
    this.billboardModel.sectorsL = {};
    var bbsector;
    this.billboardModel.sectors[0] = this.billboardModel.sectorsL["g0"] = bbsector = new MxeSector(this.billboardModel, 0, "g0");
    bbsector.vertexSrc = {
        position: new Float32Array([-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, -0.5, 0.5, 0.0, 0.5, 0.5, 0.0,]),
        normal: new Float32Array([0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,]),
        texture: [new Float32Array([0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0,])],
        index: new Uint16Array([2, 3, 1, 2, 1, 0,]),
    };
    bbsector.indexLength = 6;
    bbsector.boxMin = new Float32Array([-0.5, -0.5, 0.0]);
    bbsector.boxMax = new Float32Array([0.5, 0.5, 0.0]);
    this.billboardRenderItem = [0, bbsector, [null]];
};

MxeRender3D.prototype.initGL = function(gl) {
    this.gl = gl;
    this.billboardModel.initGL(gl);
};

MxeRender3D.prototype.clearRenderList = function() {
    this.renderCount = 0;
    this.alphaRenderCount = 0;
};

MxeRender3D.prototype.addRenderList = function(renderList) {
    for(var i=0; i<renderList.length; i++){
        if(this.getItemAlphaType(renderList[i]) < 2){
            this.renderList[this.renderCount++] = renderList[i];
        }else{
            this.alphaRenderList[this.alphaRenderCount++] = renderList[i];
        }
    }
};

MxeRender3D.prototype.clearLightList = function() {
    this.lightCount = 0;
    this.lightAmbient[0] = this.lightAmbient[1] = this.lightAmbient[2] = 0.0;
    for(var i=0; i<MxeRender.def.MAX_LIGHT; i++){
        this.lightTypeBuffer[i] = 0;
    }
};

MxeRender3D.prototype.addLight = function(track) {
    var lightFrame = track.frame;
    var light = lightFrame.cast;
    if(light.type === 3){
        this.lightAmbient[0]+= light.color[0];
        if(this.lightAmbient[0] > 1.0) this.lightAmbient[0] = 1.0;
        this.lightAmbient[1]+= light.color[1];
        if(this.lightAmbient[1] > 1.0) this.lightAmbient[1] = 1.0;
        this.lightAmbient[2]+= light.color[2];
        if(this.lightAmbient[2] > 1.0) this.lightAmbient[2] = 1.0;
        return;
    }
    if(this.lightCount < MxeRender.def.MAX_LIGHT){
        var offsetVec3 = this.lightCount*3;
        this.lightTypeBuffer[this.lightCount] = light.type + 1; //0 is light off
        this.lightColBuffer.set(light.color, offsetVec3);
        //this.lightMatricesBuffer.set(lightFrame.viewWorldMatrix, this.lightCount*16);
        this.workVector[0] = this.workVector[1] = this.workVector[3] = 0.0;
        this.workVector[2] = 1.0;
        mat4.multiplyVec4(lightFrame.worldMatrix, this.workVector);
        vec3.normalize(this.workVector);
        this.lightDirBuffer[offsetVec3  ] = this.workVector[0];
        this.lightDirBuffer[offsetVec3+1] = this.workVector[1];
        this.lightDirBuffer[offsetVec3+2] = this.workVector[2];
        this.lightPosBuffer[offsetVec3  ] = lightFrame.worldMatrix[12];
        this.lightPosBuffer[offsetVec3+1] = lightFrame.worldMatrix[13];
        this.lightPosBuffer[offsetVec3+2] = lightFrame.worldMatrix[14];
        
        this.lightAtt0Buffer[this.lightCount] = 0.0;
        this.lightAtt1Buffer[this.lightCount] = 0.0;
        this.lightAtt2Buffer[this.lightCount] = 0.0;
        this.lightRangeBuffer = light.distance;
        this.spotExpBuffer[this.lightCount] = 0.0;
        this.spotCutOffBuffer[this.lightCount] = 180.0;        
        if(light.type === MxeLight.def.TYPE_POINT || light.type === MxeLight.def.TYPE_SPOT){    
            this.lightAtt0Buffer[this.lightCount] = light.dropOffRate3;
            this.lightAtt1Buffer[this.lightCount] = light.dropOffRate1 * 0.0001;
            this.lightAtt2Buffer[this.lightCount] = light.dropOffRate2 * 0.000004;
            if(light.type === MxeLight.def.TYPE_SPOT){
                var phi = light.cutOffAnglePhi;
                if(phi < light.cutOffAngle) phi = light.cutOffAngle;
                var exp = 128.0;
                if(light.cutOffAngle !== 0.0)
                    ((phi + 0.01) / light.cutOffAngle - 1.0) * 20.0;
                if(exp > 128.0) exp = 128.0;
                this.spotExpBuffer[this.lightCount] = exp;
                this.spotCutOffBuffer[this.lightCount] = phi * 0.5;
            }
        }
        
        this.lightList[this.lightCount] = track;
        this.lightCount++;
    }
};

MxeRender3D.prototype.drawBillboard = function(renderItem, renderMode, selectionOffset) {
    var bbcast = renderItem[1].frame.getCast();
    if(bbcast === null) return;
    var bbinfo = bbcast.billboardInfo;
    if(bbinfo === null) return;
    var bbsector = this.billboardModel.sectors[0];
    bbsector.material = bbinfo.material;
    
    this.billboardRenderItem[2][0] = renderItem[1];
    this.drawSector(this.billboardRenderItem, renderMode, selectionOffset);
    bbsector.material = null;
};

MxeRender3D.prototype.drawRenderList = function(renderMode, selectionOffset) {
    var item;
    var i;
    for(i=0; i<this.renderCount; i++){
        item = this.renderList[i];
        if(item[0] === 0){ //CT_MODEL, draw model sector
            this.drawSector(item, renderMode, i+selectionOffset);
        }else if(item[0] === 1){ //CT_TEXTURE, draw billboard
            this.drawBillboard(item, renderMode, i+selectionOffset);
        }
    }
    selectionOffset+= this.renderCount;
    for(i=0; i<this.alphaRenderCount; i++){
        item = this.alphaRenderList[i];
        if(item[0] === 0){ //CT_MODEL, draw model sector
            this.drawSector(item, renderMode, i+selectionOffset);
        }else if(item[0] === 1){ //CT_TEXTURE, draw billboard
            this.drawBillboard(item, renderMode, i+selectionOffset);
        }
    }
    return this.renderCount + this.alphaRenderCount;
};

MxeRender3D.prototype.prepare = function() {
    var camTrack = this.currentCameraTrack;
    var gl = this.gl;
    if(camTrack === null){
        //no camera
    }else{
        var camCast = camTrack.frame.cast;
        camCast.prepareRender(this, camTrack.frame);
        if(this.render.options.useMatrixEnginePerspective){
            MxeGeom.mat4.perspective(camCast.cameraAngle, this.render.viewportWidth / this.render.viewportHeight, camCast.near, camCast.far, this.projMatrix);
        }else{
            mat4.perspective(camCast.cameraAngle, this.render.viewportWidth / this.render.viewportHeight, camCast.near, camCast.far, this.projMatrix);
        }
        var camMatrix = camTrack.frame.worldMatrix;
        this.cameraPos[0] = camMatrix[12];
        this.cameraPos[1] = camMatrix[13];
        this.cameraPos[2] = camMatrix[14];

        mat4.identity(this.workMatrix);
        mat4.scale(this.workMatrix, camTrack.frame.worldSiz);
        mat4.inverse(camMatrix, this.viewMatrix);
        mat4.multiply(this.workMatrix, this.viewMatrix, this.viewMatrix);

        MxeGeom.mat4.switchHand(this.viewMatrix);
        mat4.multiply(this.projMatrix, this.viewMatrix, this.viewProjMatrix);
    }
    
    //sort alpha polygons
    if(this.render.options.enableTanslucentZSort){
        this.alphaRenderList.length = this.alphaRenderCount;
        var sector;
        var cast;
        for(i=0; i<this.alphaRenderCount; i++){
            item = this.alphaRenderList[i];
            if(item[0] === 0){ //CT_MODEL
                sector = item[1];
                if(sector.boxMin == null){
                    item[3] = 0.0;
                    continue;
                }
                vec3.add(sector.boxMin, sector.boxMax, this.workVector);
                this.workVector[0]/= 2.0;
                this.workVector[1]/= 2.0;
                this.workVector[2]/= 2.0;
                this.workVector[3] = 1.0;
                if(sector.isSkin){
                    mat4.multiplyVec4(item[2][0].frame.skinMatrix, this.workVector, this.workVector);
                    //TODO other bones
                }else{
                    mat4.multiplyVec4(item[2][0].frame.worldMatrix, this.workVector, this.workVector);
                }
                mat4.multiplyVec4(this.render.viewMatrix, this.workVector, this.workVector);
                item[3] = this.workVector[2];
             }else if(item[0] === 1){ //CT_TEXTURE(billboard)
                cast = item[1].frame.getCast();
                if(cast === null){
                    item[3] = 0.0;
                    continue;
                }
                this.workVector[0] = 0.0;    
                this.workVector[1] = 0.0;    
                this.workVector[2] = -cast.billboardInfo.pos[2];    
                mat4.multiplyVec4(item[1].frame.billboardMatrix, this.workVector, this.workVector);
                item[3] = this.workVector[2];
             }else{ //unknown
                item[3] = 0.0;
                continue;
             }
        }
        
        this.alphaRenderList.sort(
            function(a, b){
                if(a[3] < b[3]) return -1;
                if(a[3] > b[3]) return 1;
                return 0;
            }
        );
    }
    
};

MxeRender3D.prototype.getItemAlphaType = function(renderItem) {
    if(renderItem[0] === 0){ //CT_MODEL
        var sector = renderItem[1];
        var material = sector.material;
        var textureInfo = material.textureInfo[0];
        //TODO vertex color
        //TODO material track
        if(material.useBlending || material.hasTransrucentVertex)
            return MxeMaterial.def.HAS_TRANSLUCENT;
        if(0.0 < material.color[3] && material.color[3] < 1.0)
            return MxeMaterial.def.HAS_TRANSLUCENT;
        if(textureInfo !== null && textureInfo.cast !== null){
            var textureCast = textureInfo.cast;
            return textureCast.alphaType;
        }
        return 0;
    }else if(renderItem[0] === 1){ //CT_TEXTURE
        var cast = renderItem[1].frame.getCast();
        //TODO material track
        if(cast !== null){
            if(cast.billboardInfo !== null){
                if(cast.billboardInfo.material.hasTransrucentVertex)
                    return MxeMaterial.def.HAS_TRANSLUCENT;
                if(0.0 < cast.billboardInfo.material.color[3] && cast.billboardInfo.material.color[3] < 1.0)
                    return MxeMaterial.def.HAS_TRANSLUCENT;
            }
            return cast.alphaType;
        }
        return 0;
    }
    return 0;
};

MxeRender3D.prototype.getItemMaterial = function(renderItem) {
    if(renderItem[0] === 0){ //CT_MODEL
        return renderItem[1].material;
    }else if(renderItem[0] === 1){ //CT_TEXTURE
        var cast = renderItem[1].frame.getCast();
        if(cast !== null){
            if(cast.billboardInfo !== null){
                return cast.billboardInfo.material;
            }
        }
        return null;
    }
    return null;
};

MxeRender3D.prototype.setAlphaBlend = function(renderItem, renderMode) {
    var gl = this.gl;
    if(renderMode === MxeRender.def.RM_SELECTION){
        gl.disable(gl.BLEND);
        gl.depthMask(true);
        return;
    }
    var itemAlphaType = this.getItemAlphaType(renderItem);
    if(itemAlphaType !== 0){
        var material = this.getItemMaterial(renderItem);
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(
            material.blendFactorSrc,
            material.blendFactorDst,
            material.blendFactorAlphaSrc,
            material.blendFactorAlphaDst);
        
        //detect depth mask
        var depthMask = material.depthMask && ! material.useBlending;
        depthMask = depthMask && (material.color[3] > 0.95);
        gl.depthMask(depthMask);
    }else{
        gl.disable(gl.BLEND);
        gl.depthMask(true);
    }    
};

MxeRender3D.prototype.checkClip = function(v, depthNear, depthFar, poles) {
    var initFlag = (poles[0] === 3);
    if(initFlag) poles[0] = poles[1] = poles[2] = 0;
    var z = v[3];
    if(z < depthNear) poles[2]--;
    else if(depthFar < z) poles[2]++;
    if(Math.abs(z) < 1e-6) if(z < 0.0) z = -1e-6; else z = 1e-6;
    var x = v[0]/z;
    if(x < -1.0) poles[0]--;
    else if(1.0 < x) poles[0]++;
    var y = v[1]/z;
    if(y < -1.0) poles[1]--;
    else if(1.0 < y) poles[1]++;
    if(! initFlag){
        poles[0]/=2;
        poles[1]/=2;
        poles[2]/=2;
    }
    if(poles[0] === 0 && poles[1] === 0 && poles[2] === 0){
        return true;
    }else{
        return false;
    }
};

MxeRender3D.prototype.drawSector = function(renderItem, renderMode, selectionID) {
    var gl = this.gl;
    var sector = renderItem[1];
    var frame;
    var i, j, k, l;
    var bones = renderItem[2];
    var gm;
    var cameraCast;
    
    //check visibility
    if(renderMode !== MxeRender.def.RM_SELECTION)
        if(sector.material.color[3] === 0.0) return;
    for(i=0; i<bones.length; i++){
        frame = bones[i].frame;
        if(! frame.worldVisible) return;
    }
    
    cameraCast = this.currentCameraTrack.frame.getCast();
    
    var isBillboard = (bones[0].billboardType > 0);
    
    //cpu clipping
    var boxes = this.clipBoxes;
    var clipout = true;
    if(this.render.options.enableCPUClipping && sector.boxMin !== null){
        for(i=0; i<bones.length; i++){
            frame = bones[i].frame;
            if(isBillboard){
                mat4.multiply(this.projMatrix, frame.billboardMatrix, this.workMatrix);
            }else{
                if(sector.isSkin) gm = frame.skinMatrix; else gm = frame.worldMatrix;
                mat4.multiply(this.viewProjMatrix, gm, this.workMatrix);
            }
            
            boxes[0] = sector.boxMin;
            boxes[1] = sector.boxMax;
            this.workPole[0] = 3; //3 is init flag
            for(j=0; j<2; j++){
                for(k=0; k<2; k++){
                    for(l=0; l<2; l++){
                        this.workVector[0] = boxes[j][0];
                        this.workVector[1] = boxes[k][1];
                        this.workVector[2] = boxes[l][2];
                        this.workVector[3] = 1.0;
                        mat4.multiplyVec4(this.workMatrix, this.workVector, this.workVector);
                        if(this.checkClip(this.workVector, cameraCast.near, cameraCast.far*sector.material.clippingValue, this.workPole)){
                            clipout = false;
                            break;
                        }
                        if(boxes[0][2] === boxes[1][2]) break;
                    }
                    if(! clipout) break;
                    if(boxes[0][1] === boxes[1][1]) break;
                }
                if(! clipout) break;
                if(boxes[0][0] === boxes[1][0]) break;
            }
            if(! clipout) break;
        }
        if(clipout) return;
    }

    //set shader
    var shaderProgram = null;
    if(sector.material.shaderCast !== null && renderMode !== MxeRender.def.RM_SELECTION){
        shaderProgram = sector.material.shaderCast.program;
        useShaderCast = true;
        this.render.setShaderProgram(shaderProgram);
        sector.material.shaderCast.commitUniformValues(gl);
    }else{
        this.shaderOptions.renderMode = renderMode;
        this.shaderOptions.alphaType = this.getItemAlphaType(renderItem); 
        this.shaderOptions.useLighting = this.render.options.enableLighting && sector.material.enableLighting;
        this.shaderOptions.useSpecular = this.render.options.enableSpecularLighting && (sector.material.shininess > 0.0);
        shaderProgram = this.render.requestShaderProgram(this.shaderOptions);
        this.render.setShaderProgram(shaderProgram);
    }
    
    //set depth test
    if(sector.material.depthTest){
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }else{
        gl.disable(gl.DEPTH_TEST);
    }

    //set lights
    if(shaderProgram.uniforms.uLightCount !== null)
        gl.uniform1i(shaderProgram.uniforms.uLightCount, this.lightCount);
    if(shaderProgram.uniforms.uLightAmbient !== null)
        gl.uniform3fv(shaderProgram.uniforms.uLightAmbient, this.lightAmbient);
    if(shaderProgram.uniforms.uLightType !== null)
        gl.uniform1iv(shaderProgram.uniforms.uLightType, this.lightTypeBuffer);
    if(shaderProgram.uniforms.uLightCol !== null)
        gl.uniform3fv(shaderProgram.uniforms.uLightCol, this.lightColBuffer);
    //if(shaderProgram.uniforms.uLightMatrix !== null)
    //    gl.uniformMatrix4fv(shaderProgram.uniforms.uLightMatrix, false, this.lightMatricesBuffer);
    if(shaderProgram.uniforms.uLightAtt0 !== null)
        gl.uniform1f(shaderProgram.uniforms.uLightAtt0, this.lightAtt0Buffer);
    if(shaderProgram.uniforms.uLightAtt1 !== null)
        gl.uniform1f(shaderProgram.uniforms.uLightAtt1, this.lightAtt1Buffer);
    if(shaderProgram.uniforms.uLightAtt2 !== null)
        gl.uniform1f(shaderProgram.uniforms.uLightAtt2, this.lightAtt2Buffer);
    if(shaderProgram.uniforms.uLightRange !== null)
        gl.uniform1f(shaderProgram.uniforms.uLightRange, this.lightRangeBuffer);
    if(shaderProgram.uniforms.uSpotExponent !== null)
        gl.uniform1f(shaderProgram.uniforms.uSpotExponent, this.spotExpBuffer);
    if(shaderProgram.uniforms.uSpotCutoff !== null)
        gl.uniform1f(shaderProgram.uniforms.uSpotCutoff, this.spotCutOffBuffer);
    
    if(shaderProgram.uniforms.uLightDir !== null)
        gl.uniform3fv(shaderProgram.uniforms.uLightDir, this.lightDirBuffer);
    if(shaderProgram.uniforms.uLightPos !== null)
        gl.uniform3fv(shaderProgram.uniforms.uLightPos, this.lightPosBuffer);
    
    //set camera pos
    if(shaderProgram.uniforms.uCameraPos !== null)
        gl.uniform3fv(shaderProgram.uniforms.uCameraPos, this.cameraPos);
        //gl.uniform3fv(shaderProgram.uniforms.uCameraPos, this.originPoint);
    
    //check texture
    for(i=0; i<sector.material.textureInfo.length; i++){
        var textureInfo = sector.material.textureInfo[i];
        if(! textureInfo || textureInfo.cast === null){
            if(shaderProgram.uniforms.uBlendMode[i] !== null)
                gl.uniform1i(shaderProgram.uniforms.uBlendMode[i], 0);
            continue;
        }
        var textureCast = textureInfo.cast;
        if(! textureCast.getPrepared()) return; //skip render
        //gl.enable(gl.TEXTURE_2D); //webgl not support
        gl.activeTexture(gl.TEXTURE0+i);
        gl.bindTexture(gl.TEXTURE_2D, textureCast.glTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, textureInfo.wrap_s);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, textureInfo.wrap_t);
        if(shaderProgram.uniforms.uTexture[i])
            gl.uniform1i(shaderProgram.uniforms.uTexture[i], i);
        if(shaderProgram.uniforms.uBlendMode[i] !== null)
            gl.uniform1i(shaderProgram.uniforms.uBlendMode[i], textureInfo.blendMode+1);
        if(shaderProgram.uniforms.uBlendValue[i] !== null)
            gl.uniform1f(shaderProgram.uniforms.uBlendValue[i], textureInfo.blendValue);

        var texRatioU = 1.0;
        var texRatioV = 1.0;
        if(shaderProgram.uniforms.uTextureScale[i] !== null){
            this.textureUVScale[0] = 1.0;
            if(textureInfo.repeat[0] !== 1.0)
                this.textureUVScale[0]*= textureInfo.repeat[0];
            if(textureInfo.cast.image.width !== textureInfo.cast.textureWidth){
                texRatioU = textureInfo.cast.image.width / textureInfo.cast.textureWidth;
                this.textureUVScale[0]*= texRatioU;
            }
            this.textureUVScale[1] = 1.0;
            if(textureInfo.repeat[1] !== 1.0)
                this.textureUVScale[1]*= textureInfo.repeat[1];
            if(textureInfo.cast.image.height !== textureInfo.cast.textureHeight){
                texRatioV = textureInfo.cast.image.height / textureInfo.cast.textureHeight;
                this.textureUVScale[1]*= texRatioV;
            }
            gl.uniform2fv(shaderProgram.uniforms.uTextureScale[i], this.textureUVScale);
        }
        if(shaderProgram.uniforms.uTextureMargin[i] !== null){
            this.textureUVMargin[0] = -textureInfo.offset[0];
            if(textureInfo.repeat[0] !== 1.0){
                this.textureUVMargin[0]-= (0.5*textureInfo.repeat[0]-0.5)*texRatioU;
            }
            this.textureUVMargin[1] = textureInfo.offset[1];
            if(textureInfo.repeat[1] !== 1.0){
                this.textureUVMargin[1]-= (0.5*textureInfo.repeat[1]-0.5)*texRatioV;
            }
            gl.uniform2fv(shaderProgram.uniforms.uTextureMargin[i], this.textureUVMargin);
        }
        if(shaderProgram.uniforms.uWrapMode[i] !== null){
            gl.uniform1i(shaderProgram.uniforms.uWrapMode[i], textureInfo.mapType);
        }
    }

    //set bufferes
           
    gl.bindBuffer(gl.ARRAY_BUFFER, sector.positionBuffer);
    gl.enableVertexAttribArray(shaderProgram.attributes.atVertex);
    gl.vertexAttribPointer(shaderProgram.attributes.atVertex, sector.positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    //normal
    if(shaderProgram.attributes.atNormal > -1){
        gl.enableVertexAttribArray(shaderProgram.attributes.atNormal);
        gl.bindBuffer(gl.ARRAY_BUFFER, sector.normalBuffer);
        gl.vertexAttribPointer(shaderProgram.attributes.atNormal, sector.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    }
    
    //vertex color
    if(shaderProgram.attributes.atVColor > -1){
        if(sector.colorBuffer === null){
            if(shaderProgram.uniforms.uEnableVColor !== null){
                gl.uniform1i(shaderProgram.uniforms.uEnableVColor, 0);
            }
        }else{
            if(shaderProgram.uniforms.uEnableVColor !== null){
                gl.uniform1i(shaderProgram.uniforms.uEnableVColor, 1);
            }
            gl.enableVertexAttribArray(shaderProgram.attributes.atVColor);
            gl.bindBuffer(gl.ARRAY_BUFFER, sector.colorBuffer);
            gl.vertexAttribPointer(shaderProgram.attributes.atVColor, sector.colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }
    }
    
    if(sector.uvBuffer !== null){
        for(var i=0; i<sector.uvBuffer.length; i++){
            if(shaderProgram.attributes.atUV[i] > -1){
                if(sector.uvBuffer === null || sector.uvBuffer[i] === null){
                    //gl.disableVertexAttribArray(shaderProgram.attributes.atUV[i]);
                }else{
                    gl.enableVertexAttribArray(shaderProgram.attributes.atUV[i]);
                    gl.bindBuffer(gl.ARRAY_BUFFER, sector.uvBuffer[i]);
                    gl.vertexAttribPointer(shaderProgram.attributes.atUV[i], sector.uvBuffer[i].itemSize, gl.FLOAT, false, 0, 0);
                }
            }
        }
    }
    
    if(shaderProgram.attributes.atWeight0 > -1){
        if(sector.boneWeightBuffer === null){
            //gl.disableVertexAttribArray(shaderProgram.attributes.atWeight0);
            //gl.disableVertexAttribArray(shaderProgram.attributes.atWeight1);
        }else{
            gl.bindBuffer(gl.ARRAY_BUFFER, sector.boneWeightBuffer);
            gl.enableVertexAttribArray(shaderProgram.attributes.atWeight0);
            if(bones.length < 4){
                gl.vertexAttribPointer(shaderProgram.attributes.atWeight0, bones.length, gl.FLOAT, false, bones.length*4, 0);
                //gl.disableVertexAttribArray(shaderProgram.attributes.atWeight1);
            }else{
                gl.vertexAttribPointer(shaderProgram.attributes.atWeight0, 3, gl.FLOAT, false, bones.length*4, 0);
                gl.enableVertexAttribArray(shaderProgram.attributes.atWeight1);
                gl.vertexAttribPointer(shaderProgram.attributes.atWeight1, bones.length-3, gl.FLOAT, false, bones.length*4, 3*4);
            }
        }
    }

    if(shaderProgram.uniforms.uProjMatrix !== null)
        gl.uniformMatrix4fv(shaderProgram.uniforms.uProjMatrix, false, this.projMatrix);
    if(shaderProgram.uniforms.uViewMatrix !== null)
        if(isBillboard)
            gl.uniformMatrix4fv(shaderProgram.uniforms.uViewMatrix, false, this.identityMatrix); //because view is identity
        else
            gl.uniformMatrix4fv(shaderProgram.uniforms.uViewMatrix, false, this.viewMatrix);
    if(shaderProgram.uniforms.uViewProjMatrix !== null)
        if(isBillboard)
            gl.uniformMatrix4fv(shaderProgram.uniforms.uViewProjMatrix, false, this.projMatrix); //because view is identity!
        else
            gl.uniformMatrix4fv(shaderProgram.uniforms.uViewProjMatrix, false, this.viewProjMatrix);
    if(shaderProgram.uniforms.uWorldViewProjMatrix !== null){
        var vpmatrix;
        if(isBillboard)
            vpmatrix = this.projMatrix;
        else
            vpmatrix = this.viewProjMatrix;
        if(sector.isSkin){
            mat4.multiply(vpmatrix, bones[0].frame.skinMatrix, this.workMatrix);
        }else{
            mat4.multiply(vpmatrix, bones[0].frame.worldMatrix, this.workMatrix);
        }
        gl.uniformMatrix4fv(shaderProgram.uniforms.uWorldViewProjMatrix, false, this.workMatrix);
    }
    if(renderMode === MxeRender.def.RM_DEFAULT){
        if(shaderProgram.uniforms.uMatDiffuse !== null)
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, sector.material.color);
        if(shaderProgram.uniforms.uMatSpecular !== null)
            gl.uniform3fv(shaderProgram.uniforms.uMatSpecular, sector.material.specularColor);
        if(shaderProgram.uniforms.uMatEmissive !== null)
            gl.uniform3fv(shaderProgram.uniforms.uMatEmissive, sector.material.emissionColor);
        if(shaderProgram.uniforms.uPower !== null){
            var pow = 0.0; //default specular off
            if(sector.material.shininess > 0.0){
                pow = 30.0*(1.0 - sector.material.shininess);
                if(pow <= 0.0) pow = 0.00001;
            }
            gl.uniform1f(shaderProgram.uniforms.uPower, pow);
        }
        if(sector.material.enableFog && cameraCast.fogEnable){
            if(shaderProgram.uniforms.uFogColor !== null)
                gl.uniform3fv(shaderProgram.uniforms.uFogColor, cameraCast.fogColor);
            if(shaderProgram.uniforms.uFogStart !== null)
                gl.uniform1f(shaderProgram.uniforms.uFogStart, cameraCast.fogNear);
            if(shaderProgram.uniforms.uFogEnd !== null){
                gl.uniform1f(shaderProgram.uniforms.uFogEnd, cameraCast.fogFar);
            }
            if(shaderProgram.uniforms.uFogFactor !== null){
                gl.uniform1f(shaderProgram.uniforms.uFogFactor, cameraCast.fogFactor);
            }
        }else{
            if(shaderProgram.uniforms.uFogStart !== null){
                gl.uniform1f(shaderProgram.uniforms.uFogStart, 0.0);
            }
            if(shaderProgram.uniforms.uFogEnd !== null){
                gl.uniform1f(shaderProgram.uniforms.uFogEnd, 0.0);
            }
            if(shaderProgram.uniforms.uFogFactor !== null){
                gl.uniform1f(shaderProgram.uniforms.uFogFactor, 0.0);
            }
        }
    } else if(renderMode === MxeRender.def.RM_SELECTION){
        /*
        //32bit case
        var sred =   ((selectionID >> 16))/255.0;
        var sgreen = (((selectionID >> 8) & 0xff))/255.0;
        var sblue =  ((selectionID & 0xff))/255.0;
        gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [sred, sgreen, sblue, 1.0]);
        */
        //16bit case
        if(selectionID > 0xffff){
            //error overflow
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [1.0, 1.0, 1.0, 1.0]);
        }else{
            var sa = (( selectionID >> 12)       )/15.0;
            var sb = (((selectionID >> 8 ) & 0xf))/15.0;
            var sg = (((selectionID >> 4 ) & 0xf))/15.0;
            var sr = (( selectionID        & 0xf))/15.0;
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [sr, sg, sb, sa]);
        }
    }
    if(shaderProgram.uniforms.uNBlend !== null){
        gl.uniform1i(shaderProgram.uniforms.uNBlend, bones.length);
    }
    if(shaderProgram.uniforms.uWorldMatrix !== null){
        if(isBillboard){
            gl.uniformMatrix4fv(shaderProgram.uniforms.uWorldMatrix, false, bones[0].frame.billboardMatrix);
        }else if(sector.isSkin){
            gl.uniformMatrix4fv(shaderProgram.uniforms.uWorldMatrix, false, bones[0].frame.skinMatrix);
        }else{
            gl.uniformMatrix4fv(shaderProgram.uniforms.uWorldMatrix, false, bones[0].frame.worldMatrix);
        }
    }
    if(shaderProgram.uniforms.uBlendMatrix !== null && bones.length > 1){
        for(i=0; i<bones.length-1; i++){
            frame = bones[i+1].frame;
            if(sector.isSkin){
                this.blendMatricesBuffer.set(frame.skinMatrix, i*16);
            }else{
                this.blendMatricesBuffer.set(frame.worldMatrix, i*16);
            }
        }
        gl.uniformMatrix4fv(shaderProgram.uniforms.uBlendMatrix, false, this.blendMatricesBuffer);
    }
   
    //TODO 4poly
    
    this.setAlphaBlend(renderItem, renderMode);
    if(sector.material.doubleSided){
        gl.disable(gl.CULL_FACE);
    }else{
        gl.enable(gl.CULL_FACE);
    }
    
    //set user shader parameter
    if(shaderProgram.uniforms.uUserFloatArray !== null){
        gl.uniform1fv(shaderProgram.uniforms.uUserFloatArray, sector.model.shaderUserFloatArray);
    }
    if(shaderProgram.uniforms.uUserIntArray !== null){
        gl.uniform1iv(shaderProgram.uniforms.uUserIntArray, sector.model.shaderUserIntArray);
    }
    if(shaderProgram.uniforms.uTime !== null){
        gl.uniform1f(shaderProgram.uniforms.uTime, this.render.player.getTime()/1000.0);
    }
    if(shaderProgram.uniforms.uRandom !== null){
        gl.uniform1i(shaderProgram.uniforms.uRandom, Math.floor(Math.random()*MxeRender.def.MAX_SHADER_RANDOM+1));
    }
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sector.indexBuffer);
    gl.drawElements(gl.TRIANGLES, sector.indexLength, gl.UNSIGNED_SHORT, sector.indexOffset*2);

};

var MxeRender = function() {
    this.initialize.apply(this, arguments);
};

MxeRender.prototype.initialize = function(player) {
    this.player = player;
    this.gl = null;
    this.viewportWidth = 0;
    this.viewportHeight = 0;
    this.options = {
        enableLighting: true,
        enableSpecularLighting: true,
        enableCPUClipping: true,
        useMatrixEnginePerspective: true,
        enableTanslucentZSort: false,
        shaderBulkBuild: true,
        enableAntialias: false,
    };
    this.validSelectionBuffer = false;
    this.onDrawBGListeners = null;
    this.onExitDrawListeners = null;
    this.renderEvent = new MxeEvent(null);
    this.render3D = new MxeRender3D(this);
    this.render2D = new MxeRender2D(this);
    this.bgRenderFrame = new MxeFrame2D(null);
    this.bgRenderFrame.blendFactorSrc = 0x0302; //GL_SRC_ALPHA;
    this.bgRenderFrame.blendFactorDst = 0x0303; //GL_ONE_MINUS_SRC_ALPHA
    this.bgRenderFrame.blendFactorAlphaSrc = 0x0302; //GL_SRC_ALPHA
    this.bgRenderFrame.blendFactorAlphaDst = 0x0304; //GL_DST_ALPHA

    //shader sources
    
    this.FS_SRC = new Array(4);
    
    //selection fragment shader
    this.FS_SRC[0] = '\
        precision mediump float;\
        varying vec2 vTextureCoord;\
        uniform sampler2D uTexture0;\
        uniform vec4 uMatDiffuse;\
        \
        void main(void) {\
            gl_FragColor = uMatDiffuse;\
        }\
    ';

    //basic
    this.FS_SRC[1] = '\
        precision mediump float;\
        uniform sampler2D uTexture0;\
        uniform int uBlendMode0;\
        uniform vec3 uFogColor;\
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        vec4 textureColor;\
        \
        void main(void) {\
            if      (uBlendMode0 == 0){\
                gl_FragColor = vDiffuseColor + vSpecularColor;\
            }else{\
                textureColor = texture2D(uTexture0, vec2(vTextureCoord.s, vTextureCoord.t));\
                if(uBlendMode0 == 1){\
                    gl_FragColor = textureColor * vDiffuseColor + vSpecularColor;\
                }else if(uBlendMode0 == 2){\
                    gl_FragColor = vec4(textureColor.rgb + vDiffuseColor.rgb, textureColor.a * vDiffuseColor.a) + vSpecularColor;\
                }else if(uBlendMode0 == 3){\
                    textureColor = vec4(vec3(1.0 - textureColor.rgb), textureColor.a);\
                    gl_FragColor = textureColor * vDiffuseColor + vSpecularColor;\
                }\
            }\
            gl_FragColor = vec4(mix(gl_FragColor.rgb, uFogColor, vFogIntensity), gl_FragColor.a);\
        }\
    ';
    
    //transparent discard(very slow)
    this.FS_SRC[2] = '\
        precision mediump float;\
        uniform sampler2D uTexture0;\
        uniform int uBlendMode0;\
        uniform vec3 uFogColor;\
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        vec4 textureColor;\
        \
        void main(void) {\
            if      (uBlendMode0 == 0){\
                gl_FragColor = vDiffuseColor + vSpecularColor;\
            }else{\
                textureColor = texture2D(uTexture0, vec2(vTextureCoord.s, vTextureCoord.t));\
                if(uBlendMode0 == 1){\
                    gl_FragColor = textureColor * vDiffuseColor + vSpecularColor;\
                }else if(uBlendMode0 == 2){\
                    gl_FragColor = vec4(textureColor.rgb + vDiffuseColor.rgb, textureColor.a * vDiffuseColor.a) + vSpecularColor;\
                }else if(uBlendMode0 == 3){\
                    textureColor = vec4(vec3(1.0 - textureColor.rgb), textureColor.a);\
                    gl_FragColor = textureColor * vDiffuseColor + vSpecularColor;\
                }\
            }\
            gl_FragColor = vec4(mix(gl_FragColor.rgb, uFogColor, vFogIntensity), gl_FragColor.a);\
            if(gl_FragColor.a == 0.0) discard;\
        }\
    ';

    //for text
    this.FS_SRC[3] = '\
        precision mediump float;\
        uniform sampler2D uTexture0;\
        uniform int uBlendMode0;\
        uniform vec4 uTextColor;\
        uniform vec4 uTextBgColor;\
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        float textAlpha;\
        \
        void main(void) {\
            textAlpha = texture2D(uTexture0, vec2(vTextureCoord.s, vTextureCoord.t)).r;\
            gl_FragColor = mix(uTextBgColor, uTextColor, textAlpha);\
        }\
    ';
    
    this.VS_SRC = new Array(4);
    
    //selection vertex shader
    this.VS_SRC[0] = '\
        attribute vec3 atVertex;\
        attribute vec3 atNormal;\
        attribute vec2 atUV0;\
        attribute vec3 atWeight0;\
        attribute vec3 atWeight1;\
        \
        uniform mat4 uWorldMatrix;\
        uniform mat4 uViewMatrix;\
        uniform mat4 uProjMatrix;\
        uniform int uNBlend;\
        uniform mat4 uBlendMatrix[5];\
        uniform vec2 uTextureMargin0;\
        uniform vec2 uTextureScale0;\
        \
        varying vec2 vTextureCoord;\
        \
        void main(void) {\
            mat4 finalMatrix = uWorldMatrix;\
            if(uNBlend > 1){\
                finalMatrix = uWorldMatrix*atWeight0[0] + uBlendMatrix[0]*atWeight0[1] + uBlendMatrix[1]*atWeight0[2];\
            }\
            if(uNBlend > 3){\
                finalMatrix = finalMatrix + uBlendMatrix[2]*atWeight1[0] + uBlendMatrix[3]*atWeight1[1] + uBlendMatrix[4]*atWeight1[2];\
            }\
            finalMatrix = uProjMatrix * uViewMatrix * finalMatrix;\
            gl_Position = finalMatrix * vec4(atVertex, 1.0);\
            vTextureCoord = atUV0*uTextureScale0 + uTextureMargin0;\
        }\
      ';

    //no lighting
    this.VS_SRC[1] = '\
        attribute vec3 atVertex;\
        attribute vec3 atNormal;\
        attribute vec2 atUV0;\
        attribute vec3 atWeight0;\
        attribute vec3 atWeight1;\
        attribute vec4 atVColor;\
        \
        uniform mat4 uWorldMatrix;\
        uniform mat4 uProjMatrix;\
        uniform mat4 uViewMatrix;\
        uniform int uNBlend;\
        uniform mat4 uBlendMatrix[5];\
        uniform vec4 uMatDiffuse;\
        uniform vec3 uMatEmissive;\
        uniform float uFogStart;\
        uniform float uFogEnd;\
        uniform float uFogFactor;\
        uniform vec2 uTextureMargin0;\
        uniform vec2 uTextureScale0;\
        uniform int uEnableVColor;\
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        \
        void main(void) {\
            mat4 finalMatrix = uWorldMatrix;\
            if(uNBlend > 1){\
                finalMatrix = uWorldMatrix*atWeight0[0] + uBlendMatrix[0]*atWeight0[1] + uBlendMatrix[1]*atWeight0[2];\
            }\
            if(uNBlend > 3){\
                finalMatrix = finalMatrix + uBlendMatrix[2]*atWeight1[0] + uBlendMatrix[3]*atWeight1[1] + uBlendMatrix[4]*atWeight1[2];\
            }\
            finalMatrix = uProjMatrix * uViewMatrix * finalMatrix;\
            gl_Position = finalMatrix * vec4(atVertex, 1.0);\
            vTextureCoord = atUV0*uTextureScale0 + uTextureMargin0;\
            vec4 matDiffuse;\
            if(uEnableVColor == 1)\
                matDiffuse = atVColor;\
            else\
                matDiffuse = uMatDiffuse;\
            vDiffuseColor = vec4(matDiffuse.rgb+uMatEmissive, matDiffuse.a);\
            vSpecularColor = vec4(0.0);\
            vFogIntensity = clamp((length(gl_Position.xyz)-uFogStart)*uFogFactor, 0.0, 1.0);\
        }\
      ';

    //basic vertex shader
    this.VS_SRC[2] = '\
        attribute vec3 atVertex;\
        attribute vec3 atNormal;\
        attribute vec2 atUV0;\
        attribute vec3 atWeight0;\
        attribute vec3 atWeight1;\
        attribute vec4 atVColor;\
        \
        uniform mat4 uWorldMatrix;\
        uniform mat4 uViewMatrix;\
        uniform mat4 uProjMatrix;\
        uniform int uNBlend;\
        uniform mat4 uBlendMatrix[5];\
        uniform vec4 uMatDiffuse;\
        uniform vec3 uMatEmissive;\
        uniform vec3 uMatSpecular;\
        uniform float uPower;\
        uniform float uFogStart;\
        uniform float uFogEnd;\
        uniform float uFogFactor;\
        uniform vec2 uTextureMargin0;\
        uniform vec2 uTextureScale0;\
        uniform int uEnableVColor;\
        uniform int uLightCount;\
        uniform vec3 uLightAmbient;\
        uniform int uLightType[4];\
        uniform vec3 uLightCol[4];\
        uniform vec3 uLightDir[4];\
        uniform vec3 uCameraPos;\
        \
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        \
        vec3 addDiffuseLight(vec3 srcColor, vec3 normal, int lttype, vec3 ltdir, vec3 ltcol) {\
            float norm = max(dot(-normal, ltdir), 0.0);\
            return norm*ltcol+srcColor;\
        }\
        \
        void main(void) {\
            mat4 finalMatrix = uWorldMatrix;\
            if(uNBlend > 1){\
                finalMatrix = uWorldMatrix*atWeight0[0] + uBlendMatrix[0]*atWeight0[1] + uBlendMatrix[1]*atWeight0[2];\
            }\
            if(uNBlend > 3){\
                finalMatrix = finalMatrix + uBlendMatrix[2]*atWeight1[0] + uBlendMatrix[3]*atWeight1[1] + uBlendMatrix[4]*atWeight1[2];\
            }\
            vec3 vertNormal = normalize(mat3(finalMatrix[0].xyz, finalMatrix[1].xyz, finalMatrix[2].xyz)*atNormal);\
            vec3 vertDir = normalize((finalMatrix * vec4(atVertex, 1.0)).xyz - uCameraPos);\
            finalMatrix = uProjMatrix * uViewMatrix * finalMatrix;\
            gl_Position = finalMatrix * vec4(atVertex, 1.0);\
            vTextureCoord = atUV0*uTextureScale0 + uTextureMargin0;\
            vec3 diffColor = uLightAmbient;\
            if(uLightCount > 0){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[0], uLightDir[0], uLightCol[0]);\
            }\
            if(uLightCount > 1){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[1], uLightDir[1], uLightCol[1]);\
            }\
            if(uLightCount > 2){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[2], uLightDir[2], uLightCol[2]);\
            }\
            if(uLightCount > 3){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[3], uLightDir[3], uLightCol[3]);\
            }\
            vec4 matDiffuse;\
            if(uEnableVColor == 1)\
                matDiffuse = atVColor;\
            else\
                matDiffuse = uMatDiffuse;\
            vDiffuseColor = vec4(matDiffuse.rgb*diffColor+uMatEmissive, matDiffuse.a);\
            vSpecularColor = vec4(0.0);\
            vFogIntensity = clamp((length(gl_Position.xyz)-uFogStart)*uFogFactor, 0.0, 1.0);\
        }\
      ';

    //specular vertex shader
    this.VS_SRC[3] = '\
        attribute vec3 atVertex;\
        attribute vec3 atNormal;\
        attribute vec2 atUV0;\
        attribute vec3 atWeight0;\
        attribute vec3 atWeight1;\
        attribute vec4 atVColor;\
        \
        uniform mat4 uWorldMatrix;\
        uniform mat4 uViewMatrix;\
        uniform mat4 uProjMatrix;\
        uniform int uNBlend;\
        uniform mat4 uBlendMatrix[5];\
        uniform vec4 uMatDiffuse;\
        uniform vec3 uMatEmissive;\
        uniform vec3 uMatSpecular;\
        uniform float uPower;\
        uniform float uFogStart;\
        uniform float uFogEnd;\
        uniform float uFogFactor;\
        uniform vec2 uTextureMargin0;\
        uniform vec2 uTextureScale0;\
        uniform int uEnableVColor;\
        uniform int uLightCount;\
        uniform vec3 uLightAmbient;\
        uniform int uLightType[4];\
        uniform vec3 uLightCol[4];\
        uniform vec3 uLightDir[4];\
        uniform vec3 uCameraPos;\
        \
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        \
        vec3 addSpecularLight(vec3 srcColor, vec3 normal, vec3 direction, int lttype, vec3 ltdir, vec3 ltcol, float shine) {\
            if(shine == 0.0){\
                return srcColor;\
            }\
            vec3 h = normalize(ltdir + direction);\
            float specular = pow(max(dot(h, -normal), 0.0), shine);\
            return srcColor + ltcol * uMatSpecular * specular;\
        }\
        \
        vec3 addDiffuseLight(vec3 srcColor, vec3 normal, int lttype, vec3 ltdir, vec3 ltcol) {\
            float norm = max(dot(-normal, ltdir), 0.0);\
            return norm*ltcol+srcColor;\
        }\
        \
        void main(void) {\
            mat4 finalMatrix = uWorldMatrix;\
            if(uNBlend > 1){\
                finalMatrix = uWorldMatrix*atWeight0[0] + uBlendMatrix[0]*atWeight0[1] + uBlendMatrix[1]*atWeight0[2];\
            }\
            if(uNBlend > 3){\
                finalMatrix = finalMatrix + uBlendMatrix[2]*atWeight1[0] + uBlendMatrix[3]*atWeight1[1] + uBlendMatrix[4]*atWeight1[2];\
            }\
            vec3 vertNormal = normalize(mat3(finalMatrix[0].xyz, finalMatrix[1].xyz, finalMatrix[2].xyz)*atNormal);\
            vec3 vertDir = normalize((finalMatrix * vec4(atVertex, 1.0)).xyz - uCameraPos);\
            finalMatrix = uProjMatrix * uViewMatrix * finalMatrix;\
            gl_Position = finalMatrix * vec4(atVertex, 1.0);\
            vTextureCoord = atUV0*uTextureScale0 + uTextureMargin0;\
            vec3 diffColor = uLightAmbient;\
            vec3 specColor = vec3(0.0, 0.0, 0.0);\
            if(uLightCount > 0){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[0], uLightDir[0], uLightCol[0]);\
                specColor = addSpecularLight(specColor, vertNormal, vertDir, uLightType[0], uLightDir[0], uLightCol[0], uPower);\
            }\
            if(uLightCount > 1){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[1], uLightDir[1], uLightCol[1]);\
                specColor = addSpecularLight(specColor, vertNormal, vertDir, uLightType[1], uLightDir[1], uLightCol[1], uPower);\
            }\
            if(uLightCount > 2){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[2], uLightDir[2], uLightCol[2]);\
                specColor = addSpecularLight(specColor, vertNormal, vertDir, uLightType[2], uLightDir[2], uLightCol[2], uPower);\
            }\
            if(uLightCount > 3){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[3], uLightDir[3], uLightCol[3]);\
                specColor = addSpecularLight(specColor, vertNormal, vertDir, uLightType[3], uLightDir[3], uLightCol[3], uPower);\
            }\
            \
            vec4 matDiffuse;\
            if(uEnableVColor == 1)\
                matDiffuse = atVColor;\
            else\
                matDiffuse = uMatDiffuse;\
            vDiffuseColor = vec4(matDiffuse.rgb*diffColor+uMatEmissive, matDiffuse.a);\
            vSpecularColor = vec4(specColor, 0.0);\
            vFogIntensity = clamp((length(gl_Position.xyz)-uFogStart)*uFogFactor, 0.0, 1.0);\
        }\
      ';

    this.shaderPrograms = null;
    this.currentShaderProgram = null;
    this.fsArray = null;
    this.vsArray = null;
    this.SHADER_FAIL = { SHADER_FAIL_OBJECT: 1 };
    this.ALT_SHADER_TABLE = [
        //selection,    normal,         discard,        text      fs/vs
        [null,          null,           null,           null    ],  //selection
        [null,          null,           null,           null    ],  //no lighting
        [null,          [1,1],          [1,2],          null    ],  //diffuse
        [null,          [2,1],          [2,2],          null    ],  //specular
    ];
        
};

MxeRender.def = {
    MAX_BONE: 6,
    MAX_LIGHT: 4,
    MAX_TEXTURE: 8,
    MAX_TEXTURE_UV: 3,
    MAX_SHADER_USER_ARRAY: 10,
    MAX_SHADER_RANDOM: 0x7fff,
    
    RM_DEFAULT: 0,
    RM_SELECTION: 1,
};

MxeRender.prototype.compileShader =  function(gl, stype, srcStr) {
    var gl = this.gl;
    var shader = gl.createShader(stype);

    gl.shaderSource(shader, srcStr);
    gl.compileShader(shader);

    var logstr = gl.getShaderInfoLog(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) || logstr.length > 0) {
        MxeUtil.log(logstr);
        return this.SHADER_FAIL;
    }

    return shader;
};

MxeRender.prototype.setBackground = function(cast) {
    var bgFrame = this.bgRenderFrame;
    if(cast === null){
        bgFrame.setCast(null);
        return;
    }
    bgFrame.setCast(cast);
    //if(cast.castType === MxeCast.CT_BITMAP || cast.castType === MxeCast.CT_TEXTURE)
    bgFrame.cast.prepare();
};

MxeRender.prototype.setupShaderVariableLocations = function(shaderProgram) {
    var gl = this.gl;

    var i;
    var name;
    var num;

    shaderProgram.attributes = {};
    shaderProgram.maxAttribute = -1;
    var attrNames = ["atVertex", "atNormal", "atWeight0", "atWeight1", "atVColor",];
    var index;
    for(i in attrNames){
        name = attrNames[i];
        index = shaderProgram.attributes[name] = gl.getAttribLocation(shaderProgram, name);
        if(index > shaderProgram.maxAttribute) shaderProgram.maxAttribute = index;
    }
    shaderProgram.attributes.atUV = new Array(MxeRender.def.MAX_TEXTURE_UV);
    for(num=0; num<MxeRender.def.MAX_TEXTURE_UV; num++){
        index = shaderProgram.attributes.atUV[num] = gl.getAttribLocation(shaderProgram, "atUV"+num);
        if(index > shaderProgram.maxAttribute) shaderProgram.maxAttribute = index;
    }
    ++shaderProgram.maxAttribute;
    
    shaderProgram.uniforms = {};
    var uniNames = [
        "uWorldMatrix",
        "uViewMatrix",
        "uProjMatrix",
        "uViewProjMatrix",
        "uWorldViewProjMatrix",
        "uNBlend",
        "uBlendMatrix",
        "uMatDiffuse",
        "uMatEmissive",
        "uMatSpecular",
        "uPower",
        "uFogColor",
        "uFogStart",
        "uFogEnd",
        "uFogFactor",
        "uTextColor",
        "uTextBgColor",
        "uLightCount",
        "uLightAmbient",
        "uLightType",
        "uLightCol",
        "uLightAtt0",
        "uLightAtt1",
        "uLightAtt2",
        "uLightRange",
        "uSpotExponent",
        "uSpotCutoff",
        //"uLightMatrix",
        "uLightDir",
        "uLightPos",
        "uCameraPos",
        "uUserFloatArray",
        "uUserIntArray",
        "uTime",
        "uRandom",
        "uEnableVColor",
    ];
    for(i in uniNames){
        name = uniNames[i];
        shaderProgram.uniforms[name] = gl.getUniformLocation(shaderProgram, name);
    }
    shaderProgram.uniforms.uTexture = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uTexture[num] = gl.getUniformLocation(shaderProgram, "uTexture" + num);
    }
    shaderProgram.uniforms.uBlendMode = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uBlendMode[num] = gl.getUniformLocation(shaderProgram, "uBlendMode" + num);
    }
    shaderProgram.uniforms.uBlendValue = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uBlendValue[num] = gl.getUniformLocation(shaderProgram, "uBlendValue" + num);
    }
    shaderProgram.uniforms.uTextureMargin = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uTextureMargin[num] = gl.getUniformLocation(shaderProgram, "uTextureMargin" + num);
    }
    shaderProgram.uniforms.uTextureScale = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uTextureScale[num] = gl.getUniformLocation(shaderProgram, "uTextureScale" + num);
    }
    shaderProgram.uniforms.uWrapMode = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uWrapMode[num] = gl.getUniformLocation(shaderProgram, "uWrapMode" + num);
    }
};

MxeRender.prototype.createShaderProgram = function(fsIndex, vsIndex) {
    var gl = this.gl;
    
    var fs = this.fsArray[fsIndex];
    if(! fs)
        fs = this.fsArray[fsIndex] = this.compileShader(gl, gl.FRAGMENT_SHADER, this.FS_SRC[fsIndex]);
    if(fs === this.SHADER_FAIL) return this.SHADER_FAIL;
    
    var vs = this.vsArray[vsIndex];
    if(! vs)
        vs = this.vsArray[vsIndex] = this.compileShader(gl, gl.VERTEX_SHADER, this.VS_SRC[vsIndex]);
    if(vs === this.SHADER_FAIL) return this.SHADER_FAIL;
    
    
    //link shader
    var shaderProgram = gl.createProgram();
    this.shaderPrograms[vsIndex*this.FS_SRC.length+fsIndex] = shaderProgram;
    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);

    if (! gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        MxeUtil.log("Could not initialise shader("+fsIndex+","+vsIndex+").\n");
        MxeUtil.log(gl.getProgramInfoLog(shaderProgram));
        return this.SHADER_FAIL;
    }
    
    this.setupShaderVariableLocations(shaderProgram);
    return shaderProgram;
};

MxeRender.prototype.initDefaultShaders = function() {
    this.fsArray = new Array(this.FS_SRC.length);
    this.vsArray = new Array(this.VS_SRC.length);
    this.shaderPrograms = new Array(this.FS_SRC.length*this.VS_SRC.length);

    if(! this.options.shaderBulkBuild) return;
    
    var gl = this.gl;
    var i, j;

    //create all shaders
    var FV_LINK_TABLE = [
        //selection,    normal,         discard,        text      fs/vs
        [true ,         false,          false,          false   ],  //selection
        [false,         true ,          true ,          true    ],  //no lighting
        [false,         true ,          true ,          false   ],  //diffuse
        [false,         true ,          true,           false   ],  //specular
    ];

    for(i=0; i<this.VS_SRC.length; i++){
        for(j=0; j<this.FS_SRC.length; j++){
            if(! FV_LINK_TABLE[i][j]) continue;
            this.shaderPrograms[i*this.FS_SRC.length+j] = this.createShaderProgram(j, i);
        }
    }    
};

MxeRender.prototype.setShaderProgram = function(shader) {
    var gl = this.gl;
    var i;
    if(this.currentShaderProgram !== null){
        for(i=0; i<this.currentShaderProgram.maxAttribute; i++){
            gl.disableVertexAttribArray(i);
        }
    }
    if(this.currentShaderProgram === shader) return;
    gl.useProgram(shader);
    this.currentShaderProgram = shader;
};

MxeRender.prototype.requestShaderProgram = function(requestOptions) {
    var fsType;
    var vsType;
    if(requestOptions.renderMode === MxeRender.def.RM_SELECTION){
        //selection shader
        fsType = vsType = 0;
    }else if(requestOptions.isText){
        fsType = 3;
        vsType = 1;
    }else{
        fsType = 1;
        if(requestOptions.alphaType & 1){ //HAS_TRANSPARENT
            fsType = 2; //transparent discard
        }
        
        vsType = 1;
        if(requestOptions.useLighting){
            vsType = 2;
            if(requestOptions.useSpecular){
                vsType = 3;
            }
        }
    }
    while(true) {
        var shader = this.shaderPrograms[vsType*this.FS_SRC.length+fsType];
        if(! shader && ! this.options.shaderBulkBuild)
            shader = this.createShaderProgram(fsType, vsType);
        if(! shader || shader === this.SHADER_FAIL){
            var altType = this.ALT_SHADER_TABLE[vsType][fsType];
            if(altType !== null){
                vsType = altType[0];
                fsType = altType[1];
                continue;
            }else{
                throw new MxeException("invalid shader["+vsType+","+fsType+"]");
            }
        }
        break;
    }
    return shader;
};

MxeRender.prototype.createFrameBuffer = function() {
    var gl = this.gl;
    var canvas = this.player.canvas;

    this.frameBuffer = gl.createFramebuffer();
    if(this.frameBuffer === null) return; //no context case
    this.frameBuffer.width = canvas.width;
    this.frameBuffer.height = canvas.height;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

    this.renderDepthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderDepthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, canvas.width, canvas.height);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderDepthBuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);

    this.renderRGBBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderRGBBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, canvas.width, canvas.height);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, this.renderRGBBuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
       MxeUtil.log("Could not initialize frame buffer.");
    }
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};

MxeRender.prototype.deleteFrameBuffer = function() {
    var gl = this.gl;
   if(this.frameBuffer !== null){
       gl.deleteFramebuffer(this.frameBuffer);
       this.frameBuffer = null;
   }
   if(this.renderDepthBuffer !== null){
       gl.deleteRenderbuffer(this.renderDepthBuffer);
       this.renderDepthBuffer = null;
   }
   if(this.renderRGBBuffer !== null){
       gl.deleteRenderbuffer(this.renderRGBBuffer);
       this.renderRGBBuffer = null;
   }
};

MxeRender.prototype.updateViewport = function() {
    var gl = this.gl;
    var canvas = this.player.canvas;
    if(this.viewportWidth === canvas.width && this.viewportHeight === canvas.height)
        return;
        
    this.viewportWidth = canvas.width;
    this.viewportHeight = canvas.height;
    
    this.deleteFrameBuffer();
    this.createFrameBuffer();
};

MxeRender.prototype.initGL = function() {
    //for GPU picking--
    this.frameBuffer = null;
    this.renderDepthBuffer = null;
    this.renderRGBBuffer = null;
    //--for GPU picking
    var gl = null;
    var canvas = this.player.canvas;
    try {
        gl = this.gl = canvas.getContext("experimental-webgl", { antialias: this.options.enableAntialias });
    } catch (e) {
    }
    if (! gl) gl = this.gl = null;
    if(gl === null){
        MxeUtil.log("Could not initialise WebGL.");
        return false;
    }

    this.createFrameBuffer();

    //set default
    gl.cullFace(gl.FRONT);
    
    this.initDefaultShaders();
    
    this.render3D.initGL(gl);
    this.render2D.initGL(gl);
    return true;
};

MxeRender.prototype.updateSelectionBuffer = function() {
    if(this.validSelectionBuffer) return;
    var gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    this.drawScene(MxeRender.def.RM_SELECTION);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.validSelectionBuffer = true;
};

MxeRender.prototype.prepare = function() {
    this.render3D.prepare();
    this.render2D.prepare();
};

MxeRender.prototype.addEventListener = function(eventType, listener, userObj) {
    if(eventType === "ondrawbg"){
        if(this.onDrawBGListeners === null){
            this.onDrawBGListeners = new Array();
        }
        this.onDrawBGListeners.push([listener, userObj]);
        return true;
    }
    if(eventType === "onexitdraw"){
        if(this.onExitDrawListeners === null){
            this.onExitDrawListeners = new Array();
        }
        this.onExitDrawListeners.push([listener, userObj]);
        return true;
    }
    return false;
};

MxeRender.prototype.renderPathEventHandler = function(listeners, renderMode) {
    if(listeners === null) return false;
    if(renderMode !== MxeRender.def.RM_DEFAULT) return false;
    var i;
    var func;
    var result = false;
    var e = this.renderEvent;
    e.score = this;
    for(i=0; i<listeners.length; i++){
        func = listeners[i][0];
        e.userObj = listeners[i][1];
        e.gl = this.gl;
        result = func.apply(e.userObj, [e]) || result;
    }
    return result;
};

MxeRender.prototype.drawBackground = function(renderMode, gl){
    gl.depthMask(true);
    gl.disable(gl.SCISSOR_TEST);
    if(renderMode === MxeRender.def.RM_DEFAULT){
        var bgColor;
        var bgAlpha;
        var cameraTrack = this.render3D.currentCameraTrack;
        if(cameraTrack !== null && cameraTrack.frame.getCast().fogEnable){
            bgColor = cameraTrack.frame.getCast().fogColor;
            bgAlpha = this.player.contents.backgroundColor[3];
        }else{
            bgColor = this.player.contents.backgroundColor;
            bgAlpha = this.player.contents.backgroundColor[3];
        }
        gl.clearColor(bgColor[0], bgColor[1], bgColor[2], bgAlpha);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var bgFrame = this.bgRenderFrame;
        if(bgFrame.cast !== null){
            var castScalable = bgFrame.cast.scalable;
            bgFrame.cast.scalable = true; //force scalable
            bgFrame.alpha = 1.0;
            bgFrame.visible = true;
            bgFrame.siz[0] = this.viewportWidth/bgFrame.cast.getWidth();
            bgFrame.siz[1] = this.viewportHeight/bgFrame.cast.getHeight();
            bgFrame.siz[2] = 1.0;
            bgFrame.pos[0] = 0.0;
            bgFrame.pos[1] = 0.0;
            bgFrame.pos[2] = 0.0;
            bgFrame.magFilter = gl.LINEAR;
            bgFrame.minFilter = gl.LINEAR;
            bgFrame.prepareRender(this);
            this.render2D.drawFrame(bgFrame, renderMode, 0);
            bgFrame.cast.scalable = castScalable; //restore
        }
    }else if(renderMode === MxeRender.def.RM_SELECTION){
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
}

MxeRender.prototype.drawScene = function(renderMode) {
    var gl = this.gl;
    var doSkip = false;
    
    //set viewport    
    gl.viewport(0, 0, this.viewportWidth, this.viewportHeight);
        
    doSkip = this.renderPathEventHandler(this.onDrawBGListeners, renderMode);
    if(! doSkip){
        this.drawBackground(renderMode, gl);
    }

    doSkip = false;

    if(! doSkip){
        var selectionOffset = 0;
        selectionOffset+= this.render2D.drawBackRenderList(renderMode, selectionOffset);
        if(this.render3D.currentCameraTrack === null){
            //no camera
        }else{
            selectionOffset+= this.render3D.drawRenderList(renderMode, selectionOffset);
        }
        selectionOffset+= this.render2D.drawFrontRenderList(renderMode, selectionOffset);
    }
    
    doSkip = this.renderPathEventHandler(this.onExitDrawListeners, renderMode);
    
    gl.flush();
    
};

MxeRender.prototype.getSelectionID = function(mouseX, mouseY) {
    var gl = this.gl;
    var stageH = this.viewportHeight;
    this.updateSelectionBuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    var pix = new Uint8Array(4);
    gl.readPixels(mouseX, stageH-mouseY-1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pix);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    //MxeUtil.log(pix[3]+":"+pix[2]+":"+pix[1]+":"+pix[0]);
    /*
    //32bit case
    var selectionID = (pix[0]<<16) + (pix[1]<<8) + pix[2];
    if(selectionID === 0xffffff){
    */
    //16bit case
    pix[0] = pix[0]>>4;
    pix[1] = pix[1]>>4;
    pix[2] = pix[2]>>4;
    pix[3] = pix[3]>>4;
    return (pix[3]<<12) + (pix[2]<<8) + (pix[1]<<4) + pix[0];
};

MxeRender.prototype.getRenderItemBySelectionID = function(selectionID) {
    if(selectionID === 0xffff){
        //no object
        return null;
    }
    if(selectionID < this.render2D.backRenderCount)
        return this.render2D.backRenderList[selectionID];
    selectionID-= this.render2D.backRenderCount;
    if(selectionID < this.render3D.renderCount)
        return this.render3D.renderList[selectionID];
    selectionID-= this.render3D.renderCount;
    if(selectionID < this.render3D.alphaRenderCount)
        return this.render3D.alphaRenderList[selectionID];
    selectionID-= this.render3D.alphaRenderCount;
    if(selectionID < this.render2D.frontRenderCount)
        return this.render2D.frontRenderList[selectionID];
    //error
    MxeUtil.log("Illegal selection ID. ID=" + selectionID);
    return null;
};

MxeRender.prototype.pickUp = function(x, y) {
    var renderItem = this.getRenderItemBySelectionID(this.getSelectionID(x, y));
    if(renderItem === null){
        //no object or error
        return null;
    }
    if(renderItem[0] === 0) return renderItem[2][0];
    if(1 <= renderItem[0] && renderItem[0] <=3) return renderItem[1]; //CT_TEXTURE(billboard), CT_BITMAP(bitmap), CT_TEXT(text)
    if(renderItem[0] === 29) return renderItem[1]; //CT_PROCEDURAL
    //not support
    return null;
};


MxeShaderRequestOptions = function() {
    this.renderMode = MxeRender.def.RM_DEFAULT;
    this.alphaType = 0;
    this.useLighting = false;
    this.useSpecular = false;
    this.isText = false;
};


//CModel
var MxeModel = function() {
    this.initialize.apply(this, arguments);
};
MxeModel.prototype = Object.create(MxeCast.prototype);
MxeModel.prototype.constructor = MxeModel;

MxeModel.prototype.initialize = function(contents, index, label) {
    MxeCast.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_MODEL;
    this.sectors = null;
    this.sectorsL = null;
    this.shaderUserFloatArray = new Float32Array(MxeRender.def.MAX_SHADER_USER_ARRAY);
    this.shaderUserIntArray = new Int32Array(MxeRender.def.MAX_SHADER_USER_ARRAY);
};

MxeModel.prototype.initGL = function(gl) {
    if(this.sectors === null) return;
    for(var i=0; i<this.sectors.length; i++){
        this.sectors[i].initGL(gl);
    }
};

//CSector
var MxeSector = function() {
    this.initialize.apply(this, arguments);
};

MxeSector.prototype.initialize = function(model, index, label) {
    this.model = model;
    this.label = label;
    this.index = index;
    this.isSkin = false;
    //this.parents = null;
    this.material = null;
    this.vertexSrc = null;
    this.positionBuffer = null;
    this.normalBuffer = null;
    this.colorBuffer = null;
    this.uvBuffer = null;
    this.indexBuffer = null;
    this.indexLength = 0;
    this.indexOffset = 0;
    this.boneWeightBuffer = null;
    this.baseMatrix = null;
    this.sectorCenter = null;
    this.boxMin = null;
    this.boxMax = null;
    this.polygonNormals = null; //for getCrossPoint
};

MxeSector.prototype.setVertices = function(vertexSrc) {
    this.vertexSrc = vertexSrc;
};

MxeSector.prototype.initGL = function(gl) {
    if(this.vertexSrc === null) return;
    
    var vertLength = this.vertexSrc.position.length / 3;
    if(vertLength === 0) return;
    
    this.positionBuffer = gl.createBuffer();
    if(this.positionBuffer !== null){
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexSrc.position, gl.STATIC_DRAW);
        this.positionBuffer.itemSize = 3;
        this.positionBuffer.numItems = vertLength;
    }
    
    this.normalBuffer = gl.createBuffer();
    if(this.normalBuffer !== null){
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexSrc.normal, gl.STATIC_DRAW);
        this.normalBuffer.itemSize = 3;
        this.normalBuffer.numItems = vertLength;
    }
    
    if(this.vertexSrc.texture != null){ //undefined ok
        this.uvBuffer = new Array(this.vertexSrc.texture.length);
        for(var i=0; i<this.vertexSrc.texture.length; i++){
            if(this.vertexSrc.texture[i] == null){
                this.uvBuffer[i] = null;
                continue;
            }
            this.uvBuffer[i] = gl.createBuffer();
            if(this.uvBuffer[i] !== null){
                gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer[i]);
                gl.bufferData(gl.ARRAY_BUFFER, this.vertexSrc.texture[i], gl.STATIC_DRAW);
                this.uvBuffer[i].itemSize = 2;
                this.uvBuffer[i].numItems = vertLength;
            }
        }
    }
    
    if(this.vertexSrc.weight != null){ //undefined ok
        this.boneWeightBuffer = gl.createBuffer();
        if(this.boneWeightBuffer !== null){
            gl.bindBuffer(gl.ARRAY_BUFFER, this.boneWeightBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertexSrc.weight, gl.STATIC_DRAW);
            this.boneWeightBuffer.itemSize = this.vertexSrc.weight.length/vertLength;
            this.boneWeightBuffer.numItems = vertLength;
        }
    }
    
    if(this.vertexSrc.color != null){
        this.colorBuffer = gl.createBuffer();
        if(this.colorBuffer !== null){
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertexSrc.color, gl.STATIC_DRAW);
            this.colorBuffer.itemSize = 4;
            this.colorBuffer.numItems = vertLength;
        }
    }

    this.indexBuffer = gl.createBuffer();
    if(this.indexBuffer !== null){
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.vertexSrc.index, gl.STATIC_DRAW);
        this.indexBuffer.itemSize = 1;
        this.indexBuffer.numItems = this.vertexSrc.index.length;
    }
    
};

MxeSector.prototype.prepareRender = function(render, frame) {
    for(var i=0; i<this.material.textureInfo.length; i++){
        var textureInfo = this.material.textureInfo[i];
        if(textureInfo === null) continue;
        var textureCast = textureInfo.cast;
        if(textureCast !== null){
            textureCast.prepareRender(render, frame);
        }
    }
    if(this.material.shaderCast !== null){
        this.material.shaderCast.prepareRender(render, frame);
    }
};

MxeSector.prototype.calcPolygonNormals = function() {
    if(this.vertexSrc == null) return;
    if(this.vertexSrc.position === null || this.vertexSrc.position.length === 0) return; //ghost
    try{
        MxeGeom.useTemporary();
        var verts = this.vertexSrc.position;
        var polys = this.vertexSrc.index;
        var polyIdx = 0;
        var polyCount;
        var normIdx = 0;
        var isStripped = false; //TODO bool isStripped = (lpSector->mlpSectData->SectorOption & 0x01); // for stripped polygon
        if(isStripped){
            polyCount = polys.length - 2;
        }else{
            polyCount = polys.length/3;
        }
        this.polygonNormals = new Float32Array(polyCount*3);
        var p0, p1, p2;
        var polyVert0 = MxeGeom.vec3.getTemporary();
        var polyVert1 = MxeGeom.vec3.getTemporary();
        var polyVert2 = MxeGeom.vec3.getTemporary();
        var polyNorm = MxeGeom.vec3.getTemporary();
        var workVec0 = MxeGeom.vec3.getTemporary();
        for(var i = 0; i < polyCount; i++, normIdx+=3){
            //TODO 4poly
            if(isStripped && (i % 2)!==0){ p0 = polys[polyIdx+2]; p1 = polys[polyIdx+1]; p2 = polys[polyIdx+0]; }
            else{ p0 = polys[polyIdx+1]; p1 = polys[polyIdx+2]; p2 = polys[polyIdx+0]; }
            if (isStripped) polyIdx++; else polyIdx+= 3; //mIs4PolyOnly ? 4 : 3;
            if ((p0 === p1) || (p0 === p2) || (p1 === p2)) continue;
            polyVert0[0] = verts[p0*3];
            polyVert0[1] = verts[p0*3+1];
            polyVert0[2] = verts[p0*3+2];
            polyVert1[0] = verts[p1*3];
            polyVert1[1] = verts[p1*3+1];
            polyVert1[2] = verts[p1*3+2];
            polyVert2[0] = verts[p2*3];
            polyVert2[1] = verts[p2*3+1];
            polyVert2[2] = verts[p2*3+2];
            vec3.cross(vec3.subtract(polyVert1, polyVert0, polyNorm), vec3.subtract(polyVert2, polyVert1, workVec0));
            vec3.normalize(polyNorm);
            this.polygonNormals[normIdx]   = polyNorm[0];
            this.polygonNormals[normIdx+1] = polyNorm[1];
            this.polygonNormals[normIdx+2] = polyNorm[2];
        }
    } finally {
        MxeGeom.releaseTemporary();
    }
};

//CSector セクター情報の中で「テクスチャーグループ」設定により共有されるもの ≒ マテリアル情報
var MxeMaterial = function() {
    this.initialize.apply(this, arguments);
};

MxeMaterial.def = {
    HAS_TRANSPARENT : 1,
    HAS_TRANSLUCENT : 2,
};

MxeMaterial.prototype.initialize = function() {
    //public
    this.textureInfo = [null];
    this.color = null;
    this.specularColor = null;
    this.emissionColor = null;
    this.shininess = 0.0;
    this.doubleSided = false;
    this.clippingValue = 1.0;
    this.depthTest = true;
    this.depthMask = true;
    this.useBlending = false;
    this.blendFactorSrc = 0;
    this.blendFactorDst = 0;
    this.blendFactorAlphaSrc = 0;
    this.blendFactorAlphaDst = 0;
    this.enableLighting = true;
    this.enableFog = true;
    this.shaderCast = null;
    
    //protected
    this.hasTransrucentVertex = false; //半透明頂点を持つかどうか。持つなら半透明として扱う。
};


//CAMERA
var MxeCamera = function() {
    this.initialize.apply(this, arguments);
};
MxeCamera.prototype = Object.create(MxeCast.prototype);
MxeCamera.prototype.constructor = MxeCamera;

MxeCamera.prototype.initialize = function(contents, index, label) {
    MxeCast.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_CAMERA;
    //CAMERADATA--
    //this.zoomFactor = 0.0;
    this.near = 0.0; // front clipping
    this.far = 0.0; // rear clipping
    this.fogEnable = false;
    this.fogColor = null;
    this.fogNear = 0.0;
    this.fogFar = 0.0;
    this.fogDensity = 0.0;
    //this.propChanged;    // property changed by script
    //int        Tag;        
    //BOOL    MaterialPropOff;// disable material property
    this.cameraAngle = 0.0; // Substitution of ZoomFactor V2.53 added
    //BOOL    SkinClipOff;
    //--CAMERADATA
    
    this.fogFactor = 0.0; //for shader
};

MxeCamera.prototype.prepareRender = function(render, frame) {
    if(this.fogEnable && this.fogNear < this.fogFar)
        this.fogFactor = 1.0/(this.fogFar - this.fogNear);
    else
        this.fogFactor = 0.0;
};

//LIGHT
var MxeLight = function() {
    this.initialize.apply(this, arguments);
};
MxeLight.def = {
    TYPE_DIRECTIONAL:   0,
    TYPE_POINT:         1,
    TYPE_SPOT:          2,
    TYPE_AMBIENT:       3,
};
MxeLight.prototype = Object.create(MxeCast.prototype);
MxeLight.prototype.constructor = MxeLight;

MxeLight.prototype.initialize = function(contents, index, label) {
    MxeCast.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_MODEL;
    //LIGHTDATA--
    this.type = 0;
    this.color = null;
    //this.dropOffType = 0;
    this.dropOffRate1 = 0.0;    // SDK-B setting, 1'st term
    this.dropOffRate2 = 0.0;    // SDK-A setting, 2'nd term
    this.dropOffRate3 = 0.0;    // SDK-C setting, constant term
    this.distance = 0.0;
    this.cutOffAngle = 0.0;
    this.cutOffAnglePhi = 0.0;
    //--LIGHTDATA
};

//
var MxeCast2D = function() {
    this.initialize.apply(this, arguments);
};
MxeCast2D.prototype = Object.create(MxeCast.prototype);
MxeCast2D.prototype.constructor = MxeCast2D;

MxeCast2D.prototype.initialize = function(contents, index, label) {
    MxeCast.prototype.initialize.apply(this, arguments);
    this.alphaType = 0;
    this.scalable = false;
    this.rotatable = false;
    this.alphaBlendable = false;
    this.magFilter = 0x2600; //GL_NEAREST
    this.minFilter = 0x2600; //GL_NEAREST
    this.behind3D = false;
    this.rotateCenter = null;
    this.valid = false;
    this.presetWidth = 0;
    this.presetHeight = 0;
};

MxeCast2D.prototype.prepare = function() {
};

MxeCast2D.prototype.getPrepared = function() {
    return false;
};

MxeCast2D.prototype.getWidth = function() {
    return 0;
};

MxeCast2D.prototype.getHeight = function() {
    return 0;
};

MxeCast2D.prototype.invalidate = function() {
    this.valid = false;
};

MxeCast2D.prototype.update = function(ctx, gl) {
    this.valid = true;
};



//
var MxeBillboardInfo = function() {
    this.initialize.apply(this, arguments);
};

MxeBillboardInfo.prototype.initialize = function() {
    this.pos = null;
    this.siz = null;
    this.material = new MxeMaterial();
    this.material.enableLighting = false;
    this.material.blendFactorSrc = 0x0302, //GL_SRC_ALPHA
    this.material.blendFactorDst = 0x0303, //GL_ONE_MINUS_SRC_ALPHA
    this.material.blendFactorAlphaSrc = 0x0302, //GL_SRC_ALPHA
    this.material.blendFactorAlphaDst = 0x0304, //GL_DST_ALPHA
    this.material.emissionColor = new Float32Array([0.0, 0.0, 0.0]);
    this.material.specularColor = new Float32Array([0.0, 0.0, 0.0]);
    var bbtexInfo;
    this.material.textureInfo[0] = bbtexInfo = new MxeSectorTextureInfo();
    bbtexInfo.wrap_s = 0x812f; //GL_CLAMP_TO_EDGE
    bbtexInfo.wrap_t = 0x812f; //GL_CLAMP_TO_EDGE
};


//
var MxeBitmapBase = function() {
    this.initialize.apply(this, arguments);
};
MxeBitmapBase.prototype = Object.create(MxeCast2D.prototype);
MxeBitmapBase.prototype.constructor = MxeBitmapBase;

MxeBitmapBase.prototype.initialize = function(contents, index, label) {
    MxeCast2D.prototype.initialize.apply(this, arguments);
    this.imageSrc = null;
    this.image = null;
    this.glTexture = null;
    this.prepareStatus = 0; //0:init 1:preparing 2:prepared -1:error
    this.loadingImage = null;
    //TEXBILLBOARDDATA--
    this.billboardInfo = null;
    //--TEXBILLBOARDDATA
};

MxeBitmapBase.prototype.getCurrentGL = function() {
    return this.contents.player.render.gl
};

MxeBitmapBase.prototype.getPrepared = function() {
    return this.prepareStatus === 2;
};

MxeBitmapBase.prototype.getWidth = function() {
    if(this.prepareStatus === 2) return this.image.width;
    return 0;
};

MxeBitmapBase.prototype.getHeight = function() {
    if(this.prepareStatus === 2) return this.image.height;
    return 0;
};

MxeBitmapBase.prototype.deleteImage = function(gl) {
    if(gl == null) gl = this.getCurrentGL();
    this.prepareStatus = 0;
    if(this.glTexture)
        gl.deleteTexture(this.glTexture);
    //
    this.image = null;
    this.glTexture = null;
};

MxeBitmapBase.prototype.cancelLoading = function() {
    if(this.loadingImage !== null){
        if(this.prepareStatus === 1) this.prepareStatus = 0;
        this.loadingImage = null;
        return;
    }
};

MxeBitmapBase.prototype.prepare = function() {
    if(this.prepareStatus !== 0){
        return;
    }
    if(this.loadingImage !== null){
        return;
    }
    if(this.imageSrc === null) return;
    this.loadImage(this.imageSrc);
};

MxeBitmapBase.prototype.setImageEventListener = function(image) {
    var cast = this;
    image.addEventListener(
        "load", 
        function() {
            if(image !== cast.loadingImage) return;
            cast.deleteImage(cast.getCurrentGL());
            cast.createTexture(cast.getCurrentGL(), cast.loadingImage);
            cast.loadingImage = null;
        },
        false);
    image.addEventListener(
        "error",
        function() {
            cast.prepareStatus = -1;
            cast.loadingImage = null;
        },
        false);
};

MxeBitmapBase.prototype.loadImage = function(src) {
    this.imageSrc = src;
    if(this.imageSrc === null) return;
    if(this.image !== null){
        if(this.imageSrc === this.image.src) return;
    }
    
    this.cancelLoading();
    if(this.prepareStatus === 0) this.prepareStatus = 1;
    
    var image = this.loadingImage = new Image();
    //image.onload = this.getOnLoadListener(this, image);
    //image.onerror = this.getOnErrorListener(this);
    this.setImageEventListener(image);
    image.src = this.imageSrc;
};

MxeBitmapBase.prototype.setImage = function(image) {
    if(image.src)
        this.imageSrc = image.src;
    else
        this.imageSrc = null;
    if(image.complete === false){
        this.loadingImage = image;
        //image.onload = this.getOnLoadListener(this, image);
        //image.onerror = this.getOnErrorListener(this);
        this.setImageEventListener(image);
    }else{
        this.deleteImage(this.getCurrentGL());
        this.loadingImage = null;
        this.createTexture(this.getCurrentGL(), image);
    }
};

MxeBitmapBase.prototype.getImage = function() {
    return this.image;
};

MxeBitmapBase.prototype.setGLTexture = function(glTexture) {
    this.deleteImage(this.getCurrentGL());
    this.glTexute = glTexture;
};

MxeBitmapBase.prototype.getGLTexture = function() {
    return this.glTexture;
};

MxeBitmapBase.prototype.createTexture = function(gl, image) {
    if(! gl) gl = this.getCurrentGL();
    if(! gl){
        this.glTexture = null;
        return;
    }
    this.glTexture = gl.createTexture();
    this.image = image;
    this.prepareStatus = 2;
    this.textureWidth = 1;
    this.textureHeight = 1;
    while(this.textureWidth < image.width) this.textureWidth*= 2;
    while(this.textureHeight < image.height) this.textureHeight*= 2;
    
    //TODO gl error check
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    if(this.textureWidth === image.width && this.textureHeight === image.height){
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
    }else{
        var textureArray = new Uint8Array(this.textureWidth*this.textureHeight*4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.textureWidth, this.textureHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureArray);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
    gl.bindTexture(gl.TEXTURE_2D, null);
};

MxeBitmapBase.prototype.initGL = function(gl) {
    if(this.image !== null){
        //do not deleteImage on this case(start, restore)
        this.createTexture(gl, this.image);
    }
};

MxeBitmapBase.prototype.prepareRender = function(render, frame) {
    this.prepare();
};


//CBitmap
var MxeBitmap = function() {
    this.initialize.apply(this, arguments);
};
MxeBitmap.prototype = Object.create(MxeBitmapBase.prototype);
MxeBitmap.prototype.constructor = MxeBitmap;

MxeBitmap.prototype.initialize = function(contents, index, label) {
    MxeBitmapBase.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_BITMAP;
};


//CTexture
var MxeTexture = function() {
    this.initialize.apply(this, arguments);
};
MxeTexture.prototype = Object.create(MxeBitmapBase.prototype);
MxeTexture.prototype.constructor = MxeTexture;

MxeTexture.prototype.initialize = function(contents, index, label) {
    MxeBitmapBase.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_TEXTURE;
};


//TEXTUREINFO
var MxeSectorTextureInfo = function() {
    this.initialize.apply(this, arguments);
};

MxeSectorTextureInfo.prototype.initialize = function() {
    this.cast = null;    // texture cast
    this.option = 0;        // 0:normal, 1:movie, 2:bump
    this.mapType = 0;       // TextureMap form
    this.blendValue = 1.0;
    this.blendMode = 0;     // 0:modurate, 1:add, 2:sub
    this.wrap_s = 0x2901; //GL_REPEAT
    this.wrap_t = 0x2901; //GL_REPEAT
    //not implements
    this.repeat = new Float32Array([1.0, 1.0]); //xdiv, ydiv
    this.offset = new Float32Array([0.0, 0.0]); //xofs, yofs
};


//MOVIE
var MxeMovie = function() {
    this.initialize.apply(this, arguments);
};
MxeMovie.prototype = Object.create(MxeBitmapBase.prototype);
MxeMovie.prototype.constructor = MxeMovie;

MxeMovie.prototype.initialize = function(contents, index, label) {
    MxeBitmapBase.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_AVI;
};

//SHADER
var MxeShader = function() {
    this.initialize.apply(this, arguments);
};
MxeShader.prototype = Object.create(MxeCast.prototype);
MxeShader.prototype.constructor = MxeShader;

MxeShader.prototype.initialize = function(contents, index, label) {
    MxeCast.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_SHADER;
    
    this.fsSrc = null;
    this.vsSrc = null;
    this.program = null;
    
    this.error = 0;
    this.render = this.contents.player.render;
    this.userUniformValues = {};
};

MxeShader.prototype.initGL = function(gl) {
    this.program = null;
    this.error = 0;
};

MxeShader.prototype.createShader = function(render) {
    var gl = render.gl;
    var fs = render.compileShader(gl, gl.FRAGMENT_SHADER, this.fsSrc);
    if(fs === render.SHADER_FAIL){
        this.error = 1;
        var msg = "Could not initialise shader cast("+this.index+"). error="+this.error+"\n";
        MxeUtil.log(msg);
        throw new MxeException("defaultshader", msg);
        return;
    }
    
    var vs = render.compileShader(gl, gl.VERTEX_SHADER, this.vsSrc);
    if(vs === render.SHADER_FAIL){
        this.error = 2;
        var msg = "Could not initialise shader cast("+this.index+"). error="+this.error+"\n";
        MxeUtil.log(msg);
        throw new MxeException("defaultshader", msg);
        return;
    }
    
    //link shader
    this.program = gl.createProgram();
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    if (! gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        this.error = 3;
        var msg = "Could not initialise shader cast("+this.index+"). error="+this.error+"\n"+gl.getProgramInfoLog(this.program);
        MxeUtil.log(msg);
        throw new MxeException("defaultshader", msg);
        return;
    }
    
    render.setupShaderVariableLocations(this.program);
}

MxeShader.prototype.prepareRender = function(render, frame) {
    if(this.error !== 0)
        throw new MxeException("shadercast", "can't prepare shader");
    if(! this.program && this.error === 0){
        this.createShader(render);
    }
    
};

MxeShader.prototype.commitUniformValues = function(gl){
    for(var name in this.userUniformValues){
        var location = this.program[name];
        var value = this.userUniformValues[name];
        if(location === undefined){
            this.program[name] = location = gl.getUniformLocation(this.program, name);
        }
        if(location === null){
            throw new MxeException("shadercast", "can't set uniform \""+name+"\"");
        }
        gl.uniform1f(location, value);
    }
};

MxeShader.prototype.setUniformValue = function(name, value){
    this.userUniformValues[name] = value;
};

MxeShader.prototype.getUniformValue = function(name){
    return this.userUniformValues[name];
};

//TEXT
var MxeText = function() {
    this.initialize.apply(this, arguments);
};
MxeText.prototype = Object.create(MxeBitmapBase.prototype);
MxeText.prototype.constructor = MxeText;
MxeText.def = {
    ALIGNMENT_LEFT : 3,
    ALIGNMENT_CENTER : 1,
    ALIGNMENT_RIGHT : 5,
};

MxeText.prototype.initialize = function(contents, index, label) {
    MxeBitmapBase.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_TEXT;
    //TEXTDATA--
    //HFONT    hFont;                // font handle
    this.width = 0;            // font width
    this.height = 0;           // font height (total line)
    //this.itemHeight = 0;       // one line text size
    this.fontHeightRatio = 1.25; 
    this.color = null;            // text color
    this.backgroundColor = null;  // back color
    this.bgTransparent = true;        // false:opaqu true:transparent
    //this.zpos;             // text cast display priority(int)
    this.lineDistance = 0;        // 
    //int        PropChanged;        // property changed by script
    this.lines = null;
    //this.type = 0; //bit0 0:Normal/1:alfa bit2:Antialias, bit7:FixSize, bit8-15:font style, bit16,17 Cast Alignment, bit31:UNICODE
    this.alignment = null;
    //this.antialias = false;
    // use only for embeded engine
    //void*    GeneralPointer;        // use for GLLib, CELib
    //int        ScriptTag;            // script use only
    //TCHAR*    TextPropertyBuf;
    this.lineWidthMax = 0;
    // font data
    this.fontSize = 0.0; //pt
    this.fontStyle = null; //[italic|bold]
    this.fontFamily = null;
    //--TEXTDATA
    this.alphaType = 2; //HAS_TRANSLUCENT(for antialias)
    this.alphaBlendable = true;
};

MxeText.prototype.initGL = function(gl) {
    this.glTexture = null;
    this.valid = false;
};

MxeText.prototype.deleteImage = function(gl) {
};

MxeText.prototype.cancelLoading = function() {
};

MxeText.prototype.prepare = function() {
};

MxeText.prototype.loadImage = function(src) {
};

MxeText.prototype.setImage = function(image) {
};

MxeText.prototype.setGLTexture = function(glTexture) {
};

MxeText.prototype.measureFontHeight = function(font, fontPxSize){
    return fontPxSize * this.fontHeightRatio;
};

MxeText.prototype.createTexture = function(gl) {
    var oldTexW = 0;
    var oldTexH = 0;
    if(this.glTexture !== null){
        oldTexW = this.textureWidth;
        oldTexH = this.textureHeight;
    }
    this.textureWidth = 1;
    this.textureHeight = 1;
    while(this.textureWidth < this.image.width) this.textureWidth*= 2;
    while(this.textureHeight < this.image.height) this.textureHeight*= 2;
    if(this.textureWidth !== oldTexW || this.textureHeight !== oldTexH){
        if(this.glTexture !== null){
            gl.deleteTexture(this.glTexture);
            this.glTexture = null;
        }
        this.glTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        var textureArray = new Uint8Array(this.textureWidth*this.textureHeight*4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.textureWidth, this.textureHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureArray);
    }else{
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    }
    
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
    gl.bindTexture(gl.TEXTURE_2D, null);

};

MxeText.prototype.getPrepared = function() {
    return this.glTexture !== null;
};

MxeText.prototype.getWidth = function() {
    if(! this.valid && ! this.update()) return 0;
    if(this.image !== null) return this.image.width;
    return 0;
};

MxeText.prototype.getHeight = function() {
    if(! this.valid && ! this.update()) return 0;
    if(this.image !== null) return this.image.height;
    return 0;
};

MxeText.prototype.update = function(ctx, gl) {
    if(this.valid) return true;
    if(this.lines === null || this.lines.length === 0){
        this.valid = true;
        //this.width = 0;
        this.height = 0;
        return true;
    }
    
    if(! ctx) ctx = this.contents.player.render.render2D.getOffscreenContext();
    if(! gl) gl = this.contents.player.render.gl;
    if(! ctx || ! gl) return false;

    var fontPxSize = this.fontSize*96.0/72.0;
    var font = "";
    if(this.fontStyle != null) font = font + this.fontStyle;
    font = font + " " + fontPxSize + "px";
    if(this.fontFamily != null) font = font + " " + this.fontFamily;
    ctx.font = font;
    
    var alignType = 0;
    switch(this.alignment){
    case "center":
        alignType = 1;
        ctx.textAlign = "center";
        break;
    case "right":
        alignType = 2;
        ctx.textAlign = "right";
        break;
    case "left":
        alignType = 3;
        ctx.textAlign = "left";
        break;
    default:
        alignType = 0;
        ctx.textAlign = "left";
        break;
    }

    ctx.textBaseline = "top";
    
    var i;
    var lineWidth;
    var metrics;
    var lineWidthTable;
    var itemHeight = this.measureFontHeight(font, fontPxSize);
    this.height = (itemHeight + this.lineDistance) * this.lines.length;
    if(alignType === 0){
        lineWidthTable = new Float32Array(this.lines.length);
        this.lineWidthMax = 0;
        for(i=0; i<this.lines.length; i++){
            metrics = ctx.measureText(this.lines[i]);
            lineWidth = metrics.width + 2;
            if(lineWidth > this.lineWidthMax)
                this.lineWidthMax = lineWidth;
        }
        lineWidthTable[i] = this.width = this.lineWidthMax;
    }else{
        this.lineWidthMax = this.width;
    }
    
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);

    if(ctx.canvas.width < this.width || ctx.canvas.height < this.height)
        throw new Mxe2DContextTooSmallException("", this.width, this.height);
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.width, this.height);
    
    ctx.fillStyle = "#ffffff";
    var lineDistanceSum = 0;
    var lineX = 0;
    for(i=0; i<this.lines.length; i++){
        switch(alignType){
        case 1: lineX = Math.floor(this.width / 2); break;
        case 2: lineX = this.width; break;
        }
        ctx.fillText(this.lines[i], lineX, Math.floor(itemHeight*i+lineDistanceSum));
        lineDistanceSum+= this.lineDistance;
    }
    
    this.image = ctx.getImageData(0, 0, this.width, this.height);
    this.createTexture(gl);
    
    this.valid = true;
    return true;
};

MxeText.prototype.prepareRender = function(render, frame) {
    try{
        this.update(render.render2D.getOffscreenContext(), render.gl);
    }catch(e){
        if(e.name === Mxe2DContextTooSmallException.prototype.name){
            render.render2D.resizeOffscreenCanvas(e.requestWidth, e.requestHeight);
            this.update(render.render2D.getOffscreenContext(), render.gl);
        }else{
            throw e;
        }
    }
};


//PROCEDURAL
var MxeProcedural = function() {
    this.initialize.apply(this, arguments);
};
MxeProcedural.prototype = Object.create(MxeCast2D.prototype);
MxeProcedural.prototype.constructor = MxeProcedural;

MxeProcedural.prototype.initialize = function(contents, index, label) {
    MxeCast2D.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_PROCEDURAL;
    
    //PROCEDURALDATA--
    this.casts = null; //cast array
    this.colors = null; //color array
    this.intParams = null; //int array
    this.floatParams = null; //float array
    //this.presetWidth = 0; //-> MxeCast2D
    //this.presetHeight = 0; //-> MxeCast2D
    //--PROCEDURALDATA;
    this.viewClass = null; //MxeProceduralView class
    this.views = {}; //key is MxeFrame2D
};

MxeProcedural.prototype.invalidate = function() {
    this.valid = false;
};

MxeProcedural.prototype.getPrepared = function() {
    if(this.casts === null) return;
    for(var i=0; i<this.casts.length; i++){
        if(this.casts[i] == null) continue;
        if(! this.casts[i].getPrepared()) return false;
    }
    return true;
};

MxeProcedural.prototype.getWidth = function() {
    return this.presetWidth;
};

MxeProcedural.prototype.getHeight = function() {
    return this.presetHeight;
};

MxeProcedural.prototype.setViewClass = function(viewClass) {
    this.viewClass = viewClass;
    var keys = Object.keys(this.views);
    for(var i; i<keys.length; i++){
        delete this.views[keys[i]];
    }
};

MxeProcedural.prototype.onDraw = function(render, frame, renderMode, selectionID) {
    if(! this.views[frame] && this.viewClass !== null){
        this.views[frame] = new this.viewClass(this);
    }
    if(this.views[frame]){
        this.views[frame].draw(render, frame, renderMode, selectionID);
    }
};

MxeProcedural.prototype.prepareRender = function(render, frame) {
    if(this.casts === null) return;
    for(var i=0; i<this.casts.length; i++){
        var cast = this.casts[i];
        if(cast == null) continue;
        cast.prepareRender(render, frame);
    }
    if(frame){
        var view = this.views[frame];
        if(view) view.prepareRender(render, frame);
    }
};


var MxeProceduralView = function() {
    this.initialize.apply(this, arguments);
};

MxeProceduralView.prototype.initialize = function(procedural) {
    this.procedural = procedural;
};

MxeProceduralView.prototype.draw = function(render, frame, renderMode, selectionID) {
};

MxeProceduralView.prototype.prepareRender = function(render, frame) {
};


var MxeScore = function() {
    this.initialize.apply(this, arguments);
};

MxeScore.prototype.initialize = function(contents, index, label) {
    this.contents = contents;
    this.index = index;
    this.label = label;
    //this.parentScore = parentScore; 廃止 this.parentScore === this.selfTrack.score
    //SCORE--
    //internal var int            MaxTrack:int = 0;    // total track
    this.maxFrameOfScore = 0;  // max frame num of all track
    //internal var maxLoopFrame:int = 0;            // max loop frame num
    this.tracks = null;        //LPTrack            // track object
    this.tracksL = null;        //LPTrack            // track object by label
    this.loops = null;         //LPLoopFrame // loop data
    this.currentFrame = 0;     // running frame num
    this.nextFrame = 0;        // next frame num
    this.seekedFrame = -1;     // keep seek frame
    //internal var MOTIONBLEND* LPMotionBlendInfo;    // motion blend info
    //internal var frameChanged:Boolean = false;
    this.frameBreaked = false; // refered from script
    this.scoreStatus = 0;      // bit0:Async(no use), bit1:UseFastSubScore
    this.frameLabelPos = null;        // use by script LabelPosStr
    //--SCORE
    
    this.castType = MxeCast.def.CT_LINK; //for checkCast
    
    this.selfTrack = null; //this score on it

    this.addEventListenerFuncs = {
        "onenterframe": this.addOnEnterFrameListener,
        "onexitframe": this.addOnExitFrameListener,
        "onmousedown": this.addOnMouseDownListener,
        "onmouseup": this.addOnMouseUpListener,
        "onmousemove": this.addOnMouseMoveListener,
    };
    
    this.onEnterFrameListeners = null;
    this.onExitFrameListeners = null;
    this.onMouseDownListeners = null;
    this.onMouseUpListeners = null;
    this.onMouseMoveListeners = null;
    
};

MxeScore.def = {
    // Close.h
    // loop controll track ID 
    LT_NONE: 0,  // none
    LT_TOP : 1,  // loop start
    LT_MID : 2,  // in a loop
    LT_END : 3,  // loop end
    LT_SNG : 4,  // loop start and end (one frame loop)
};

MxeScore.prototype.getTouchTag = function(id) {
    return this.player.getTouchTag(id);
};

MxeScore.prototype.createEventFlagArray = function(frameNumbers){
    if(! frameNumbers) return null;
    var lastItem = frameNumbers[frameNumbers.length-1];
    var maxFrameNum;
    if(Array.isArray(lastItem)){
        maxFrameNum = lastItem[1];
    }else{
        maxFrameNum = lastItem;
    }
    var flagArray = new Int8Array(maxFrameNum+1);
    
    for(var i in frameNumbers){
        var item = frameNumbers[i];
        if(Array.isArray(item)){
            for(var j=item[0]; j<=item[1]; j++)
                flagArray[j] = 1;
        }else{
            //number
            flagArray[item] = 1;
        }
    }
    return flagArray;
};

MxeScore.prototype.addEventListener = function(eventType, listener, userObj, frameNumbers) {
    var func = this.addEventListenerFuncs[eventType];
    if(func === undefined) return false;
    func.apply(this, [listener, userObj, frameNumbers]);
    return true;
};

MxeScore.prototype.addOnEnterFrameListener = function(listener, userObj, frameNumbers) {
    if(this.onEnterFrameListeners === null){
        this.onEnterFrameListeners = new Array();
    }
    this.onEnterFrameListeners.push([listener, userObj, this.createEventFlagArray(frameNumbers)]);
};

MxeScore.prototype.addOnExitFrameListener = function(listener, userObj, frameNumbers) {
    if(this.onExitFrameListeners === null){
        this.onExitFrameListeners = new Array();
    }
    this.onExitFrameListeners.push([listener, userObj, this.createEventFlagArray(frameNumbers)]);
};

MxeScore.prototype.addOnMouseDownListener = function(listener, userObj, frameNumbers) {
    if(this.onMouseDownListeners === null){
        this.onMouseDownListeners = new Array();
    }
    this.onMouseDownListeners.push([listener, userObj, this.createEventFlagArray(frameNumbers)]);
};

MxeScore.prototype.addOnMouseUpListener = function(listener, userObj, frameNumbers) {
    if(this.onMouseUpListeners === null){
        this.onMouseUpListeners = new Array();
    }
    this.onMouseUpListeners.push([listener, userObj, this.createEventFlagArray(frameNumbers)]);
};

MxeScore.prototype.addOnMouseMoveListener = function(listener, userObj, frameNumbers) {
    if(this.onMouseMoveListeners === null){
        this.onMouseMoveListeners = new Array();
    }
    this.onMouseMoveListeners.push([listener, userObj, this.createEventFlagArray(frameNumbers)]);
};

//TODO remove listener

MxeScore.prototype.onEnterFrameHandler = function(e) {
    if(this.onEnterFrameListeners === null) return;
    var i;
    var func;
    var frameFlags;
    e.score = this;
    for(i=0; i<this.onEnterFrameListeners.length; i++){
        frameFlags = this.onEnterFrameListeners[i][2];
        if(frameFlags && (this.currentFrame >= frameFlags.length || ! frameFlags[this.currentFrame])) continue;
        func = this.onEnterFrameListeners[i][0];
        e.userObj = this.onEnterFrameListeners[i][1];
        func.apply(e.userObj, [e]);
    }
};

MxeScore.prototype.onExitFrameHandler = function(e) {
    if(this.onExitFrameListeners === null) return;
    var i;
    var func;
    var frameFlags;
    e.score = this;
    for(i=0; i<this.onExitFrameListeners.length; i++){
        frameFlags = this.onExitFrameListeners[i][2];
        if(frameFlags && (this.currentFrame >= frameFlags.length || ! frameFlags[this.currentFrame])) continue;
        func = this.onExitFrameListeners[i][0];
        e.userObj = this.onExitFrameListeners[i][1];
        func.apply(e.userObj, [e]);
    }
};

MxeScore.prototype.onMouseDownHandler = function(mouseDownEvent) {
    if(this.onMouseDownListeners === null) return;
    var i;
    var func;
    var frameFlags;
    mouseDownEvent.score = this;
    for(i=0; i<this.onMouseDownListeners.length; i++){
        frameFlags = this.onMouseDownListeners[i][2];
        if(frameFlags && (this.currentFrame >= frameFlags.length || ! frameFlags[this.currentFrame])) continue;
        func = this.onMouseDownListeners[i][0];
        mouseDownEvent.userObj = this.onMouseDownListeners[i][1];
        func.apply(mouseDownEvent.userObj, [mouseDownEvent]);
    }

};

MxeScore.prototype.onMouseUpHandler = function(mouseUpEvent) {
    if(this.onMouseUpListeners === null) return;
    var i;
    var func;
    var frameFlags;
    mouseUpEvent.score = this;
    for(i=0; i<this.onMouseUpListeners.length; i++){
        frameFlags = this.onMouseUpListeners[i][2];
        if(frameFlags && (this.currentFrame >= frameFlags.length || ! frameFlags[this.currentFrame])) continue;
        func = this.onMouseUpListeners[i][0];
        mouseUpEvent.userObj = this.onMouseUpListeners[i][1];
        func.apply(mouseUpEvent.userObj, [mouseUpEvent]);
    };
};

MxeScore.prototype.onMouseMoveHandler = function(mouseMoveEvent) {
    if(this.onMouseMoveListeners === null) return;
    var i;
    var func;
    var frameFlags;
    mouseMoveEvent.score = this;
    for(i=0; i<this.onMouseMoveListeners.length; i++){
        frameFlags = this.onMouseMoveListeners[i][2];
        if(frameFlags && (this.currentFrame >= frameFlags.length || ! frameFlags[this.currentFrame])) continue;
        func = this.onMouseMoveListeners[i][0];
        mouseMoveEvent.userObj = this.onMouseMoveListeners[i][1];
        func.apply(mouseMoveEvent.userObj, [mouseMoveEvent]);
    }
};

MxeScore.prototype.seekFrame = function(frameID) {
    var ftype = typeof(frameID);
    if      (ftype === "number"){
        this.seekedFrame = frameID;
    }else if(ftype === "string"){
        this.seekFrameL(frameID);
    }
};

MxeScore.prototype.seekFrameL = function(frameID) {
    this.seekedFrame = this.frameLabelPos[frameID];
};

MxeScore.prototype.breakLoop = function() {
    if(this.loops === null) return;
    var foundLoopEnd = false;
    var i;
    for(i=this.currentFrame; i<this.loops.length; i++){
        switch (this.loops[i]){
        case MxeScore.def.LT_END:
        case MxeScore.def.LT_SNG:
            foundLoopEnd = true;
            break;
        }
        if(foundLoopEnd) break;
    }
    if(foundLoopEnd){
        this.seekedFrame = i+1;
    }
};

MxeScore.prototype.updateFrameNumber = function() {
    var i;
    if(this.seekedFrame > -1){
        this.currentFrame = this.seekedFrame;
        this.seekedFrame = -1;
        for(i=0; i<this.tracks.length; i++)
            this.tracks[i].onSeekFrameHandler();
    }else{
        this.currentFrame = this.nextFrame;
    }
        
    var cf = this.currentFrame;
    var maxFrame = this.maxFrameOfScore;
    var loops = this.loops;
    if ((loops !== null) && (maxFrame < loops.length)) maxFrame = loops.length;
    if (cf < maxFrame) this.nextFrame = cf + 1; // set default
    else this.nextFrame = cf;
    if (cf >= loops.length) return;
    if (loops === null) return; // some contents has no LPLoopFrame !
    switch (loops[cf]){
    case MxeScore.def.LT_END:    
        while (loops[cf] !== MxeScore.def.LT_TOP) cf--;
        this.nextFrame = cf;
        break;
    case MxeScore.def.LT_SNG:
        this.nextFrame = cf; // self loop
    }
};

MxeScore.prototype.makeFrame = function(frameNumber) { //CPlayer::MakeScore
    if(frameNumber < 0)
        this.updateFrameNumber();
    for(var i=0; i<this.tracks.length; i++){
        this.tracks[i].makeFrame(frameNumber);
    }
};

MxeScore.prototype.prepareRender = function(render, resolveIK) {
    for(var i=0; i<this.tracks.length; i++){
        var track = this.tracks[i];
        track.prepareRender(render);
        if(track.castType === MxeCast.def.CT_LINK){
            if(track.cast !== null){
                track.cast.prepareRender(render, resolveIK);
            }
        }
    }
    //ik--
    if(resolveIK){
        for(var i=0; i<this.tracks.length; i++){
            if(this.tracks[i].ikInfo)
                this.tracks[i].frame.resolveIK();
        }
    }
    //--ik
};

MxeScore.prototype.applyCamera = function(cameraMatrix) {
    for(var i=0; i<this.tracks.length; i++){
        this.tracks[i].applyCamera(cameraMatrix);
    }
};

MxeScore.prototype.setBlendAnimation = function(trackOffset, trackCount, frameCount, blendMode, rollFlag, continueFlag) {
    if(trackOffset < 0) trackOffset = 0;
    if(trackCount < 0) trackCount = this.tracks.length - trackOffset;
    for(var i=trackOffset; i<trackOffset+trackCount; i++){
        this.tracks[i].setBlendAnimation(frameCount, blendMode, rollFlag, continueFlag);
    }
};

MxeScore.prototype.cancelBlendAnimation = function(trackOffset, trackCount) {
    if(trackOffset < 0) trackOffset = 0;
    if(trackCount < 0) trackCount = this.tracks.length - trackOffset;
    for(var i=trackOffset; i<trackOffset+trackCount; i++){
        this.tracks[i].cancelBlendAnimation(frameCount, blendMode, rollFlag, continueFlag);
    }
};

var MxeTrack = function() {
    this.initialize.apply(this, arguments);
};

MxeTrack.prototype.initialize = function(score, index, label) {
    this.score = score;
    this.index = index;
    this.label = label;
    this.tag = 0;
    this.scoreFrame = null;
    this.puppetFrame = null;
    this.blendAnimation = null;
    this.frame = null;
    this.renderList = null;
    
    //TRACK--
    this.cast = null;
    this.castType = 0;
    this.parentTrack = null;
    this.maxFrame = 0;
    this.animationData = null; //LPElement;        // T3DELEMENT, T2DELEMENT, ....
    this.puppet = false;
    //--TRACK
        
    this.addEventListenerFuncs = {
        "onclick": this.addOnClickListener,
    };
    
    this.onClickListeners = null;
};

MxeTrack.prototype.setPuppet = function(val) {
};

MxeTrack.prototype.getPuppet = function() {
    return this.puppet;
};

MxeTrack.prototype.addEventListener = function(eventType, listener, userObj, frameNumbers) {
    var func = this.addEventListenerFuncs[eventType];
    if(func === undefined) return false;
    func.apply(this, [listener, userObj, frameNumbers]);
    return true;
};

MxeTrack.prototype.addOnClickListener = function(listener, userObj, frameNumbers) {
    if(this.onClickListeners === null){
        this.onClickListeners = new Array();
    }
    this.onClickListeners.push([listener, userObj, this.score.createEventFlagArray(frameNumbers)]);
    this.score.contents.player.onClickListenerCount++;
};

//TODO remove listener

MxeTrack.prototype.onClickHandler = function(e) {
    //MxeUtil.log("track onclick x="+e.x+" y="+e.y+" track="+this.index+" sector="+e.sector.index);
    if(this.onClickListeners === null) return;
    var i;
    var func;
    var frameFlags;
    for(i=0; i<this.onClickListeners.length; i++){
        frameFlags = this.onClickListeners[i][2];
        if(frameFlags && (this.score.currentFrame >= frameFlags.length || ! frameFlags[this.score.currentFrame])) continue;
        func = this.onClickListeners[i][0];
        e.userObj = this.onClickListeners[i][1];
        e.track = this;
        //func.apply(e.userObj, [e]);
    }
};

MxeTrack.prototype.makeFrame = function(frameNumber) {
    //if(frameNumber < 0) frameNumber = this.score.currentFrame;
    if(this.scoreFrame !== null){
        if(this.blendAnimation != null){
            this.scoreFrame.invalidate();
        }
        this.scoreFrame.make(frameNumber);
    }
    
};

MxeTrack.prototype.prepareRender = function(render) { //CStage::ModifyFrame()
};

MxeTrack.prototype.applyCamera = function(cameraMatrix) {
    if(this.frame !== null)
        this.frame.applyCamera(cameraMatrix);
};

MxeTrack.prototype.setBlendAnimation = function(frameCount, blendMode, rollFlag, continueFlag) {
};

MxeTrack.prototype.cancelBlendAnimation = function(frameCount, blendMode, rollFlag, continueFlag) {
    this.blendAnimation = null;
};

MxeTrack.prototype.onSeekFrameHandler = function() {
    if(this.blendAnimation !== null && ! this.blendAnimation.continueFlag && this.blendAnimation.frameNumber > 0){
        this.blendAnimation = null;
    }
};

MxeTrack.prototype.checkCastType = function(cast){
    return (this.castType === cast.castType);
};

var MxeBoneTrackInfo = function() {
    this.initialize.apply(this, arguments);
};

MxeBoneTrackInfo.prototype.initialize = function(boneSector, modelTrack) {
    //BONEINFO--
    this.boneSector = boneSector;
    this.modelTrack = modelTrack;
    //--BONEINFO
};

var MxeTrack3D = function() {
    this.initialize.apply(this, arguments);
};
MxeTrack3D.prototype = Object.create(MxeTrack.prototype);
MxeTrack3D.prototype.constructor = MxeTrack3D;

MxeTrack3D.prototype.initialize = function(score, index, label) {
    MxeTrack.prototype.initialize.apply(this, arguments);
    if(score)
        this.scoreFrame = new MxeFrame3D(this);
    this.frame = this.scoreFrame;
    this.renderList = null;
    
    //TRACK--
    this.userMatrix = null;
    this.baseMatrix = null;
    //internal var MATRIX*        LPIKBaseMatrix;
    //internal var MOTIONBLEND* LPMotionBlend;
    //internal var VECTOR        CurMBPSaveVector[3];// MotionBlend, for preservation of puppet initial value and the final value. 
    //internal var VECTOR        CurMBPos;        // MotionBlend position    
    //internal var VECTOR        CurMBRot;        // MotionBlend rotation
    //internal var VECTOR        CurMBSiz;        // MotionBlend size
    //internal var BYTE*        TexAnimGroupList;    // each bit is texture0,1,2...
    //internal var int            TexAnimGroupSize;
    //internal var int            TexAnimAllTexMode;    // each bit is texture0,1,2...  bit31: 0=Track 1=Model
    this.rollType = 0;
    this.billboardType = 0;        // 0:normal, 1:H only, 3:HV
    //internal var BYTE        IsMotionBlendOn;
    //internal var BYTE        IsMotionBlendContinue;
    //internal var RECT        PictureFrame;
    //this.hasQuaternion = false;
    //--TRACK

    this.visibleData = null;
    
    this.boneInfo = null; //BONEINFO (MxeBoneTrackInfo)

    //ik--
    this.ikInfo = null;
    this.constraint = 0;
    //--ik
};

MxeTrack3D.prototype.prepareRender = function(render) { //CStage::ModifyFrame()
    if(this.frame !== null)
        this.frame.prepareRender(render);
    if(this.castType === MxeCast.def.CT_CAMERA && this.frame !== null && this.frame.worldVisible){
        if(this.frame.cast !== null){
            render.render3D.currentCameraTrack = this;
        }
    }
    if(this.castType === MxeCast.def.CT_LIGHT && this.frame !== null && this.frame.worldVisible){
        if(this.frame.cast !== null)
            render.render3D.addLight(this);
    }
    if(this.frame !== null && this.frame.worldVisible && this.frame.renderList !== null)
        render.render3D.addRenderList(this.frame.renderList);
};

MxeTrack3D.prototype.setPuppet = function(val) {
    if(this.puppet === val) return;
    this.puppet = val;
    if(this.puppet){
        if(this.puppetFrame === null){
            this.puppetFrame = new MxeFrame3D(this);
            this.puppetFrame.isPuppet = true;
        }
        this.frame = this.puppetFrame;
    }else{
        //this.puppetFrame = null;
        this.frame = this.scoreFrame;
    }
};

MxeTrack3D.prototype.makeFrame = function(frameNumber) {
    MxeTrack.prototype.makeFrame.apply(this, arguments);
    if(this.blendAnimation){
        //TODO continueFlag
        this.blendAnimation.frameNumber++;
        if(this.blendAnimation.frameNumber < this.blendAnimation.frameCount){
            this.frame.blend(
                this.blendAnimation.frame,
                1.0-1.0/(this.blendAnimation.frameCount-this.blendAnimation.frameNumber),
                this.blendAnimation.blendMode,
                this.blendAnimation.rollFlag);
            vec3.set(this.frame.pos, this.blendAnimation.frame.pos);
            quat4.set(this.frame.rot, this.blendAnimation.frame.rot);
            vec3.set(this.frame.siz, this.blendAnimation.frame.siz);
        }else{
            this.blendAnimation = null;
        }
    }
};

MxeTrack3D.prototype.setBlendAnimation = function(frameCount_, blendMode_, rollFlag_, continueFlag_) {
    this.blendAnimation = {
        frameCount: frameCount_,
        frameNumber: 0, 
        blendMode: blendMode_,
        rollFlag: rollFlag_,
        continueFlag: continueFlag_,
        frame: this.frame.duplicate(),
    };
};

MxeTrack3D.prototype.getBoneSector = function() {
    if(! this.boneInfo) return null;
    return this.boneInfo.boneSector;
};

var MxeTrackBillboard = function() {
    this.initialize.apply(this, arguments);
};
MxeTrackBillboard.prototype = Object.create(MxeTrack3D.prototype);
MxeTrackBillboard.prototype.constructor = MxeTrackBillboard;

MxeTrackBillboard.prototype.initialize = function(score, index, label) {
    MxeTrack3D.prototype.initialize.apply(this, arguments);
    this.workVector = vec3.create();
};

MxeTrackBillboard.prototype.applyCamera = function(cameraMatrix) {
    MxeTrack3D.prototype.applyCamera.apply(this, arguments);
    var billboardInfo = null;
    var cast = this.frame.getCast();
    if(cast){
        billboardInfo = cast.billboardInfo;
    }
    if(billboardInfo && this.frame.worldVisible){
        var vm = this.frame.billboardMatrix;
        this.workVector[0] = -billboardInfo.pos[0]*billboardInfo.siz[0]*cast.getWidth()/2.0;
        this.workVector[1] = billboardInfo.pos[1]*billboardInfo.siz[1]*cast.getHeight()/2.0;
        this.workVector[2] = 0.0;
        mat4.translate(vm, this.workVector);
        vm[0]*= (billboardInfo.siz[0]*cast.getWidth());
        vm[5]*= (billboardInfo.siz[1]*cast.getHeight());
    }    
};

MxeTrackBillboard.prototype.checkCastType = function(cast){
    if(cast.castType === MxeCast.def.CT_TEXTURE) return true;
    if(cast.castType === MxeCast.def.CT_BITMAP) return true;
    if(cast.castType === MxeCast.def.CT_PROCEDURAL) return true;
    if(cast.castType === MxeCast.def.CT_AVI) return true;
    if(cast.castType === MxeCast.def.CT_TEXT) return true;
};


var MxeTrack2D = function() {
    this.initialize.apply(this, arguments);
};
MxeTrack2D.prototype = Object.create(MxeTrack.prototype);
MxeTrack2D.prototype.constructor = MxeTrack2D;

MxeTrack2D.prototype.initialize = function(score, index, label) {
    MxeTrack.prototype.initialize.apply(this, arguments);
    this.scoreFrame = new MxeFrame2D(this)
    this.frame = this.scoreFrame;
    this.proceduralParams = null;
};

MxeTrack2D.prototype.prepareRender = function(render) { //CStage::ModifyFrame()
    if(this.frame !== null)
        this.frame.prepareRender(render);

    if(this.frame !== null && this.frame.worldVisible && this.frame.renderList !== null && this.frame.cast !== null){
        if(this.frame.cast.behind3D)
            render.render2D.addBackRenderList(this.frame.renderList);
        else
            render.render2D.addFrontRenderList(this.frame.renderList);
    }
};

MxeTrack2D.prototype.setPuppet = function(val) {
    if(this.puppet === val) return;
    this.puppet = val;
    if(this.puppet){
        this.puppetFrame = new MxeFrame2D(this);
        this.puppetFrame.isPuppet = true;
        this.puppetFrame.copyForPuppet(this.scoreFrame);
        this.frame = this.puppetFrame;
    }else{
        this.puppetFrame = null;
        this.frame = this.scoreFrame;
    }
};

MxeTrack2D.prototype.checkCastType = function(cast){
    if(cast.castType === MxeCast.def.CT_TEXTURE) return true;
    if(cast.castType === MxeCast.def.CT_BITMAP) return true;
    if(cast.castType === MxeCast.def.CT_PROCEDURAL) return true;
    if(cast.castType === MxeCast.def.CT_AVI) return true;
    if(cast.castType === MxeCast.def.CT_TEXT) return true;
};

var MxeTrackMaterial = function() {
    this.initialize.apply(this, arguments);
};
MxeTrackMaterial.prototype = Object.create(MxeTrack3D.prototype);
MxeTrackMaterial.prototype.constructor = MxeTrackMaterial;

MxeTrackMaterial.prototype.initialize = function(score, index, label) {
    MxeTrack3D.prototype.initialize.apply(this, arguments);
    this.scoreFrame = new MxeFrameMaterial(this)
    this.frame = this.scoreFrame;
    //this.userMatrix = null;
};

var MxeTrackUnknown = function() {
    this.initialize.apply(this, arguments);
};
MxeTrackUnknown.prototype = Object.create(MxeTrack.prototype);
MxeTrackUnknown.prototype.constructor = MxeTrackUnknown;
    
MxeTrackUnknown.prototype.initialize = function(score, index, label) {
    MxeTrack.prototype.initialize.apply(this, arguments);
};

var MxeFrame = function() {
    this.initialize.apply(this, arguments);
};

MxeFrame.prototype.initialize = function(track) {
    this.track = track;
    this.visible = false;
    this.frameNum = -1;
    this.cast = null;
    this.worldVisible = false;
    this.isPuppet = false;
};

MxeFrame.prototype.duplicate = function() {
    return null;
}

MxeFrame.prototype.make = function(frameNum) {
};

MxeFrame.prototype.makeL = function(frameName) {
    var frameNum = this.track.score.frameLabelPos[frameName];
    if(frameNum === undefined) return;
    this.make(frameNum);
};

MxeFrame.prototype.invalidate = function(){
    this.frameNum = -1; //"make" forcedly at next frame 
};

MxeFrame.prototype.prepareRender = function(render) {
};

MxeFrame.prototype.applyCamera = function(cameraMatrix) {
};

MxeFrame.prototype.checkCastType = function(cast){
    if(this.track === null)
        return true;
    if(this.track.checkCastType(cast))
        return true;
    throw new MxeException("setcast", "cast type error");
};

MxeFrame.prototype.setCast = function(cast) {
    this.checkCastType(cast);
    this.cast = cast;
};

MxeFrame.prototype.getCast = function() {
    return this.cast;
};

MxeFrame.prototype.blend = function(frame, p, blendMode, rollFlag) {
};

var MxeFrame3D = function() {
    this.initialize.apply(this, arguments);
};
MxeFrame3D.prototype = Object.create(MxeFrame.prototype);
MxeFrame3D.prototype.constructor = MxeFrame3D;

MxeFrame3D.prototype.initialize = function(track) {
    MxeFrame.prototype.initialize.apply(this, arguments);
    this.cast = track.cast;
    this.pos = vec3.create();
    this.rot = quat4.create();
    this.rot[3] = 1.0;
    this.siz = vec3.create();
    this.siz[0] = this.siz[1] = this.siz[2] = 1.0;
    this.prevPosKey = -1;
    this.nextPosKey = -1;
    this.prevRotKey = -1;
    this.nextRotKey = -1;
    this.prevSizKey = -1;
    this.nextSizKey = -1;
    this.validWorldMatrix = false;
    this.worldMatrix = mat4.create(); //left handed
    this.skinMatrix = mat4.create(); //left handed
    //this.viewWorldMatrix = mat4.create(); //right handed
    //this.viewSkinMatrix = mat4.create(); //right handed
    this.billboardMatrix = null;
    this.worldSiz = vec3.create();
    this.renderList = null;
    this.renderListValid = false;
};

MxeFrame3D.prototype.duplicate = function() {
    var frame = new MxeFrame3D(this.track);
    frame.frameNum = this.frameNum;
    frame.setCast(this.cast);
    frame.renderList = this.renderList;
    frame.visible = this.visible;
    vec3.set(this.pos, frame.pos);
    quat4.set(this.rot, frame.rot);
    vec3.set(this.siz, frame.siz);
    return frame;
}

MxeFrame3D.prototype.isPosKey = function(frameData, n) {
    if(! frameData) return false;
    if(frameData[0] === null) return false;
    return true;
};

MxeFrame3D.prototype.isRotKey = function(frameData, n) {
    if(! frameData) return false;
    if(frameData[1] === null) return false;
    return true;
};

MxeFrame3D.prototype.isSizKey = function(frameData, n) {
    if(! frameData) return false;
    if(frameData[2] === null) return false;
    return true;
};

MxeFrame3D.prototype.searchPosKey = function() {
    var animData = this.track.animationData;
    
    if(animData.length === 0){
        this.nextPosKey = 0;
        this.prevPosKey = 0;
        return;
    }

    var n = this.frameNum;
    if(n >= animData.length) n = animData.length - 1;
    for(; n < animData.length; n++)
        if(this.isPosKey(animData[n], n)) break;
    this.nextPosKey = n;
    
    n = this.frameNum;
    for(; 0 <= n; n--)
        if(this.isPosKey(animData[n], n)) break;
    this.prevPosKey = n;
};

MxeFrame3D.prototype.searchRotKey = function() {
    var animData = this.track.animationData;

    if(animData.length === 0){
        this.nextRotKey = 0;
        this.prevRotKey = 0;
        return;
    }

    var n = this.frameNum;
    if(n >= animData.length) n = animData.length - 1;
    for(; n < animData.length; n++)
        if(this.isRotKey(animData[n], n)) break;
    this.nextRotKey = n;
    
    n = this.frameNum;
    for(; 0 <= n; n--)
        if(this.isRotKey(animData[n], n)) break;
    this.prevRotKey = n;
};

MxeFrame3D.prototype.searchSizKey = function() {
    var animData = this.track.animationData;

    if(animData.length === 0){
        this.nextSizKey = 0;
        this.prevSizKey = 0;
        return;
    }

    var n = this.frameNum;
    if(n >= animData.length) n = animData.length - 1;
    for(; n < animData.length; n++)
        if(this.isSizKey(animData[n], n)) break;
    this.nextSizKey = n;
    
    n = this.frameNum;
    for(; 0 <= n; n--)
        if(this.isSizKey(animData[n], n)) break;
    this.prevSizKey = n;
};

MxeFrame3D.prototype.makeLinear = function() {
    if(this.track.animationData.length === 0){
        //no key frames
        return;
    }
    
    var keyData0;
    var keyData1;
    var frameNum = this.frameNum;
    var p0;
    var p1;
    var diff;
    
    if(frameNum >= this.track.visibleData.length){
        this.visible = false;
        frameNum = this.prevPosKey;
    }else{
        this.visible = this.track.visibleData[frameNum];
    }
    
    //Position
    if(frameNum === this.prevPosKey){
        //key frame
        keyData0 = this.track.animationData[this.prevPosKey][0];
        this.pos[0] = keyData0[0];
        this.pos[1] = keyData0[1];
        this.pos[2] = keyData0[2];
    }else if(frameNum === this.nextPosKey){
        //key frame
        keyData1 = this.track.animationData[this.nextPosKey][0];
        this.pos[0] = keyData1[0];
        this.pos[1] = keyData1[1];
        this.pos[2] = keyData1[2];
    }else{
        //middle frame
        keyData0 = this.track.animationData[this.prevPosKey][0];
        keyData1 = this.track.animationData[this.nextPosKey][0];
        diff = (this.nextPosKey - this.prevPosKey)*1.0;
        p1 = (frameNum - this.prevPosKey)/diff;
        p0 = (this.nextPosKey - frameNum)/diff;
        this.pos[0] = keyData0[0]*p0 + keyData1[0]*p1;
        this.pos[1] = keyData0[1]*p0 + keyData1[1]*p1;
        this.pos[2] = keyData0[2]*p0 + keyData1[2]*p1;
    }
    
    //Rotation
    var isQuaternion = this.track.rollType === 7;
    if(frameNum === this.prevRotKey){
        //key frame
        keyData0 = this.track.animationData[this.prevRotKey][1];
        this.rot[0] = keyData0[0];
        this.rot[1] = keyData0[1];
        this.rot[2] = keyData0[2];
        if(isQuaternion){
            this.rot[3] = keyData0[3];
        }
    }else if(frameNum === this.nextRotKey){
        //key frame
        keyData1 = this.track.animationData[this.nextRotKey][1];
        this.rot[0] = keyData1[0];
        this.rot[1] = keyData1[1];
        this.rot[2] = keyData1[2];
        if(isQuaternion){
            this.rot[3] = keyData1[3];
        }
    }else{
        //middle frame
        keyData0 = this.track.animationData[this.prevRotKey][1];
        keyData1 = this.track.animationData[this.nextRotKey][1];
        diff = (this.nextRotKey - this.prevRotKey)*1.0;
        p1 = (frameNum - this.prevRotKey)/diff;
        p0 = (this.nextRotKey - frameNum)/diff;
        if(isQuaternion){
            //QuaternionSlerp
            MxeGeom.quat4.slerp(keyData0, keyData1, p1, this.rot);
            //quat4.normalize(this.rot);
        }else{
            this.rot[0] = keyData0[0]*p0 + keyData1[0]*p1;
            this.rot[1] = keyData0[1]*p0 + keyData1[1]*p1;
            this.rot[2] = keyData0[2]*p0 + keyData1[2]*p1;
        }
    }
            
    //Scale
    if(frameNum === this.prevSizKey){
        //key frame
        keyData0 = this.track.animationData[this.prevSizKey][2];
        this.siz[0] = keyData0[0];
        this.siz[1] = keyData0[1];
        this.siz[2] = keyData0[2];
    }else if(frameNum === this.nextSizKey){
        //key frame
        keyData1 = this.track.animationData[this.nextSizKey][2];
        this.siz[0] = keyData1[0];
        this.siz[1] = keyData1[1];
        this.siz[2] = keyData1[2];
    }else{
        //middle frame
        keyData0 = this.track.animationData[this.prevSizKey][2];
        keyData1 = this.track.animationData[this.nextSizKey][2];
        diff = (this.nextSizKey - this.prevSizKey)*1.0;
        p1 = (frameNum - this.prevSizKey)/diff;
        p0 = (this.nextSizKey - frameNum)/diff;
        this.siz[0] = keyData0[0]*p0 + keyData1[0]*p1;
        this.siz[1] = keyData0[1]*p0 + keyData1[1]*p1;
        this.siz[2] = keyData0[2]*p0 + keyData1[2]*p1;
    }
};
        
MxeFrame3D.prototype.make = function(frameNum) {
    if(frameNum === -1) frameNum = this.track.score.currentFrame;
    if(! this.isPuppet && frameNum === this.frameNum) return;
    this.validWorldMatrix = false;
    this.frameNum = frameNum;
    this.cast = this.track.cast;
    var animLength = this.track.animationData.length;
    if(this.prevPosKey === -1)
        this.searchPosKey();
    else if(frameNum < this.prevPosKey || (this.nextPosKey < frameNum && frameNum < animLength))
        this.searchPosKey();
    if(this.prevRotKey === -1)
        this.searchRotKey();
    else if(frameNum < this.prevRotKey || (this.nextRotKey < frameNum && frameNum < animLength))
        this.searchRotKey();
    if(this.prevSizKey === -1)
        this.searchSizKey();
    else if(frameNum < this.prevSizKey || (this.nextSizKey < frameNum && frameNum < animLength))
        this.searchSizKey();
        
    this.makeLinear();
    //TODO easing
    //TODO spline
};

MxeFrame3D.prototype.calcMatrix = function() { //CFrame::CulcFrame()
    try {
        MxeGeom.useTemporary();    
        //var rollType:uint = track.rollType;
        //var centerOffs; //:Vector3D = workV0;
        var sector; //:Sector;
        var parentTrack = this.track.parentTrack;
        var gm = this.worldMatrix;
        var tv = MxeGeom.vec3.getTemporary();
        //var tm = mat4.create();
        
        if(this.track.userMatrix !== null){
            //gm = track.userMatrix.clone();
            mat4.set(this.track.userMatrix, gm); //copy user matrix to world matrix
            this.worldSiz[0] = Math.sqrt(gm[0+0]*gm[0+0])+Math.sqrt(gm[0+1]*gm[0+1])+Math.sqrt(gm[0+2]*gm[0+2]);
            this.worldSiz[1] = Math.sqrt(gm[4+0]*gm[4+0])+Math.sqrt(gm[4+1]*gm[4+1])+Math.sqrt(gm[4+2]*gm[4+2]);
            this.worldSiz[2] = Math.sqrt(gm[8+0]*gm[8+0])+Math.sqrt(gm[8+1]*gm[8+1])+Math.sqrt(gm[8+2]*gm[8+2]);
        }else{
            mat4.identity(gm);
            //SET TRANSLATION
            mat4.translate(gm, this.pos);

            //SET ROTATION
            //(注意)glMatrixの演算は、最後に演算したものが最初に適用されるマトリックスが生成される
            switch (this.track.rollType){    // rotate transration
            case 1:
                //XYZ
                mat4.rotateZ(gm, this.rot[2]);
                mat4.rotateY(gm, this.rot[1]);
                mat4.rotateX(gm, this.rot[0]);
                break;
            case 2:
                //XZY
                mat4.rotateY(gm, this.rot[1]);
                mat4.rotateZ(gm, this.rot[2]);
                mat4.rotateX(gm, this.rot[0]);
                break;
            case 3:
                //YXZ
                mat4.rotateZ(gm, this.rot[2]);
                mat4.rotateX(gm, this.rot[0]);
                mat4.rotateY(gm, this.rot[1]);
                break;
            case 4:
                //YZX
                mat4.rotateX(gm, this.rot[0]);
                mat4.rotateZ(gm, this.rot[2]);
                mat4.rotateY(gm, this.rot[1]);
                break;
            case 0:
            case 5:
                //ZXY
                //default
                mat4.rotateY(gm, this.rot[1]);
                mat4.rotateX(gm, this.rot[0]);
                mat4.rotateZ(gm, this.rot[2]);
                break;
            case 6:
                //ZYX
                mat4.rotateX(gm, this.rot[0]);
                mat4.rotateY(gm, this.rot[1]);
                mat4.rotateZ(gm, this.rot[2]);
                break;
            case 7: //Quaternion
                mat4.multiply(gm, mat4.inverse(quat4.toMat4(this.rot, MxeGeom.mat4.getTemporary())), gm);
                //mMatrix = MatrixMult(
                //    MXMatrixRotationQuaternion(MXQUATERNION(lpTrack->Rot.x, lpTrack->Rot.y, lpTrack->Rot.z, lpTrack->Rot_W)),
                //    mMatrix);
                break;
            }
            //SET SCALE
            tv[0] = this.siz[0]===0?1e-5:this.siz[0];
            tv[1] = this.siz[1]===0?1e-5:this.siz[1];
            tv[2] = this.siz[2]===0?1e-5:this.siz[2];
            mat4.scale(gm, tv);
            this.worldSiz[0] = this.siz[0];
            this.worldSiz[1] = this.siz[1];
            this.worldSiz[2] = this.siz[2];
            
            //SET PARENT MATRIX
            if(parentTrack !== null){
                mat4.multiply(parentTrack.frame.worldMatrix, gm, gm);
                if (parentTrack.userMatrix === null){ // // if use user matrix then size is ignore
                    var parentWorldSiz = parentTrack.frame.worldSiz;
                    this.worldSiz[0] = this.worldSiz[0] * parentTrack.frame.worldSiz[0];
                    this.worldSiz[1] = this.worldSiz[1] * parentTrack.frame.worldSiz[1];
                    this.worldSiz[2] = this.worldSiz[2] * parentTrack.frame.worldSiz[2];
                }
            }
            
            if (this.track.boneInfo !== null){
                sector = this.track.getBoneSector();
                mat4.inverse(sector.baseMatrix, this.skinMatrix);
                mat4.multiply(gm, this.skinMatrix, this.skinMatrix);
                mat4.translate(this.skinMatrix, [-sector.sectorCenter[0], -sector.sectorCenter[1], -sector.sectorCenter[2]]);
            }
            
            if(this.worldSiz[0] === 0 && this.worldSiz[1] === 0 && this.worldSiz[2] === 0)
                this.worldVisible = false; // no process in size 0.
        }

        this.validWorldMatrix = true;
    } finally {
        MxeGeom.releaseTemporary();
    }
};

MxeFrame3D.prototype.calcBlendRot = function(rot0, rot1, f0, f1, rollFlag) {
    var PI2 = Math.PI * 2.0;
    if(rollFlag){
        if (rot0 > rot1) while (rot0 - rot1 > Math.PI) rot0 -= PI2;
        else while (rot1 - rot0 > Math.PI) rot1 -= PI2;
        return (rot0 * f0 + rot1 * f1) % PI2;
    }
    return rot0 * f0 + rot1 * f1;
};

MxeFrame3D.prototype.blend = function(frame, p, blendMode, rollFlag) {
    var pinv = 1.0 - p;
    var isQuaternion = this.track.rollType === 7;
    this.pos[0] = this.pos[0]*pinv + frame.pos[0]*p;
    this.pos[1] = this.pos[1]*pinv + frame.pos[1]*p;
    this.pos[2] = this.pos[2]*pinv + frame.pos[2]*p;
    if(isQuaternion){
        //QuaternionSlerp
        MxeGeom.quat4.slerp(this.rot, frame.rot, p, this.rot);
    }else{
        this.rot[0] = this.calcBlendRot(this.rot[0], frame.rot[0], pinv, p, rollFlag);
        this.rot[1] = this.calcBlendRot(this.rot[1], frame.rot[1], pinv, p, rollFlag);
        this.rot[2] = this.calcBlendRot(this.rot[2], frame.rot[2], pinv, p, rollFlag);
    }
    this.siz[0] = this.siz[0]*pinv + frame.siz[0]*p;
    this.siz[1] = this.siz[1]*pinv + frame.siz[1]*p;
    this.siz[2] = this.siz[2]*pinv + frame.siz[2]*p;
};

MxeFrame3D.prototype.getValidWorldMatrix = function() {
    if(! this.validWorldMatrix) return false;
    var parentTrack = this.track.parentTrack;
    if(parentTrack !== null){
        this.validWorldMatrix = parentTrack.frame.getValidWorldMatrix();
    }
    return this.validWorldMatrix;
};

MxeFrame3D.prototype.getWorldMatrix = function() {
    if(this.getValidWorldMatrix())
        return this.worldMatrix;
    var parentTrack = this.track.parentTrack;
    if(parentTrack !== null) parentTrack.frame.getWorldMatrix(); //for exec calcMatrix
    this.calcMatrix();
    return this.worldMatrix;
};

MxeFrame3D.prototype.localToWorld = function(localPos, worldPos) {
    return mat4.multiplyVec3(this.getWorldMatrix(), localPos, worldPos);
};

MxeFrame3D.prototype.localToWorldVector = function(localVec, worldVec) {
    try {
        MxeGeom.useTemporary();    
        var m = mat4.set(this.getWorldMatrix(), MxeGeom.mat4.getTemporary());
        m[12] = m[13] = m[14] = 0.0;
        mat4.multiplyVec3(m, localVec, worldVec);
        return vec3.normalize(worldVec);
    } finally {
        MxeGeom.releaseTemporary();    
    }
};

MxeFrame3D.prototype.worldToLocal = function(worldPos, localPos) {
    try {
        MxeGeom.useTemporary();    
        return mat4.multiplyVec3(mat4.inverse(this.getWorldMatrix(), MxeGeom.mat4.getTemporary()), worldPos, localPos);
    } finally {
        MxeGeom.releaseTemporary();    
    }
};

MxeFrame3D.prototype.worldToLocalVector = function(worldVec, localVec) {
    try {
        MxeGeom.useTemporary();    
        var m = mat4.set(this.getWorldMatrix(), MxeGeom.mat4.getTemporary());
        m[12] = m[13] = m[14] = 0.0;
        mat4.multiplyVec3(mat4.inverse(m), worldVec, localVec);
        return vec3.normalize(localVec);
    } finally {
        MxeGeom.releaseTemporary();    
    }
};

MxeFrame3D.prototype.getCrossPoint = function(pos, vec, backFlag, sectorOffset, sectorCount, result) {
    if(! result){
        result = {
            crossed: false,
            position: vec3.create(),
            normal: vec3.create(),
            distance: 0.0,
            sector: null,
        };
    }else{
        result.crossed = false;
    }
    if(this.getCast() === null) return result;
    var sectors = this.getCast().sectors;
    if(sectors == null) return result;
    
    try {
        MxeGeom.useTemporary();
        var localPos = MxeGeom.vec3.getTemporary();
        this.worldToLocal(pos, localPos);
        var localVec = MxeGeom.vec3.getTemporary();
        this.worldToLocalVector(vec, localVec);
        var localVecNega = MxeGeom.vec3.getTemporary();
        vec3.negate(localVec, localVecNega);
        if (sectorOffset < 0) sectorOffset = 0;
        if (sectorCount < 0) sectorCount = sectors.length - sectorOffset;

        var touchBack = false;
        var polyCrossPoint = MxeGeom.vec3.getTemporary();
        var polyDistance;
        var backPicked = false;
        var picked;
        var polyVert0 = MxeGeom.vec3.getTemporary();
        var polyVert1 = MxeGeom.vec3.getTemporary();
        var polyVert2 = MxeGeom.vec3.getTemporary();
        var polyNorm = MxeGeom.vec3.getTemporary();
        var polyNormNega = MxeGeom.vec3.getTemporary();
        var polyCrossPoint = MxeGeom.quat4.getTemporary();
        for(var i=sectorOffset; i<sectorOffset+sectorCount; i++) {
            var sector = sectors[i];
            if(sector.vertexSrc === null) continue;
            if(sector.vertexSrc.position === null || sector.vertexSrc.position.length === 0) continue; //ghost
            if(sector.isSkin) continue;// do not check skin
            //if (lpFrame->mfFrameTypeID != ALL_MODEL) // only check base and bone
            //    if (lpFrame->mfFrameTypeID != lpSector->msBoneSectorID) continue; 
            var verts = sector.vertexSrc.position;
            var polys = sector.vertexSrc.index;
            var polyIdx = 0;
            var polyCount;
            var normIdx = 0;
            var isStripped = false; //TODO bool isStripped = (lpSector->mlpSectData->SectorOption & 0x01); // for stripped polygon
            if(isStripped){
                polyCount = polys.length - 2;
            }else{
                polyCount = polys.length/3;
            }
            if(sector.polygonNormals == null) sector.calcPolygonNormals();
            
            for(var k = 0; k < polyCount; k++, normIdx+=3){
                if(isStripped && (k % 2)!==0){ p0 = polys[polyIdx+2]; p1 = polys[polyIdx+1]; p2 = polys[polyIdx+0]; }
                else{ p0 = polys[polyIdx+1]; p1 = polys[polyIdx+2]; p2 = polys[polyIdx+0]; }
                if (isStripped) polyIdx++; else polyIdx+= 3; //mIs4PolyOnly ? 4 : 3;
                if ((p0 === p1) || (p0 === p2) || (p1 === p2)) continue;
                
                backPicked = false;
                
                polyVert0[0] = verts[p0*3];
                polyVert0[1] = verts[p0*3+1];
                polyVert0[2] = verts[p0*3+2];
                polyVert1[0] = verts[p1*3];
                polyVert1[1] = verts[p1*3+1];
                polyVert1[2] = verts[p1*3+2];
                polyVert2[0] = verts[p2*3];
                polyVert2[1] = verts[p2*3+1];
                polyVert2[2] = verts[p2*3+2];
                polyNorm[0] = sector.polygonNormals[normIdx];
                polyNorm[1] = sector.polygonNormals[normIdx+1];
                polyNorm[2] = sector.polygonNormals[normIdx+2];
                vec3.negate(polyNorm, polyNormNega);
                picked = MxeGeom.pick(polyVert0, polyVert1, polyVert2, polyNorm, localPos, localVec, polyCrossPoint); 
                if (!picked) picked = MxeGeom.pick(polyVert0, polyVert1, polyVert2, polyNormNega, localPos, localVec, polyCrossPoint); // front reverse polygon
                if (!picked && backFlag){
                    backPicked = true;
                    picked = MxeGeom.pick(polyVert0, polyVert1, polyVert2, polyNorm, localPos, localVecNega, polyCrossPoint); 
                    if (!picked) picked = MxeGeom.pick(polyVert0, polyVert1, polyVert2, polyNormNega, localPos, localVecNega, polyCrossPoint); // front reverse polygon
                }
                //TODO 4poly
                /*
                if (lpFrame->mflpModel->mIs4PolyOnly){
                    backPicked = false;
                    if (!picked) picked = geomPick(lpVert[lpPoly[0]], lpVert[lpPoly[2]], lpVert[lpPoly[3]], 
                                            *lpNorm, &crossPoint, &distance, startNorm, startPos);
                    if (!picked) picked = geomPick(lpVert[lpPoly[0]], lpVert[lpPoly[2]], lpVert[lpPoly[3]], 
                                            - *lpNorm, &crossPoint, &distance, startNorm, startPos);
                    if (!picked && backFlag){
                        backPicked = true;
                        picked = geomPick(lpVert[lpPoly[0]], lpVert[lpPoly[2]], lpVert[lpPoly[3]], 
                                            *lpNorm, &crossPoint, &distance, - startNorm, startPos);
                        if (!picked) picked = geomPick(lpVert[lpPoly[0]], lpVert[lpPoly[2]], lpVert[lpPoly[3]], 
                                            - *lpNorm, &crossPoint, &distance, - startNorm, startPos);
                    }
                    lpPoly++;
                }
                */
                if (!picked) continue;
                polyDistance = polyCrossPoint[3];
                if (polyDistance < 0) polyDistance = - polyDistance;
                if(! result.crossed || result.distance > polyDistance){
                    result.crossed = true;
                    result.distance = polyDistance;
                    vec3.set(polyCrossPoint, result.position); // The collision point is copied for the inside of the polygon. 
                    vec3.set(polyNorm, result.normal);
                    result.sector = sector;
                    touchBack = backPicked;
                }
            }
        }
        if (result.crossed){
            var m = mat4.set(this.getWorldMatrix(), MxeGeom.mat4.getTemporary());
            m[12] = m[13] = m[14] = 0.0;
            mat4.multiplyVec3(m, vec3.subtract(result.position, localPos, localPos), localPos);
            result.distance = vec3.length(localPos);
            if (touchBack) result.distance = - result.distance;
            this.localToWorld(result.position, result.position);
            this.localToWorldVector(result.normal, result.normal);
        }
        return result;
    } finally {
        MxeGeom.releaseTemporary();    
    }
};

MxeFrame3D.prototype.getMinimumDistance = function(pos, sectorOffset, sectorCount, result) {
    if(! result){
        result = {
            status: -1,
            position: vec3.create(),
            normal: vec3.create(),
            distance: 0.0,
            sector: null,
        };
    }else{
        result.status = -1;
    }
    if(this.getCast() === null) return result;
    var sectors = this.getCast().sectors;
    if(sectors == null) return result;
    
    try {
        MxeGeom.useTemporary();
        var localPos = MxeGeom.vec3.getTemporary();
        this.worldToLocal(pos, localPos);
        if (sectorOffset < 0) sectorOffset = 0;
        if (sectorCount < 0) sectorCount = sectors.length - sectorOffset;
        //--
        // A certain point and the beeline with the polygon of the model 
        var stat;
        var i, j;
        var v0 = MxeGeom.vec3.getTemporary();
        var v1 = MxeGeom.vec3.getTemporary();
        var v2 = MxeGeom.vec3.getTemporary();
        var v3 = MxeGeom.vec3.getTemporary();
        var minPos = MxeGeom.quat4.getTemporary();
        var ansP0, ansP1, ansP2, ansNormIdx; //for get answer normal
        for (i=sectorOffset; i<sectorOffset+sectorCount; i++){
            // The second power table of the distance in the point and the each vertex is prepared in the start. 
            var sector = sectors[i];
            if(sector.vertexSrc === null) continue;
            if(sector.vertexSrc.position === null || sector.vertexSrc.position.length === 0) continue; //ghost
            if(sector.isSkin) continue;// do not check skin
            //if (lpFrame->mfFrameTypeID != ALL_MODEL) // only check base and bone
            //    if (lpFrame->mfFrameTypeID != lpSector->msBoneSectorID) continue; 
            var verts = sector.vertexSrc.position;
            var polys = sector.vertexSrc.index;
            var polyIdx = 0;
            var polyCount;
            var normIdx = 0;
            var isStripped = false; //TODO bool isStripped = (lpSector->mlpSectData->SectorOption & 0x01); // for stripped polygon
            if(isStripped){
                polyCount = polys.length - 2;
            }else{
                polyCount = polys.length/3;
            }
            var nvert = verts.length/3;
            var distanceTable = new Float32Array(nvert);
            for (j=0; j<nvert; j++){
                v0[0] = verts[j*3];
                v0[1] = verts[j*3+1];
                v0[2] = verts[j*3+2];
                distanceTable[j] = vec3.dot(vec3.subtract(v0, localPos), v0); //length^2
            }
            
            // The minimal distance with each polygon
            var d0, d1, d2;
            var p0, p1, p2;
            for (j=0; j<polyCount; j++, normIdx+=3){
                if(isStripped && (j % 2)!==0){ p0 = polys[polyIdx+2]; p1 = polys[polyIdx+1]; p2 = polys[polyIdx+0]; }
                else{ p0 = polys[polyIdx+1]; p1 = polys[polyIdx+2]; p2 = polys[polyIdx+0]; }
                if (isStripped) polyIdx++; else polyIdx+= 3; //mIs4PolyOnly ? 4 : 3;
                if ((p0 === p1) || (p0 === p2) || (p1 === p2)) continue;
                v0[0] = verts[p0*3]; v0[1] = verts[p0*3+1]; v0[2] = verts[p0*3+2];
                d0 = distanceTable[p0];
                v1[0] = verts[p1*3]; v1[1] = verts[p1*3+1]; v1[2] = verts[p1*3+2];
                d1 = distanceTable[p1];
                v2[0] = verts[p2*3]; v2[1] = verts[p2*3+1]; v2[2] = verts[p2*3+2];
                d2 = distanceTable[p2];
                stat = MxeGeom.getPolygonNearestPoint(localPos, v0, v1, v2, d0, d1, d2, minPos);
                if(stat < 0) continue;
                if (result.status < 0 || result.distance > minPos[3]){
                    result.distance = minPos[3];
                    vec3.set(minPos, result.position);
                    //answerNorm = lpSector->mslpPolyNormal[j];
                    ansP0 = p0; ansP1 = p1; ansP2 = p2;
                    ansNormIdx = normIdx;
                    result.sector = sector;
                    result.status = stat;
                }
            }
        }
        //--
        if(result.status > -1){
            if(result.sector.polygonNormals){
                result.normal[0] = result.sector.polygonNormals[ansNormIdx*3];
                result.normal[1] = result.sector.polygonNormals[ansNormIdx*3+1];
                result.normal[2] = result.sector.polygonNormals[ansNormIdx*3+2];
            }else{
                var verts = result.sector.vertexSrc.position;
                v0[0] = verts[ansP0*3]; v0[1] = verts[ansP0*3+1]; v0[2] = verts[ansP0*3+2];
                v1[0] = verts[ansP1*3]; v1[1] = verts[ansP1*3+1]; v1[2] = verts[ansP1*3+2];
                v2[0] = verts[ansP2*3]; v2[1] = verts[ansP2*3+1]; v2[2] = verts[ansP2*3+2];
                vec3.cross(vec3.subtract(v1, v0, result.normal), vec3.subtract(v2, v1, v3));
                vec3.normalize(result.normal); //TODO check need this
            }
            
            var m = mat4.set(this.getWorldMatrix(), MxeGeom.mat4.getTemporary());
            m[12] = m[13] = m[14] = 0.0;
            mat4.multiplyVec3(m, vec3.subtract(result.position, localPos, localPos), localPos);
            result.distance = vec3.length(localPos);
            this.localToWorld(result.position, result.position);
            this.localToWorldVector(result.normal, result.normal);
        }

        return result;
    } finally {
        MxeGeom.releaseTemporary();    
    }
};

//ik--
MxeFrame3D.prototype.resolveIK = function() {
    var ik = this.track.ikInfo;
    if(! ik || ! ik.targetBone)
        return;
    if(this.track.rollType !== 7) //not quaternion
        return;
    try {
        MxeGeom.useTemporary();
        var maxangle = ik.controlWeight * 4;
        var axis = MxeGeom.vec3.getTemporary();
        var axisLen = 0.0;
        var ikbonePosW = MxeGeom.vec3.getTemporary();
        ikbonePosW[0] = this.worldMatrix[12];
        ikbonePosW[1] = this.worldMatrix[13];
        ikbonePosW[2] = this.worldMatrix[14];        
        var ikbonePos = MxeGeom.vec3.getTemporary();
        var ikboneVec = MxeGeom.vec3.getTemporary();
        var ikboneLen = 0.0;
        var bonePos = MxeGeom.vec3.getTemporary();
        var minLength = 0.1 * vec3.length(vec3.subtract(ik.targetBone.boneInfo.boneSector.sectorCenter, ik.targetBone.parentTrack.boneInfo.boneSector.sectorCenter, axis));
        var targetFrame = ik.targetBone.frame;
        var targetPosW = MxeGeom.vec3.getTemporary();
        var targetPos = MxeGeom.vec3.getTemporary();
        var targetVec = MxeGeom.vec3.getTemporary();
        var targetVecLen = 0.0;
        var sinTheta = 0.0;
        var theta = 0.0;
        var q = MxeGeom.quat4.getTemporary();
        var boneFrame = null;
        var childBoneFrame = null;
        var c = 0.0;
        
        for (var n = 0; n < ik.iterations; n++) {
            targetPosW[0] = targetFrame.worldMatrix[12];
            targetPosW[1] = targetFrame.worldMatrix[13];
            targetPosW[2] = targetFrame.worldMatrix[14];
            if (minLength > vec3.length(vec3.subtract(targetPosW, ikbonePosW, axis))) {
                break;
            }
            for (var i = 0; i < ik.childBones.length; i++) {
                boneFrame = ik.childBones[i].frame;
                //bonePos[0] = boneFrame.worldMatrix[12];
                //bonePos[1] = boneFrame.worldMatrix[13];
                //bonePos[2] = boneFrame.worldMatrix[14];
                bonePos[0] = 0;
                bonePos[1] = 0;
                bonePos[2] = 0;
                if (i > 0){
                    targetPosW[0] = targetFrame.worldMatrix[12];
                    targetPosW[1] = targetFrame.worldMatrix[13];
                    targetPosW[2] = targetFrame.worldMatrix[14];
                }
                boneFrame.worldToLocal(targetPosW, targetPos);
                boneFrame.worldToLocal(ikbonePosW, ikbonePos);
                targetVec = vec3.subtract(targetPos, bonePos, targetVec);
                targetVecLen = vec3.length(targetVec);
                if (targetVecLen < minLength) continue;
                ikboneVec = vec3.subtract(ikbonePos, bonePos, ikboneVec);
                ikboneVecLen = vec3.length(ikboneVec);
                if (ikboneVecLen < minLength) continue;
                axis = vec3.cross(targetVec, ikboneVec, axis);
                axisLen = vec3.length(axis);
                sinTheta = axisLen / ikboneVecLen / targetVecLen;
                if (sinTheta < 0.001) continue;
                theta = Math.asin(sinTheta);
                if (vec3.dot(targetVec, ikboneVec) < 0) {
                    theta = 3.141592653589793 - theta;
                }
                if (theta > maxangle) theta = maxangle;
                quat4.set(vec3.scale(axis, Math.sin(theta / 2) / axisLen), q);
                q[3] = Math.cos(theta / 2);
                
                quat4.multiply(q, boneFrame.rot);
                
                switch(boneFrame.track.constraint){
                case 1: //X only
                    c = q[3];
                    quat4.set([-Math.sqrt(1 - c * c), 0, 0, c], q);
                    break;
                case 2: //Y only
                    c = q[3];
                    quat4.set([0, -Math.sqrt(1 - c * c), 0, c], q);
                    break;
                case 4: //Z only
                    c = q[3];
                    quat4.set([0, 0, -Math.sqrt(1 - c * c), c], q);
                    break;
                default:
                }
                
                quat4.normalize(q);
                quat4.set(q, boneFrame.rot);
                
                for(var j=i; j>=0; j--){
                    childBoneFrame = ik.childBones[j].frame;
                    childBoneFrame.calcMatrix();
                }
                targetFrame.calcMatrix();
            }
        }
    } finally {
        MxeGeom.releaseTemporary();    
    }
};
//--ik

MxeFrame3D.prototype.prepareRender = function(render) { //CStage::ModifyFrame()
    this.updateRenderList();
    var parentTrack = this.track.parentTrack;
    var parentVisible = true;
    if(parentTrack !== null){
        parentVisible = parentTrack.frame.worldVisible;
    }
    this.worldVisible = this.visible && parentVisible;
    //if(this.worldVisible)
    this.calcMatrix();
    this.validWorldMatrix = true;
    
    if(this.worldVisible && this.renderList !== null){
        var i;
        var item;
        var cast;
        for(i=0; i<this.renderList.length; i++){
            item = this.renderList[i];
            if(item[0] === 0){ //CT_MODEL
                item[1].prepareRender(render, this);
            }else if(item[0] === 1){ //CT_TEXTURE(billboard)
                cast = item[1].frame.getCast();
                if(cast !== null) cast.prepareRender(render, this);
            }
        }
    }
};

MxeFrame3D.prototype.calcBillboardMatrix = function(cameraMatrix, srcMatrix, dstMatrix) {
    try{
        MxeGeom.useTemporary();
        var selfY = Math.atan2(srcMatrix[10], srcMatrix[8]);
        var camDirY = Math.atan2(cameraMatrix[10], cameraMatrix[8]);
        var rotYMatrix = MxeGeom.mat4.getTemporary();
        mat4.identity(rotYMatrix);
        mat4.multiply(srcMatrix, mat4.rotateY(rotYMatrix, camDirY - selfY), dstMatrix);
        mat4.multiply(cameraMatrix, dstMatrix, dstMatrix);
    } finally {
        MxeGeom.releaseTemporary();
    }
    if(this.track.billboardType === 3){ //billboard HV
        dstMatrix[0] = this.worldSiz[0]; if (dstMatrix[0] < 0.0) dstMatrix[0] = - dstMatrix[0];
        dstMatrix[5] = this.worldSiz[1]; if (dstMatrix[5] < 0.0) dstMatrix[5] = - dstMatrix[5];
        dstMatrix[10] = -1.0; 
        dstMatrix[1] = dstMatrix[2] = dstMatrix[3] = 
        dstMatrix[4] = dstMatrix[6] = dstMatrix[7] =
        dstMatrix[8] = dstMatrix[9] = 0.0;
    }
    //MxeGeom.mat4.switchHand(dstMatrix);    
};

MxeFrame3D.prototype.applyCamera = function(cameraMatrix) {
    if(! this.worldVisible) return;
    if(this.track.billboardType > 0){ //billboard
        if(this.billboardMatrix === null) this.billboardMatrix = mat4.create();
        this.calcBillboardMatrix(cameraMatrix, this.worldMatrix, this.billboardMatrix);
    }
};

MxeFrame3D.prototype.setCast = function(cast) {
    this.checkCastType(cast);
    if(this.cast === cast) return;
    this.cast = cast;
    if(this.track.castType === 0){ //CT_MODEL
        this.renderListValid = false;
    }
};

MxeFrame3D.prototype.updateRenderList = function() {
    if(this.renderListValid) return;
    
    if(this.renderList !== null && this.renderList !== this.track.renderList)
        this.renderList.length = 0;
    if(this.track.cast === this.cast){
        this.renderList = this.track.renderList;
    }else{
        if(this.track.castType === MxeCast.def.CT_MODEL){
            var model = this.cast;
            if(model === null || model.sectors === null || model.sectors.length === 0){
                this.renderList = null;
            }else{
                this.renderList = new Array(model.sectors.length);
                var count = 0;
                var sector;
                for(var i=0; i<model.sectors.length; i++){
                    sector = model.sectors[i];
                    if(sector.indexBuffer === null) continue; //no poly
                    this.renderList[count] = [0, model.sectors[i], [this.track]];
                    count++;
                }
                this.renderList.length = count;
            }
        }else{
            this.renderList = this.trackRenderList;
        }
    }
    this.renderListValid = true;
};

var MxeFrame2D = function() {
    this.initialize.apply(this, arguments);
};
MxeFrame2D.prototype = Object.create(MxeFrame.prototype);
MxeFrame2D.prototype.constructor = MxeFrame2D;

MxeFrame2D.prototype.initialize = function(track) {
    MxeFrame.prototype.initialize.apply(this, arguments);
    if(track !== null){
        this.cast = this.track.cast;
    }
    this.pos = new Float32Array([0.0,0.0,0.0]);
    this.siz = new Float32Array([1.0,1.0,0.0]);
    this.rot = 0.0;
    
    this.useBlending = false;
    this.enableTransparentDiscard = false; //subモードでの抜け色SDKとの互換性のためのフラグ
    this.alpha = 1.0;
    this.blendFactorSrc = 0x0302; //GL_SRC_ALPHA
    this.blendFactorDst = 0x0303; //GL_ONE_MINUS_SRC_ALPHA
    this.blendFactorAlphaSrc = 0x0302; //GL_SRC_ALPHA
    this.blendFactorAlphaDst = 0x0304; //GL_DST_ALPHA
    
    this.worldPos = vec3.create();
    this.worldSiz = vec3.create();
    //this.worldRot = 0.0;
    this.worldMatrix = mat4.create();
    this.viewMatrix = mat4.create();    

    this.magFilter = 0x2600; //GL_NEAREST
    this.minFilter = 0x2600; //GL_NEAREST
    this.wrap_s = 0x812f; //GL_CLAMP_TO_EDGE
    this.wrap_t = 0x812f; //GL_CLAMP_TO_EDGE

    //TODO private
    this.parentMatrix = mat4.create();
    this.rotOffset = vec3.create();
    this.rotOffset[2] = 0.0;
    this.rotOffsetNega = vec3.create();
    this.rotOffsetNega[2] = 0.0;
    
    //clipping
    this.clippingMode = 0; //0:disable 1:world 2:local
    this.clippingRect = new Float32Array(4); //[0]left [1]top [2]right [3]bottom (not include bottom-right)
    
    //procedural
    this.proceduralParams = null;

    //reference size(for puppet)     
    this.referenceWidth = 0;
    this.referenceHeight = 0;
    
    this.renderList = null;
    
};

MxeFrame2D.prototype.copyForProcedural = function(srcFrame) {
    this.track = srcFrame.track;
    
    this.visible = srcFrame.visible;
    vec3.set(srcFrame.pos, this.pos);
    vec3.set(srcFrame.siz, this.siz);
    this.rot = srcFrame.rot;

    this.useBlending = srcFrame.useBlending;
    this.alpha = srcFrame.alpha;
    this.blendFactorSrc = srcFrame.blendFactorSrc;
    this.blendFactorDst = srcFrame.blendFactorDst;
    this.blendFactorAlphaSrc = srcFrame.blendFactorAlphaSrc;
    this.blendFactorAlphaDst = srcFrame.blendFactorAlphaDst;

    this.magFilter = srcFrame.magFilter;
    this.minFilter = srcFrame.minFilter;
    this.wrap_s = srcFrame.wrap_s;
    this.wrap_t = srcFrame.wrap_t;
    
    this.clippingMode = srcFrame.clippingMode;
    this.clippingRect[0] = srcFrame.clippingRect[0];
    this.clippingRect[1] = srcFrame.clippingRect[1];
    this.clippingRect[2] = srcFrame.clippingRect[2];
    this.clippingRect[3] = srcFrame.clippingRect[3];
}

MxeFrame2D.prototype.copyForPuppet = function(scoreFrame) {
    this.visible = scoreFrame.visible;
    //vec3.set(scoreFrame.siz, this.siz);
    this.magFilter = scoreFrame.magFilter;
    this.minFilter = scoreFrame.minFilter;
    this.useBlending = scoreFrame.useBlending;
    this.alpha = scoreFrame.alpha;
    this.blendFactorSrc = scoreFrame.blendFactorSrc;
    this.blendFactorDst = scoreFrame.blendFactorDst;
    this.blendFactorAlphaSrc = scoreFrame.blendFactorAlphaSrc;
    this.blendFactorAlphaDst = scoreFrame.blendFactorAlphaDst;
    this.wrap_s = scoreFrame.wrap_s;
    this.wrap_t = scoreFrame.wrap_t;
    this.proceduralParams = new Array(scoreFrame.proceduralParams);
};

MxeFrame2D.prototype.make = function(frameNum) {
    this.proceduralParams = this.track.proceduralParams;

    if(frameNum === -1) frameNum = this.track.score.currentFrame;
    //if(frameNum === this.frameNum) return;
    this.frameNum = frameNum;
    if(frameNum >= this.track.animationData.length){
        this.visible = false;
        return;
    }
    var frameData = this.track.animationData[frameNum];
    if(frameData == null){
        this.visible = false;
        return;
    }
    this.cast = frameData[0];
    this.pos[0] = frameData[1][0];
    this.pos[1] = frameData[1][1];
    this.pos[2] = 0.0;
    this.siz[0] = frameData[2][0];
    this.siz[1] = frameData[2][1];
    this.siz[2] = 0.0;
    this.rot = frameData[3];
    
    this.enableTransparentDiscard = false;
    if(frameData.length < 4){    
        this.rot = 0.0;
        this.useBlending = false;
        this.blendFactorSrc = 0x0302; //GL_SRC_ALPHA
        this.blendFactorDst = 0x0303; //GL_ONE_MINUS_SRC_ALPHA
        this.blendFactorAlphaSrc = 0x0302; //GL_SRC_ALPHA
        this.blendFactorAlphaDst = 0x0304; //GL_DST_ALPHA
        this.alpha = 1.0;
    }else{
        //has extension
        this.rot = frameData[3];
        
        if((frameData[4] & 0x40) !== 0){
            this.magFilter = 0x2601; //GL_LINEAR
            this.minFilter = 0x2601; //GL_LINEAR
        }
        
        var blendMode = 0;
        if((frameData[4] & 0x20) !== 0) blendMode = 2; //sub
        if((frameData[4] & 0x80) !== 0) blendMode = 1; //add

        if(blendMode == 0){
            this.useBlending = false;
            this.blendFactorSrc = 0x0302; //GL_SRC_ALPHA
            this.blendFactorDst = 0x0303; //GL_ONE_MINUS_SRC_ALPHA
            this.blendFactorAlphaSrc = 0x0302; //GL_SRC_ALPHA
            this.blendFactorAlphaDst = 0x0304; //GL_DST_ALPHA
        }else if(blendMode == 1){ //add
            this.useBlending = true;
            this.blendFactorSrc = 0x0302; //GL_SRC_ALPHA
            this.blendFactorDst = 0x0001; //GL_ONE
            this.blendFactorAlphaSrc = 0x0302; //GL_SRC_ALPHA
            this.blendFactorAlphaDst = 0x0304; //GL_DST_ALPHA
        }else if(blendMode == 2){ //sub
            this.useBlending = true;
            this.enableTransparentDiscard = true;
            this.blendFactorSrc = 0x0303; //GL_ONE_MINUS_SRC_ALPHA
            this.blendFactorDst = 0x0301; //GL_ONE_MINUS_SRC_COLOR
            this.blendFactorAlphaSrc = 0x0302; //GL_SRC_ALPHA
            this.blendFactorAlphaDst = 0x0304; //GL_DST_ALPHA
        }
        
        this.alpha = frameData[5];        
    }
    if(this.cast !== null) this.visible = true;
}

//スケール1倍の時の幅
MxeFrame2D.prototype.getWidth1x = function() {
    return this.referenceWidth > 0 ? this.referenceWidth : this.cast.getWidth();
};

//スケール1倍の時の高さ
MxeFrame2D.prototype.getHeight1x = function() {
    return  this.referenceHeight > 0 ? this.referenceHeight : this.cast.getHeight();
};

MxeFrame2D.prototype.calcMatrix = function(viewportWidth, viewportHeight) {
    /*
    var xsiz = this.siz[0]/this.cast.image.width;
    var ysiz = this.siz[1]/this.cast.image.height;
    var frameWidth = this.siz[0];
    var frameHeight = this.siz[1];
    */
    if(viewportWidth === 0.0 || viewportHeight === 0.0) return; //can't calc
    
    var xsiz = 1.0;
    var ysiz = 1.0;
    if(this.cast.scalable === true){
        xsiz = this.siz[0];
        ysiz = this.siz[1];
    }
    var width1x = this.getWidth1x();
    var height1x = this.getHeight1x();
    var frameWidth = width1x * xsiz;
    var frameHeight = height1x * ysiz;
    var parentFrame = null;
    if(this.track !== null && this.track.parentTrack !== null){
        parentFrame = this.track.parentTrack.frame;
    }
    if(this.cast.scalable === true && parentFrame !== null){
        this.worldSiz[0] = xsiz * parentFrame.worldSiz[0];
        this.worldSiz[1] = ysiz * parentFrame.worldSiz[1];
        this.worldSiz[2] = 1.0;
        //this.worldRot = this.rot + parentFrame.worldRot;
    }else{
        this.worldSiz[0] = xsiz;
        this.worldSiz[1] = ysiz;
        this.worldSiz[2] = 1.0;
        //this.worldRot = this.rot;
    }
    if(this.worldSiz[0] === 0.0 && this.worldSiz[1] === 0.0){
        this.worldVisible = false; // no process in size 0.
        return;
    }

    this.worldPos[0] = Math.floor(this.pos[0]);
    this.worldPos[1] = Math.floor(this.pos[1]);
    this.worldPos[2] = 0.0;
    if(parentFrame !== null){
        this.worldPos[0]-= parentFrame.getWidth1x()/2.0;
        this.worldPos[1]-= parentFrame.getHeight1x()/2.0;
        
        //get top-left
        mat4.identity(this.worldMatrix);
        this.worldMatrix[12] = this.worldPos[0];
        this.worldMatrix[13] = this.worldPos[1];
        MxeGeom.mat4.scale2D(parentFrame.worldMatrix, parentFrame.worldSiz, this.parentMatrix);
        MxeGeom.mat4.multiply2D(this.parentMatrix, this.worldMatrix, this.worldMatrix);

        //get floor error
        var errX = this.worldMatrix[12] - Math.floor(this.worldMatrix[12]);
        var errY = this.worldMatrix[13] - Math.floor(this.worldMatrix[13]);

        this.worldPos[0] = this.worldMatrix[12] - errX;
        this.worldPos[1] = this.worldMatrix[13] - errY;
    }
    
    //get center pos
    var dx = frameWidth/2.0;
    var dy = frameHeight/2.0;
    if(parentFrame !== null){
        mat4.identity(this.worldMatrix);
        this.worldMatrix[12] = dx;
        this.worldMatrix[13] = dy;
        //if(this.cast.rotatable === true)
        mat4.set(parentFrame.worldMatrix, this.parentMatrix);
        //else
        //    mat4.identity(this.parentMatrix);
        if(this.cast.scalable === true)
            MxeGeom.mat4.scale2D(this.parentMatrix, parentFrame.worldSiz);
        this.parentMatrix[12] = 0;
        this.parentMatrix[13] = 0;
        MxeGeom.mat4.multiply2D(this.parentMatrix, this.worldMatrix, this.worldMatrix);
        dx = this.worldMatrix[12];
        dy = this.worldMatrix[13];
    }
    this.worldPos[0]+= dx;
    this.worldPos[1]+= dy;
    
    //calc world matrix
    mat4.identity(this.worldMatrix);
    if(parentFrame !== null){
        mat4.set(parentFrame.worldMatrix, this.worldMatrix);
    }
    this.worldMatrix[12] = this.worldPos[0];
    this.worldMatrix[13] = this.worldPos[1];
    
    if(this.cast.rotatable === true){
        if(this.rot !== 0.0){
            this.rotOffset[0] = this.cast.rotateCenter[0]*width1x*0.5*this.worldSiz[0];
            this.rotOffset[1] = this.cast.rotateCenter[1]*height1x*0.5*this.worldSiz[1];
            this.rotOffsetNega[0] = - this.rotOffset[0];
            this.rotOffsetNega[1] = - this.rotOffset[1];
            
            MxeGeom.mat4.translate2D(this.worldMatrix, this.rotOffset);
            MxeGeom.mat4.rotate2D(this.worldMatrix, this.rot);
            MxeGeom.mat4.translate2D(this.worldMatrix, this.rotOffsetNega);
        }
    }
        
    //calc view matrix
    mat4.identity(this.viewMatrix);
    MxeGeom.mat4.scale2D(this.viewMatrix, [1.0/viewportWidth, 1.0/viewportHeight, 1.0]);
    if(this.cast.rotatable === true)
        MxeGeom.mat4.multiply2D(this.viewMatrix, this.worldMatrix, this.viewMatrix);
    else
        MxeGeom.mat4.translate2D(this.viewMatrix, this.worldPos);
    MxeGeom.mat4.scale2D(this.viewMatrix, this.worldSiz);
    MxeGeom.mat4.scale2D(this.viewMatrix, [width1x, height1x, 1.0]);
    //to right handed
    this.viewMatrix[1] = -this.viewMatrix[1];
    this.viewMatrix[4] = -this.viewMatrix[4];
    this.viewMatrix[12] = 2.0*this.worldMatrix[12]/viewportWidth-1.0;
    this.viewMatrix[13] = 1.0-2.0*this.worldMatrix[13]/viewportHeight;
};

MxeFrame2D.prototype.prepareRender = function(render) {
    if(this.renderList === null && this.track !== null)
        this.renderList = this.track.renderList;
    var parentTrack = this.track === null ? null :this.track.parentTrack;
    var parentVisible = true;
    if(parentTrack !== null){
        parentVisible = parentTrack.frame.worldVisible;
    }
    this.worldVisible = this.visible && parentVisible;
    if(this.worldVisible && this.cast !== null)
        this.cast.prepareRender(render, this);
    if(this.cast === null)// || ! this.cast.getPrepared())
        this.worldVisible = false;
    if(this.worldVisible){
        this.calcMatrix(render.viewportWidth, render.viewportHeight);
    }
}


var MxeFrameMaterial = function() {
    this.initialize.apply(this, arguments);
};
MxeFrameMaterial.prototype = Object.create(MxeFrame3D.prototype);
MxeFrameMaterial.prototype.constructor = MxeFrameMaterial;

MxeFrameMaterial.prototype.initialize = function(track) {
    MxeFrame3D.prototype.initialize.apply(this, arguments);
};

MxeFrameMaterial.prototype.make = function(frameNum) {
    if(frameNum === -1) frameNum = this.track.score.currentFrame;
    //if(frameNum === this.frameNum) return;
    this.frameNum = frameNum;
    this.validWorldMatrix = false;
    this.visible = true;
    //TODO
};

MxeFrameMaterial.prototype.calcMatrix = function() {
    var parentTrack = this.track.parentTrack;
    if(parentTrack === null){
        mat4.identity(this.worldMatrix);
        mat4.identity(this.skinMatrix);
        this.worldSiz[0] = 1.0;
        this.worldSiz[1] = 1.0;
        this.worldSiz[2] = 1.0;
    }else{
        mat4.set(parentTrack.frame.worldMatrix, this.worldMatrix);
        mat4.set(parentTrack.frame.skinMatrix, this.skinMatrix);
        vec3.set(parentTrack.frame.worldSiz, this.worldSiz);
    }
    this.validWorldMatrix = true;
};


var MxeGeom = function() {
};

MxeGeom.def = {
    MAX_FLOAT: 1e+30,
};

MxeGeom.useTemporary = function() {
    MxeGeom.mat4.tempCtStack[++MxeGeom.mat4.tempCtStackIdx] = 0;
    MxeGeom.quat4.tempCtStack[++MxeGeom.quat4.tempCtStackIdx] = 0;
    MxeGeom.vec3.tempCtStack[++MxeGeom.vec3.tempCtStackIdx] = 0;
};

MxeGeom.releaseTemporary = function() {
    MxeGeom.mat4.tempIdx-= MxeGeom.mat4.tempCtStack[MxeGeom.mat4.tempCtStackIdx--];
    MxeGeom.quat4.tempIdx-= MxeGeom.quat4.tempCtStack[MxeGeom.quat4.tempCtStackIdx--];
    MxeGeom.vec3.tempIdx-= MxeGeom.vec3.tempCtStack[MxeGeom.vec3.tempCtStackIdx--];
};

MxeGeom.mat4 = function() {};

MxeGeom.mat4.tempIdx = -1;
MxeGeom.mat4.temps = [];
MxeGeom.mat4.tempCtStackIdx = -1;
MxeGeom.mat4.tempCtStack = [];
MxeGeom.mat4.getTemporary = function() {
    this.tempIdx++;
    this.tempCtStack[this.tempCtStackIdx]++;
    if(this.tempIdx === this.temps.length){
        this.temps.push(mat4.create());
    }
    return this.temps[this.tempIdx];    
};

MxeGeom.mat4.switchHand = function(m) { //right handed <--> left handed
    m[2] = - m[2];
    m[6] = - m[6];
    m[10] = - m[10];
    m[14] = - m[14];
    return m;
};

MxeGeom.mat4.perspective = function(angle, aspectRatio, near, far, m) {
    var tanFov = Math.tan(angle*Math.PI/360.0);
    m[0]  = 1.0/tanFov;
    m[5]  = aspectRatio/ tanFov;
    //m[10] = far / (near - far);
    m[10] = -(far + near)/(far - near);
    m[11] = -1.0;
    //m[14] = m[10] * near;
    m[14] = -((2.0*far)*near)/(far - near);    
};

MxeGeom.mat4.multiply2D = function(mat, mat2, dest) {
    if(!dest) { dest = mat }
    
    var a00 = mat[0], a01 = mat[1], a03 = mat[3];
    var a10 = mat[4], a11 = mat[5], a13 = mat[7];
    var a30 = mat[12], a31 = mat[13], a33 = mat[15];
    
    var b00 = mat2[0], b01 = mat2[1], b03 = mat2[3];
    var b10 = mat2[4], b11 = mat2[5], b13 = mat2[7];
    var b30 = mat2[12], b31 = mat2[13], b33 = mat2[15];
    
    dest[0] = b00*a00 + b01*a10 + b03*a30;
    dest[1] = b00*a01 + b01*a11 + b03*a31;
    dest[3] = b00*a03 + b01*a13 + b03*a33;
    dest[4] = b10*a00 + b11*a10 + b13*a30;
    dest[5] = b10*a01 + b11*a11 + b13*a31;
    dest[7] = b10*a03 + b11*a13 + b13*a33;
    dest[12] = b30*a00 + b31*a10 + b33*a30;
    dest[13] = b30*a01 + b31*a11 + b33*a31;
    dest[15] = b30*a03 + b31*a13 + b33*a33;
    
    dest[2] = 0.0;
    dest[6] = 0.0;
    dest[8] = 0.0;
    dest[9] = 0.0;
    dest[10] = 1.0;
    dest[11] = 0.0;
    dest[14] = 0.0;
    return dest;
};

MxeGeom.mat4.translate2D = function(mat, vec, dest) {
    var x = vec[0], y = vec[1];
    
    if(!dest || mat == dest) {
        mat[12] = mat[0]*x + mat[4]*y + mat[12];
        mat[13] = mat[1]*x + mat[5]*y + mat[13];
        mat[15] = mat[3]*x + mat[7]*y + mat[15];
        return mat;
    }
    
    var a00 = mat[0], a01 = mat[1], a03 = mat[3];
    var a10 = mat[4], a11 = mat[5], a13 = mat[7];
    
    dest[0] = a00;
    dest[1] = a01;
    dest[3] = a03;
    dest[4] = a10;
    dest[5] = a11;
    dest[7] = a13;
    
    dest[12] = a00*x + a10*y + mat[12];
    dest[13] = a01*x + a11*y + mat[13];
    dest[15] = a03*x + a13*y + mat[15];
    
    dest[2] = 0.0;
    dest[6] = 0.0;
    dest[8] = 0.0;
    dest[9] = 0.0;
    dest[10] = 1.0;
    dest[11] = 0.0;
    dest[14] = 0.0;
    return dest;
};

MxeGeom.mat4.scale2D = function(mat, vec, dest) {
    var x = vec[0], y = vec[1];
    
    if(!dest || mat == dest) {
        mat[0] *= x;
        mat[1] *= x;
        mat[3] *= x;
        mat[4] *= y;
        mat[5] *= y;
        mat[7] *= y;
        return mat;
    }
    
    dest[0] = mat[0]*x;
    dest[1] = mat[1]*x;
    dest[3] = mat[3]*x;
    dest[4] = mat[4]*y;
    dest[5] = mat[5]*y;
    dest[7] = mat[7]*y;
    dest[12] = mat[12];
    dest[13] = mat[13];
    dest[15] = mat[15];

    dest[2] = 0.0;
    dest[6] = 0.0;
    dest[8] = 0.0;
    dest[9] = 0.0;
    dest[10] = 1.0;
    dest[11] = 0.0;
    dest[14] = 0.0;
    return dest;
};

MxeGeom.mat4.rotate2D = function(mat, angle, dest) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    
    var a00 = mat[0], a01 = mat[1], a03 = mat[3];
    var a10 = mat[4], a11 = mat[5], a13 = mat[7];
    
    if(!dest) { 
        dest = mat 
    } else if(mat != dest) {        
        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[15] = mat[15];
    }
    
    dest[0] = a00*c + a10*s;
    dest[1] = a01*c + a11*s;
    dest[3] = a03*c + a13*s;
    
    dest[4] = a00*-s + a10*c;
    dest[5] = a01*-s + a11*c;
    dest[7] = a03*-s + a13*c;
    
    dest[2] = 0.0;
    dest[6] = 0.0;
    dest[8] = 0.0;
    dest[9] = 0.0;
    dest[10] = 1.0;
    dest[11] = 0.0;
    dest[14] = 0.0;
    return dest;
};

MxeGeom.quat4 = function() {};

MxeGeom.quat4.tempIdx = -1;
MxeGeom.quat4.temps = [];
MxeGeom.quat4.tempCtStackIdx = -1;
MxeGeom.quat4.tempCtStack = [];
MxeGeom.quat4.getTemporary = function() {
    this.tempIdx++;
    this.tempCtStack[this.tempCtStackIdx]++;
    if(this.tempIdx === this.temps.length){
        this.temps.push(quat4.create());
    }
    return this.temps[this.tempIdx];
};

MxeGeom.quat4.slerp = function(q0, q1, slerp, qdst){
    var dot;
    var f0;
    var f1;
    var angle;
    
    qdst||(qdst=q0);

    dot = q0[0]*q1[0] + q0[1]*q1[1] + q0[2]*q1[2] + q0[3]*q1[3];
    if(dot < 0.0){
        dot = -dot;
        qdst[0] = -q1[0];
        qdst[1] = -q1[1];
        qdst[2] = -q1[2];
        qdst[3] = -q1[3];
    }else{
        qdst[0] = q0[0];
        qdst[1] = q0[1];
        qdst[2] = q0[2];
        qdst[3] = q0[3];
    }
    if(dot >= 1.0){
        qdst[0] = q0[0];
        qdst[1] = q0[1];
        qdst[2] = q0[2];
        qdst[3] = q0[3];
    }else{
    
        if(dot < 0.999){
            angle = Math.acos(dot);
            f0 = Math.sin(angle*(1.0-slerp))/Math.sin(angle);
            f1 = Math.sin(angle*slerp)/Math.sin(angle);
        }else{ // if the angle is small, use linear interpolation
            f0 = slerp;
            f1 = 1.0 - slerp;
        }
        qdst[0] = f0*q0[0] + f1*q1[0];
        qdst[1] = f0*q0[1] + f1*q1[1];
        qdst[2] = f0*q0[2] + f1*q1[2];
        qdst[3] = f0*q0[3] + f1*q1[3];
    }
    return qdst;
};

MxeGeom.vec3 = function() {};

MxeGeom.vec3.tempIdx = -1;
MxeGeom.vec3.temps = [];
MxeGeom.vec3.tempCtStackIdx = -1;
MxeGeom.vec3.tempCtStack = [];
MxeGeom.vec3.getTemporary = function() {
    this.tempIdx++;
    this.tempCtStack[this.tempCtStackIdx]++;
    if(this.tempIdx === this.temps.length){
        this.temps.push(vec3.create());
    }
    return this.temps[this.tempIdx];
};

MxeGeom.pick = function(polyV0, polyV1, polyV2, polyNorm, pos, dir, crossPoint) { //crossPoint[3] is distance 
    try{
        MxeGeom.useTemporary();
        var dist;        // Official plane and intersection of line = Q+L* N･(V?Q)/N･L // Q: Starting point L: Line V:1 top N: Plane normal
        var dp = vec3.dot(polyNorm, dir);
        if (dp >= 0.0) return false; // 2010/07/01
        if (dp < 0.002 && dp > - 0.002) return false; // Because the less influence of a minute polygon
        dist = vec3.dot(polyNorm, vec3.subtract(polyV0, pos, MxeGeom.vec3.getTemporary()))/dp;
        if (dist < 0.0) return false;
        crossPoint[0] = dir[0] * dist + pos[0];
        crossPoint[1] = dir[1] * dist + pos[1];
        crossPoint[2] = dir[2] * dist + pos[2];
        crossPoint[3] = dist;
        vec3.subtract(polyV0, crossPoint); // Difference vector of intersection and the each polygon vertex
        vec3.subtract(polyV1, crossPoint);
        vec3.subtract(polyV2, crossPoint);
        var cp0 = MxeGeom.vec3.getTemporary();
        var cp1 = MxeGeom.vec3.getTemporary();
        vec3.cross(polyV0, polyV1, cp0);                // The direction of angle that three difference vectors make
        vec3.cross(polyV1, polyV2, cp1);
        if (vec3.dot(cp0, cp1) <= 0.0) return false;        // If it is 180 degrees or more, it is judged the outside of the polygon. 
        vec3.cross(polyV2, polyV0, cp1);
        if (vec3.dot(cp0, cp1) <= 0.0) return false;
        return true;
    } finally {
        MxeGeom.releaseTemporary();
    }
};

MxeGeom.getPolygonNearestPoint = function(pos, v0, v1, v2, d0, d1, d2, nearestPoint) { //nearestPoint[3] is distance^2
    if (d0 === 0.0){ vec3.set(v0, nearestPoint); nearestPoint[3] = 0.0; return 2; }
    if (d1 === 0.0){ vec3.set(v1, nearestPoint); nearestPoint[3] = 0.0; return 2; }
    if (d2 === 0.0){ vec3.set(v2, nearestPoint); nearestPoint[3] = 0.0; return 2; }
    try{
        MxeGeom.useTemporary();
        // It makes it to the vertex near v1 and v2
        var tempV = MxeGeom.vec3.getTemporary();
        var tempd;
        if (d0 < d1){
            if (d1 < d2){ // d2 is max
                vec3.set(v2, tempV); vec3.set(v0, v2); vec3.set(tempV, v0);
                tempd = d2, d2 = d0, d0 = tempd;
            } else {    // d1 is max
                vec3.set(v1, tempV); vec3.set(v0, v1); vec3.set(tempV, v0);
                tempd = d1, d1 = d0, d0 = tempd;
            }
        } else if (d0 < d2){ // d2 is max
            vec3.set(v2, tempV); vec3.set(v0, v2); vec3.set(tempV, v0);
            tempd = d2, d2 = d0, d0 = tempd;
        }
        var v1v2vec = MxeGeom.vec3.getTemporary();
        vec3.subtract(v2, v1, v1v2vec);
        var v1spvec = MxeGeom.vec3.getTemporary();
        vec3.subtract(pos,  v1, v1spvec);
        var dotP1 = vec3.dot(v1v2vec, v1spvec);
        if (dotP1 < 0){ // It is a point near v1. 
            var v1v0vec = MxeGeom.vec3.getTemporary();
            vec3.subtract(v0, v1, v1v0vec);
            dotP1 = vec3.dot(v1v0vec, v1spvec);
            if (dotP1 < 0){
                vec3.set(v1, nearestPoint); // It is a point nearest v1. 
                nearestPoint[3] = d1;
                return 2;
            }
            // A straight line of the starting point, v0, and v1 intersections 
            var mag = vec3.dot(v1v0vec, v1v0vec); //square length
            if (mag === 0.0){
                nearestPoint[3] = MxeGeom.def.MAX_FLOAT; //MXMAXFLOAT
                return -1;
            }
            tempd = dotP1/mag;
            vec3.add(vec3.scale(v1v0vec, tempd, nearestPoint), v1);
            nearestPoint[3] = d1 - dotP1*tempd;
            return 1; // in line
        }
        var v2spvec = MxeGeom.vec3.getTemporary();
        vec3.subtract(pos, v2, v2spvec);
        var dotP2 = - vec3.dot(v1v2vec, v2spvec);
        if (dotP2 < 0.0){ // It is a point near v2. 
            var v2v0vec = MxeGeom.vec3.getTemporary();
            vec3.subtract(v0, v2, v2v0vec);
            dotP2 = vec3.dot(v2v0vec, v2spvec);
            if (dotP2 < 0.0){
                vec3.set(v2, nearestPoint);
                nearestPoint[3] = d2;
                return 2;
            }
            // A straight line of the starting point, v0, and v2 intersections 
            var mag = vec3.dot(v2v0vec, v2v0vec); //square length
            if (mag === 0.0){
                nearestPoint[3] = MxeGeom.def.MAX_FLOAT; //MXMAXFLOAT
                return -1;
            }
            tempd = dotP2/mag;
            vec3.add(vec3.scale(v2v0vec, tempd, nearestPoint), v2);
            nearestPoint[3] = d2 - dotP2*tempd;
            return 1; // in line
        }
        // A straight line of the starting point, v1, and v2 intersections 
        var mag = vec3.dot(v1v2vec, v1v2vec); //square length
        if (mag === 0.0){
            nearestPoint[3] = MxeGeom.def.MAX_FLOAT; //MXMAXFLOAT
            return -1;
        }
        tempd = dotP1/mag;
        vec3.add(vec3.scale(v1v2vec, tempd, tempV), v1);
        if (vec3.dot(vec3.subtract(v0, tempV, MxeGeom.vec3.getTemporary()), vec3.subtract(pos, tempV, MxeGeom.vec3.getTemporary())) < 0.0){ // In this case, it exists on the straight line of v1 and v2. 
            vec3.set(tempV, nearestPoint);
            nearestPoint[3] = d1 - dotP1*tempd;
            return 1; // in line
        }
        // In this case, it exists from the starting point under the perpendicular. 
        var norm = MxeGeom.vec3.getTemporary();
        vec3.normalize(vec3.cross(v1v2vec, vec3.subtract(v0, v1, norm), norm));
        var minD = vec3.dot(norm, pos) - vec3.dot(norm, v0);
        vec3.subtract(pos, vec3.scale(norm, minD, nearestPoint), nearestPoint);
        nearestPoint[3] = minD * minD;
        return 0;
    } finally {
        MxeGeom.releaseTemporary();
    }
};

var MxeEvent = function() {
    this.initialize.apply(this, arguments);
};

MxeEvent.prototype.initialize = function(e) {
    this.type = null;
    this.orgEvent = e;
    this.userObj = null;
};


var MxeUtil = function() {
    this.logLevel = 1;
};

MxeUtil.detectSmartPhone = function (){
    //MxeUtil.log("UA="+navigator.userAgent);
    if (navigator.userAgent.indexOf('iPhone') > 0
            || navigator.userAgent.indexOf('iPod') > 0
            || navigator.userAgent.indexOf('iPad') > 0
            || navigator.userAgent.indexOf('Android') > 0
            || navigator.userAgent.indexOf('Tizen') > 0) {
          return true;
    }
    return false;
};

MxeUtil.log = function(msg, level){
    if(! level) level = 1;
    if(this.logLevel < level) return;
    console.log(msg);
};

var MxeException = function() {
    this.initialize.apply(this, arguments);
};

MxeException.prototype.initialize = function(name, message) {
    if(! name) this.name = "unknown";
    else this.name = name;
    this.message = message;
};

MxeException.prototype.toString = function() {
    return "MxeException : " + this.name + " : " + this.message;
};

var Mxe2DContextTooSmallException = function(){
    this.initialize.apply(this, arguments);
};
Mxe2DContextTooSmallException.prototype = Object.create(MxeException.prototype);
Mxe2DContextTooSmallException.prototype.constructor = Mxe2DContextTooSmallException;
Mxe2DContextTooSmallException.prototype.name = "2dcontexttoosmall";

Mxe2DContextTooSmallException.prototype.initialize = function(message, w, h) {
    this.message = message;
    this.requestWidth = w;
    this.requestHeight = h;
};

var MxeTouchIDNormalizer = function(){
    this.initialize.apply(this, arguments);
};

MxeTouchIDNormalizer.prototype.initialize = function(player) {
    var idTable = {};
    var usedTable = new Int8Array([0,0,0,0,0,0,0,0,]);
    var self = this;

    this.onTouchStart = function(e) {
        for(var i=0; i<e.changedTouches.length; i++){
            var id = e.changedTouches[i].identifier;
            if(idTable[id] !== undefined) continue; //id already exists
            var regID=0;
            for(; regID<usedTable.length; regID++){
                if(usedTable[regID] === 0) break;
            }
            if(regID >= usedTable.length){
                var newUsedTable = new Int8Array(regID);
                newUsedTable.set(usedTable);
                //for(var j=0; j<usedTable.length; j++) newUsedTable[j] = usedTable[j];
                usedTable = newUsedTable;
                //throw new MxeException("touchoverflow", "Touch overflow.");
                //return;
            }
            usedTable[regID] = 1;
            idTable[id] = regID;
        }
    };
    
    this.onTouchEnd = function(e) {
        for(var i=0; i<e.changedTouches.length; i++){
            var id = e.changedTouches[i].identifier;
            var regID = idTable[id];
            if(regID !== undefined){
                usedTable[regID] = 0;
                delete idTable[id];
            }
        }
    };
    
    this.normalize = function(id) {
        if(idTable[id] === undefined) return 0;
        return idTable[id];
    };
    
};
