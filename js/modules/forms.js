function form() {
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
      // отклонено(reject), из ответа http, который считается ошибкой
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

  // fetch('http://localhost:3000/menu')
  //     .then(data => data.json())
  //     .then(res => console.log(res));
}

module.exports = form;