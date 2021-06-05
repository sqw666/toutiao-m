import request from '@/utils/request'

export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}

export const getCurrentUser = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user',
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels',
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
export const addFollow = userId => {
    return request({
        method: 'POST',
        url: '/app/v1_0/user/followings',
        data: {
            target: userId
        }
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
export const deleteFollow = userId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${userId}`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}