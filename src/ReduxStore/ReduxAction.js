// export const addFormData = (formData) => {
//   return {
//     type: "ADD_FORM_DATA",
//     payload: formData,
//   };
// };

// export const editFormData = (id, data) => ({
//   type: "EDIT_FORM_DATA",
//   payload: { id, data },
// });

// export const deleteFormData = (id) => {
//   return {
//     type: "DELETE_FORM_DATA",
//     payload: id,
//   };
// };
// export const selectFormDataById = (id) => ({
//   type: "SELECT_FORM_DATA_BY_ID",
//   payload: id,
// });

import * as types from "./Type";

export function addUser(data) {
  return {
    type: types.CREATE_SUCCESS,
    payload: data,
  };
}

export function getUser() {
  return {
    type: types.GET_SUCCESS,
  };
}

export function getidUser(id) {
  return {
    type: types.GETID_SUCCESS,
    payload: id,
  };
}

export function updateUser(data) {
  return {
    type: types.UPDATE_SUCCESS,
    payload: data,
  };
}

export function deleteUser(data) {
  return {
    type: types.DELETE_SUCCESS,
    payload: data,
  };
}
