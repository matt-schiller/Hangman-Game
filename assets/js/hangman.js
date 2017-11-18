//Set words upfront
var words = [
	"joseph stalin",
	"mao zedong",
	"benito mussolini",
	"pol pot",
	"kim jong il",
	"saddam hussein",
	"robert mugabe",
	"kim jong un",
	"fidel castro",
	"chiang kai shek",
	"idi amin",
	"bashar al assad",
	"ferdinand marcos",
	"francisco franco",
	"ho chi minh",
	"muammar gaddafi",
	"nikita khrushchev",
	"augusto pinochet",
	"suharto",
	"vladimir lenin",
	"emperor hirohito",
	"kaiser wilhelm",
	"adolf hitler"	
	];
var wordsCount = words.length;

//Setup game parameters
var wins = 0;
var losses = 0;
var guessesRemaining;
var lettersGuessed;
var currentWord;

//Start a new subgame with a new word
function setup() {

	//Clear space
	document.getElementById("word").innerHTML = "";
	
	//Select random word from list
	var currentWordIndex = Math.floor(Math.random()*wordsCount);
	currentWord = words[currentWordIndex];

	//Create placeholders
	for (i=0; i<currentWord.length; i++) {
		var newSpan = document.createElement("span");
		if (currentWord[i]== " ") {
			newSpan.innerHTML = ". ";
			newSpan.style.opacity = "0";
		} else {
		newSpan.innerHTML = "_ ";
		};
		newSpan.id = i;
		document.getElementById("word").appendChild(newSpan);
	};

	//Set subgame starting parameters
	guessesRemaining = 8;
	document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
	lettersGuessed = [];
	document.getElementById("letters-guessed").innerHTML = "-";
};

setup();

//When key pressed start subgame routine
window.onkeydown = function(event) {
	var character = String.fromCharCode(event.keyCode).toLowerCase();

	//Check if character has already been guessed
	if (lettersGuessed.indexOf(character) > -1) {
		alert("You already guessed that letter!");

	//Check if character is a valid letter
	} else if (character.match(/[a-z]/i)) {
		//Decrement 'guesses remaining' only if the character isn't in the word
		if (currentWord.indexOf(character) == -1) {
			guessesRemaining--;
		};
		document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
		lettersGuessed.push(character);
		document.getElementById("letters-guessed").innerHTML = lettersGuessed.join(" ");
		//Reveal letter if in placeholders
		for (i=0; i<currentWord.length; i++) {
			if (currentWord.charAt(i) == character) {
				document.getElementById(i).innerHTML = character + " ";
			};
		};
		//Check if 'win' condition met
		if(document.getElementById("word").innerHTML.indexOf("_ ") == -1) {
			wins++;
			document.getElementById("wins").innerHTML = wins;
			$('#win-modal').modal() 
			setup();
		//Check if 'loss' condition met
		} else if (guessesRemaining == 0) {
			losses++;
			document.getElementById("losses").innerHTML = losses;
			$('#lose-modal').modal() 
			setup();
		};
	} else {
		alert("Hmm, you didn't press a letter");
	};
};