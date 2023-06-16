// Importing required fonts
require("Font7x11Numeric7Seg").add(Graphics);
require("FontHaxorNarrow7x17").add(Graphics);


function getSeed() {
  var now = new Date();

  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hours = Math.floor(now.getMinutes() / 60) + now.getHours();

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

  // Bible Verses array
const bibleVerses = [  
  "For all have sinned and fall short of the glory of God, and are justified by his grace as a gift, through the redemption that is in Christ Jesus. (Rom 3:23)",
  "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast. (Eph 2:8)",
  "For as often as you eat this bread and drink the cup, you proclaim the Lord's death until he comes. (1Cr 11:26)",  
  "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit. (Mat 28:19)",
  "And as they were eating, Jesus took bread, and after blessing it broke it and gave it to the disciples, and said, 'Take, eat; this is my body. (Mat 26:26)",
  "Jesus said to him, 'I am the way, and the truth, and the life. No one comes to the Father except through me.' (Jhn 14:6)",
  "But God shows his love for us in that while we were still sinners, Christ died for us. (Rom 5:8)",
  "For as many of you as were baptized into Christ have put on Christ. (Gal 3:27)",
  "And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth. (Jhn 1:14)",  
  "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come. (2Cr 5:17)",
  "He himself bore our sins in his body on the tree, that we might die to sin and live to righteousness. By his wounds you have been healed. (1Pe 2:24)",
  "There is therefore now no condemnation for those who are in Christ Jesus. (Rom 8:1)",
  "And we know that for those who love God all things work together for good, for those who are called according to his purpose. (Rom 8:28)",
  "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. (Phi 4:6)",  
  "I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing. (Jhn 15:5)",
  "I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. (Gal 2:20)",
  "But seek first the kingdom of God and his righteousness, and all these things will be added to you. (Mat 6:33)",
  "Behold, I am coming soon, bringing my recompense with me, to repay each one for what he has done. (Rev 22:12)",
  "I am the good shepherd. The good shepherd lays down his life for the sheep. (Jhn 10:11)",
  "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved. (Rom 10:9)",
  "But thanks be to God, who gives us the victory through our Lord Jesus Christ. (1Cr 15:57)", //END OF NT VERSES
  "In the beginning, God created the heavens and the earth. (Gen 1:1)",
  "I am the LORD your God, who brought you out of the land of Egypt, out of the house of slavery. You shall have no other gods before me. (Exo 20:2)",
  "Hear, O Israel: The LORD our God, the LORD is one. You shall love the LORD your God with all your heart and with all your soul and with all your might. (Deu 6:4)",
  "The LORD is my shepherd; I shall not want. (Psa 23:1)",  
  "God is our refuge and strength, a very present help in trouble. (Psa 46:1)",
  "Trust in the LORD with all your heart, and do not lean on your own understanding. (Pro 3:5)",
  "But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles (Isa 40:31)",
  "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope. (Jer 29:11)",
  "Create in me a clean heart, O God, and renew a right spirit within me. (Psa 51:10)",
  "And I will make of you a great nation, and I will bless you and make your name great, so that you will be a blessing. (Gen 12:2)",
  "He has told you, O man, what is good; and what does the LORD require of you but to do justice, and to love kindness, and to walk humbly with your God? (Mic 6:8)",
  "Your word is a lamp to my feet and a light to my path. (Psa 119:105)",
  "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go. (Jos 1:9)",
  "For everything there is a season, and a time for every matter under heaven. (Ecc 3:1)",
  "For I know that my Redeemer lives, and at the last he will stand upon the earth. (Job 19:25)",
  "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you. (Isa 41:10)",
  "For the LORD is good; his steadfast love endures forever, and his faithfulness to all generations. (Psa 100:5)",
  "Commit your work to the LORD, and your plans will be established. (Pro 16:3)",
  "The steadfast love of the LORD never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness. (Lam 3:22)",
  "And many of those who sleep in the dust of the earth shall awake, some to everlasting life, and some to shame and everlasting contempt. (Dan 12:2)",
  "The LORD will fight for you, and you have only to be silent. (Exo 14:14)",
  "Let everything that has breath praise the LORD! Praise the LORD! (Psa 150:6)",
  "I praise you, for I am fearfully and wonderfully made. Wonderful are your works; my soul knows it very well. (Psa 139:14)"
];

  let initializedText = null;
  let drawTimeout;
  // Get screen dimensions
  const x = g.getWidth() / 2;
  const xFull = g.getWidth();
  const y = g.getHeight() / 2;

  function generateText() {
    g.reset().clearRect(Bangle.appRect);
    initializedText = getRandomElementFromArray(bibleVerses);
    console.log("String refreshed:", initializedText);

    // Draw Bible Verse
    g.setFontAlign(-1, -1).setFont("HaxorNarrow7x17", 1).drawString(g.wrapString(initializedText, g.getWidth()).join("\n"), 0, y - 18);

    //const millisecondsToNextRefresh = 15000 - (Date.now() % 15000); // Refresh at 00, 15, 30 and 45 seconds
    const millisecondsToNextRefresh = 3600000 - (Date.now() % 3600000); // Refresh at the top of every hour
    setTimeout(generateText, millisecondsToNextRefresh);
  }

  const xOffset = -13;  

  // Function to draw the clock face
  let draw = function() {
    if (initializedText === null) {
      generateText();
    }


    //g.reset().clearRect(Bangle.appRect); // Clear whole background (w/o widgets)
    g.clearRect(0,24,176,62); //Just clear the time. Makes it so the text generation logic only needs to run every hour.    
    g.setColor(0,0,0);

    const date = new Date();
    const timeStr = require("locale").time(date, 1); // Get current time

    // Draw time string in hours and minutes
    g.setFontAlign(0, -1).setFont("7x11Numeric7Seg", 3).drawString(timeStr, x + xOffset, 30);

    // Draw seconds string
    const seconds = date.getSeconds();
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    g.setFontAlign(0, -1).setFont("7x11Numeric7Seg", 1).drawString(formattedSeconds, xFull - 25 + xOffset, 33);

    // Draw day of month
    const dayOfMonth = date.getDate();
    const formattedDayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
    g.setFontAlign(0, -1).setFont("7x11Numeric7Seg", 1).drawString(formattedDayOfMonth, xFull - 25 + xOffset, 50);

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