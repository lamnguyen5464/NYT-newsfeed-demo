import { Http } from '@utils';

const ApiHelper = {
    getStoriesOfSection: (section: string) => {
        return Http.request({
            url: `https://api.nytimes.com/svc/topstories/v2/${section?.toLowerCase()}.json?api-key=DljJgai3ynUgRsBCWq4Gbhgt8jZtpslN`, //api token here should store at BE
        });
    },
};
export default ApiHelper;
