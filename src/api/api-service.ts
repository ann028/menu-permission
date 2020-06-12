import request from '../utils/request';

const get = async (url: string) => {
  return request.get(url, {
    headers: {
      'Token': window.sessionStorage.getItem('token') || null,
      'Token-Id': window.sessionStorage.getItem('userId') || null,
    },
  });
};

const getPic = async (url: string, params?: any ) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'get',
      url,
      data: {},
      params,
      // responseType: 'arraybuffer',
      headers: {
        'Token': window.sessionStorage.getItem('token') || null,
        'Token-Id': window.sessionStorage.getItem('userId') || null,
      },
    })
    .then((res: any) => {
      resolve(res);
    })
    .catch((err: any) => {
      reject(err);
    });
  });
};

const post = async (url: string, data?: any, token?: string) => {
  return request.post(url, data, {
    headers: {
      'Token': token || window.sessionStorage.getItem('token'),
      'Token-Id': window.sessionStorage.getItem('userId') || null,
    },
  });
};
export default {
  get,
  getPic,
  post,
}
