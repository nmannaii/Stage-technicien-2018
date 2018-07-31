module.exports = function (dateInput) {
    let date = new Date(dateInput);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes  = date.getMinutes();
    if(hours<= 9 )
        hours = "0"+hours;
    if(minutes<=9) {
        minutes = "0"+minutes;
    }
    if(month<=9) {
        month = "0"+month;
    }
    if(day<=9) {
        day = "0"+day;
    }
    return (year + "-" + month + "-" + day + " " + hours +":"+minutes);
};