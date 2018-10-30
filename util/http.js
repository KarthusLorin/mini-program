import {config} from '../config.js'

class HTTP {
  request ({
    url,
    success,
    fail,
    method = 'GET',
    data = {},
    header = {}
  }) {
    wx.request({
      url: config.api_base_url + url,
      method,
      data: data,
      header: Object.assign(header, config.header),
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2') || code === '304') {
          success && success(res.data)
        } else {
          fail && fail(res.data)
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        fail && fail(res.data)
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

export {HTTP}