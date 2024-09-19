/*ROCK, PAPER OR SCISSORS
INCLUDES A DLC WITH LIZARD AND SPOCK*/
/*
@By theMiki666
@Date 19.9-24
@Ver 1.1 With ID, and without number of rounds
*/

//Step 1.5 (not in the requirements, but I need them for a better coding)

/*CONSTANT DECLARATIONS*/

const ROCK=1;
const PAPER=2;
const SCISSORS=3;
const LIZARD=4;		//For the DLC "Rock, Paper, Scissor, Lizard, Spock"
const SPOCK=5;		//For the DLC

const PLAYER_WINS=1;
const AI_WINS=-1;
const TIE=0;
const ERROR=666;	//In case the inputs or outputs are wrong in the internal logic of the application

const NUMBER_OF_ITEMS=5;	//3 for the regular game, 5 for the DLC; other values become in an error

let HUD;	//HUD with the messages to the player; substitutes console.log

//Step 4: Initialize scores
let computerScore=0;
let humanScore=0;

let explanation;	/*Explanation is a string that describes why some item wins another.	
					  For example: "Lizard eats paper".
					  I have to use a global variable because I don't know how to pass arguments by reference yet in Javascript.*/


//Step 2: prepare computer choice

//THIS FUNCTION IS NOT USED IN THE PROGRAM; IT IS JUST FOR ANSWERING STEP 2
//Poved
function getComputerChoice(){
	return numberToString(Math.floor(Math.random()*NUMBER_OF_ITEMS)+1);
}

//This is the function that is going to be used in the program
//Proved
function getComputerChoiceItem(){
	return Math.floor(Math.random()*NUMBER_OF_ITEMS)+1;
}

//PROVED
function numberToString(number){
	switch (number){
		case ROCK:
			return "rock";
		break;
		case PAPER:
			return "paper";
		break;
		case SCISSORS:
			return "scissors";
		break;
		case LIZARD:
			return "lizard";
		break;
		case SPOCK:
			return "Spock";
		break;
		default:
			return false;
	}
	
}	



//Step 5: Write the logic of a simple round

/*WE HAVE TO CHANGE THIS FUNCTION*/
function playRound(humanItem){
	let comItem=getComputerChoiceItem(); //Instead of getComputerChoice, that returns a string
	//let humanItem=getHumanChoice(); No necessary anymore
	let result=whoWins(humanItem, comItem);
	clearHUD();
	writeOnHUD("You chose "+numberToString(humanItem)+".");
	writeOnHUD("Computer chooses "+numberToString(comItem)+".");
	writeOnHUD(explanation);
	switch (result){
		case PLAYER_WINS: 
			writeOnHUD ("You win!");
			humanScore++;
		break;
		case AI_WINS: 
			writeOnHUD ("Computer wins.");
			computerScore++;
		break;writeOnHUD
		case TIE:
			//Do nothing; explanation already shown
		break;
		default:
			console.error ("Something is wrong at function playRound");
	}
	showScores();
}

//PROVED
function showScores(){
	writeOnHUD (`Your score is ${humanScore}`);
	writeOnHUD (`Computer score is ${computerScore}`);
	if (humanScore>computerScore){
		writeOnHUD ("You are winning.");
	}else if (humanScore<computerScore){
		writeOnHUD ("You are losing.");
	}else{
		writeOnHUD ("The computer and you are tied.");
	}
		
}

//PROVED
function whoWins(itemHuman, itemComputer){
	if (itemHuman<1 || itemComputer<1 || itemHuman>NUMBER_OF_ITEMS || itemComputer>NUMBER_OF_ITEMS){
		console.error ("Wrong entry at whoWins function");
		explanation="ERROR";
		return ERROR;
	} else if (itemHuman==itemComputer){
		explanation="It is a tie!";
		 /*I have to use a global variable because I don't know how to pass arguments by reference yet in Javascript.*/
		return TIE;
	} else {
		return whoWinsLogic (itemHuman, itemComputer);
	}
	
}

//PROVED
function whoWinsLogic (itemHuman, itemComputer){
	/*This is a private function where it is asummed that:
		a) itemHuman and itemComputer are valid values (ROCK, PAPER, SCISSORS, LIZARD OR SPOCK);
		b) itemHuman and itemComputer are diferent
		The function whoWins filter the arguments and call this function
	*/
	let result;
	switch (itemHuman) {
		case ROCK:
			switch (itemComputer){
				case PAPER:
					result=AI_WINS;
					explanation="Paper covers rock.";	
				break;
				case SCISSORS:
					result=PLAYER_WINS;
					explanation="Rock smashes scissors.";	
				break;
				case LIZARD:
					result=PLAYER_WINS;
					explanation="Rock crushes lizard.";	
				break;
				case SPOCK:
					result=AI_WINS;
					explanation="Spock vaporizes rock.";	
				break;
			}
		break;
		
		case PAPER:
			switch (itemComputer){
				case ROCK:
					result=PLAYER_WINS;
					explanation="Paper covers rock.";	
				break;
				case SCISSORS:
					result=AI_WINS;
					explanation="Scissors cuts paper.";	
				break;
				case LIZARD:
					result=AI_WINS;
					explanation="Lizard eats paper.";	
				break;
				case SPOCK:
					result=PLAYER_WINS;
					explanation="Paper disproves Spock.";	
				break;
			}
		break;
		
		case SCISSORS:
			switch (itemComputer){
				case ROCK:
					result=AI_WINS;
					explanation="Rock smashes scissors.";	
				break;
				case PAPER:
					result=PLAYER_WINS;
					explanation="Scissors cuts paper.";	
				break;
				case LIZARD:
					result=PLAYER_WINS;
					explanation="Scissors decapitates lizard.";	
				break;
				case SPOCK:
					result=AI_WINS;
					explanation="Spock melts scissors.";	
				break;
			}
		break;
		
		case LIZARD:
			switch (itemComputer){
				case ROCK:
					result=AI_WINS;
					explanation="Rock crushes lizard.";	
				break;
				case PAPER:
					result=PLAYER_WINS;
					explanation="Lizard eats paper.";	
				break;
				case SCISSORS:
					result=AI_WINS;
					explanation="Scissors decapitates lizard.";	
				break;
				case SPOCK:
					result=PLAYER_WINS;
					explanation="Lizard poisons Spock.";	
				break;
			}
		break;
		
		case SPOCK:
			switch (itemComputer){
				case ROCK:
					result=PLAYER_WINS;
					explanation="Spock vaporizes rock.";	
				break;
				case PAPER:
					result=AI_WINS;
					explanation="Paper disproves Spock.";	
				break;
				case SCISSORS:
					result=PLAYER_WINS;
					explanation="Spock melts scissors.";	
				break;
				case LIZARD:
					result=AI_WINS;
					explanation="Lizard poisons Spock.";	
				break;
			}
		break;
	}
	return result;
	
}


/*UI BRANCH
@19.9-24
These functions are made for the UI branch*/

/*Actives one round with the human item choice depending on the pressed button*/
function buttonChoice (event){
	let humanChoice=(parseInt(event.target.id.charAt(6)));  //We need only the final character (the number) of the id
	playRound(humanChoice);
}

//MAIN - THIS IS THE STARTING PROGRAM
document.body.onload= function () {


	//First, we assing funcionality to the buttons
	const buttons = document.querySelectorAll(".item-button");
	for (const button of buttons){
		button.addEventListener ("click", buttonChoice);
	}

	//Second: we assing the HUD paragraph
	HUD = document.querySelector("#HUD");

	//Third: we assign the function resetGame to the reset button
	document.querySelector("#reset").addEventListener("click", resetGame);

	//Four: if the game is not the DLC, we play without lizard and Spock
	switch (NUMBER_OF_ITEMS){
		case 5:
			//The DLC; do nothing
		break;
		case 3:
			//We make invisible buttons lizard and Spock
			buttons[3].style.visibility="hidden";
			buttons[4].style.visibility="hidden";
		break;
		default:
			console.error(`NUMBER_OF_ITEMS is ${NUMBER_OF_ITEMS} and it must be 3 or 5`);
			
	}
}

function clearHUD(){
	HUD.innerHTML=null;
}

function writeOnHUD(message){
	let m=document.createTextNode(message);
	let br=document.createElement("br");
	HUD.appendChild(br);
	HUD.appendChild(m);
}

function resetGame(){
	humanScore=0;
	computerScore=0;
	clearHUD();
}

