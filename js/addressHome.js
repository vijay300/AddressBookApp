window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th></th>"
    let innerHtml2 = `${headerHtml}`;
    let addressList = createAddressBookJSON();
    for (const addressBookData of addressList) {
        innerHtml = `${innerHtml2}
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
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const createAddressBookJSON = () => {
    let localAddress = [
        {
            _name = 'Vijay',
            _address = '31-36-110 Rajeev Nagar',
            _city = 'Visakhapatnam',
            _state = 'Andhra Pradesh',
            _zipCode = '530046',
            _phoneNumber = '91 8977890300',
            _id = new Date().getTime
        },
        {
            _name = 'Kumar',
            _address = '5-4-2 City Nagar',
            _city = 'Pune',
            _state = 'Maharastra',
            _zipCode = '300291',
            _phoneNumber = '91 8786892320',
            _id = new Date().getTime
        }
    ];
    return localAddress;
}