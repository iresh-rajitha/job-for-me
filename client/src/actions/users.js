import api from './user'

export const ACTION_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FETCH_ALL: 'FETCH_ALL',
}

const formateData = (data) => ({
  ...data,
  age: parseInt(data.age ? data.age : 0),
})

export const fetchAll = () => (dispatch) => {
  api
    .users()
    .fetchAll()
    .then((response) => {
      console.log(response)
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data,
      })
    })
    .catch((error) => console.log(error))
}

export const create = (data, onSuccess) => (dispatch) => {
  data = formateData(data)
  api
    .users()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      })
      onSuccess()
    })
    .catch((err) => console.log(err))
}

export const update = (id, data, onSuccess) => (dispatch) => {
  data = formateData(data)
  api
    .users()
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data },
      })
      onSuccess()
    })
    .catch((err) => console.log(err))
}

export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .users()
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      })
      onSuccess()
    })
    .catch((err) => console.log(err))
}
