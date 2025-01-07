"use strict";

// import Swiper from '../libs/swiper/swiper-bundle.min.mjs';
// import JSCCommon from "./JSCCommon.js";

function eventHandler() {
	// const $ = jQuery;
	JSCCommon.init();

	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener(
		"scroll",
		() => {
			JSCCommon.setFixedNav();
		},
		{passive: true}
	);
	window.addEventListener("resize", whenResize, {passive: true});

	whenResize();

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: " .swiper-pagination",
			type: "bullets",
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	};

	new Swiper(".breadcrumb-slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
	});

	const mediaSwiper = new Swiper(".sSupervisory__slider--js", {
		slidesPerView: 1,
		spaceBetween: 50,
		observeParents: true,
		navigation: {
			nextEl: ".sSupervisory .swiper-button-next",
			prevEl: ".sSupervisory .swiper-button-prev",
		},
		breakpoints: {
			992: {
				centeredSlides: true,
				// initialSlide: 1,
				spaceBetween: 0,
			},
		},
	});

	const stepsSwiper = new Swiper(".sAwardSteps__slider--js", {
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: ".sAwardSteps .swiper-button-next",
			prevEl: ".sAwardSteps .swiper-button-prev",
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
		},
		on: {
			init: function () {
				const sliderElement = document.querySelector(
					".sAwardSteps__slider--js"
				);

				if (sliderElement) {
					const activeSlideIndex = +sliderElement.getAttribute("activeslide");
					this.slideTo(activeSlideIndex);
				}
			},

			slideChange: function () {
				setTimeout(checkOverlap, 30);
			},

			transitionEnd: function () {
				checkOverlap();
			},
		},
	});
	// setActiveSlide(stepsSwiper)
	// function setActiveSlide(slider) {
	//   const activeSlide = slider.getAttribute('activeslide')
	//   console.dir(activeSlide);
	//   // this.swiperRef.swiper.slideTo(index);
	// }

	function setActiveSlide(index) {
		stepsSwiper.slideTo(index);
	}

	const swiper4 = new Swiper(".sBanners__slider--js", {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: "auto",
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});

	window.addEventListener("load", () => {
		const btnToTop = document.querySelector(".btn-to-top");
		if (btnToTop) {
			btnToTop.addEventListener("click", () => {
				window.scrollTo({
					top: 0,
				});
			});
		}

		let lastScrollPosition = 0;

		function handleScroll() {
			const scrollPosition =
				window.scrollY || document.documentElement.scrollTop;

			const topNav = document.querySelector(".top-nav");
			if (topNav) {
				const bottomNav = topNav.getBoundingClientRect().bottom;
				const isScrollingDown = scrollPosition > lastScrollPosition;

				if (scrollPosition >= 30) {
					header.classList.add("header--js");
				} else {
					header.classList.remove("header--js");
				}

				if (bottomNav < 0 && isScrollingDown) {
					header.classList.add("change-logos--js");
				} else if (!isScrollingDown && scrollPosition < 300) {
					header.classList.remove("change-logos--js");
				}

				if (scrollPosition >= 400) {
					header.classList.add("show");
				} else {
					header.classList.remove("show");
				}

				if (scrollPosition >= 300) {
					// header.classList.add('show');
					header.classList.add("change-logos--js");
				}

				lastScrollPosition = scrollPosition;
			}
		}

		handleScroll();
		window.scrollBy(0, 2);

		window.addEventListener("scroll", handleScroll);
	});

	/* vote */

	const checkboxesVote = document.querySelectorAll(".vote-item--js input");

	if (checkboxesVote.length) {
		checkboxesVote.forEach(checkbox => {
			checkbox.addEventListener("change", function () {
				const card = this.closest(".vote-item");

				if (this.checked) {
					card.classList.add("checked");
				} else {
					card.classList.remove("checked");
				}
			});
		});
	}

	function inputFile() {
		if (document.querySelector(".upload-field")) {
			let uploadField = document.querySelectorAll(".upload-field");
			for (let i = 0; i < uploadField.length; i++) {
				let inputFile = uploadField[i].querySelector(".input-upload");
				inputFile.addEventListener(
					"change",
					() =>
						(uploadField[i].querySelector(
							".upload-field__file-name"
						).innerHTML = inputFile.files[0].name)
				);
			}
		}
	}
	inputFile();

	/* avatar */
	let uploadavatar = document.querySelector(".upload-avatar");
	if (uploadavatar) {
		let inputFile = uploadavatar.querySelector(".input-upload");
		let img = uploadavatar.querySelector(".img-wrap-center img");
		inputFile.addEventListener("change", () => {
			var reader = new FileReader();
			reader.onload = function () {
				img.src = reader.result;
			};
			reader.readAsDataURL(event.target.files[0]);

			inputFile.files[0].name.length > 0
				? uploadavatar.classList.add("active")
				: uploadavatar.classList.remove("active");
		});
	}

	/* check arrows */
	function checkOverlap() {
		const buttons = document.querySelectorAll(
			".sAwardSteps .swiper-button-hand"
		);
		const awardSteps = document.querySelectorAll(
			".sAwardSteps .swiper-slide-active .award-step"
		);
		if (!buttons.length || !awardSteps.length) return;

		buttons.forEach(button => {
			const buttonRect = button.getBoundingClientRect();
			let isOverlapping = false;

			awardSteps.forEach(step => {
				const stepRect = step.getBoundingClientRect();

				if (
					buttonRect.top < stepRect.bottom &&
					buttonRect.bottom > stepRect.top &&
					buttonRect.left < stepRect.right &&
					buttonRect.right > stepRect.left
				) {
					isOverlapping = true;
				}
			});

			const icon = button.querySelector(".icon");
			if (icon) {
				if (isOverlapping) {
					icon.style.stroke = "white";
				} else {
					icon.style.stroke = "";
				}
			}
		});
	}

	checkOverlap();

	window.addEventListener("resize", checkOverlap);
}
if (document.readyState !== "loading") {
	eventHandler();
} else {
	document.addEventListener("DOMContentLoaded", eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
