import dayjs from 'dayjs';

const useDayJS = (date, format) => {
    let formattedDate = dayjs(date);
    return formattedDate.format(format);
};

export default useDayJS;
