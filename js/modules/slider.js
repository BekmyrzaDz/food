function slider() {
  // Slider

  const sliderCounter = document.querySelector('.offer__slider-counter'),
    slider = document.querySelector('.offer__slider'),
    slidePrev = sliderCounter.querySelector('.offer__slider-prev'),
    slideNext = sliderCounter.querySelector('.offer__slider-next'),
    current = sliderCounter.querySelector('#current'),
    total = sliderCounter.querySelector('#total'),
    slides = document.querySelectorAll('.offer__slide'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = slidesWrapper.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  slidesField.style.width = 100 * slides.length + '%';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  current.textContent = `0${slideIndex}`;

  // Dot

  // Задаем относительное позиционирование для родителя слайдера
  slider.style.position = 'relative';

  // Обёртка для точек
  const indicators = document.createElement('ol'),
    dots = [];

  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
     position: absolute;
     right: 0;
     bottom: 0;
     left: 0;
     z-index: 15;
     display: flex;
     justify-content: center;
     margin-right: 15%;
     margin-left: 15%;
     list-style: none;
 `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    let dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
         box-sizing: content-box;
         flex: 0 1 auto;
         width: 30px;
         height: 6px;
         margin-right: 3px;
         margin-left: 3px;
         cursor: pointer;
         background-color: #fff;
         background-clip: padding-box;
         border-top: 10px solid transparent;
         border-bottom: 10px solid transparent;
         opacity: .5;
         transition: opacity .6s ease;
     `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  // Подсветка активной точки
  function active() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }

  // Избавляемся от лишних строк
  function deleteNotDigits(str) {
    return +str.replace(/\D/ig, '');
  }

  // Логика стрелок вперед и назад
  slideNext.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    active();
  });

  slidePrev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    active();
  });

  // Проробатываем логику точек
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      // Можно сделать и таким способом
      // const slideTo = e.target.getAttribute('data-slide-to');

      offset = deleteNotDigits(width) * (dot.dataset.slideTo - 1);
      // offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;
      slideIndex = dot.dataset.slideTo;
      // slideIndex = slideTo;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      active();
    });
  });

  /* 
  if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
  } else {
      total.textContent = slides.length;
  }

  // Дефолтное значение текущего слайда
  current.textContent = '01';

  function hideSlideContent() {
      slides.forEach(item => {
          item.classList.add('hide');
          item.classList.remove('show', 'fade');
      });
  }

  function showSlideContent(i = 0) {
      slides[i].classList.add('show', 'fade');
      slides[i].classList.remove('hide');
  }

  hideSlideContent();
  showSlideContent();

  // Показываем слайды на странице
  function showSlides(num) {
      if (num > slides.length) {
          slideIndex = 1;
      }

      if (num < 1) {
          slideIndex = slides.length;
      }

      hideSlideContent();
      showSlideContent(slideIndex - 1);

      if (slideIndex >= 0 && slideIndex <= 10) {
          current.textContent = `0${slideIndex}`;
      } else {
          current.textContent = slideIndex;
      }
  }

  function plusSlides(n) {
      showSlides(slideIndex += n);
  }

  // Вешаем обработчики событий на стрелки
  slidePrev.addEventListener('click', () => {
      plusSlides(-1);
  });

  slideNext.addEventListener('click', () => {
      plusSlides(1);
  });
  */
}

module.exports = slider;