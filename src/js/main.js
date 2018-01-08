'use strict';

import * as slidesManager from './modules/slides';

$(document).ready(function () {
	let initialCenteredSlide = 0;

	slidesManager.scaleSlides();
	setTimeout(() => {
		slidesManager.moveSlide(initialCenteredSlide);
	}, 300);

	$('.slide').click((e) => {
		let slide = e.currentTarget;
		let nextSlideId = $(slide).attr('id');
		nextSlideId = nextSlideId.slice(nextSlideId.length - 1, nextSlideId.length);

		slidesManager.moveSlide(nextSlideId);
	});

	$(window).resize(() => {
		slidesManager.moveSlide(slidesManager.getCurrentSlideId());
	});
});
