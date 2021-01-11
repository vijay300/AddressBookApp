let isUpdate = false;
let addressBookObj = {};

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

    checkForUpdate();
});

const checkForUpdate = () => {
    const addressJson = localStorage.getItem('editAddress');
    isUpdate = addressJson ? true : false;
    if (!isUpdate) return;
    addressBookObj = JSON.parse(addressJson);
    setForm();
}

const setForm = () => {
    setValue('#name', addressBookObj._name);
    setValue('#phone', addressBookObj._phoneNumber);
    setValue('#notes', addressBookObj._address);
    setValue('#city', addressBookObj._city);
    setValue('#state', addressBookObj._state);
    setValue('#zipCode', addressBookObj._zipCode);
}

const save = () => {
    try {
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }   
}

const createAndUpdateStorage = () => {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBook"));
    if (addressBookList) {
        let addressBookData = addressBookList.find(addressData => addressData._id == addressBookObj._id);
        if(!addressBookData) {
            addressBookList.push(createAddressBookData());
        } else {
            const index = addressBookList.map(addressData => addressData._id)
                                         .indexOf(addressBookData._id);
            addressBookList.splice(index, 1, createAddressBookData(addressBookData._id));
        }
    } else {
        addressBookList = [createAddressBookData()]
    }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBook", JSON.stringify(addressBookList));
}

const createAddressBookData = (id) => {
    let addressBookData = new AddressBookData();
    if (!id) addressBookData.id = createNewAddressId();
    else addressBookData.id = id;
    setAddressBookData(addressBookData);
    return addressBookData;
}

const setAddressBookData = (addressBookData) => {
    try {
        addressBookData.name = addressBookObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    try {
        addressBookData.phoneNumber = addressBookObj._phoneNumber;
    } catch (e) {
        setTextValue('.phone-error', e);
        throw e;
    }
    addressBookData.address = addressBookObj._address;
    addressBookData.city = addressBookObj._city;
    addressBookData.state = addressBookObj._state;
    addressBookData.zipCode = addressBookObj._zipCode;

    alert(addressBookData.toString());
}

const createNewAddressId = () => {
    let addressId = localStorage.getItem("AddressId");
    addressId = !addressId ? 1 : (parse(addressId) + 1).toString();
    localStorage.setItem("AddressId", addressId);
    return addressId;
}

const setAddressBookObject = () => {
    addressBookObj._name = getInputValueById('#name');
    addressBookObj._phoneNumber = getInputValueById('#phone');
    addressBookObj._address = getInputValueById('#notes');
    addressBookObj._city = getInputValueById('#city');
    addressBookObj._state = getInputValueById('#state');
    addressBookObj._zipCode = getInputValueById('#zipCode');
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