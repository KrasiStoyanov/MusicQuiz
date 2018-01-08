'use strict';

import * as slidesManager from './modules/slides';

$(document).ready(function () {
	let initialCenteredSlide = 3;

	slidesManager.scaleSlides();
	slidesManager.moveSlide(initialCenteredSlide);
});
