const errorMessageTemplate = document.createElement("template");

errorMessageTemplate.innerHTML = `
<span class="error__decoration"></span>
<span class="error__text"></span>`;

export default errorMessageTemplate;
