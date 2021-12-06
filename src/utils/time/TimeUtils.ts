const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = MONTH * 12;

export default {
    formatDelta(stringDate: string) {
        const delta = new Date().getTime() - new Date(stringDate).getTime();
        if (delta / YEAR > 0) {
            return Math.ceil(delta / YEAR) + ' year(s) ago';
        }
        if (delta / MONTH > 0) {
            return Math.ceil(delta / MONTH) + ' month(s) ago';
        }
        if (delta / DAY > 0) {
            return Math.ceil(delta / DAY) + ' day(s) ago';
        }
        if (delta / HOUR > 0) {
            return Math.ceil(delta / YEAR) + ' hour(s) ago';
        }
        if (delta / MINUTE > 0) {
            return Math.ceil(delta / YEAR) + ' minute(s) ago';
        }
        if (delta / SECOND > 0) {
            return Math.ceil(delta / YEAR) + ' second(s) ago';
        }
    },
};
