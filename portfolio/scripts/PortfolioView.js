import formValidation from "../utils/errorMessageTemplate.js";

class PortfolioView {
  #eventListeners = {
    handleEvent: (event) => {
      switch (event.currentTarget) {
        case this.#header:
          const target = event.target;

          if (target.closest(".sidebar__hamb")) {
            this.#showSidebarPanel();
          }

          if (target.closest(".panel__close-btn")) {
            this.#hideSidebarPanel();
          }
          break;

        case this.#form:
          this.#getDataForm(event);
          break;
      }
    },
  };

  #header = null;
  #sidebarHamb = null;
  #sidebarPanel = null;
  #mainBlock = null;
  #mainImage = null;
  #form = null;
  #sendFormBtn = null;
  #loader = null;

  constructor() {
    this.#initTemplate();
    this.#bindListeners();
  }

  #initTemplate() {
    const body = document.body;
    this.#header = body.querySelector(".header");
    this.#sidebarPanel = this.#header.querySelector(".sidebar__panel");
    this.#sidebarHamb = this.#header.querySelector(".sidebar__hamb");
    this.#mainImage = body.querySelector(".main-block__image");
    this.#mainBlock = body.querySelector(".page__main-block");
    this.#form = body.querySelector(".contacts__form ");
    this.#sendFormBtn = this.#form.querySelector(".send-message-btn");
    this.#loader = this.#form.querySelector(".send__loader");
  }

  #bindListeners() {
    this.#header.addEventListener("click", this.#eventListeners);
    this.#form.addEventListener("submit", this.#eventListeners);
  }

  #showSidebarPanel() {
    const widthScreen = document.documentElement.clientWidth;
    widthScreen > 450
      ? (this.#sidebarPanel.style.width = "345px")
      : (this.#sidebarPanel.style.width = "250px");

    this.#sidebarHamb.style.opacity = "0.5";
    this.#mainBlock.style.opacity = "0.5";
    this.#mainImage.style.opacity = "0.5";
  }

  #hideSidebarPanel() {
    this.#sidebarPanel.style.width = "0";
    this.#sidebarHamb.style.opacity = "1";
    this.#mainBlock.style.opacity = "1";
    this.#mainImage.style.opacity = "1";
  }

  #getDataForm(event) {
    event.preventDefault();
    const form = event.target;
    let error = formValidation(form);

    if (error === 0) {
      const data = new FormData(this.#form);
      this.#sendForm(data);
      this.#form.reset();
    }
  }

  #sendForm(formData) {
    this.#sendFormBtn.disabled = true;
    this.#showLoader();

    setTimeout(() => {
      /*
    fetch("address", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => res);
      */

      this.#sendFormBtn.disabled = false;
      this.#hideLoader();
    }, 500);
  }

  #showLoader() {
    this.#loader.style.display = "block";
  }

  #hideLoader() {
    this.#loader.style.display = "none";
  }
}

export default PortfolioView;
