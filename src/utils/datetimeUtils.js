const moment = require('moment');


module.exports.getDateInTheFuture = function(hours) {
    let currentDate = moment();
    forDate = moment(currentDate).add(hours, 'hours');
    return forDate;
};

module.exports.getHoursDiff = function(startDate, endDate) {
	hoursDiff = moment.duration(endDate.diff(startDate)).asHours();
	fullHoursDiff = Math.ceil(hoursDiff);
    return fullHoursDiff;
};
