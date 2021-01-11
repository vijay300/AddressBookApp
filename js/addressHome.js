let addressList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressList = getAddressDataFromStorage();
   document.querySelector(".person-count").textContent = addressList.length;
    createInnerHtml();
    localStorage.removeItem('editAddress');
});

const getAddressDataFromStorage = () => {
    return localStorage.getItem('AddressBook') ? JSON.parse(localStorage.getItem('AddressBook')) : [];
}

const createInnerHtml = () => {
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th></th>"
    if (addressList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const addressBookData of addressList) {
        innerHtml = `${innerHtml}
        <tr>
            <td>${addressBookData._name}</td>
            <td>${addressBookData._address}</td>
            <td>${addressBookData._city}</td>
            <td>${addressBookData._state}</td>
            <td>${addressBookData._zipCode}</td>
            <td>${addressBookData._phoneNumber}</td>
            <td>
                <img id="${addressBookData._id}" onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp.svg">
                <img id="${addressBookData._id}" onclick="update(this)" alt="edit" src="../assets/create-black-18dp.svg">
            </td>
        </tr>
    `;}
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let addressBookData = addressList.find(addressData => addressData._id == node.id);
    if(!addressBookData) return;
    const index = addressList.map(addressData => addressData._id)
                             .indexOf(addressBookData._id);
    addressList.splice(index, 1);
    localStorage.setItem("AddressBook", JSON.stringify(addressList));
    document.querySelector(".person-count").textContent = addressList.length;
    createInnerHtml();
}

const update = (node) => {
    let addressBookData = addressList.find(addressData => addressData._id == node.id);
    if (!addressBookData) return;
    localStorage.setItem('editAddress', JSON.stringify(addressBookData));
    window.location.replace()
}