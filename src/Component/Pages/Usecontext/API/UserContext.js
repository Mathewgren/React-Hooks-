// // UserContext.js
// import React, { createContext, useContext, useState } from "react";
// import {
//   postData,
//   getUsers,
//   getData,
//   deleteData,
//   putData,
// } from "../../../../Service/MockAPI/MockAPI";
// import { useNavigate } from "react-router-dom";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   const tableDetails = useNavigate();
//   const [product, setProduct] = useState({});

//   const addUser = async (formData) => {
//     const response = await postData(formData);
//     fetchTableData();
//     console.log(response);
//   };
//   const update = async (id, formData) => {
//     const response = await putData(id, formData);
//     fetchTableData();
//     console.log(response);
//   };

//   const fetchTableData = async () => {
//     try {
//       // const response = await axios.get(API_URL);
//       const response = await getUsers();

//       console.log("API Response Status Code:", response.status);
//       console.log("API Data:", response.data);
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching table data:", error);
//       setUsers([]);
//       // toast.error("Error fetching table data:", error);
//     }
//   };

//   const handleEdit = (id) => {
//     tableDetails(`contextform/${id}`);
//   };

//   const fetchDataById = async (id) => {
//     console.log("Fetching data for ID:", id);
//     try {
//       const response = await getData(id);
//       console.log("API Response:", response);

//       // if (response) {
//       //   setUsers({
//       //     name: response.name || "",
//       //     email: response.email || "",
//       //     password: response.password || "",
//       //     confirmPassword: response.confirmPassword || "",
//       //     phoneNumber: response.phoneNumber || "",
//       //     gender: response.gender || "",
//       //     language: response.language || "",
//       //     dob: response.dob || "",
//       //   });
//       // } else {
//       //   // Handle the case where the response is undefined
//       //   console.error("API Response is undefined");
//       //   // toast.error("Error Fetching data");
//       // }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // setUsers({
//       //   name: "",
//       //   email: "",
//       //   password: "",
//       //   confirmPassword: "",
//       //   phoneNumber: "",
//       //   gender: "",
//       //   language: "",
//       //   dob: "",
//       // });
//       // toast.error("Error Fetching data");
//     }
//   };

//   const deleterow = async () => {
//     // try {
//     await deleteData(product.id);
//     fetchTableData();
//     // }
//     //  catch (error) {
//     //   console.error("Error deleting record:", error);
//     // }
//   };
//   const deleteselect = async (selectedRow) => {
//     try {
//       const response = await deleteData(selectedRow.id);
//       fetchTableData();
//       console.log("Record deleted successfully:", response.data);
//     } catch (error) {
//       console.error("Error deleting record:", error);
//     }
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         users,
//         setUsers,
//         addUser,
//         fetchTableData,
//         handleEdit,
//         fetchDataById,
//         deleterow,
//         deleteselect,
//         update,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   return useContext(UserContext);
// };

import React, { createContext, useContext, useState } from "react";
import {
  postData,
  getUsers,
  getData,
  deleteData,
  putData,
} from "../../../../Service/MockAPI/MockAPI";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const tableDetails = useNavigate();
  // const [product, setProduct] = useState({});
  const fetchTableData = async () => {
    try {
      const response = await getUsers();
      console.log("API Response Status Code:", response.status);
      console.log("API Data:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
      setUsers([]);
    }
  };

  const addUser = async (formData) => {
    try {
      const response = await postData(formData);
      console.log(response);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const update = async (id, formData) => {
    try {
      const response = await putData(id, formData);
      console.log(response);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEdit = (id) => {
    tableDetails(`contextform/${id}`);
  };

  const getdatabyid = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
      const response = await getData(id);
      console.log("API Response:", response);
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleterow = async (id) => {
    try {
      // await deleteData(product.id);
      const response = await deleteData(id);
      // const updatedData = users.filter((val) => val.id !== product.id);
      // setUsers(updatedData);
      console.log(response);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        addUser,
        fetchTableData,
        handleEdit,
        getdatabyid,
        deleterow,
        // deleteselect,
        update,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
