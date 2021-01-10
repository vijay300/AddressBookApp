class AddressBookData {
    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw 'Name is Incorrect!';
    }

    get phoneNumber() { return this._phoneNumber; }
    set phoneNumber(phoneNumber) {
        let phoneNumberRegex = RegExp('[91]{2}\\s{1}[6-9][0-9]{9}');
        if (phoneNumberRegex.test(phoneNumber))
            this._phoneNumber = phoneNumber;
        else throw 'Phone Number is Incorrect!';
    }

    get address() { return this._address; }
    set address(address) {
        this._address = address;
    }

    get city() { return this._city; }
    set city(city) {
        this._city = city;
    }

    get state() { return this._state; }
    set state(state) {
        this._state = state;
    }

    get zipCode() { return this._zipCode; }
    set zipCode(zipCode) {
        this._zipCode = zipCode;
    }

    toString() {
        return "Full Name = " + this.name + ", Phone Number = "
                    + this.phoneNumber + ", address = " + this.address + 
                    ", city = " + this.city + ", state = " + this.state +
                    ", zip code = " + this.zipCode;
    }
}