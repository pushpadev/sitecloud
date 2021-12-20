import axios from 'axios';
import { SERVER_URL } from '../constant';

export const saveSite = (data) => {
    console.log(data);
    return axios.post(`${SERVER_URL}s`, JSON.stringify(data))
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err.message);
        return false;
    })
}

export const modifySite = (id, data) => {
    return axios.patch(`${SERVER_URL}?id=${id}`, JSON.stringify(data))
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err.message);
        return false;
    })
}

export const getSite = (id) => {
    return axios.get(`${SERVER_URL}?id=${id}`)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err.message);
        return false;
    })
}

export const deleteSite = (id) => {
    return axios.delete(`${SERVER_URL}?id=${id}`)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err.message);
        return false;
    })
}

export const getAllSite = () => {
    return axios.get(`${SERVER_URL}s`)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err.message);
        return false;
    })
}