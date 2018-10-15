import {
    HTTP
} from '../util/http-p.js'

class BookModel extends HTTP {
    getHotList () {
        return this.request({
            url: '/classic/hot_list'
        })
    }
}

export {BookModel}