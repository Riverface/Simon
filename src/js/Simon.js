export function SimonGame(diff,maxdiff) {
        this.queue = [],
        this.difficulty = diff,
        this.maxdiff = maxdiff,
        this.levels = [],
        this.notes = ["Abutton", "Down", "Left", "Right", "Up"],
        this.smalls = [
            "<img src='./media/A.png' class='smallA'>",
            "<img src='./media/cdownsmall.png' class='small'></img>",
            "<img src='./media/cleftsmall.png' class='small'></img>",
            "<img src='./media/crightsmall.png' class='small'></img>",
            "<img src='./media/cupsmall.png'  class=' small'></img>"
        ],
        this.sounds = [
            "<audio src='./media/A.wav' autoplay class='Abuttonwav'></audio>",
            "<audio src='./media/Down.wav' autoplay class='Downwav'></audio>",
            "<audio src='./media/Left.wav' autoplay class='Leftwav'></audio>",
            "<audio src='./media/Right.wav' autoplay class='Rightwav'></audio>",
            "<audio src='./media/Up.wav' autoplay class='Upwav'></audio>"
        ],
        this.keycodes = [
            "65",
            "40",
            "37",
            "39",
            "38"
        ],
        this.canuse = true,
        this.notect = 0,
        this.turn = 0,
        this.playerturn = [],
        this.cputurn = [],
        this.strike = 0,
        this.limit = 3,
        this.correct = 0,
        this.turnscorrect = 0;
        this.totalcorrect = 0;
}
SimonGame.prototype.switchturn = function () {
    var curgame = this;
    if (this.turn == 0) {
        curgame.canuse = false;
        this.turn = 1;
        //switch to CPU turn
        curgame.GenMove();

    } else {
        this.turn = 0;
        curgame.canuse = true;
        //switch to Player turn

    }
    this.notect = 0;
    $(".small").removeClass("animated");
    $("#played").html("");
    $("#played").hide();

}
SimonGame.prototype.GenMove = function () {
    console.log(this.difficulty);
    var iterator = this.cputurn.length;
    var curgame = this;
    var randum;
    for (var i = iterator; i < curgame.difficulty; i++) {
        randum = this.notes[Math.floor(Math.random() * this.notes.length)];
        this.cputurn.push(randum);
    }
    this.cputurn.forEach(function (thenote, secs) {
        setTimeout(() => {

            curgame.PlayInstrument(thenote, curgame.notes.indexOf(thenote));
            console.log(curgame.cputurn.length - 1, secs)
            if (secs == curgame.cputurn.length - 1) {
                setTimeout(() => {
                    curgame.switchturn();
                    
                }, 1000);
            }
        }, secs * 500);

    });
}
SimonGame.prototype.Correct = function(){
    var curgame = this;
    $("#Correct").prop("volume", 0.25);
    $("#Correct")[0].play();
    $("#Correct")[0].onended = function () {
        curgame.difficulty++;
        curgame.switchturn();
        curgame.strike = 0;
        if(curgame.gameOn == 1){
            curgame.Lives();
        }
    }
    curgame.totalcorrect+= curgame.correct;
    curgame.correct = 0;
    curgame.turnscorrect++;
    curgame.strike = 0;
    curgame.playerturn = [];
    
    if(curgame.difficulty == curgame.maxdiff){
    $("#Winner")[0].play();
    }
}
SimonGame.prototype.ContinueCheck = function () {
    var curgame = this;
    curgame.correct = 0;
    console.log("triggered");
    this.playerturn.forEach(function (curnote, i = 0) {
        console.log(curnote, curgame.cputurn[i]);
        if (curnote == curgame.cputurn[i]) {

            
            curgame.correct++;
            if (curnote == curgame.cputurn[i] && curgame.correct == curgame.cputurn.length) {
                curgame.Correct();

                return;
            }
        } 
        else{
            curgame.strike++;
            curgame.Lives();
            if (curgame.strike == curgame.limit) {
                
                if(curgame.difficulty < 12){
                    $("#youngdeath")[0].play();
                }
                if(curgame.difficulty > 12){
                    $("#adultdeath")[0].play();
                }
                curgame.difficulty = 0;
                $("#Lose")[0].play();
                $("#Lose")[0].onended = function(){
                    $(".heartcontainers").hide();
                    $("#gamemenu").show();
                    curgame.strike = 0;
                    curgame.playerturn = [];
                    console.log(curgame.playerturn);
                    curgame.gameOn = 0;
                };
                
            }
            
            else {
                curgame.Wrong();
                
                curgame.playerturn = [];

                return;
                
            }
            
        }
        });
    }
SimonGame.prototype.Initialize = function () {
    this.Menu();
    this.AddInstrument();
}
SimonGame.prototype.Menu = function () {
    var curgame = this;
    $(".heartcontainers").hide();
    $("#gamestarter").click(function () {
        $(".heartcontainers").show();
        curgame.difficulty=$("#Startdiff").val()
        curgame.gameOn = 1;
        curgame.switchturn();
        curgame.Lives();
        $("#gamemenu").hide();
        
    });
}

SimonGame.prototype.PlayInstrument = function (thenote, i) {
    var curgame = this;

    if (curgame.notect < 25) {
        curgame.notect++;
        $("#played").show();
        $("#soundqueue").append(curgame.sounds[i]);
        $("." + thenote + "wav")[0].play();
        $("#" + thenote + "img").hide();
        $("#" + thenote + "pressedimg").show();
        $("#buffer")[0].currentTime = 0;
        $("#buffer")[0].play();
        $("#played").append(curgame.smalls[i]);
        $("." + thenote + "wav").prop("volume", 0.1);
        $("." + thenote + "wav")[0].onended = function () {
            $("#" + thenote + 'img').show();
            $("#" + thenote + "pressedimg").hide();
            $("." + thenote + "wav").remove();
        };

        $("#buffer")[0].onended = function () {
            $("#played").html("");
            $("#played").hide();
            curgame.notect = 0;
        };
    } else {
        curgame.Wrong();
    }

}
SimonGame.prototype.Wrong = function(){
    var curgame=this;
    curgame.canuse = false;
    $("#Wrong").prop("volume",0.25);
    $("#Wrong")[0].play();
    $(".small").addClass("animated");
    $(".smallA").addClass("animated");
    $("#Wrong")[0].onended = function () {
        curgame.notect = 0;
        $(".small").removeClass("animated");
        $("#played").html("");
        $("#played").hide();
        curgame.canuse = true;
    }
    curgame.playerturn = [];
    if(curgame.gameOn == 1){
        curgame.Lives();
    }
}
SimonGame.prototype.Lives = function(){
var curgame=this;
$("#heart1").removeClass("heartfull");
$("#heart2").removeClass("heartfull");
$("#heart3").removeClass("heartfull");
for(var lives = 0; lives <= curgame.limit - curgame.strike; lives++ ){
    console.log("butt");
    $("#heart"+(lives)).addClass("heartfull");
}

}
SimonGame.prototype.AddInstrument = function () {
    var curgame = this;
    this.notes.forEach(function (thenote, i) {
        $("#" + thenote).click(function () {
            if (curgame.turn == 0) {
                curgame.PlayInstrument(thenote, i);
                console.log(curgame.gameOn);
                if (curgame.gameOn == 1) {
                    
                    curgame.playerturn.push(curgame.notes[i]);
                    curgame.ContinueCheck();
                }
            }
        });
        $(document).keydown(function (thiskey) {

            if (curgame.turn == 0) {
                if (thiskey.keyCode == curgame.keycodes[i]) {
                    $("#" + thenote).trigger("click");
                }
                
            }

        });

    });
}
