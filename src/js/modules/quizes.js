'use strict';

import quizes from '../../config/quizes';

let currentQuiz;
let questions;
let question;
let answer;

function setCurrentQuiz (id) {
	for (let index in quizes.list) {
		let quiz = quizes.list[index];
		if (quiz.id === id) {
			currentQuiz = quiz;
			questions = quiz.questions;

			break;
		}
	}

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
}

function generateQuestionTitle () {
	let title = $('<h4 class="mb-8 font-weight-normal"></h4>');

	title.text(question.question);
	$('#quiz').append(title);
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

	$('#quiz').append(button);
}

function selectAnAnswer (answer, option) {
	let hasPassed = checkIfAnswerIsCorrect(answer);
	let correctOption = option;
	let icon = correctOption.find('i');

	$('#quiz .option').attr('disabled', true);
	if (hasPassed) {
		icon.addClass('icon-check2');
	} else {
		$('#quiz .option').each((index, item) => {
			item = $(item);
			let ifCorrect = checkIfAnswerIsCorrect(item.text());
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
}

function checkIfAnswerIsCorrect (answer) {
	let correctAnswer = question.correctAnswer.toLowerCase();
	answer = answer.toLowerCase();

	if (answer === correctAnswer) {
		return true;
	} else {
		return false;
	}
}

export {
	setCurrentQuiz,
	generateRandomQuestion
}