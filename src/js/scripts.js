import './../media/cdown.png'
import './../media/cleft.png'
import './../media/cright.png'
import './../media/cup.png'
import './../media/A.png'
import './../media/cdownsmall.png'
import './../media/cleftsmall.png'
import './../media/crightsmall.png'
import './../media/cupsmall.png'
import './../media/cuppress.png'
import './../media/cdownpress.png'
import './../media/cleftpress.png'
import './../media/crightpress.png'
import './../media/cuppress.png'
import './../media/Apress.png'
import './../media/A.wav'
import './../media/cpad.png'
import './../media/Right.wav'
import './../media/Left.wav'
import './../media/Down.wav'
import './../media/Up.wav'
import './../media/Wrong.wav'
import './../media/silence.wav'
import './../css/styles.css';
import {SimonGame, Player} from './Simon.js';
$(document).ready(function () {
    $("#played").hide();
var simon = new SimonGame(3);
simon.AddInstrument();
});

