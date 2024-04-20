function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function OpeningCeremony(callbackFnc) {
    console.log("Let the games begin");
    let score = { red: 0, blue: 0, green: 0, yellow: 0 };
    setTimeout(() => {
      Race100M(score, callbackFnc);
    }, 1000);
  }
  
  function Race100M(score, callbackFnc) {
    console.log("Race 100M");
    let raceTimes = {
      red: getRandomInt(10, 15),
      blue: getRandomInt(10, 15),
      green: getRandomInt(10, 15),
      yellow: getRandomInt(10, 15)
    };
  
    let sortedColors = Object.keys(raceTimes).sort((a, b) => raceTimes[a] - raceTimes[b]);
    score[sortedColors[0]] += 50;
    score[sortedColors[1]] += 25;
  
    console.log("Race results:", raceTimes);
    console.log("Updated score:", score);
  
    delay(3000).then(() => {
      callbackFnc(score, LongJump);
    });
  }
  
  function LongJump(score, callbackFnc) {
    console.log("Long Jump");
    let winningColor = Object.keys(score)[getRandomInt(0, 3)];
    score[winningColor] += 150;
  
    console.log(`${winningColor} won the Long Jump`);
    console.log("Updated score:", score);
  
    delay(2000).then(() => {
      callbackFnc(score, HighJump);
    });
  }
  
  function HighJump(score, callbackFnc) {
    console.log("High Jump");
    let userInput = prompt("What color secured the highest jump?");
    if (userInput && userInput.toLowerCase() in score) {
      score[userInput.toLowerCase()] += 100;
      console.log(`${userInput} secured the highest jump`);
    } else {
      console.log("Event was cancelled");
    }
  
    console.log("Updated score:", score);
    AwardCeremony(score);
  }
  
  function AwardCeremony(score) {
    console.log("Award Ceremony");
    let sortedScores = Object.entries(score).sort((a, b) => b[1] - a[1]);
    console.log(`${sortedScores[0][0]} came first with ${sortedScores[0][1]} points.`);
    console.log(`${sortedScores[1][0]} came second with ${sortedScores[1][1]} points.`);
    console.log(`${sortedScores[2][0]} came third with ${sortedScores[2][1]} points.`);
  }
  
  function startSportsDay() {
    OpeningCeremony((score, callbackFnc) => callbackFnc(score, LongJump));
  }