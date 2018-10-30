import {
  config
} from '../config.js'

class HTTP {
  request({
    url,
    data = {},
    method = 'GET',
    header = {}
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method, header)
    })
  }
  _request(url, resolve, reject, data, method, header) {
    // url, data, method
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: Object.assign(config.header, header),
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2') || code === '304') {
          resolve(res.data)
        } else {
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  // 私有方法
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = config.tips[error_code]
    wx.showToast({
      title: tip ? tip : config.tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}