const menu = [
    ['Spinach and carrot Mix paratha', 'Stuffed Idli', 'Bhindi n Chapati', 'Any chopped fruit and Biscuits', 'Koki'],
    ['Aloo paratha or Beetroot and Aloo mix paratha', 'Masala Dosa', 'Peas, Potato and Chapati', 'Boiled Corn and Cake', 'Sabudhana Tikki'],
    ['Paneer Paratha Or cabbage Paratha', 'Uttapam', 'Paneer and Chapati', 'Any chopped fruit, dry fruit and biscuits', 'Oats'],
    ['Spinach, methi mix paratha or Moong paratha', 'Upma', 'Methi aloo and chapati', 'Boiled corn and biscuits', 'Child’s favourite'],
];

function getIstTime(daysToAdd) {
    let localDate = new Date();
    if(daysToAdd) {
        localDate.setDate(localDate.getDate() + daysToAdd);
    }
    let utcDate = new Date(
            localDate.getUTCFullYear(),
            localDate.getUTCMonth(),
            localDate.getUTCDate(),
            localDate.getUTCHours(),
            localDate.getUTCMinutes(),
            localDate.getUTCSeconds()
        );
    utcDate.setHours(utcDate.getHours() + 5);
    utcDate.setMinutes(utcDate.getMinutes() + 30);
    return utcDate;
}

function tellLunchForDay(forDay) {
    forDay = forDay ? forDay.toLowerCase() : 'unknown';
    let forDate, today = getIstTime(), dayOfWeek = today.getDay() - 1;

    switch(forDay) {
        case 'unknown':
            today = getIstTime();
            if(today.getHours() <= 11) {
                forDate = today;
            } else {
                forDay = 'tomorrow';
                forDate = getIstTime(1);
            }
            break;
        case 'today':
            forDate = today;
            break;
        case 'monday':
            forDate = getUpcomingDay(dayOfWeek, 0);
            break;
        case 'tuesday':
            forDate = getUpcomingDay(dayOfWeek, 1);
            break;
        case 'wednesday':
            forDate = getUpcomingDay(dayOfWeek, 2);
            break;
        case 'thursday':
            forDate = getUpcomingDay(dayOfWeek, 3);
            break;
        case 'friday':
            forDate = getUpcomingDay(dayOfWeek, 4);
            break;
        case 'saturday':
            forDate = getUpcomingDay(dayOfWeek, 5);
            break;
        case 'sunday':
            forDate = getUpcomingDay(dayOfWeek, 6);
            break;
        case 'tomorrow':
            forDate = getIstTime(1);
            break;
        default:
            return 'Unknown day';
    }

    return tellLunchForDate(forDay, forDate);
}

function tellLunchForDate(forDay, forDate) {
    let dayOfWeek = forDate.getDay() - 1,
        weekOfMonth = getWeekOfMonthForDate(forDate);

    //Since, Sunday is 0 and becomes -1 in dayOfWeek, we change that to 7
    dayOfWeek = dayOfWeek === -1 ? 6 : dayOfWeek;
    //if dayOfWeek is between Monday to Friday
    if(dayOfWeek >= 0 && dayOfWeek <= 4) {
        return menu[weekOfMonth][dayOfWeek];
    } else {
        let lunchForMonday = tellLunchForDate('Monday', getUpcomingDay(dayOfWeek, 1));
        return forDay + ' is holiday. But, lunch on Monday is "' + lunchForMonday + '"';
    }
}

function getWeekOfMonthForDate(forDate) {
  let firstDayOfMonth = new Date(forDate.getFullYear(), forDate.getMonth(), 1);
  return (Math.floor((forDate.getDate() + firstDayOfMonth.getDay()) / 7) % 4);
}

function getUpcomingDay(dayOfWeek, upcomingDayOfWeek) {
    let upcomingDate = getIstTime();
    if(dayOfWeek === upcomingDayOfWeek) {
        return upcomingDate;
    }
    let daysToAdd = dayOfWeek > upcomingDayOfWeek ? upcomingDayOfWeek - dayOfWeek : 7 - dayOfWeek + 1;
    upcomingDate.setDate(upcomingDate.getDate() + daysToAdd);
    return upcomingDate;
}

module.exports = {
    tellLunchForDate: tellLunchForDate,
    tellLunchForDay: tellLunchForDay,
    getIstTime: getIstTime
};
