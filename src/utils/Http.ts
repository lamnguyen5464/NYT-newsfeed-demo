import axios from 'axios';

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const METHOD = {
  GET: 'get',
  POST: 'post',
};

module.exports = {
  METHOD,

  request(props: any) {
    const {
      url = '',
      data = null,
      method = METHOD.GET,
      timeout = 30 * 1000, //in seconds
      retry = 0,
      headers = DEFAULT_HEADERS,
    } = props;
    return new Promise((resolve, reject) => {
      const options = {
        method,
        timeout,
        url,
        headers: this._getHeader(headers),
        ...(!!data ? {data} : {}), // eleminate field data when undefined
      };

      const _successHandler = ({data}: any) => {
        if (__DEV__) {
        }
        resolve(data);
      };

      const _failHandler = e => {
        if (retry < 1) {
          reject(e?.response?.data);
          return;
        }

        this.request({
          ...props,
          retry: retry - 1,
        })
          .then(resolve)
          .catch(reject);
      };

      axios(options).then(_successHandler).catch(_failHandler);
    });
  },
};
