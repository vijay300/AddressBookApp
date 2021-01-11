let addressList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressList = getAddressDataFromStorage();
    //document.querySelector("person-count").textContent = addressList.length;
    createInnerHtml();
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
                <img name="${addressBookData._id}" onclick="remove(this) alt="delete" src="../assets/delete-black-18dp.svg">
                <img name="${addressBookData._id}" onclick="update(this) alt="edit" src="../assets/create-black-18dp.svg">
            </td>
        </tr>
    `;}
    document.querySelector('#table-display').innerHTML = innerHtml;
}