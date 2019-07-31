export function SimonGame(maxdiff) {
    this.queue = [];
    this.difficulty = 1;
    this.maxdiff = maxdiff;
    this.levels = [];
    this.notes = ["Abutton", "Down", "Left", "Right", "Up"];
    this.smalls = [
"<img src='./media/A.png' class='smallA'>",
"<img src='./media/cdownsmall.png' class='small'></img>",
"<img src='./media/cleftsmall.png' class='small'></img>",
"<img src='./media/crightsmall.png' class='small'></img>",
"<img src='./media/cupsmall.png'  class=' small'></img>"
];
}

SimonGame.prototype.GenMove = function () {
    this.difficulty;
    for (var i = 0; i < this.difficulty; i++)
        this.queue.push(this.colors[Math.floor(Math.random() * this.colors.length)]);

}

SimonGame.prototype.ContinueCheck = function () {

}

export function Player() {
    this.moves = [];

}
SimonGame.prototype.ReadyInstrument = function () {


}
Player.prototype.InstrumentPlay = function (inputs) {

}
SimonGame.prototype.AddInstrument = function () {
    var curgame = this;
    this.notes.forEach(function (thenote,i) {
        $("#" + thenote).click(function () {
            $("#played").show();
            $("#" + thenote + "wav")[0].pause();
            $("#" + thenote + "wav")[0].currentTime = 0;
            $("#" + thenote + "wav")[0].play();
            $("#" + thenote+"img").hide();
            $("#" + thenote + "pressedimg").show();
            $("#buffer")[0].currentTime = 0;
            $("#buffer")[0].play();
            $("#played").append(curgame.smalls[i]);
            $("#" + thenote + "wav")[0].onended = function(){
                $("#" + thenote+'img').show();
                $("#" + thenote + "pressedimg").hide();
            };
            $("#buffer")[0].onended = function(){
            $("#played").html("");
            $("#played").hide();
            };
        });
    });
}   