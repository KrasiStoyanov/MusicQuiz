'use strict';

import quizes from '../../config/quizes';
import { displayScoreScreen } from './results';

let currentQuiz;
let questions;
let question;
let answer;
let correctAnswer;
let passedQuestions = 0;
let correctAnswers = 0;

const maxAmountOfQuestions = 10;

/**
 * @function
 * @name setCurrentQuiz
 * @param { number } id - The ID of the quiz.
 * @description Get the current quiz data and call a function to display it.
 */
function setCurrentQuiz (id) {
	let quizList = quizes.list;
	currentQuiz = quizList.filter(q => q.id === id)[0];
	questions = currentQuiz.questions;

	displayCurrentQuestion();
}

/**
 * @function
 * @name displayCurrentQuestion
 * @description Display the current quiz.
 */
function displayCurrentQuestion () {
	$('#quiz .question')
		.removeClass('fade-away')
		.empty();

	hideNextButton();
	generateRandomQuestion();
	generateQuestionTitle();

	for (let index in question.answers) {
		let answer = question.answers[index];

		generateOption(answer);
	}
}

/**
 * @function
 * @name generateRandomQuestion
 * @description Generate a random question.
 */
function generateRandomQuestion () {
	let lengthOfQuestions = questions.length;
	let randomIndex = Math.floor(Math.random() * lengthOfQuestions);
	let randomQuestion = questions[randomIndex];

	question = randomQuestion;
	questions.splice(randomIndex, 1);
}

/**
 * @function
 * @name generateQuestionTitle
 * @description Create the visual element for the title of the question.
 */
function generateQuestionTitle () {
	let title = $('<h4 class="mb-8 font-weight-normal"></h4>');

	title.text(question.question);
	$('#quiz .question').append(title);
}

/**
 * @function
 * @name generateOption
 * @param { string } answerText - The current answer text.
 * @description Create the visual element for the option button.
 */
function generateOption (answerText) {
	let button = $('<button class="btn btn-md btn-outline-light mr-5 option"></button>');
	let result = $('<div class="result"></div>');
	let icon = $('<i class=""></i>');

	result.append(icon);
	button.text(answerText);
	button.append(result);

	button.click((e) => {
		let clickedButton = $(e.currentTarget);
		let selectedAnswer = clickedButton.text();

		selectAnAnswer(selectedAnswer, clickedButton);
	});

	$('#quiz .question').append(button);
}

/**
 * @function
 * @name selectAnAnswer
 * @param { string } selectedAnswer - The selected answer text.
 * @param { DOM element } option - The selected option.
 * @description Update the render when an answer has been chosen.
 */
function selectAnAnswer (selectedAnswer, option) {
	let hasPassed = checkIfAnswerIsCorrect(selectedAnswer);
	let correctOption = option;
	let icon = correctOption.find('i');

	$('#quiz .option')
		.attr('disabled', true)
		.unbind('click');

	if (hasPassed) {
		icon.addClass('icon-check2');
	} else {
		$('#quiz .option').each((index, item) => {
			item = $(item);
			let currentOption = $(item);
			let currentAnswer = currentOption.text().toLowerCase();
			let ifCorrect = currentAnswer === correctAnswer.toLowerCase();
			if (ifCorrect) {
				correctOption = item;

				return false;
			}
		});

		icon.addClass('icon-x');
		icon = correctOption.find('i');
		option.addClass('failed');
	}

	icon.addClass('icon-check2');
	correctOption.attr('disabled', false);
	correctOption.addClass('passed');

	passedQuestions += 1;
	updateProgressBar();
	showNextButton();
}

/**
 * @function
 * @name checkIfAnswerIsCorrect
 * @param { string } answer - The answer that needs to be processed.
 * @description Check if the chosen answer is correct.
 */
function checkIfAnswerIsCorrect (answer) {
	correctAnswer = question.correctAnswer.toLowerCase();
	answer = answer.toLowerCase();
	if (answer === correctAnswer) {
		correctAnswers += 1;

		return true;
	} else {
		return false;
	}
}

/**
 * @function
 * @name showNextButton
 * @description Show the button that goes to the next question.
 */
function showNextButton () {
	$('#quiz #next-question')
		.addClass('visible')
		.click((e) => {
			nextQuestion();

			let button = $(e.currentTarget);
			button.unbind();
		});
}

/**
 * @function
 * @name hideNextButton
 * @description Hide the button that goes to the next question.
 */
function hideNextButton () {
	$('#quiz #next-question')
		.removeClass('visible')
		.unbind('click');
}

/**
 * @function
 * @name nextQuestion
 * @description Update the render with the new question.
 */
function nextQuestion () {
	$('#quiz .question').addClass('fade-away');
	setTimeout(() => {
		controlQuestions();
	}, 500);
}

/**
 * @function
 * @name updateProgressBar
 * @description Update the progress bar's width.
 */
function updateProgressBar () {
	let windowWidth = $(window).width();
	let singleQuestionWidth = windowWidth / 10;

	$('#progress .current-progress').css('width', singleQuestionWidth * passedQuestions);
}

/**
 * @function
 * @name controlQuestions
 * @description Control the UI whether you are on the questions screen or on the results screen.
 */
function controlQuestions () {
	if (questions.length <= 0) {
		displayScoreScreen();
	} else {
		displayCurrentQuestion();
	}
}

/**
 * @function
 * @name getCurrentQuiz
 * @return { object } The current quiz.
 */
function getCurrentQuiz () {
	return currentQuiz;
}

/**
 * @function
 * @name getCorrectAnswers
 * @return { number } The amount of correct questions.
 */
function getCorrectAnswers () {
	return correctAnswers;
}

/**
 * @function
 * @name getMaxAmountOfQuestions
 * @return { number } The maximum amount of questions there can be.
 */
function getMaxAmountOfQuestions () {
	return maxAmountOfQuestions;
}

export {
	setCurrentQuiz,
	getCurrentQuiz,
	getCorrectAnswers,
	getMaxAmountOfQuestions,
	hideNextButton
}