function cards() {
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
}

module.exports = cards;