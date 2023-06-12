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
  "For as often as you eat this bread and drink the cup, you proclaim the Lord's death until he comes. (1Cr 11:26)",
  "We were buried therefore with him by baptism into death, in order that, just as Christ was raised from the dead by the glory of the Father, we too might walk in newness of life. (Rom 6:4)",
  "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit. (Mat 28:19)",
  "And as they were eating, Jesus took bread, and after blessing it broke it and gave it to the disciples, and said, 'Take, eat; this is my body.' And he took a cup, and when he had given thanks he gave it to them, saying, 'Drink of it, all of you, for this is my blood of the covenant, which is poured out for many for the forgiveness of sins.' (Mat 26:26)",
  "Jesus said to him, 'I am the way, and the truth, and the life. No one comes to the Father except through me.' (Jhn 14:6)",
  "But God shows his love for us in that while we were still sinners, Christ died for us. (Rom 5:8)",
  "For as many of you as were baptized into Christ have put on Christ. (Gal 3:27)",
  "And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth. (Jhn 1:14)",
  "And Peter said to them, 'Repent and be baptized every one of you in the name of Jesus Christ for the forgiveness of your sins, and you will receive the gift of the Holy Spirit.' (Act 2:38)",
  "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come. (2Cr 5:17)",
  "He himself bore our sins in his body on the tree, that we might die to sin and live to righteousness. By his wounds you have been healed. (1Pe 2:24)",
  "There is therefore now no condemnation for those who are in Christ Jesus. (Rom 8:1)",
  "And we know that for those who love God all things work together for good, for those who are called according to his purpose. (Rom 8:28)",
  "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus. (Phi 4:6)",
  "And he said to him, 'You shall love the Lord your God with all your heart and with all your soul and with all your mind. This is the great and first commandment. And a second is like it: You shall love your neighbor as yourself.' (Mat 22:37)",
  "I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing. (Jhn 15:5)",
  "I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me. (Gal 2:20)",
  "But seek first the kingdom of God and his righteousness, and all these things will be added to you. (Mat 6:33)",
  "Behold, I am coming soon, bringing my recompense with me, to repay each one for what he has done. (Rev 22:12)",
  "I am the good shepherd. The good shepherd lays down his life for the sheep. (Jhn 10:11)",
  "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved. (Rom 10:9)",
  "But thanks be to God, who gives us the victory through our Lord Jesus Christ. (1Cr 15:57)"
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
