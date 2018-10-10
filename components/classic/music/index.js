import {classicBeh} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay () {
      if (!this.data.playing) {
        // 切换图片
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    }
  }
})
