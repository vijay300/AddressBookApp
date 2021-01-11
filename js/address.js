window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input', function() {
        if(phone.value.length == 0) {
            phoneError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).phoneNumber = phone.value;
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
        }
    });
});

const save = () => {
    try {
        let contact = createContact();
        createAndUpdateAddressBook(contact);
    } catch (e) {
        return;
    }
}

const reset = () => {
    setValue('#name','');
    setValue('#phone','');
    setValue('#notes','');
    setValue('#city','');
    setValue('#state','');
    setValue('#zipCode','');    
} 

const createContact = () => {
    let addressData = new AddressBookData();
    try {
        addressData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    try {
        addressData.phoneNumber = getInputValueById('#phone');
    } catch (e) {
        setTextValue('.phone-error', e);
        throw e;
    }
    addressData.address = getInputValueById('#notes');
    addressData.city = getInputValueById('#city');
    addressData.state = getInputValueById('#state');
    addressData.zipCode = getInputValueById('#zipCode');
    alert(addressData.toString());
    return addressData;
} 

function createAndUpdateAddressBook(addressBookData) {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBook"));

    if (addressBookList != undefined) {
        addressBookList.push(addressBookData);
    } else {
        addressBookList = [addressBookData];
    }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBook", JSON.stringify(addressBookList));
}
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}