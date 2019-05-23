$(window).scroll(function () {
	var scrollTop = $(window).scrollTop();
	if (scrollTop >= 0.4 * $(window).height()) {
		$("#factory").addClass('fixed');
		$("#workshop").addClass('follow');
	} else {
		$("#factory").removeClass('fixed');
		$("#workshop").removeClass('follow');
	}

	if (scrollTop > 100) {
		$('.back-to-top').fadeIn();
	} else {
		$('.back-to-top').fadeOut();
	}
});

$(document).ready(function() {
	$(".menu-anchor").click(function (e) {

		var wohin = $(this).attr("href");

		if (wohin == "#factory") {
			$(".menu").removeClass('active');
			$("#hamburger-menu").removeClass('menu-open');

		} else if (wohin == "#workshop") {
			$(".menu").removeClass('active');
			$("#hamburger-menu").removeClass('menu-open');
		}

	});
	var menu = document.querySelector(".menu"),
		toggle = document.querySelector(".menu-toggle");

	function toggleToggle() {
		toggle.classList.toggle("menu-open");
	};

	function toggleMenu() {
		menu.classList.toggle("active");
	};

	toggle.addEventListener("click", toggleToggle, false);
	toggle.addEventListener("click", toggleMenu, false);

	var $backToTopButton = $('<a href="#top" class="back-to-top">Go to top</a>')
		.hide()
		.css({
			zIndex: 9999
		});

	$('body').append($backToTopButton);

	$('.back-to-top').click(function () {
		$('body, html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});