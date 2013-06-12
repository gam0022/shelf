var MxeDefaultController = function(contents) {
    var score;
    var track;
    var eventproc = MxeDefaultController.eventproc;
    
    //register event listeners
    
    score = contents.scores[0];
    
    score = contents.scores[1];
    
    track = score.tracks[79];
    score.addEventListener("onexitframe", eventproc.onExitFrame002, this, [1,]);
    
    score = contents.scores[2];
    
    score = contents.scores[3];
    
    track = score.tracks[0];
    track.addEventListener("onclick", eventproc.onCastClick000, this, [0,]);
    
    track = score.tracks[1];
    track.addEventListener("onclick", eventproc.onCastClick001, this, [0,]);
    
    
};

MxeDefaultController.eventproc = {};

//=============================================
// SCRIPT CAST 0
//=============================================

MxeDefaultController.eventproc.onCastClick000 = function(e) {
/*-- original script (1-8) -----------------
OnEvent CastClick(Score,Track,Button,X,Y: Integer);
	// left

	(*if IsRolling = False then
		IsRolling = True;
	end;*)

end;
  -- original script (1-8) -----------------*/
};

//=============================================
// SCRIPT CAST 1
//=============================================

MxeDefaultController.eventproc.onCastClick001 = function(e) {
/*-- original script (1-9) -----------------
OnEvent CastClick(Score,Track,Button,X,Y: Integer);

	// right

  TP.Puppet = True;
	TP.Variable.Visible = True;
  //TP.Variable.Rol.Y = Rol_Y;
  //Rol_Y = Rol_Y + 3.14 / 8;  
end;
  -- original script (1-9) -----------------*/
};

//=============================================
// SCRIPT CAST 2
//=============================================

MxeDefaultController.eventproc.onExitFrame002 = function(e) {
/*-- original script (1-12) -----------------
OnEvent ExitFrame(Score,Track: Integer);
var
	i:integer;
begin
	(*if IsRolling
		Rol_Y = Rol_Y + Rol_YV;
		
		if (Rol_Y mod 90) = 0
			IsRolling = False;
		end
	end*)
end;
  -- original script (1-12) -----------------*/
};

//=============================================
// SCRIPT CAST 3
//=============================================

/*-- original script (3-7) -----------------
var
	Rol_Y:Integer = 0;
	Rol_YV:Integer = 0;
	Rol_YS:Integer = 0; (* 0, 1, 2, 3 の遷移 *)
	IsRolling:Boolean = false;
  -- original script (3-7) -----------------*/

MxePlayer.registerControllerClass(MxeDefaultController);
