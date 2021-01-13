let addressList;
window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.use_local_storage.match("true")) {
        getAddressDataFromStorage();
    } else getAddressDataFromServer();
});

const getAddressDataFromServer = () => {
    makePromiseCall("GET", site_properties.server_url, false)
        .then(responsiveText => {
            addressList = JSON.parse(responsiveText);
            processAddressDataResponsive();
        })
        .catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
            addressList = [];
            processAddressDataResponsive();
        });
}

const processAddressDataResponsive =() => {
    document.querySelector(".person-count").textContent = addressList.length;
    createInnerHtml();
    localStorage.removeItem('editAddress');
}

const getAddressDataFromStorage = () => {
    addressList = localStorage.getItem('AddressBook') ? JSON.parse(localStorage.getItem('AddressBook')) : [];
    processAddressDataResponsive();
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
                <img id="${addressBookData.id}" onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp.svg">
                <img id="${addressBookData.id}" onclick="update(this)" alt="edit" src="../assets/create-black-18dp.svg">
            </td>
        </tr>
    `;}
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let addressBookData = addressList.find(addressData => addressData.id == node.id);
    if(!addressBookData) return;
    const index = addressList.map(addressData => addressData.id)
                             .indexOf(addressBookData.id);
    addressList.splice(index, 1);
    if (site_properties.use_local_storage.match("true")) {
        localStorage.setItem("AddressBook", JSON.stringify(addressList));
        document.querySelector(".person-count").textContent = addressList.length;
        createInnerHtml();
    } else {
        const deleteURl = site_properties.server_url + addressBookData.id.toString();
        makePromiseCall("DELETE", deleteURl, false)
            .then(responsiveText => {
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE Error Status: " + JSON.stringify(error));
            });
    }
    
}

const update = (node) => {
    let addressBookData = addressList.find(addressData => addressData.id == node.id);
    if (!addressBookData) return;
    localStorage.setItem('editAddress', JSON.stringify(addressBookData));
    window.location.replace(site_properties.add_address_page);
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handle 400 Client Error or 500 Server Error at: " + showTime());
                }
            }
        }
        
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhttp.statusText
            });
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " request sent to the server at : " + showTime());
    });
  }