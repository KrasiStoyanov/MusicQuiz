'use strict';

import quizes from '../../config/quizes';
import { displayScoreScreen } from './results';

let currentQuiz;
let questions;
let question;
let answer;
let correctAnswer;
let passedQuestions = 0;
let correctQuestions = 0;
const maxAmountOfQuestions = 10;

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

function generateRandomQuestion () {
	let length = questions.length;
	let randomIndex = Math.floor(Math.random() * questions.length);
	let randomQuestion = questions[randomIndex];

	question = randomQuestion;
	questions.splice(randomIndex, 1);
}

function generateQuestionTitle () {
	let title = $('<h4 class="mb-8 font-weight-normal"></h4>');

	title.text(question.question);
	$('#quiz .question').append(title);
}

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

function checkIfAnswerIsCorrect (answer) {
	correctAnswer = question.correctAnswer.toLowerCase();
	answer = answer.toLowerCase();
	if (answer === correctAnswer) {
		correctQuestions += 1;

		return true;
	} else {
		return false;
	}
}

function showNextButton () {
	$('#quiz #next-question')
		.addClass('visible')
		.click(() => {
			nextQuestion();
		});
}

function hideNextButton () {
	$('#quiz #next-question')
		.removeClass('visible')
		.unbind('click');
}

function nextQuestion () {
	$('#quiz .question').addClass('fade-away');
	setTimeout(() => {
		controlQuestions();
	}, 500);
}

function updateProgressBar () {
	let windowWidth = $(window).width();
	let singleQuestionWidth = windowWidth / 10;

	$('#progress .current-progress').css('width', singleQuestionWidth * passedQuestions);
}

function controlQuestions () {
	if (questions.length <= 0) {
		displayScoreScreen();
	} else {
		displayCurrentQuestion();
	}
}

function getCurrentQuiz () {
	return currentQuiz;
}

function getCorrectQuestions () {
	return correctQuestions;
}

function getMaxAmountOfQuestions () {
	return maxAmountOfQuestions;
}

export {
	setCurrentQuiz,
	getCurrentQuiz,
	getCorrectQuestions,
	getMaxAmountOfQuestions,
	hideNextButton
}