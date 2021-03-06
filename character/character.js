'use strict';
//creating sound for each click event
var characterSelectMusic = document.getElementById('character-select-music');
var characterHoverSound = document.getElementById('character-hover-sound');
var gameStartSound = document.getElementById('game-start-sound');
characterSelectMusic.play();
//getting username from local storage, printing it with some greeting text
function displayText() {
  var bodyEl = document.getElementById('body');
  var user = localStorage.userName;
  var createHeader = document.createElement('h3');
  createHeader.textContent = ('Hello ' + user + ', please choose a character:'); //please do NOT call JSON.parse on user
  bodyEl.appendChild(createHeader);
}
//gets background colors and applies them to out avatars
var avatarsCollection = document.getElementsByClassName('avatar');
var avatars = Array.prototype.slice.call(avatarsCollection);
var colors = {};
avatars.forEach(function (avatar) {
  colors[avatar.id] = window.getComputedStyle(avatar).backgroundColor;
});
//referencing cartoon avatars
var images = {
  allie: '../images/allieAvatar.png',
  luis: '../images/avatar_luis.png',
  david: '../images/avatar_david.png',
  logan: '../images/logan_avatar.png'
};
displayText();
handleCharacterHover();
//Allie's Data
var allieEl = document.getElementById('choice-one');
var allie = function (event) {
  console.log('click');
  gameStartSound.play();
  gameStartSound.currentTime = 0;
  var check = confirm('Are you sure?');
  if(check === true){
    localStorage.setItem('imgUrl', images.allie);
    localStorage.setItem('background-color', colors['allie-character']);
    localStorage.setItem('health', 100);
    localStorage.setItem('grade', 110);
    localStorage.setItem('social', 90);
    location.href = '../game/intro.html';
  }
};
//Allie's click event
allieEl.addEventListener('click', allie, false);
//Logan's data
var loganEl = document.getElementById('choice-two');
var loganChar = document.getElementById('logan-character');
console.log(loganChar);
var logan = function(event){
  var check = confirm('Are you sure?');
  if(check === true){
    localStorage.setItem('imgUrl', images.logan);
    localStorage.setItem('background-color', colors['logan-character']);
    localStorage.setItem('health', 120);
    localStorage.setItem('grade', 100);
    localStorage.setItem('social', 80);
    location.href = '../game/intro.html';
  }
};
//Logan's click event
loganEl.addEventListener('click', logan, false);
//Luis' data
var luisEl = document.getElementById('choice-three');
var luis = function(event){
  var check = confirm('Are you sure?');
  if (check === true) {
    localStorage.setItem('imgUrl', images.luis);
    localStorage.setItem('background-color', colors['luis-character']);
    localStorage.setItem('health', 110);
    localStorage.setItem('grade', 110);
    localStorage.setItem('social', 80);
    location.href = '../game/intro.html';
  }
};
//Luis's click event
luisEl.addEventListener('click', luis, false);
//David's data
var davidEl = document.getElementById('choice-four');
var david = function(event){
  var check = confirm('Are you sure?');
  if (check === true) {
    localStorage.setItem('imgUrl', images.david);
    localStorage.setItem('background-color', colors['david-character']);

    localStorage.setItem('health', 80);
    localStorage.setItem('grade', 100);
    localStorage.setItem('social', 120);
    location.href = '../game/intro.html';
  }
};
//David's click event
davidEl.addEventListener('click', david, false);
//creates glow and sound when hover over character images
function handleCharacterHover() {
  var avatarsCollection = document.getElementsByClassName('avatar');
  var avatars = Array.prototype.slice.call(avatarsCollection);
  avatars.forEach(function (avatar) {
    avatar.addEventListener('mouseover', function () {
      characterHoverSound.play();
      characterHoverSound.currentTime = 0;

    });
  });
}
