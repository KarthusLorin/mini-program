import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import {paginationBev} from '../behaviors/pagination.js'

const keymodelModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    // 锁
    loading: false
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
    loadMore(){
      if (!this.data.q) {
        return
      }
      if (this._isLocked()) {
        return
      }
      if (this.hasMore()) {
        this._locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            this._unLocked()
          }, () => {
            this._unLocked()
          })
      }
    },

    // 是否上锁
    _isLocked () {
      return this.data.loading ? true : false
    },

    // 加锁
    _locked () {
      this.data.loading = true
    },

    // 解锁
    _unLocked () {
      this.data.loading = false
    },

    onCancel (event) {
      this.triggerEvent('cancel', {})
    },

    onDelete (event) {
      this._closeResult()
    },

    onConfirm (event) {
      this._showResult()
      this.initialize()
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q)
      .then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q
        })
        keymodelModel.addToHistory(q)
      })
    },

    _showResult () {
      this.setData({
        searching: true
      })
    },

    _closeResult () {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
