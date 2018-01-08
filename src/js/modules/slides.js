'use strict';

let slider = $('#slider');
let slides = $('.slide');

const slideGutter = 75;
const containerWidth = 1170;
const gridGutter = 30;
const columnWidth = (containerWidth / 12) - gridGutter;
const slideWidth = (columnWidth * 8) + (gridGutter * 7);

let currentSlideId = 0;

function scaleSlides () {
	slides.each((index, item) => {
		$(item)
			.css('flex', `0 0 ${slideWidth}px`)
			.css('max-width', slideWidth);
	});

	setTimeout(() => {
		slider
			.css('opacity', 1)
			.css('visibility', 'visible');
	}, 300);
}

function moveSlide(id) {
	let windowWidth = $(window).width();
	let windowHalfWidth = windowWidth / 2;
	let slideThatNeedsToBeCentered = $(slides.filter(`#slide-${id}`)[0]);

	let moveSlideFromMostLeftToCenter = windowHalfWidth - ((slideWidth / 2) + slideGutter);
	let withHowMuchToMoveSlideWidth = id * slideWidth;
	let withHowMuchToMoveSlideGutter = id * (slideGutter * 2);
	let howMuchToMoveWith = (withHowMuchToMoveSlideWidth + withHowMuchToMoveSlideGutter) - moveSlideFromMostLeftToCenter;

	slider.css('left', -howMuchToMoveWith);
	slides.removeClass('center');
	slideThatNeedsToBeCentered.addClass('center');
	currentSlideId = id;
}

function getCurrentSlideId () {
	return currentSlideId;
}

export {
	scaleSlides,
	moveSlide,
	getCurrentSlideId
}