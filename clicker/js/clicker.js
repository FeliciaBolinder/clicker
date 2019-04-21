
/* Välj existerande element för manipulation med ID*/
let button = document.getElementById("clickerbutton");
let frostingButton = document.getElementById("frosting");
let scoreDiv = document.getElementById("score");
let powerText = document.getElementById("powerText");
let sprinklesButton = document.getElementById("sprinkles");
let frostingSuper = document.getElementById("frostingSuper");
let soundButton =document.getElementById("Sound");


/* Skapa ett nytt element för poängen */
let scoreText = document.createElement("p");

/* spelvariabler, sprinklesfrosting, sprinkles är powerups*/
let clickValue = 1; // vad är varje click värt
let bank = 0; // hur mycket valuta spelaren har
let frostingCost = 15;
let frostingClicks = 0;
let sprinklesCost = 30;
let sprinkles = null;
let sprinklesTimer = 0;
let frostingPurchased = 0;
let superFrostingPurchased = 0;


/* Startvärden för eleement, text */
scoreText.textContent = "Points: 0";
frostingButton.textContent = "Frosting " + frostingCost;
sprinklesButton.textContent = "sprinkles " + sprinklesCost;

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

/* kod för sprinklespowerup med räknare */
sprinklesButton.addEventListener("click", function() {
	if (bank >= sprinklesCost && sprinklesTimer == 0) {
		bank -= sprinklesCost;
		sprinklesTimer += 10;
		powerText.textContent += "Köpte sprinkles\n";

		// Lägg till setInterval med en funktion som laddas varje sekund
		// sprinklesn använder en timer och fungerar under en period
		sprinkles = setInterval(function() {
			bank += 10;
			scoreText.textContent = "Points: " + Math.floor(bank);
			sprinklesTimer--;

			if (sprinklesTimer == 0) {
				powerText.textContent += "Slut på sprinkles\n";
				clearInterval(sprinkles);  // kalla på clearInterval för att rensa setInterval
			}
		}, 1000);
	} else if (sprinklesTimer > 0) {
		powerText.textContent += "Du har redan sprinkles\n";
	} else {
		powerText.textContent += "Du har inte råd med sprinkles\n";
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
		powerText.textContent += "Köpte frosting\n";
		scoreText.textContent = "Points: " + Math.floor(bank); // sätt textvärdet i p elementet till bank.
	} else {
		powerText.textContent += "Du har inte råd med frosting\n";
	}
}, true);

// superfrosting
frostingSuper.addEventListener("click", function() {
	frostingSuper.style.display = "none";	// göm knappen
	bank = bank * 10;
	superFrostingPurchased = 1;
	powerText.textContent += "DU KÖPTE SUPERFROSTING!\n";
	scoreText.textContent = "Points: " + Math.floor(bank);
}, true);

scoreDiv.appendChild(scoreText); // fäst p elementet i score diven.