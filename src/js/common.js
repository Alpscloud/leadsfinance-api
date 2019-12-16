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

	// ========= Smooth scrolling to the acnhors ===========
	$('.js-smooth-scroll-link').on('click', function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
		top = $(id).offset().top - 70;

		$('html, body').animate({scrollTop: top}, 'slow');
	});	


	// ========= Ajax form ===========
	$('.js-input').on('focus',function() {
		if($(this).hasClass('is-error')) {
			$(this).removeClass('is-error');
		}
	});

	$('.js-form').submit(function(e) {
		e.preventDefault();

		var that = $(this);
			inputs = that.find('.js-input'),
			flag = true;

		// Validate
		$(inputs).each(function() {
			if(!$(this).val() || $(this).val() == "") {
				$(this).addClass('is-error');
				flag = false;
			}
		});

		if(!flag) {return false;}

		$.ajax({
			type: "POST",
			url: "mail-new.php", //Change
			data: that.serialize()
		}).done(function() {
			$('.js-popup-thanks').fadeIn(200);
			$('html').addClass('is-fixed');
			setTimeout(function() {
				$('.js-popup-thanks').fadeOut(200);
				$('html').removeClass('is-fixed');
				that.trigger("reset");
			}, 2000);
		});

	});
	// ========= =========== =========== ===========

	// Popup
	$('.js-open-popup-btn').on('click',function(e) {
		e.preventDefault();
		$('.js-popup').fadeIn(300);
		$('html').addClass('is-fixed');
	});

	$('.js-open-terms-popup-btn').on('click',function(e) {
		e.preventDefault();
		$('.js-popup-terms').fadeIn(300);
		$('html').addClass('is-fixed');
	});


	$('.js-close-popup-btn').on('click',function(e) {
		e.preventDefault();
		$(this).parents('.js-popup').fadeOut(300);
		$('html').removeClass('is-fixed');
	});

	$('.popup__overflow').on('click', function(e) {
		e.stopPropagation();

		var content = $(this).find('.popup__body');

		if(!content.is(e.target) && content.has(e.target).length === 0) {
			$('html').removeClass('is-fixed');
			$('.js-popup').fadeOut(300);
		}

	});

	// Faq

	$('.js-faq-header').on('click', function(e) {
		e.preventDefault();
		var self = $(this);


		if(self.hasClass('is-toggled')) {
			self.removeClass('is-toggled');
		} else {
			$('.js-faq-header').removeClass('is-toggled');
			self.addClass('is-toggled');
		}

		$('.js-faq-body').stop().slideUp(150);

		self.next('.js-faq-body').stop().slideToggle(150);
	});

	$('.js-faq-body').first().show();
	$('.js-faq-header').first().addClass('is-toggled');

	// Parallax

	function parallax(item){
		var scrolled = $(window).scrollTop();
		var speed = $(item).attr('data-parallax-speed');
		var direction = $(item).attr('data-parallax-direction');



		if(direction === 'horisontal-right') {
			$(item).css({
				'transform': 'translate3d(' + (scrolled*speed) + 'px' + ', 0, 0)',
				'-webkit-transform': 'translate3d(' + (scrolled*speed) + 'px' + ', 0, 0)',
				'-o-transform': 'translate3d(' + (scrolled*speed) + 'px' + ', 0, 0)',
				'-moz-transform': 'translate3d(' + (scrolled*speed) + 'px' + ', 0, 0)'
				
			});
		} else if(direction === 'horisontal-left') {
			$(item).css({
				'transform': 'translate3d(' + -(scrolled*speed) + 'px' + ', 0, 0)',
				'-webkit-transform': 'translate3d(' + -(scrolled*speed) + 'px' + ', 0, 0)',
				'-o-transform': 'translate3d(' + -(scrolled*speed) + 'px' + ', 0, 0)',
				'-moz-transform': 'translate3d(' + -(scrolled*speed) + 'px' + ', 0, 0)'
				
			});
		} else if(direction === 'vertical-top') {
			$(item).css({
				'transform': 'translate3d(0, ' + -(scrolled*speed)+'px' + ', 0)',
				'-moz-transform': 'translate3d(0, ' + -(scrolled*speed)+'px' + ', 0)',
				'-ms-transform': 'translate3d(0, ' + -(scrolled*speed)+'px' + ', 0)',
				'-o-transform': 'translate3d(0, ' + -(scrolled*speed)+'px' + ', 0)',
				'-webkit-transform': 'translate3d(0, ' + -(scrolled*speed)+'px' + ', 0)'
			});
		} else if(direction === 'vertical-bottom') {
			$(item).css({
				'transform': 'translate3d(0, ' + (scrolled*speed)+'px' + ', 0)',
				'-moz-transform': 'translate3d(0, ' + (scrolled*speed)+'px' + ', 0)',
				'-ms-transform': 'translate3d(0, ' + (scrolled*speed)+'px' + ', 0)',
				'-o-transform': 'translate3d(0, ' + (scrolled*speed)+'px' + ', 0)',
				'-webkit-transform': 'translate3d(0, ' + (scrolled*speed)+'px' + ', 0)'
			});
		}
		

	}

	$(window).on('scroll', function(e) {


		$('.js-item-parallax').each(function() {
			
			parallax($(this));
			
		});

		
	});

	// Range slider

	var rangeSlider = document.getElementById('requestsRange');
	var requestsQuantity = document.getElementById('requestsQuantity');
	var earning = $('.js-earnings');

	noUiSlider.create(rangeSlider, {
		start: 1009,
		connect: 'lower',
		range: {
			'min': 0,
			'max': 10000
		}
	});

	rangeSlider.noUiSlider.on('update', function(values, handle) {
		var value = parseInt(values[handle]);
		var total = Math.round(value * 4.57 * 30).toLocaleString();

		requestsQuantity.value = value;

		earning.html(total);

	});

	requestsQuantity.addEventListener('change', function () {
		var val = this.value;
		var total = Math.round(val * 4.57 * 30).toLocaleString();
		rangeSlider.noUiSlider.set(val);


		earning.html(total);
	});



	$('#requestsQuantity').on('change keyup keydown', function() {
		var value = parseInt($(this).val());


		if(value >= 10000) {value = 10000}

			$(this).val(value);
	});

	// $('body').on('mousemove', function(e) {
	// 	var posX = Math.round(e.clientX / $(window).outerWidth() * -30);
	// 	var posY = Math.round(e.clientY / $(window).outerHeight() * -30);

	// 	$(this).css('backgroundPosition', posX + 'px ' + posY + 'px');
	// });



	$('.js-phone-input').mask('+7 (999) 999-99-99');

	


});

$(window).on('load', function() {
	$('body').addClass('is-loaded');
});
