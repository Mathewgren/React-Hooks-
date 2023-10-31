// reducers/dialogReducer.js
const initialState = {
  deleteProductDialog: false,
  product: null,
};

export const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_FORM_DATA":
      // Handle delete action here
      const idToDelete = action.payload.id;
      // Update your state to remove the row with the given id
      return {
        ...state,
        formDataList: state.formDataList.filter(
          (formData) => formData.id !== idToDelete
        ),
      };
    case "SHOW_DELETE_DIALOG":
      return {
        ...state,
        deleteProductDialog: true,
        product: action.payload,
      };
    case "HIDE_DELETE_DIALOG":
      return {
        ...state,
        deleteProductDialog: false,
        product: null,
      };
    default:
      return state;
  }
};
