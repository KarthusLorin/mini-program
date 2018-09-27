import {HTTP} from '../util/http.js'

class LikeModel extends HTTP {
    like (behavior, artID, category) {
        let url = behavior == 'like' ? '/like' : '/like/cancel'
        this.request({
            url,
            method: 'POST',
            data: {
                art_id: artID,
                type: category
            }
        })
    
    }
}

export {LikeModel}