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
            }

            return num;
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
});