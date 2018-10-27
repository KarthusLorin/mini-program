import { KeywordModel } from '../../models/keyword.js'

const keymodelModel = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: []
  },

  attached () {
    this.setData({
      historyWords: keymodelModel.getHistory()
    })

    keymodelModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel (event) {
      this.triggerEvent('cancel', {})
    },
    onConfirm (event) {
      const word = event.detail.value
      keymodelModel.addToHistory(word)
    }
  }
})
