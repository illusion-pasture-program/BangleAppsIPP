// Importing required fonts
require("Font7x11Numeric7Seg").add(Graphics);
require("FontHaxorNarrow7x17").add(Graphics);

function getSeed() {
  var now = new Date();

  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hours = Math.round(now.getMinutes() / 60) + now.getHours();

  var seed = year * 1000000 + month * 10000 + date * 100 + hours;
  return seed;
}

function rndSeed(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getRandomElementFromArray(array) {
  var seed = getSeed();
  var randomIndex = Math.floor(rndSeed(seed) * array.length);
  return array[randomIndex];
}

// Encapsulating the clock functionality in an IIFE (Immediately Invoked Function Expression)
// for avoiding global scope pollution and ensuring proper garbage collection when unloaded
(function() {
  let drawTimeout;

  // Function to draw the clock face
  let draw = function() {
    // Get screen dimensions
    const x = g.getWidth() / 2;
    const xFull = g.getWidth();
    const y = g.getHeight() / 2;

    g.reset().clearRect(Bangle.appRect); // Clear whole background (w/o widgets)

    const date = new Date();
    const timeStr = require("locale").time(date, 1); // Get current time

    // Draw time string in hours and minutes
    g.setFontAlign(0, -1).setFont("7x11Numeric7Seg", 3).drawString(timeStr, x, 30);

    // Draw seconds string
    const seconds = date.getSeconds();
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    g.setFontAlign(0, -1).setFont("7x11Numeric7Seg", 1).drawString(formattedSeconds, xFull - 25, 33);

    // Draw day of month
    const dayOfMonth = date.getDate();
    const formattedDayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
    g.setFontAlign(0, -1).setFont("7x11Numeric7Seg", 1).drawString(formattedDayOfMonth, xFull - 25, 50);

    // Bible Verses array
    const bibleVerses = [
      "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life. (Jhn 3:16)",
      "For all have sinned and fall short of the glory of God, and are justified by his grace as a gift, through the redemption that is in Christ Jesus. (Rom 3:23)",
      "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast. (Eph 2:8)",
      "For as often as you eat this bread and drink the cup, you proclaim the Lord's death until he comes. (1Cr 11:26)"
    ];

    // Get a random Bible verse from the array
    const randomVerse = getRandomElementFromArray(bibleVerses);

    // Draw Bible Verse
    g.setFontAlign(-1, -1).setFont("HaxorNarrow7x17", 1).drawString(g.wrapString(randomVerse, g.getWidth()).join("\n"), 0, y - 18);

    // Queue next draw after one second
    if (drawTimeout) clearTimeout(drawTimeout);
    drawTimeout = setTimeout(draw, 1000 - (Date.now() % 1000));
  };

  // Handle middle button press to show launcher
  Bangle.setUI({
    mode: "clock",
    remove: function () {
      // Unload clock app
      if (drawTimeout) clearTimeout(drawTimeout);
      drawTimeout = undefined;
    }
  });

  // Load widgets and draw clock
  Bangle.loadWidgets();
  draw();
  setTimeout(Bangle.drawWidgets, 0);
})();
