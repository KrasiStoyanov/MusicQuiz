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
	for (let index in quizes.list) {
		let quiz = quizes.list[index];
		if (quiz.id === id) {
			currentQuiz = quiz;
			questions = quiz.questions;

			break;
		}
	}

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
	for (let jndex in question.answers) {
		answer = question.answers[jndex];

		generateOption();
	}
}

/**
 * @function
 * @name generateRandomQuestion
 * @description Generate a random question.
 */
function generateRandomQuestion () {
	let length = questions.length;
	let randomIndex = Math.floor(Math.random() * questions.length);
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
 * @description Create the visual element for the option button.
 */
function generateOption () {
	let button = $('<button class="btn btn-md btn-outline-light mr-5 option"></button>');
	let result = $('<div class="result"></div>');
	let icon = $('<i class=""></i>');

	button.click((e) => {
		let answer = $(e.currentTarget).text();

		selectAnAnswer(answer, $(e.currentTarget));
	});

	result.append(icon);
	button.text(answer);
	button.append(result);

	$('#quiz .question').append(button);
}

/**
 * @function
 * @name selectAnAnswer
 * @description Update the render when an answer has been chosen.
 */
function selectAnAnswer (answer, option) {
	let hasPassed = checkIfAnswerIsCorrect(answer);
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
			let ifCorrect = item.text().toLowerCase() === correctAnswer.toLowerCase();
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
 * @name selectAnAnswer
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