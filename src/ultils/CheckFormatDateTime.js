function isValidDateTime(dateTimeString) {
    const dateTimeRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    return dateTimeRegex.test(dateTimeString);
}

module.exports = isValidDateTime;