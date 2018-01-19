'use strict';

import quizes from '../../config/quizes';
import { getCurrentQuiz, getCorrectAnswers, getMaxAmountOfQuestions, hideNextButton } from './quizes';

/**
 * @function
 * @name displayScoreScreen
 * @description Display the score screen.
 */
function displayScoreScreen () {
	let maxAmountOfQuestions = getMaxAmountOfQuestions();
	let correctQuestions = getCorrectAnswers();
	let scoreText = $(`<h4 class="heading font-weight-normal">Congratulations! You scored <strong class="">${correctQuestions}/${maxAmountOfQuestions}</strong>`)

	$('#quiz')
		.addClass('d-flex')
		.addClass('flex-column')
		.addClass('justify-content-center')
		.addClass('flex-grow');

	$('#progress').remove();
	$('#quiz .question').remove();
	$('#quiz #similar-quizes').addClass('visible');

	$('#quiz #score')
		.addClass('visible')
		.addClass('d-flex')
		.addClass('flex-column')
		.addClass('justify-content-center')
		.addClass('flex-grow')
		.append(scoreText)
		.append(scoreText);

	hideNextButton();
	displaySimilarQuizes();
}

/**
 * @function
 * @name displaySimilarQuizes
 * @description Display the similar quizes.
 */
function displaySimilarQuizes () {
	let currentQuiz = getCurrentQuiz();
	for (let index in quizes.list) {
		let quiz = quizes.list[index];
		if (quiz.id !== currentQuiz.id) {
			displayQuizCard(quiz);
		}
	}
}

/**
 * @function
 * @name displayQuizCard
 * @param { object } quiz - The current quiz.
 * @description Create the visual elements for the quiz card.
 */
function displayQuizCard (quiz) {
	let column = $('<div class="col-md-3"></div>');
	let card = $('<div class="card d-flex flex-row align-items-end p-8"></div>');
	let textWrapper = $('<div class="text w-100"></div>');
	let link = $('<a></a>');
	let title = $('<h3></h3>');
	let description = $('<h6 class="description mb-0"></h6>');

	link.attr('href', `${quiz.link}.html`);
	link.append(title);

	title.text(quiz.title);
	description.text(quiz.subtitle);

	card.css('background-image', `url('${quiz.coverImage}')`);
	textWrapper
		.append(link)
		.append(description);

	card.append(textWrapper);
	column.append(card);
	$('#quiz #similar-quizes .cards-list').append(column);

	setTimeout(() => {
		card.addClass('visible');
	}, 100)
}

export {
	displayScoreScreen
}