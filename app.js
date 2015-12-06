function FormValidator(el) {

    this.el = el;

    this.inputs = this.el.elements;
    this.validationMessages = [];

    el.addEventListener('submit', this._onFormSubmit.bind(this));

}

FormValidator.prototype._onFormSubmit = function(e) {
    if (!this._isFormValid()) {
        e.preventDefault();
        this._showValidationErrors();
    }
}

FormValidator.prototype._isFormValid = function() {

    var input,
        formIsValid = true;

    this.validationMessages = [];

    for (var i = 0; i < this.el.elements.length; i++) {

        input = this.el.elements[i];

        if (input.tagName === 'INPUT' && input.dataset.validateLength) {
            if (!this._validators.checkLength(input)) {
                formIsValid = false;
                this.validationMessages.push('Поле "' + input.parentNode.textContent
                    + '" длиннее '
                    + input.dataset.validateLength
                    +' символов');
            }
        }

    }

    return formIsValid;

}

FormValidator.prototype._validators = {
    checkLength: function(input) {
        return input.value.length <= input.dataset.validateLength;
    },
    checkDate: function() {
        // TODO
    }
};

FormValidator.prototype._showValidationErrors = function() {

    var elem = this.el.querySelector('.validation__errors'),
        message;

    elem.innerHTML = '';

    for (var i = 0; i < this.validationMessages.length; i++) {
        message = document.createElement('div');
        message.innerHTML = this.validationMessages[i];
        elem.appendChild(message);
    }

}

new FormValidator(document.getElementById('experiment_form'));
