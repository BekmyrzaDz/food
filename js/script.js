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

    const deadline = '2022-03-19';

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

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
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
});