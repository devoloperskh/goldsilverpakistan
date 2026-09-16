document.getElementById("gold").classList.add("loading");
document.getElementById("gold22").classList.add("loading");
document.getElementById("silver").classList.add("loading");

let previousGold24 = null;
let previousGold22 = null;
let previousSilver = null;


function showMovement(elementId, currentPrice, previousPrice) {

  const element = document.getElementById(elementId);

  if (previousPrice === null) {
    element.textContent = "--";
    element.className = "movement";
    return;
  }

  if (currentPrice > previousPrice) {
    element.textContent = "▲ Price increased";
    element.className = "movement up";

  } else if (currentPrice < previousPrice) {
    element.textContent = "▼ Price decreased";
    element.className = "movement down";

  } else {
    element.textContent = "— No change";
    element.className = "movement same";
  }
}


async function loadRates() {

  try {

    const response = await fetch(
      "https://goldrateinpakistan.org/api/rates.json"
    );

    if (!response.ok) {
      throw new Error("Unable to get rates");
    }

    const data = await response.json();
    
document.getElementById("gold").classList.remove("loading");
document.getElementById("gold22").classList.remove("loading");
document.getElementById("silver").classList.remove("loading");
    // 1 Pakistani tola = 11.6638 grams
    const gramsPerTola = 11.6638;


    // -------------------------
    // GOLD 24K
    // -------------------------

    const gold24Tola = data.gold["24k"].per_tola;
    const gold24Gram = gold24Tola / gramsPerTola;

    document.getElementById("gold").textContent =
      "Rs. " + Math.round(gold24Tola).toLocaleString();

    document.getElementById("goldGram").textContent =
      "Rs. " + Math.round(gold24Gram).toLocaleString();

    showMovement(
      "goldMovement",
      gold24Tola,
      previousGold24
    );


    // -------------------------
    // GOLD 22K
    // -------------------------

    const gold22Tola = data.gold["22k"].per_tola;
    const gold22Gram = gold22Tola / gramsPerTola;

    document.getElementById("gold22").textContent =
      "Rs. " + Math.round(gold22Tola).toLocaleString();

    document.getElementById("gold22Gram").textContent =
      "Rs. " + Math.round(gold22Gram).toLocaleString();

    showMovement(
      "gold22Movement",
      gold22Tola,
      previousGold22
    );


    // -------------------------
    // SILVER
    // -------------------------

    const silverTola = data.silver.per_tola;
    const silverGram = silverTola / gramsPerTola;

    document.getElementById("silver").textContent =
      "Rs. " + Math.round(silverTola).toLocaleString();

    document.getElementById("silverGram").textContent =
      "Rs. " + Math.round(silverGram).toLocaleString();

    showMovement(
      "silverMovement",
      silverTola,
      previousSilver
    );


    // -------------------------
    // SAVE CURRENT PRICES
    // -------------------------

    previousGold24 = gold24Tola;
    previousGold22 = gold22Tola;
    previousSilver = silverTola;


    // -------------------------
    // LAST UPDATED
    // -------------------------

    document.getElementById("updated").textContent =
      new Date().toLocaleTimeString();


  } catch (error) {

    document.getElementById("gold").classList.remove("loading");
document.getElementById("gold22").classList.remove("loading");
document.getElementById("silver").classList.remove("loading");
    
    console.log("Rate error:", error);

    document.getElementById("gold").textContent = "Unavailable";
    document.getElementById("gold22").textContent = "Unavailable";
    document.getElementById("silver").textContent = "Unavailable";

  }
}


// Load immediately
loadRates();


// Automatically update every 5 minutes
setInterval(loadRates, 5 * 60 * 1000);