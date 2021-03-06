import refs from '../../shared/refs';
import { postData } from '../../database/database';
import './regForm.scss';

const formWrapper = document.createElement('div');
refs.appElement?.append(formWrapper);

const checkboxImage = './form-checkbox.png';

const regFormMarkup = `<div class="reg-modal hidden" id="reg-form">
      <p class="modal__title">Registr New Player</p>
      <form action="submit" class="modal__form">
        <div class="form__wrapper">
          <div class="modal__form__input">
            <label>First name</label>
            <input
            class="name"
            id="name"
            type="name"
            required
            title="- Имя не может быть пустым.
                 - Имя не может состоять из цифр.
                 - Имя не может содержать служебные символы"
          pattern="[a-zA-Zа-яА-Я]+"
          maxlength="30"/>
            <div class="checkbox name-ch">
              <img
                src="${checkboxImage}"
                alt=""
                width="20px"
                height="20px"
              />
            </div>
          </div>
          <div class="modal__form__input">
            <label>Last name</label>
            <input
            class="surname"
            id="lastName"
            type="text"
            required
            title="- Имя не может быть пустым.
                 - Имя не может состоять из цифр.
                 - Имя не может содержать служебные символы"
            pattern="[a-zA-Zа-яА-Я]+"
          maxlength="30" />
            <div class="checkbox surname-ch">
              <img
                src="${checkboxImage}"
                alt=""
                width="20px"
                height="20px"
              />
            </div>
          </div>
          <div class="modal__form__input">
            <label>E-mail</label>
            <input
            class="email"
            id="email"
            type="email"
            required
            pattern="[a-zA-Z0-9]+@[a-zA-Z0-9]{2,10}[.]+[a-zA-Z0-9]+" />
            <div class="checkbox email-ch">
              <img
                src="${checkboxImage}"
                alt=""
                width="20px"
                height="20px"
              />
            </div>
          </div>
        </div>
        <div class="avatar-container">
              <img class="img" id="uploadedImage" src="./form-avatar.png">
              <input class="input" id="avatarUpload" name="upload" type="file">
            </div>
        <div class="modal__form__buttons">
          <button
            class="form__modal__submitbtn form__modal__btn invalid"
            id="send"
            type="submit"
          >
            Add user</button
          ><button
            class="form__modal__cancelbtn form__modal__btn"
            id="cancel"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
`;

const formValidate = (): void => {
  const coverElem = document.getElementById('cover') as HTMLDivElement;
  const formElem = document.getElementById('reg-form') as HTMLDivElement;
  const sendButton = document.getElementById('send') as HTMLButtonElement;
  const cancelButton = document.getElementById('cancel') as HTMLButtonElement;
  const nameField = <HTMLInputElement>document.getElementById('name');
  const lastNameField = <HTMLInputElement>document.getElementById('lastName');
  const emailField = <HTMLInputElement>document.getElementById('email');

  formElem.classList.remove('hidden');

  const validate = () => {
    if (nameField.validity.valid && emailField.validity.valid) {
      sendButton.classList.remove('invalid');
    } else {
      sendButton.classList.add('invalid');
    }
  };

  coverElem.addEventListener('click', () => {
    document.body.classList.remove('notScrollable');
    coverElem.classList.add('hidden');
    formElem.classList.add('hidden');
  });

  const onSendBtnClick = (e: { preventDefault: () => void }) => {
    if (sendButton.classList.contains('invalid')) return;
    e.preventDefault();

    postData();

    document.body.classList.remove('notScrollable');
    coverElem.classList.add('hidden');
    formElem.classList.add('hidden');

    const delay = () => {
      window.location.hash = 'score';
    };
    setTimeout(delay, 150);
  };

  const onCancelBtnClick = () => {
    document.body.classList.remove('notScrollable');
    coverElem.classList.add('hidden');
    formElem.classList.add('hidden');

    localStorage.removeItem('avatar');
  };

  cancelButton.addEventListener('click', onCancelBtnClick);

  sendButton.addEventListener('click', onSendBtnClick);

  nameField.addEventListener('input', validate);

  lastNameField.addEventListener('input', validate);

  emailField.addEventListener('input', validate);

  // AVATAR

  const uploadAvatarBtn = <HTMLFormElement>(
    document.getElementById('avatarUpload')
  );
  const uploadedImage = <HTMLFormElement>(
    document.getElementById('uploadedImage')
  );

  uploadAvatarBtn.addEventListener('change', () => {
    const file = URL.createObjectURL(uploadAvatarBtn.files[0]);
    const canvas = document.createElement('canvas');

    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = file;

    img.onload = (): void => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');

      localStorage.setItem('avatar', link.href);
      uploadedImage.src = link.href;
    };
  });
};

const addRegFormMarkup = (): void => {
  formWrapper.innerHTML = regFormMarkup;

  formValidate();
};

export { addRegFormMarkup };
