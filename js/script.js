window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        timer = require('./modules/timer'),
        cards = require('./modules/cards'),
        forms = require('./modules/forms'),
        slider = require('./modules/slider');

    tabs();
    modal();
    timer();
    cards();
    forms();
    slider();
});