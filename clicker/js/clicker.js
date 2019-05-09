
/* Välj existerande element för manipulation med ID*/
let button = document.getElementById("clickerbutton");
let frostingButton = document.getElementById("frosting");
let scoreDiv = document.getElementById("score");
let powerText = document.getElementById("powerText");
let cherryButton = document.getElementById("cherry");
let frostingSuper = document.getElementById("frostingSuper");
let soundButton =document.getElementById("Sound");
var audio = new Audio('music.mp3');




/* Skapa ett nytt element för poängen */
let scoreText = document.createElement("p");
let textDiv = document.createElement("t"); 

/* spelvariabler, cherryfrosting, cherry är powerups*/
let clickValue = 1; // vad är varje click värt
let bank = 0; // hur mycket valuta spelaren har
let frostingCost = 15;
let frostingClicks = 0;
let cherryCost = 30;
let cherry = null;
let cherryTimer = 0;
let frostingPurchased = 0;
let superFrostingPurchased = 0;

function swapImage(id,primary,secondary) {
	src=document.getElementById(id).src;
	if (src.match(primary)) {
	  document.getElementById(id).src=secondary;
	} else {
	  document.getElementById(id).src=primary;
	}
  }

function changeImage() {
	var image = document.getElementById('sound');
	if (image.src.match("bild")) {
	  image.src = "bild/soundOn.png";
	  audio.play();
	  
	} else {
	  image.src = "bild/soundOff.png";
	  audio.pause();
	}
  }
 
/* Startvärden för eleement, text */
scoreText.textContent = "Points: 0 ";





/* click event + logic */
button.addEventListener("click", function() {
	// kontrollera om vi har etts prinkles aktivt, annars återställ clickValue
	if (frostingClicks > 0) {
		frostingClicks--;

	} else if (frostingClicks == 0) {
		clickValue = 1;		
	}
	bank += clickValue; // lägg till värdet vid click
	scoreText.textContent = "Points: " + Math.floor(bank); // sätt textvärdet i p elementet till bank.
}, true);

/* kod för cherrypowerup med räknare */
cherryButton.addEventListener("click", function() {
	if (bank >= cherryCost && cherryTimer == 0) {
		bank -= cherryCost;
		cherryTimer += 10;
		powerText.textContent += "Bought cherry\n";

		// Lägg till setInterval med en funktion som laddas varje sekund
		// cherryn använder en timer och fungerar under en period
		cherry = setInterval(function() {
			bank += 10;
			scoreText.textContent = "Points: " + Math.floor(bank);
			cherryTimer--;

			if (cherryTimer == 0) {
				powerText.textContent += "No more cherries...\n";
				clearInterval(cherry);  // kalla på clearInterval för att rensa setInterval
			}
		}, 1000);
	} else if (cherryTimer > 0) {
		powerText.textContent += "You already have cherry\n";
	} else {
		powerText.textContent += "You can't afford cherry\n";
	}
}, true);

// knapp och kod för frosting powerup
// frosting är en one time powerup som kostar mer allteftersom
frostingButton.addEventListener("click", function() {
	if (bank >= frostingCost) {
		clickValue *= 2;
		bank -= frostingCost;
		frostingCost *= 1.4;
		frostingClicks += 10;

		// FIXA för superfrosting!
		frostingPurchased++; // ny rad för att lägga till köpta frosting
		if (rfrostingPurchased > 9 && superFrostingPurchased != 1) { // kontrollera om vi köpt 10 frosting
			frostingSuper.style.display = "inline";	// visa knappen
		}

		frostingButton.textContent = "Frosting " + Math.floor(frostingCost);
		powerText.textContent += "Bought frosting\n";
		

		scoreText.textContent = "Points: " + Math.floor(bank); // sätt textvärdet i p elementet till bank.
	} else {
		powerText.textContent += "You can't afford frosting\n";
	}
}, true);

// superfrosting
frostingSuper.addEventListener("click", function() {
	frostingSuper.style.display = "none";	// göm knappen
	bank = bank * 10;
	superFrostingPurchased = 1;
	powerText.textContent += "YOU BOUGHT SUPER FROSTING!\n";
	scoreText.textContent = "Points: " + Math.floor(bank);
}, true);

scoreDiv.appendChild(scoreText); // fäst p elementet i score diven.


 