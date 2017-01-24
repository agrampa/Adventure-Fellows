'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var questionNum = 0;
  //array of phases/titles
  //array of place images
  var staticImageArray = ['../images/cf_building.jpg', '../images/cf_building.jpg', '../images/cf_building.jpg'];
  //array of questions/events
  var staticQuestionArray = ['Yay! You survived the second week of Code Fellows 201! You\'re on a roll!', 'Time to start your week 3 project! How do you get started?', 'Your friends are concerned because they haven’t seen you for a while. They invite you out to dinner, but you can\'t figure out how to get your three images to display on the Busmall project. What do you do?', 'You survived three weeks of Code Fellows 201!'];
  //array of choices for the questions
  var staticChoiceArray = [['Let\'s Keep Going!'],['Stare at a blank screen until you give up', 'Start writing some code and hope that Shia LaBeouf’s magic comes along', 'Go to MDN and figure it out for yourself ', 'Talk to the TAs and your classmates for inspiration '], ['Leave campus early and meet them for dinner', 'Finish your work and silence your phone', 'Tell them you’re still alive and make plans for the weekend', 'Convince them to pick up carry-out and bring it to you '], ['You are amazing!', 'You are almost finished with this course!', 'You can do anything!', 'You are awesome!']];
  //array of responses to the choices
  var staticResponseArray = [['Click here to proceed'],['Did you really think that would work? (grade decreases)', 'Hey, you never know what he\'s capable of! (grade increases)', 'It\'s a great resource, after all (grade increases a lot, social decreases)', 'It might help...or you might get distracted by GIFs and memes (social increases, health and grade decrease)'],['Your brain needed a break anyway (social increases, grade decreases)', 'Who needs friends anyway? (social decreases, grade increases)', 'Well, at least they won\'t file a missing person report. Yet. (social increases slightly, grade increases)', 'They might not appreciate it, but at least they\'ll get to see your face for a few seconds (social decreases, grade increases)'] , ['Take a deep breath and relax... You\'re almost finished...', 'Take a deep breath and relax... You\'re almost finished...', 'Take a deep breath and relax... You\'re almost finished...', 'Take a deep breath and relax... You\'re almost finished...']];

  var uniqueClassPerResponse = [['proceed', 'proceed', 'proceed', 'proceed'], ['blank', 'magic', 'mdn', 'inspiration'], ['leaveEarly', 'silence', 'alive', 'carryOut'], ['amazing', 'finish', 'anything', 'awesome']];
  //increments score
  var affectScore = [[[0, -25, 0], [0, +25, 0], [0, +25, -25], [-25, -25, +25]], [[0, -25, +25], [0, +25, -25], [0, +25, +25], [0, +25, -25]], [[+50, +50, +50], [+50, +50, +50], [+50, +50, +50], [+50, +50, +50]]];
  //array of randomly chosen questions
  var randomQuestionArray = [];
  //corresponding choices to the questions
  var randomChoiceArray = [];
  //corresponding responses to the choices
  var randomResponseArray = [];

  //collecting local storage from character page
  // var local = JASN.parse(localStorage);
  // console.log(local);
  //character constructor
  function Character(local) {
    this.name = local[0];
    this.image = local[1];
    this.health = 100;
    this.grade = 100;
    this.social = 100;
  }

  renderPage();

  function renderPage() {
    renderImage(staticImageArray[questionNum]);
    displayQuestionPrompt(questionNum);
    createDialogue(staticImageArray[questionNum], staticChoiceArray[questionNum], staticResponseArray[questionNum]);
  }

  //RENDERING PAGE
  function renderImage(image) {
    var pageEl = document.getElementById('place-image');
    var imageEl = document.createElement('img');
    imageEl.setAttribute('id', 'background-image');
    imageEl.setAttribute('src', image);
    pageEl.appendChild(imageEl);
  }

  function displayQuestionPrompt(questionNum) {
    var questionContainer = document.getElementById('prompt');
    var displayQuestionEl = document.createElement('p');
    displayQuestionEl.setAttribute('id', 'questionNum');
    displayQuestionEl.textContent = staticQuestionArray[questionNum];
    questionContainer.appendChild(displayQuestionEl);
  }

  function createDialogue(image, choices, responses) {
    var gameText = document.getElementById('game-text');
    for (var i = 0; i < choices.length; i++) {
      var choiceEl = document.createElement('li');
      choiceEl.setAttribute('class', 'question ' + uniqueClassPerResponse[questionNum][i]);
      choiceEl.setAttribute('id', i);
      choiceEl.textContent = choices[i];
      var choicesList = document.getElementById('choices-list');
      choicesList.appendChild(choiceEl);
    }
    handleChoiceClick();      //

  }

  function updateStats(responseIndex) {
    var responseIndex = parseInt(responseIndex);
    var character = JSON.parse(localStorage.character);
    console.log(character);
    for (var i = 0; i < affectScore.length; i++) {
      character.health = character.health + affectScore[responseIndex][i][0];
      console.log('this.health ' + character.health);
      character.grade = character.grade + affectScore[responseIndex][i][1];
      console.log('this.grade ' + character.grade);
      character.social = character.social + affectScore[responseIndex][i][2];
      console.log('this.social ' + character.social);
    }
  }
  //pair programmed with EVERYONE

  function handleChoiceClick() {    //renders the response
    var choicesCollection = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesCollection);

    choicesArray.forEach(function (choice) {
      choice.addEventListener('click', function () {
        renderResponse(this.id, questionNum);
        updateStats(this.id);
      });
    });

  }

  function removePrompt() {
    var promptParent = document.getElementById('prompt');
    var promptChild = document.getElementById('questionNum');
    promptParent.removeChild(promptChild);
  }

  function removeChoiceElements() {
    var choicesList = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesList);
    choicesArray.forEach(function (choice) {
      choice.remove();
    });
  }

  function renderResponse(id, questionNum) {
    removeChoiceElements();
    removePrompt();

    var gameText = document.getElementById('game-text');  //append response to textContent div
    var responsePar = document.createElement('p');
    responsePar.setAttribute('id', 'response-paragraph');

    var responseId = parseInt(id);
    // console.log(responseId);
    responsePar.textContent = staticResponseArray[questionNum][id];
    gameText.appendChild(responsePar);

    if (questionNum < staticQuestionArray.length - 1) {
      responsePar.addEventListener('click', function () {   //when click, clear DOM elements and render new
        console.log('click');
        clearElements();
        renderPage();
      });
    } else {
      renderTransition();
    }
  }

  function clearElements() {
    questionNum++;              //after rendering response, move to next question

    console.log('incrementing...now on question at index: ', questionNum);

    var response = document.getElementById('response-paragraph');
    console.log(response);
    var image = document.getElementById('background-image');
    console.log('removing image');
    image.remove();
    response.remove();
  }

  function renderTransition() {
    var hiddenButton = document.getElementById('link-to-boss');
    hiddenButton.removeAttribute('class', 'hidden');
  }

});
