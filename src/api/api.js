import 'whatwg-fetch';
class _Api {
    constructor(opts) {
        //console.log(opts)
        opts = opts || {};
        if (!opts.baseURI)
        throw new Error('请设置baseURI');
        /**
         * 基于 fetch 封装的 GET请求
         * @param url
         * @param params {}
         * @returns {Promise}
         */
        this.get = function(url, params) {
            if (params) {
                let paramsArray = [];
                //encodeURIComponent
                Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&')
                } else {
                    url += '&' + paramsArray.join('&')
                }
            }
            return new Promise(function (resolve, reject) {
              fetch(opts.baseURI + url, {
                    method: 'GET',
                    headers: opts.headers,
                  })
                  .then((response) => {
                      if (response.ok) {
                          return response.json();
                      } else {
                          reject({status:response.status})
                      }
                  })
                  .then((response) => {
                      resolve(response);
                  })
                  .catch((err)=> {
                    reject({status:-1});
                  })
            })
        }
        /**
         * 基于 fetch 封装的 POST请求  FormData 表单数据
         * @param url
         * @param formData
         * @param headers
         * @returns {Promise}
         */
        this.post = function(url, formData) {
            return new Promise(function (resolve, reject) {
              fetch(opts.baseURI + url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:formData,
                  })
                  .then((response) => {
                      if (response.ok) {
                          return response.json();
                      } else {
                          reject({status:response.status})
                      }
                  })
                  .then((response) => {
                      resolve(response);
                  })
                  .catch((err)=> {
                    reject({status:-1});
                  })
            })
        }
    }
}
const Api = _Api;
export default Api;