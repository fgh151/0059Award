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
        initialSlide: 1,
        spaceBetween: 0,
      }
    }
	});

  const stepsSwiper = new Swiper(".sAwardSteps__slider--js", {

		slidesPerView: 1,
		spaceBetween: 20,
    // observeParents: true,
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
        // centeredSlides: true,
        // initialSlide: 3,
        slidesPerView: 3,
        spaceBetween: 30,
      }
    }
	});

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


  window.addEventListener("load", ()=> {
    const btnToTop = document.querySelector('.btn-to-top');
    if (btnToTop) {
      btnToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
        });
      });
    }


    let lastScrollPosition = 0;

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;

      const bottomNav = document.querySelector('.top-nav').getBoundingClientRect().bottom
      const isScrollingDown = scrollPosition > lastScrollPosition;

      if (scrollPosition >= 30) {
        header.classList.add('header--js');
      } else {
        header.classList.remove('header--js');
      }

      if (bottomNav < 0 && isScrollingDown) {
        header.classList.add('change-logos--js');
      } else if (!isScrollingDown && scrollPosition < 300 ) {
        header.classList.remove('change-logos--js');
      }

      if (scrollPosition >= 400) {
        header.classList.add('show');
      } else {
        header.classList.remove('show');
      }

      lastScrollPosition = scrollPosition;

    });
  })

  /* vote */

  const checkboxesVote = document.querySelectorAll('.vote-item--js input');

  if(checkboxesVote.length) {
    checkboxesVote.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const card = this.closest('.vote-item');

        if (this.checked) {
          card.classList.add('checked');
        } else {
          card.classList.remove('checked');
        }
      });
    });
  }

  function inputFile(){
		if (document.querySelector('.upload-field')){
			let uploadField = document.querySelectorAll('.upload-field');
			for (let i=0;i<uploadField.length;i++){
				let inputFile = uploadField[i].querySelector('.input-upload');
				inputFile.addEventListener('change',() => uploadField[i].querySelector('.upload-field__file-name').innerHTML = inputFile.files[0].name);
			}
		}
	}
	inputFile();

  /* avatar */
  let uploadavatar = document.querySelector('.upload-avatar');
	if (uploadavatar){
		let inputFile = uploadavatar.querySelector('.input-upload');
		let img = uploadavatar.querySelector('.img-wrap-center img');
		inputFile.addEventListener('change', () => {
			var reader = new FileReader();
			reader.onload = function(){ img.src = reader.result;}
			reader.readAsDataURL(event.target.files[0]);

			inputFile.files[0].name.length > 0 ? uploadavatar.classList.add('active') : uploadavatar.classList.remove('active');
		});
	}

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
