	//GLOBAL VARIABLES

	var heroChosen = false;
	var opponentChosen = false;
	var gameLost = false;
	var gameWon = false;
	var attBase = [];
	var winCount = 0;
		
	// FUNCTIONS

	function startGame() {
		$(".eventText").html("Pick a hero to Fight!");
		
		//Hero Statistics
		$("#hero1").data({"name": "The Hound", "health": 180, "attack": 30, "counterattack": 30}); 
		$("#hero2").data({"name": "Tyrion Lannister", "health": 100, "attack": 40, "counterattack": 10});
		$("#hero3").data({"name": "Jon Snow", "health": 135, "attack": 15, "counterattack": 20});
		$("#hero4").data({"name": "Daeynerys Targaryen", "health": 150, "attack": 25, "counterattack": 15});
		
		//Health and Names
		$(".hero1Name").html($("#hero1").data("name"));
		$(".hero1Health").html($("#hero1").data("health"));
		$(".hero2Name").html($("#hero2").data("name"));
		$(".hero2Health").html($("#hero2").data("health"));
		$(".hero3Name").html($("#hero3").data("name"));
		$(".hero3Health").html($("#hero3").data("health"));
		$(".hero4Name").html($("#hero4").data("name"));
		$(".hero4Health").html($("#hero4").data("health"));
	}
	
	//Choose Hero
	$(".heroes").on("click", function() {
		if (gameLost) {
			return;
		}
		else if (heroChosen && opponentChosen) {
			return false; //Only 1 hero can be picked
		}
		else if (!heroChosen) {
			$(this).appendTo(".hero"); 
			$(this).attr("class", "heroes attacker");
			$(".heroes").not($(this)).appendTo(".opponentBox");
			heroChosen = true;
			attBase = $(this).data("attack"); //base attack
		}
		else if (heroChosen && !opponentChosen) {
			if ($(this).attr("class") == "heroes attacker") {
				return; //Hero stays in place
			}
			else {
				$(this).appendTo(".badGuy"); //Only 1 bad guy can be picekd
				$(this).attr("class", "heroes defender");
				opponentChosen = true;
			}
		}
	});
	
	function fighting() {
		var $attacker = $(".attacker");
		var $defender = $(".defender");
		var hit1 = $(".attacker").data("attack");
		var hit2 = $(".defender").data("counterattack");
		var heroHealth = $(".attacker").data("health");
		var opponentHealth = $(".defender").data("health");
		var $defName = $(".defender").data("name");
		
		$attacker.data("attack", hit1 + attBase);
		$attacker.data("health", heroHealth - hit2);
		$defender.data("health", opponentHealth - hit1);
		
		
		//Update attacker's and defender's health
		heroHealth = $(".attacker").data("health");
		opponentHealth = $(".defender").data("health");
		
		$(".eventText").html("<p>You hit " + $defName + " for " + hit1 + " damage.</p>" + "<p>" + $defName + " hit you back for " + hit2 + " damage.</p>");
		
		//Show changes to health
		$(".hero1Health").html($("#hero1").data("health"));
		$(".hero2Health").html($("#hero2").data("health"));
		$(".hero3Health").html($("#hero3").data("health"));
		$(".hero4Health").html($("#hero4").data("health"));
		
		if ((opponentHealth < 1) && (heroHealth > 0)) {
			$defender.appendTo(".defeated");
			$(".eventText").append("You beat " + $defName);
			opponentChosen = false;
			winCount++;
		}
		//Tried to make health of Hero go back up if brought below zero on same move as opponent
		// else if ((opponentHealth < 1) && (heroHealth < 1)) {
		// 	$attacker.data("health", heroHealth + hit2);
		// 	$defender.appendTo(".defeated");
		// 	$(".eventText").append("You beat " + $defName);
		// 	opponentChosen = false;
		// 	winCount++;
		//}
		if ((heroHealth < 1) && (opponentHealth > 0)) {
			$(".eventText").append("<p>You have been defeated by " + $defName + "!</p>" + "<p>BETTER LUCK NEXT TIME!</p>");
			gameLost = true;
		}
		else if ((heroHealth < 1) && (opponentHealth < 1)) {
			$(".eventText").html("<p>You have been defeated by " + $defName + "!</p>" + "<p>BETTER LUCK NEXT TIME!</p>");
			gameLost = true;
		}
		
		if ((winCount == 3) && (heroHealth > 0)) {
			$(".eventText").append("<p>WINNER!</p>");
			gameWon = true;
		}
	}
	
	function restart() {
		//Restarts Game
		$(".heroes").show();
		$(".heroes").appendTo(".heroBox");
		$(".attacker").attr("class", "heroes");
		$(".defender").attr("class", "heroes");
		
		//Resets Attributes
		heroChosen = false;
		opponentChosen = false;
		gameLost = false;
		gameWon = false;
		winCount = 0;
		
		startGame();
	}
	
	//MAIN CONTENT
	$(document).ready(function() {
	startGame();

	$("#fight").on("click", function() {
		if (gameLost) {
			return;
		}
		else if (gameWon) {
			return;
		}
		else if (!heroChosen) {
			$(".eventText").html("Choose A Hero");
		}
		else if (!opponentChosen) {
			$(".eventText").html("Choose An Opponent");
		}
		else {
			fighting();
		}
	});
	
	$("#restart").on("click", function() {
		restart();
	});
});