import 'axios'

const baseURL = '/api/project/:projectid';

function createProject(projectid, body) {
    return axios
        .post(`${baseURL}/create`, body)
        .then( res => res )
        .catch( err => {throw err});
}

function findProject(projectid, projectId) {
    return axios
        .get(`${baseURL + '/' + projectId}`)
        .then( res => res )
        .catch( err => {throw err});
}

function updateProject(projectId, body) {
    return axios
        .put(`${baseURL + '/update' + projectId}`, body)
        .then( res => res )
        .catch( err => {throw err});
}

function deleteProject(projectId) {
    return axios
        .delete(`${baseURL + '/delete' + projectId}`)
        .then( res => res )
        .catch( err => {throw err});
}

export {
    createProject,
    findProject,
    updateProject,
    deleteProject
}
