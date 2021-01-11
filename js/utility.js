const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (!nameRegex.test(name)) throw 'Name is Incorrect!';
}

const checkPhoneNumber = (phoneNumber) => {
    let phoneNumberRegex = RegExp('[91]{2}\\s{1}[6-9][0-9]{9}');
        if (!phoneNumberRegex.test(phoneNumber)) throw 'Phone Number is Incorrect!';
}