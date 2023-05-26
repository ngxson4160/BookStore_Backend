class CheckFormatData {
    isValidateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    isValidDateTime(dateTimeString) {
        const dateTimeRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
        return dateTimeRegex.test(dateTimeString);
    }

    isValidPhoneNumber(phoneNumber) {
        const regex = /^0[1-9]\d{8}$/;
        return regex.test(phoneNumber);
      }
}

module.exports = new CheckFormatData();
