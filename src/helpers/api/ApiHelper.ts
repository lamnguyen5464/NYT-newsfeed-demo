import { Http } from '@utils';

const ApiHelper = {
    getAllStories: () => {
        return Http.request({
            url: 'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=DljJgai3ynUgRsBCWq4Gbhgt8jZtpslN', //api token here should store at BE
        });
    },
};
export default ApiHelper;
