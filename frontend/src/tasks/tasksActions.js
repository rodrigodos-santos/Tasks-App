import axios from 'axios'

const URL = 'http://localhost:3003/api/tasks'

//Action Creator mudar a descrição da tarefa alterada
export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

//Action Creator para buscar os serviços no backend
export const search = () => {
    return(dispatch, getState) => {
        const description = getState().tasks.description
        const search = description ? `&description__regex=/${description}/` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({type:'TODO_SEARCHED', payload: resp.data}))
    }
}

export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}


export const markAsDone = (tasks) => {
    return dispatch => {
        axios.put(`${URL}/${tasks._id}`, { ...tasks, done: true })
            .then(resp => dispatch(search()))
    }
}

export const markAsPending = (tasks) => {
    return dispatch => {
        axios.put(`${URL}/${tasks._id}`, { ...tasks, done: false })
            .then(resp => dispatch(search()))
    }
}

export const remove = (tasks) => {
    return dispatch => {
        axios.delete(`${URL}/${tasks._id}`)
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    return [{ type: 'TASKS_CLEAR' }, search()]
}