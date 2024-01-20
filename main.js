let hasStarted = false;
let count = 9;
let choices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let player_moves = [];
let comp_moves = [];
let winningChoices = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
let smartChoices = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
let smartChoices2 = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
start();

function play() {
	if (hasWinningMove(winningChoices, comp_moves)) {
		$("h1").text("Game Over press any key to play Again");
		hasStarted = false;
		start();
	} else {
		$(".tile").on("click", function () {
			if (hasStarted) {
				let tile = this.id;
				if (Math.floor(tile) === choices[Math.floor(tile)]) {
					playerPlays(tile);
					console.log(hasWinningMove(winningChoices, player_moves));
					if (hasWinningMove(winningChoices, player_moves)) {
						$("h1").text("You win");
						setTimeout(function () {
							hasStarted = false;
							start();
						}, 500);
					} else setTimeout(compChoice, 800);
				} else {
					$("h1").text("Already Chosen, Try Again");
					setTimeout(function () {
						$("h1").text("");
					}, 800);
				}
			}
		});
	}
}

function playerPlays(t) {
	count--;
	player_moves.push(parseInt(t));
	playSound("./sounds/blue.mp3");
	$("#" + t)
		.html("X")
		.hide()
		.fadeIn(600);
	$(".tile").unbind();
	choices[Math.floor(t)] = "X";
}
function compChoice() {
	// check to see if the player played two or more moves
	let choice;
	if (comp_moves.length >= 2 || player_moves.length >= 2) {
		choice = compWin(comp_moves, smartChoices2);
		if (choice === undefined) choice = makeSmart(player_moves, smartChoices);
	} else choice = Math.floor(Math.random() * 9);
	if (choices[choice] === choice) {
		count--;
		comp_moves.push(choice);

		choices[choice] = "O";
		console.log(choice);
		playSound("./sounds/comp.mp3");
		$("#" + choice.toString())
			.html("O")
			.hide()
			.fadeIn(600);
		play();
	} else if (choices[choice] !== choice && count !== 0) {
		compChoice();
		// }
	}
}

function hasWinningMove(winChoices, movesMade) {
	if (movesMade.length >= 3) {
		for (let i = 0; i < winChoices.length; i++) {
			let check = 0;
			for (let j = 0; j < winChoices[i].length; j++) {
				// console.log(winChoices[i][j]);
				if (movesMade.includes(winChoices[i][j])) {
					check++;
				}
			}
			if (check === 3) {
				return true;
			} else if (i < winChoices.length - 1) continue;
			else {
				if (count === 0) {
					$("h1").html("Draw, Press any key to restart");
					setTimeout(function () {
						hasStarted = false;
					}, 500);
					start();
				}
				return false;
			}
		}
		$("h1").html("Draw, Press any key to restart");
		hasStarted = false;
		start();
	} else return false;
}

function start() {
	$("body").on("click", function () {
		if (!hasStarted) {
			hasStarted = true;
			choices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
			smartChoices = [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6],
			];
			smartChoices2 = [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6],
			];
			$("h1").html("Started");
			player_moves = [];
			comp_moves = [];
			count = 9;
			$(".tile").text("");
			play();
		}
	});
}

function playSound(file) {
	let aud = new Audio(file);
	aud.play();
}

function makeSmart(playersMoves, smartMove) {
	for (let i = 0; i < smartMove.length; i++) {
		let c = [];
		for (let j = 0; j <= 2; j++) {
			if (playersMoves.includes(smartMove[i][j])) {
				c.push(smartMove[i].indexOf(smartMove[i][j]));
			}
		}
		if (c.length === 2) {
			for (let a = 0; a <= 2; a++) {
				if (!c.includes(a)) {
					let smartM = smartMove[i][a];
					smartMove.splice(i, 1);
					return smartM;
				}
			}
		}
	}
	return Math.floor(Math.random() * 9);
}

function compWin(comMove, smaMove) {
	for (let i = 0; i < smaMove.length; i++) {
		let c = [];
		for (let j = 0; j <= 2; j++) {
			if (comMove.includes(smaMove[i][j])) {
				c.push(smaMove[i].indexOf(smaMove[i][j]));
			}
		}
		if (c.length === 2) {
			for (let a = 0; a <= 2; a++) {
				if (!c.includes(a)) {
					let smartM = smaMove[i][a];
					smaMove.splice(i, 1);
					return smartM;
				}
			}
		}
	}
}
