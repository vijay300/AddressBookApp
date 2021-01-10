window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new addressData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    name.addEventListener('input', function() {
        if(phone.value.length == 0) {
            phoneError.textContent = "";
            return;
        }
        try {
            (new addressData()).phoneNumber = phone.value;
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
        }
    });
});

const save = () => {
    try {
        let contact = createContact();
    } catch (e) {
        return;
    }
}