import axios from 'axios';

const baseURL = '/api/project';

function createProjectFeature(projectid, body) {
    return axios
        .post(`${baseURL}/${projectid}/create/feature`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function findProjectFeatures(projectid) {
    return axios
        .get(`${baseURL}/${projectid}/features`)
        .then(res => res)
        .catch(err => {throw err});
}

function findProjectFeature(projectid, featureid) {
    return axios
        .get(`${baseURL}/${projectid}/feature/${featureid}`)
        .then(res => res)
        .catch(err => {throw err});
}

function updateProjectFeature(projectid, featureid, body){
    return axios
        .put(`${baseURL}/${projectid}/update/feature/${featureid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function deleteProjectFeature(projectid, featureid){
    return axios
        .delete(`${baseURL}/${projectid}/delete/feature/${featureid}`)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    createProjectFeature,
    findProjectFeatures,
    findProjectFeature,
    updateProjectFeature,
    deleteProjectFeature
};
