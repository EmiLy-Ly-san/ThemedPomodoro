//VARIABLES
let timerView = document.querySelector(".timerView");
//Buttons
let playButton = document.querySelector(".play");
let backPlayButton = document.querySelector(".buttonPlay");
let stopButton = document.querySelector(".stop");
let backStopButton = document.querySelector(".buttonStop");
let pauseButton = document.querySelector(".pause");
let backPauseButton = document.querySelector(".buttonPause");
let breakSessionButton = document.querySelector(".breakSession");
let WorkSessionButton = document.querySelector(".workSession");
/*//workRainbow
let workLimeRainbow = document.querySelector(".lime");
let workPeachRainbow = document.querySelector(".peach");
let workCorailRainbow = document.querySelector(".corail");
let workRoseRainbow = document.querySelector(".rose");
let workPurpleRainbow = document.querySelector(".purple");
//breakRainbow
let breakRainbow = document.querySelector(".breakRainbow");
let breakBlueRainbow = document.querySelector(".blue");
let breakSkyBlueRainbow = document.querySelector(".skyBlue");
let breakLightBlueRainbow = document.querySelector(".lightBlue");
let breakGreenRainbow = document.querySelector(".green");
let breakLimeGreenRainbow = document.querySelector(".limeGreen");*/
let sessionTime;
let timeCalled;
let minutes = 25;
let secondes = "00";
let interval;
//Alarm
let alarmAudio = new Audio("/alarms/marimba-ringtone-2-185153.mp3");
let containerAlarm = document.querySelector(".containerAlarm");

//THEMES//
class Theme {
  constructor(themeConfig) {
    this.background = themeConfig.background;
    this.circle1 = themeConfig.circle1;
    this.circle2 = themeConfig.circle2;
    this.circle3 = themeConfig.circle3;
    this.circle4 = themeConfig.circle4;
    this.circle5 = themeConfig.circle5;
    this.ringSound = themeConfig.ringSound;
    this.ringPicture = themeConfig.ringPicture;
    this.buttonsColor = themeConfig.buttonsColor;
  }
}

const starWarsConfig = {
  background: "#325EAA",
  circle1: "#A3C4F3",
  circle2: "#90DBF4",
  circle3: "#8EECF5",
  circle4: "#98F5E1",
  circle5: "#B9FBC0",
  ringSound: "alarms/Voicy_Star Wars Main Theme (Full).mp3",
  ringPicture: "images/icons8-soldat-d'assaut.svg",
  buttonsColor: "#325EAA",
};

/*const strangerThingsConfig = {
  background:,
  circle1:.
  circle2:,
  circle3:,
  circle4:,
  circle5:,
  ringSound:,
  ringPicture:,
};*/

const animalCrossingConfig = {
  background: "#ff8c9a",
  circle1: "#fbf8cc",
  circle2: "#fde4cf",
  circle3: "#ffcfd2",
  circle4: "#f1c0e8",
  circle5: "#cfbaf0",
  ringSound: "alarms/Voicy_Animal Crossing New Horizons Theme music.mp3",
  ringPicture: "images/Bluebear_NH_Villager_Icon.png",
  buttonsColor: "#ff8c9a",
};

const themeCollection = {
  starWars: new Theme(starWarsConfig),
  /*strangerThings: new Theme(strangerThingsConfig),*/
  animalCrossing: new Theme(animalCrossingConfig),
};

let themeButtons = document.querySelectorAll(".choiceTheme");
let themeUserChoice;

function themeUserSet() {
  themeButtons.forEach(function (themeButton) {
    themeButton.addEventListener("click", () => {
      themeUserChoice = themeCollection[themeButton.id];
      console.log(themeUserChoice);
      letTheme(themeUserChoice);
    });
  });
}

function letTheme(themeUserChoice) {
  document.body.style.background = themeUserChoice.background;
  document
    .querySelector(".circle1__Stroke")
    .setAttribute("stroke", `${themeUserChoice.circle1}`);
  document
    .querySelector(".circle2__Stroke")
    .setAttribute("stroke", `${themeUserChoice.circle2}`);
  document
    .querySelector(".circle3__Stroke")
    .setAttribute("stroke", `${themeUserChoice.circle3}`);
  document
    .querySelector(".circle4__Stroke")
    .setAttribute("stroke", `${themeUserChoice.circle4}`);
  document
    .querySelector(".circle5__Stroke")
    .setAttribute("stroke", `${themeUserChoice.circle5}`);
  alarmAudio = new Audio(`${themeUserChoice.ringSound}`);
  document
    .querySelector(".iconAlarm")
    .setAttribute("src", `${themeUserChoice.ringPicture}`);
  const choices = document.getElementsByClassName("choice");
  Array.from(choices).forEach(function (choice) {
    choice.style.background = themeUserChoice.buttonsColor;
  });
}

//STYLE AND CONTENT PRESET
timerView.textContent = `${minutes} mn : ${secondes} s`;
WorkSessionButtonDisplayInline();
WorkSessionButtonActiv();
breakSessionButtonDisplayInline();
breakSessionButtonActiv();
document.querySelector(".buttonsBar").style.display = "none";
//containerAlarm.style.display = "none";

// FUNCTION INTERACTIVITY
/******RAINBOWS*/
/*function workRainbowInitalColor() {
  workLimeRainbow.style.background = "#FBF8CC";
  workPeachRainbow.style.background = "#FDE4CF";
  workCorailRainbow.style.background = "#FFCFD2";
  workRoseRainbow.style.background = "#F1C0E8";
  workPurpleRainbow.style.background = "#CFBAF0";
}

function workRainbowPink() {
  workLimeRainbow.style.background = "#DD7884";
  workPeachRainbow.style.background = "#DD7884";
  workCorailRainbow.style.background = "#DD7884";
  workRoseRainbow.style.background = "#DD7884";
  workPurpleRainbow.style.background = "#DD7884";
}

function breakRainbowInitialColor() {
  breakBlueRainbow.style.background = "#A3C4F3";
  breakSkyBlueRainbow.style.background = "#90DBF4";
  breakLightBlueRainbow.style.background = "#8EECF5";
  breakGreenRainbow.style.background = "#98F5E1";
  breakLimeGreenRainbow.style.background = "#B9FBC0";
}

function breakRainbowPink() {
  breakBlueRainbow.style.background = "#DD7884";
  breakSkyBlueRainbow.style.background = "#DD7884";
  breakLightBlueRainbow.style.background = "#DD7884";
  breakGreenRainbow.style.background = "#DD7884";
  breakLimeGreenRainbow.style.background = "#DD7884";
}*/

/******PLAYBUTTON*/
function playButtonActiv() {
  playButton.addEventListener("click", startSession);
  playButton.style.cursor = "pointer";
  backPlayButton.style.border = "solid 3px #DCFFE5";
  backPlayButton.style.background = "#FF8C9A";
}

function playButtonInactiv() {
  playButton.removeEventListener("click", startSession);
  playButton.style.cursor = "none";
  backPlayButton.style.border = "solid 1px #DCFFE5";
  backPlayButton.style.background = "#DD7884";
}

function playButtonDisplayBlock() {
  playButton.style.display = "block";
}

function playButtonDisplayNone() {
  playButton.style.display = "none";
}

/******PAUSEBUTTON*/
function pauseButtonActiv() {
  pauseButton.addEventListener("click", pauseSession);
  pauseButton.style.cursor = "pointer";
  backPauseButton.style.border = "solid 3px #DCFFE5";
  backPauseButton.style.background = "#FF8C9A";
}

function pauseButtonInactiv() {
  pauseButton.removeEventListener("click", pauseSession);
  pauseButton.style.cursor = "none";
  backPauseButton.style.border = "solid 1px #DCFFE5";
  backPauseButton.style.background = "#DD7884";
}

function pauseButtonDisplayBlock() {
  pauseButton.style.display = "block";
}

function pauseButtonDisplayNone() {
  pauseButton.style.display = "none";
}

/******STOPBUTTON*/
function stopButtonActiv() {
  stopButton.addEventListener("click", stop);
  stopButton.style.cursor = "pointer";
  backStopButton.style.border = "solid 3px #DCFFE5";
  backStopButton.style.background = "#FF8C9A";
}

function stopButtonInactiv() {
  stopButton.removeEventListener("click", stop);
  stopButton.style.cursor = "none";
  backStopButton.style.border = "solid 1px #DCFFE5";
  backStopButton.style.background = "#DD7884";
}

function stopButtonDisplayBlock() {
  stopButton.style.display = "block";
}

function stopButtonDisplayNone() {
  stopButton.style.display = "none";
}

/******WORKSESSIONBUTTON*/
function WorkSessionButtonActiv() {
  WorkSessionButton.addEventListener("click", onclickNewWorkSession);
  WorkSessionButton.style.cursor = "pointer";
  WorkSessionButton.style.border = "solid 3px #DCFFE5";
  WorkSessionButton.style.background = "#FF8C9A";
}

function WorkSessionButtonInactiv() {
  WorkSessionButton.removeEventListener("click", onclickNewWorkSession);
  WorkSessionButton.style.cursor = "none";
  WorkSessionButton.style.border = "solid 1px #DCFFE5";
  WorkSessionButton.style.background = "#DD7884";
}

function WorkSessionButtonDisplayInline() {
  WorkSessionButton.style.display = "inline";
}

function WorkSessionButtonDisplayNone() {
  WorkSessionButton.style.display = "none";
}

/******BREAKSESSIONBUTTON*/
function breakSessionButtonActiv() {
  breakSessionButton.addEventListener("click", onclickBreakCallButton);
  breakSessionButton.style.cursor = "pointer";
  breakSessionButton.style.border = "solid 3px #DCFFE5";
  breakSessionButton.style.background = "#FF8C9A";
}

function breakSessionButtonInactiv() {
  breakSessionButton.removeEventListener("click", onclickBreakCallButton);
  breakSessionButton.style.cursor = "none";
  breakSessionButton.style.border = "solid 1px #DCFFE5";
  breakSessionButton.style.background = "#DD7884";
}

function breakSessionButtonDisplayInline() {
  breakSessionButton.style.display = "inline";
}

function breakSessionButtonDisplayNone() {
  breakSessionButton.style.display = "none";
}

/******AUDIO ALARM*/
function ringAlarm() {
  alarmAudio.play();
}

function stopAlarm() {
  alarmAudio.pause();
}

////FUNCTIONS GENERAL

function transformTimeAsADate(sessionTime) {
  timeAsADate = new Date(sessionTime);
  minutes = timeAsADate.getMinutes();
  secondes = timeAsADate.getSeconds();
}

function onclickNewWorkSession() {
  timeCalled = 25 * 60 * 1000;
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  timerView.textContent = `${minutes} mn : ${secondes} s`;
  startSession();
  document.querySelector(".buttonsBar").style.display = "flex";
  WorkSessionButtonInactiv();
  breakSessionButtonActiv();
  playButtonInactiv();
  pauseButtonActiv();
  stopButtonActiv();
}

function onclickBreakCallButton() {
  timeCalled = 5 * 1000;
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  timerView.textContent = `${minutes} mn : ${secondes} s`;
  startSession();
  document.querySelector(".buttonsBar").style.display = "flex";
  breakSessionButtonInactiv();
  WorkSessionButtonActiv();
  playButtonInactiv();
  pauseButtonActiv();
  stopButtonActiv();
}

function startSession() {
  clearInterval(interval);
  interval = setInterval(countDown, 1000);
  playButtonInactiv();
  pauseButtonActiv();
  stopButtonActiv();
}

function countDown() {
  sessionTime = sessionTime - 1000;
  transformTimeAsADate(sessionTime);
  minutes = timeAsADate.getMinutes();
  secondes = timeAsADate.getSeconds();
  timerView.textContent = `${minutes} mn : ${secondes} s`;
  if (sessionTime < 0) {
    clearInterval(interval);
    timerView.textContent = `Time out`;
    containerAlarm.style.display = "flex";
    ringAlarm();
    containerAlarm.addEventListener("click", stopAlarm);
  }
}

function stop() {
  clearInterval(interval);
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  timerView.textContent = `${minutes} mn : ${secondes} s`;
  stopButtonInactiv();
  playButtonActiv();
  pauseButtonInactiv();
}

function pauseSession() {
  clearInterval(interval);
  pauseButtonInactiv();
  playButtonActiv();
}

themeUserSet();
