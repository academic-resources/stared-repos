import React from 'react'
import axios from  'axios'

export default function axiosWithAuth() {
    const token = localStorage.getItem('token')
    return axios.create ({
        headers: {
            authorization: token
        },
        baseUrl: 'http://ptmc7.herokuapp.com'
    }
       
    )
}
