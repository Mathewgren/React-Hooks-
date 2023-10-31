// reducers.js
const initialState = {
  formDataList: [],
  formDataForEdit: null,
  selectedFormData: null,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    // case "ADD_FORM_DATA":
    //   return {

    //     ...state,
    //     formDataList: [...state.formDataList, action.payload],
    //   };
    case "ADD_FORM_DATA":
      const newFormData = {
        ...action.payload,
        id: state.formDataList.length + 1,
      };
      return {
        ...state,
        formDataList: [...state.formDataList, newFormData],
      };

    // case "EDIT_FORM_DATA":
    //   return state.map((formData) =>
    //     formData.id === action.payload.id
    //       ? { ...formData, ...action.payload.data }
    //       : formData
    //   );

    case "EDIT_FORM_DATA":
      return {
        ...state,
        formDataList: state.formDataList.map((formData) =>
          formData.id === action.payload.id
            ? { ...formData, ...action.payload.data }
            : formData
        ),
      };

    // case "DELETE_FORM_DATA":
    //   return {
    //     ...state,
    //     formDataList: state.formDataList.filter(
    //       (data) => data.id !== action.payload
    //     ),
    //   };

    case "SELECT_FORM_DATA_BY_ID":
      // Handle SELECT_FORM_DATA_BY_ID action here
      const selectedData = state.formDataList.find(
        (formData) => formData.id === action.payload
      );
      return {
        ...state,
        selectedFormData: selectedData,
      };

    case "DELETE_FORM_DATA":
      const idToDelete = action.payload;
      console.log("formDataList before deletion:", state.formDataList);
      console.log("Deleting row with ID:", idToDelete);
      const updatedDataList = state.formDataList.filter(
        (formData) => formData.id !== idToDelete
      );
      return {
        ...state,
        formDataList: updatedDataList,
      };
    default:
      return state;
  }
};

export default formReducer;
