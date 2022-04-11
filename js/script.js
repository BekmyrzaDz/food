window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    // У нас есть 3 задачи
    // 1)
    // Функция, которая будет скрывать ненужные табы

    // 2)
    // Показать нужный таб

    // 3)
    // Необходимо назначить обработчик события на пункты меню

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    // 1)
    // Должна быть какая-то функция, которая будет устанавливать наш таймер
    // чтобы получать элементы и что-то с ними делать

    // 2)
    // Должен быть какой-то функционал который должен будет определять
    // разницу между временем

    // 3)
    // Должна быть функция, которая должна заниматься обновленим нашего времени

    const deadline = '2022-05-19';

    // Получаем время до дедлайна
    function getTimeRamaning(getTime) {
        const t = Date.parse(getTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    // Получаем элементы и обновляем дату и время
    function setClock(selector, endtime) {
        const timer = document.querySelector('.timer'),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function getZero(num) {
            if (num >= 0 && num <= 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        function updateClock() {
            const t = getTimeRamaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    // 1)
    // Нужно получить элементы со страницы

    // 2)
    // Написать функцию, которая вызывает модальное окно

    // 3)
    // Написать функцию, которая закрывает модальное окно

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    // Вызвать модальное окно
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    // Закрыть модальное окно
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
            console.log(e);
        }
    });

    const modalTimerId = setTimeout(openModal, 3000);

    function showModalbyScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalbyScroll);
        }
    }

    window.addEventListener('scroll', showModalbyScroll);

    // Меню карточка
    // Идея в том, чтобы карточки с меню шаблонизировать и создавать их
    // только передавая им нужные аргументы
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 84;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            let element = document.createElement('div');

            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML += `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        // Обработка ошибок
        // fetch не вернет reject и по этому надо обработать это
        if (!res.ok) {
            throw new Error(`Could not feth ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({
    //             img,
    //             alimg,
    //             title,
    //             descr,
    //             price
    //         }) => {
    //             new MenuCard(img, alimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                alimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, alimg, title, descr, price, '.menu .container').render();
            });
        });

    // Form

    const forms = document.querySelectorAll('form');

    const message = {
        loading: '/img/form/054 spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // Превращение полученных данных в объект
            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });

            // Более элегантный способ
            // Превращаем в JSON данные из formData
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // Промис который запускается при помощи fetch не перейдет в состояние
            // отлонено(reject), из ответа http, который считается ошибкой
            // reject будет возникать только при сбое сети или если что-то там помешало запросу выполниться

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close data-close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

    // Slider

    // Алгоритм задачи

    // 1. Получить все элементы с котрыми мы будем работать
    // 2. Нужен какой-то параметр, какой-то индекс, котрый будет определять наш текущий слайд.
    // Этот индекс нужно как использовать, так и изменять т/к 
    // мы будем кликать на стрелочки и они соответственно должны меняться
    // 3. Создание ф-ции, который будет заниматся показом наших слайдов
    // В нем будет включаться сразу две ф-ции
    // Первый это показ определенного слайда
    // Второй это скрытие других, которые мы сейчас не видем
    // 4. Предусмотреть поведение слайдера внутри созданной ф-ции, когда мы долистаем до конца слайдера
    // нужно будет заново попасть на первый, а если у нас показывается 
    // первый слайд и мы нажмем на кнопку назад то мы должны начать с конца 
    // 5. Также нужно подсчитать общее кол-во слайдеров и показывать 
    // их динамически на сайте

    const sliderCounter = document.querySelector('.offer__slider-counter'),
        slidePrev = sliderCounter.querySelector('.offer__slider-prev'),
        slideNext = sliderCounter.querySelector('.offer__slider-next'),
        current = sliderCounter.querySelector('#current'),
        total = sliderCounter.querySelector('#total'),
        slides = document.querySelectorAll('.offer__slide');

    let slideIndex = 1;

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
});