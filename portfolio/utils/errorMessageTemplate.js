import errorMessageTemplate from "../templates/emptyFieldTemplate.js";

function formValidation(element) {
  let error = 0;

  let formReq = Array.from(element.querySelectorAll(".__req"));

  for (let i = 0; i < formReq.length; i++) {
    const element = formReq[i];
    resetErrorMessage(element);

    if (element.classList.contains("data__name")) {
      const input = element.querySelector(".name__input");

      if (input.value === "") {
        error++;
        formFieldEmpty(element, "name");
      }
    }

    if (element.classList.contains("data__email")) {
      const input = element.querySelector(".email__input");

      if (input.value === "") {
        error++;

        formFieldEmpty(element, "email");
      } else if (!emailTest(input)) {
        error++;
        formIncorrectEmail(element);
      }
    }
  }

  return error;
}

function formFieldEmpty(input, target) {
  const parent = input.closest(`.data__${target}`);
  const error = parent.querySelector(`.${target}__error`);
  const veiwMessage = errorMessageTemplate.content.cloneNode(true);
  const text = veiwMessage.querySelector(".error__text");
  text.innerHTML = "Поле не должно быть пустым ";
  error.appendChild(veiwMessage);
}

function formIncorrectEmail(element) {
  const error = element.querySelector(`.email__error`);
  const veiwMessage = errorMessageTemplate.content.cloneNode(true);
  const text = veiwMessage.querySelector(".error__text");
  text.innerHTML = "Email введен некорректно ";
  error.appendChild(veiwMessage);
}

function resetErrorMessage(element) {
  const error = element.querySelector(".error");
  error.innerHTML = "";
}

function emailTest(input) {
  return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
    input.value
  );
}

export default formValidation;
