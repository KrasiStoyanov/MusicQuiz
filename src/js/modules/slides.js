'use strict';

let slider = $('#slider');
let slides = $('.slide');

const slideGutter = 75;
const containerWidth = 1170;
const gridGutter = 30;
const columnWidth = (containerWidth / 12) - gridGutter;
const slideWidth = (columnWidth * 8) + (gridGutter * 7);

function scaleSlides () {
	slides.each(function (index, item) {
		$(item)
			.css('flex', `0 0 ${slideWidth}px`)
			.css('max-width', slideWidth);
	});

	setTimeout(function () {
		slider
			.css('opacity', 1)
			.css('visibility', 'visible');
	}, 300);
}

function moveSlide(id) {
	let windowWidth = $(window).width();
	let windowHalfWidth = windowWidth / 2;
	let slideThatNeedsToBeCentered = $(slides.filter(`#slide-${id}`)[0]);
	let howMuchToMoveWith;

	setTimeout(function () {
		let offsetLeft = slideThatNeedsToBeCentered.offset().left;
		let moveToHalfWindow = offsetLeft - windowHalfWidth;
		console.log(moveToHalfWindow)

		howMuchToMoveWith = -moveToHalfWindow - (slideWidth / 2);

		slider.css('left', howMuchToMoveWith);
		slides.removeClass('center');
		slideThatNeedsToBeCentered.addClass('center');
	}, 300);
}

export {
	scaleSlides,
	moveSlide
}