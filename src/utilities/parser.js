const Parser = {
    parseDate: (date) => {
        date = new Date(date);
        let mon = date.getMonth() + 1;
        mon = mon.toString()
        if (mon.length === 1) mon = '0' + mon;

        let day = date.getDate();
        day = day.toString();
        if (day.length === 1) day = '0' + day;

        return `${date.getFullYear()}-${mon}-${day}`
    },
    parseTime: (date) => {
        date = new Date(date);
        let hours = date.getHours();
        hours = hours.toString()
        if (hours.length === 1) hours = '0' + hours;

        let minutes = date.getMinutes();
        minutes = minutes.toString();
        if (minutes.length === 1) minutes = '0' + minutes;

        return `${hours}:${minutes}`
    }
}

export default Parser;