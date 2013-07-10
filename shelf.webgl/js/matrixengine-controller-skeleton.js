var model = new Model();

var MxeDefaultController = function(contents) {
    var score;
    var track;
    var eventproc = MxeDefaultController.eventproc;
    
    //register event listeners
    
    score = contents.scores[0];
    
    score = contents.scores[1];
    
    track = score.tracks[78];
    score.addEventListener("onmousedown", eventproc.onMouseDown000, this, [1,]);
    score.addEventListener("onmousemove", eventproc.onMouseMove000, this, [1,]);
    score.addEventListener("onmouseup", eventproc.onMouseUp000, this, [1,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame000, this, [1,]);
    
    score = contents.scores[2];
    
    score = contents.scores[3];
    
    model.init(contents);
};

MxeDefaultController.eventproc = {};

//=============================================
// SCRIPT CAST 0
//=============================================

MxeDefaultController.eventproc.onExitFrame000 = function(e) {
/*-- original script (1-3) -----------------
OnEvent ExitFrame(Score,Track: Integer);
	(*/ model.shelf_main(); /*)
end;
  -- original script (1-3) -----------------*/
};

MxeDefaultController.eventproc.onMouseDown000 = function(e) {
/*-- original script (5-7) -----------------
OnEvent MouseDown(Score,Track,Button,X,Y: Integer);
	(*/ model.mouse_down(e); /*)
end;
  -- original script (5-7) -----------------*/
};

MxeDefaultController.eventproc.onMouseMove000 = function(e) {
/*-- original script (10-12) -----------------
OnEvent MouseMove(Score,Track,Button,X,Y: Integer);
	(*/ model.mouse_move(e); /*)
end;
  -- original script (10-12) -----------------*/
};

MxeDefaultController.eventproc.onMouseUp000 = function(e) {
/*-- original script (15-17) -----------------
OnEvent MouseUp(Score,Track,Button,X,Y: Integer);
	(*/ model.mouse_up(e); /*)
end;
  -- original script (15-17) -----------------*/
};

MxePlayer.registerControllerClass(MxeDefaultController);
