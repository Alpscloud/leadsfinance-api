$(document).ready(function() {
	//  ========= Variables =========
	var body = $('body'),
			html = body.width(),
			timer; // for disable scroll
	// ========= =========== =========== ===========

	// Disable hover effect when client scrolles the page
	$(window).on('scroll',function() {
		clearTimeout(timer);
		if(!body.hasClass('disable-hover')) {
			body.addClass('disable-hover');
		}

		timer = setTimeout(function() {
			body.removeClass('disable-hover');
		}, 200);
	});

	$('.js-faq-header').on('click', function(e) {
		e.preventDefault();
		var self = $(this);


		$(this).toggleClass('is-toggled');

		$(this).next('.js-faq-body').stop().slideToggle(150);
	});

	$('.js-faq-body').first().show();
	$('.js-faq-header').first().addClass('is-toggled');

	// Range slider

	var rangeSlider = document.getElementById('requestsRange');
	var requestsQuantity = document.getElementById('requestsQuantity');
	var earning = $('.js-earnings');

	noUiSlider.create(rangeSlider, {
		start: 30,
		connect: 'lower',
		range: {
			'min': 0,
			'max': 1000
		}
	});

	rangeSlider.noUiSlider.on('update', function(values, handle) {
		var value = values[handle];
		var total = parseInt(value * 4.57 * 30);

		requestsQuantity.value = value;

		earning.html(total);

	});

	requestsQuantity.addEventListener('change', function () {
		var val = parseInt(this.value);
		var total = val * 4.57 * 30;
		rangeSlider.noUiSlider.set(val);

		console.log(total);
		earning.html(total);
	});


	// var earning = '';

	// function calc(val) {
	// 	earning = parseInt(val * 4,57 * 30);

	// 	return earning;

	// 	console.log(earning);
	// }



	


});
