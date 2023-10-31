// // FormComponent.js
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addFormData,
//   editFormData,
//   selectFormDataById,
// } from "../../../ReduxStore/ReduxAction";
// import { useNavigate, NavLink, useParams } from "react-router-dom";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";

// const ReduxForm = () => {
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//     gender: "",
//     language: "",
//     dob: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCpassword, setShowCpassword] = useState(false);
//   const totable = useNavigate();
//   const { id } = useParams();

//   const formDataToEdit = useSelector((state) => selectFormDataById(state, id));
//   console.log("formDataToEdit:", formDataToEdit);

//   useEffect(() => {
//     if (id && formDataToEdit) {
//       setFormData(formDataToEdit);
//     }
//   }, [id, formDataToEdit]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   dispatch(addFormData(formData));
//   //   totable("/reduxtable");
//   // };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (id) {
//       dispatch(editFormData(id, formData));
//       totable("/reduxtable");
//     } else {
//       dispatch(addFormData(formData));
//       totable("/reduxtable");
//     }
//   };

//   return (
//     // <form onSubmit={handleSubmit}>
//     //   <input
//     //     type="text"
//     //     name="name"
//     //     value={formData.name}
//     //     onChange={handleInputChange}
//     //   />
//     //   <input
//     //     type="text"
//     //     name="email"
//     //     value={formData.email}
//     //     onChange={handleInputChange}
//     //   />
//     //   <input
//     //     type="text"
//     //     name="phoneNumber"
//     //     value={formData.phoneNumber}
//     //     onChange={handleInputChange}
//     //   />
//     //   <input
//     //     type="password"
//     //     name="password"
//     //     value={formData.password}
//     //     onChange={handleInputChange}
//     //   />
//     //   <input
//     //     type="password"
//     //     name="confirmPassword"
//     //     value={formData.confirmPassword}
//     //     onChange={handleInputChange}
//     //   />
//     //   <select
//     //     name="gender"
//     //     value={formData.gender}
//     //     onChange={handleInputChange}
//     //   >
//     //     <option value="male">Male</option>
//     //     <option value="female">Female</option>
//     //   </select>
//     //   <input
//     //     type="text"
//     //     name="language"
//     //     value={formData.language}
//     //     onChange={handleInputChange}
//     //   />
//     //   <button type="submit">Submit</button>
//     // </form>

//     <div>
//       {" "}
//       <div className="d-flex mt-3 ms-md-5">
//         {" "}
//         <NavLink to="/reduxtable">
//           <button type="button" className="btn ms-2 btn-dark text-light">
//             Back
//           </button>
//         </NavLink>
//       </div>
//       <h1 className="text-center mt-2 fw-bold">Redux</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="container">
//           <div className="row mt-5 shadow gap-3">
//             <div className="custom-border col">
//               <div className="p-4">
//                 <div className="form-floating mb-3">
//                   <input
//                     type="text"
//                     id="name"
//                     // className={`form-control input_border ${
//                     //   state.errors.name ? "is-invalid" : ""
//                     // } ${state.name && !state.errors.name ? "green-border" : ""}`}
//                     className={`form-control input_border`}
//                     name="name"
//                     value={formData.name}
//                     // value={formDataToEdit ? formDataToEdit.name : ""}

//                     onChange={handleInputChange}
//                   />
//                   <label htmlFor="floatingInput" className="fw-bold">
//                     Name
//                   </label>
//                   {/* {state.errors.name && (
//                   <div className="invalid-feedback">{state.errors.name}</div>
//                 )} */}
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input
//                     type="text"
//                     id="email"
//                     className={`form-control input_border`}
//                     // className={`form-control input_border ${
//                     //   state.errors.email ? "is-invalid" : ""
//                     // } ${
//                     //   state.email && !state.errors.email ? "green-border" : ""
//                     // }`}
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                   />
//                   <label htmlFor="floatingInput" className="fw-bold">
//                     Email
//                   </label>
//                   {/* {state.errors.email && (
//                   <div className="invalid-feedback">{state.errors.email}</div>
//                 )} */}
//                 </div>
//                 <div className="form-floating mb-3">
//                   <InputText
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     className={`form-control input_border`}
//                     // className={`form-control input_border ${
//                     //   state.errors.password ? "is-invalid" : ""
//                     // } ${
//                     //   state.password && !state.errors.password
//                     //     ? "green-border"
//                     //     : ""
//                     // }`}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                   />
//                   <label htmlFor="password" className="fw-bold">
//                     Password
//                   </label>
//                   <span className="password-toggle">
//                     <input
//                       type="checkbox"
//                       id="showPassword"
//                       onChange={() => setShowPassword(!showPassword)}
//                     />
//                     <label htmlFor="showPassword">Show</label>
//                   </span>
//                 </div>
//                 {/* <label htmlFor="floatingInput" className="">
//                     Password
//                   </label>

//                   <Password
//                     id="password"
//                     className={`form-control input_border ${
//                       state.errors.password ? "is-invalid" : ""
//                     } ${
//                       state.password && !state.errors.password
//                         ? "green-border"
//                         : ""
//                     }`}
//                     name="password"
//                     footer={footer}
//                     value={state.password}
//                     onChange={handleChange}
//                     toggleMask
//                     style={{ paddingRight: "30px" }}
//                   /> */}
//                 {/* {state.errors.password && (
//                 <div className="text-danger">{state.errors.password}</div>
//               )} */}
//                 <div className="form-floating mb-3">
//                   <input
//                     type={showCpassword ? "text" : "password"}
//                     id="confirmPassword"
//                     className={`form-control input_border`}
//                     // className={`form-control input_border ${
//                     //   state.errors.confirmPassword ? "is-invalid" : ""
//                     // } ${
//                     //   state.confirmPassword && !state.errors.confirmPassword
//                     //     ? "green-border"
//                     //     : ""
//                     // }`}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                   />
//                   <label htmlFor="floatingInput" className="fw-bold">
//                     Confirm Password
//                   </label>
//                   <span className="password-toggle">
//                     <input
//                       type="checkbox"
//                       id="showCpassword"
//                       onChange={() => setShowCpassword(!showCpassword)}
//                     />
//                     <label htmlFor="showCpassword">Show</label>
//                   </span>
//                   {/* {state.errors.confirmPassword && (
//                   <div className="invalid-feedback">
//                     {state.errors.confirmPassword}
//                   </div>
//                 )} */}
//                 </div>
//               </div>
//             </div>

//             <div className="col custom-border">
//               <div className="p-4">
//                 <div className="form-floating mb-3">
//                   <input
//                     type="number"
//                     id="phoneNumber"
//                     className={`form-control input_border`}
//                     // className={`form-control input_border ${
//                     //   state.errors.phoneNumber ? "is-invalid" : ""
//                     // } ${
//                     //   state.phoneNumber && !state.errors.phoneNumber
//                     //     ? "green-border"
//                     //     : ""
//                     // }`}
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleInputChange}
//                   />
//                   <label htmlFor="floatingInput" className="fw-bold">
//                     Phone Number
//                   </label>
//                   {/* {state.errors.phoneNumber && (
//                   <div className="invalid-feedback">
//                     {state.errors.phoneNumber}
//                   </div>
//                 )} */}
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input
//                     type="date"
//                     id="dob"
//                     className={`form-control input_border`}
//                     // className={`form-control input_border ${
//                     //   state.errors.dob ? "is-invalid" : ""
//                     // } ${state.dob && !state.errors.dob ? "green-border" : ""}`}
//                     name="dob"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                   />
//                   <label htmlFor="floatingInput" className="fw-bold">
//                     Date of Birth
//                   </label>
//                   {/* {state.errors.dob && (
//                   <div className="invalid-feedback">{state.errors.dob}</div>
//                 )} */}
//                 </div>

//                 <div>
//                   {/* <div className="input-group mb-lg-4 mb-md-0"> */}
//                   <div
//                     className={`form-control input_border`}
//                     // className={`form-control input_border ${
//                     //   state.errors.gender ? "is-invalid" : ""
//                     // } ${
//                     //   state.gender && !state.errors.gender ? "green-border" : ""
//                     // }`}
//                   >
//                     <div className="fw-bold">
//                       <label className="">Gender</label>
//                     </div>
//                     <div className="ms-5 d-flex">
//                       <div className="form-check">
//                         <input
//                           type="radio"
//                           id="maleGender"
//                           className="form-check-input"
//                           name="gender"
//                           value="Male"
//                           checked={formData.gender === "Male"}
//                           onChange={handleInputChange}
//                         />
//                         <label
//                           className="form-check-label"
//                           htmlFor="maleGender"
//                         >
//                           Male
//                         </label>
//                       </div>
//                       <div className="form-check">
//                         <input
//                           type="radio"
//                           id="femaleGender"
//                           className="form-check-input ms-2"
//                           name="gender"
//                           value="Female"
//                           checked={formData.gender === "Female"}
//                           onChange={handleInputChange}
//                         />
//                         <label
//                           className="form-check-label ms-2"
//                           htmlFor="femaleGender"
//                         >
//                           Female
//                         </label>
//                       </div>
//                       <div className="form-check">
//                         <input
//                           type="radio"
//                           id="othersGender"
//                           className="form-check-input ms-2"
//                           name="gender"
//                           value="Others"
//                           checked={formData.gender === "Others"}
//                           onChange={handleInputChange}
//                         />
//                         <label
//                           className="form-check-label ms-2"
//                           htmlFor="OthersGender"
//                         >
//                           Others
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* {state.errors.gender && (
//                 <div className="text-danger">{state.errors.gender}</div>
//               )} */}

//                 <div>
//                   {/* <div className="input-group  mt-5 mb-4 "> */}
//                   <div className="input-group  mt-5 mb-4 ">
//                     <label
//                       className="input-group-text"
//                       htmlFor="floatingInputtGroupSelect01"
//                     >
//                       Language
//                     </label>
//                     <select
//                       className={`form-control input_border`}
//                       // className={`form-control input_border ${
//                       //   state.errors.language ? "is-invalid" : ""
//                       // } ${
//                       //   state.language && !state.errors.language
//                       //     ? "green-border"
//                       //     : ""
//                       // }`}
//                       id="language"
//                       name="language"
//                       value={formData.language}
//                       onChange={handleInputChange}
//                     >
//                       <option value="">Select</option>
//                       <option>Arabic</option>
//                       <option>English</option>
//                       <option>French</option>
//                       <option>Hindi</option>
//                       <option>Tamil</option>
//                     </select>
//                   </div>
//                   {/* {state.errors.language && (
//                   <p className="text-danger ">{state.errors.language}</p>
//                 )} */}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="text-center mt-2 pt-3 pb-3">
//             <Button className="rounded-pill mb-4 mt-4" onClick={handleSubmit}>
//               {id ? "Update" : "Submit"}
//             </Button>
//             {/* <button
//             type="button"
//             className="btn btn-success"
//             onClick={handleSubmit}
//             disabled={state.isSubmitting}
//           >
//             {state.isSubmitting ? (
//               <>
//                 <span
//                   className="spinner-border spinner-border-sm me-2"
//                   role="status"
//                   aria-hidden="true"
//                 ></span>
//                 Submitting...
//               </>
//             ) : id ? (
//               "Save"
//             ) : (
//               "Submit"
//             )}
//           </button> */}
//             {/*
//               <NavLink to="/usereducer-api">
//                 <button type="button" className="btn ms-2 btn-dark text-light">
//                   Back
//                 </button>
//               </NavLink> */}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ReduxForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button } from "primereact/button";
// import { Link } from "react-router-dom";
// import { FaAngleDoubleLeft } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { InputText } from "primereact/inputtext";
// import {
//   addUser,
//   getidUser,
//   updateUser,
// } from "../../../ReduxStore/ReduxAction";

// const ReduxForm = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.reducer);
//   console.log(users);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     dob: "",
//     password: "",
//     cpass: "",
//     language: "",
//     gender: "",
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [cshowPassword, setCShowPassword] = useState(false);

//   const getid = async () => {
//     console.log(getid);
//     dispatch(getidUser(id));
//   };

//   useEffect(() => {
//     if (id) {
//       getid();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   useEffect(() => {
//     if (users.selectedEmployee) {
//       setFormData({
//         name: users.selectedEmployee.name,
//         email: users.selectedEmployee.email,
//         phone: users.selectedEmployee.phone,
//         dob: users.selectedEmployee.dob,
//         password: users.selectedEmployee.password,
//         cpass: users.selectedEmployee.cpass,
//         language: users.selectedEmployee.language,
//         gender: users.selectedEmployee.gender,
//         id: users.selectedEmployee.id,
//       });
//     }
//     console.log(users);
//   }, [users]);
//   const nameRegex = /^[a-zA-Z ]{3,30}$/;
//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//   const phoneRegex = /^\d{10}$/;
//   const passwordRegex =
//     /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
//   const dobRegex = /^\d{4}-\d{2}-\d{2}/;

//   const validateForm = () => {
//     const errors = {};

//     if (!formData.name) {
//       errors.name = "Name is required*";
//     } else if (!nameRegex.test(formData.name)) {
//       errors.name = "Invalid name format*";
//     }

//     if (!formData.email) {
//       errors.email = "Email is required*";
//     } else if (!emailRegex.test(formData.email)) {
//       errors.email = "Invalid email format*";
//     }

//     if (!formData.phone) {
//       errors.phone = "Phone number is required*";
//     } else if (!phoneRegex.test(formData.phone)) {
//       errors.phone = "Invalid phone number format*";
//     }

//     if (!formData.password) {
//       errors.password = "Password is required*";
//     } else if (!passwordRegex.test(formData.password)) {
//       errors.password = "Invalid password format*";
//     }

//     if (!formData.cpass) {
//       errors.cpass = "Confirm Password is required*";
//     } else if (formData.cpass !== formData.password) {
//       errors.cpass = "Passwords do not match*";
//     }

//     if (!formData.language) {
//       errors.language = "Language is required*";
//     }

//     if (!formData.gender) {
//       errors.gender = "Gender is required*";
//     }

//     if (!formData.dob) {
//       errors.dob = "Date of Birth is required*";
//     } else if (!dobRegex.test(formData.dob)) {
//       errors.dob = "Invalid Date of Birth format*";
//     }

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   const handleFieldChange = (event, regex, fieldName) => {
//     const value = event.target.value;

//     if (regex && !regex.test(value)) {
//       setFormErrors({
//         ...formErrors,
//         [fieldName]: `Invalid ${fieldName} format*`,
//       });
//     } else {
//       setFormErrors({
//         ...formErrors,
//         [fieldName]: "",
//       });
//     }

//     setFormData({
//       ...formData,
//       [fieldName]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isValid = validateForm();

//     if (isValid) {
//       try {
//         if (id) {
//           dispatch(updateUser(formData));
//           toast.success("User Data Updated successfully", {
//             position: toast.POSITION.TOP_RIGHT,
//           });
//         } else {
//           dispatch(addUser(formData));
//           toast.success("User Data created successfully", {
//             position: toast.POSITION.TOP_RIGHT,
//           });
//         }
//         navigate("/reduxtable");
//       } catch (error) {
//         toast.error(`Error in the ${id ? "UPDATE" : "POST"} API`, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="main-container w-75 mx-auto">
//         <div className="form-container row shadow-lg mt-5">
//           <div className="d-flex justify-content-start">
//             <Link to="/reduxtable">
//               <Button className="rounded-pill mt-4" variant="primary">
//                 <FaAngleDoubleLeft className="me-2 mb-1" />
//                 Back
//               </Button>
//             </Link>
//           </div>
//           <div className="text-center fw-bold fs-2 mb-3">UseContext Form</div>
//           <div className="col-md-6">
//             <label className="fw-bold">
//               Name <span className="text-danger">*</span>
//             </label>
//             <input
//               className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
//               name="Name"
//               value={formData.name}
//               onChange={(event) => {
//                 handleFieldChange(event, nameRegex, "name");
//               }}
//               placeholder="Enter your Name"
//               required
//             />
//             <p className="error-message">{formErrors.name}</p>
//           </div>

//           <div className="col-md-6">
//             <label className="fw-bold">
//               E-Mail <span className="text-danger">*</span>
//             </label>
//             <input
//               className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
//               name="Email"
//               value={formData.email}
//               onChange={(event) => {
//                 handleFieldChange(event, emailRegex, "email");
//               }}
//               placeholder="Enter your E-mail"
//               required
//             />
//             <p className="error-message">{formErrors.email}</p>
//           </div>

//           <div className="col-md-6">
//             <label className="fw-bold">
//               Phone Number <span className="text-danger">*</span>
//             </label>
//             <input
//               className={`form-control ${formErrors.phone ? "is-invalid" : ""}`}
//               name="Phone Number"
//               value={formData.phone}
//               onChange={(event) => {
//                 handleFieldChange(event, phoneRegex, "phone");
//               }}
//               placeholder="Enter your Phone Number"
//               required
//             />
//             <p className="error-message">{formErrors.phone}</p>
//           </div>

//           <div className="col-md-6">
//             <label className="fw-bold">
//               Date of Birth <span className="text-danger">*</span>
//             </label>
//             <input
//               className={`form-control ${formErrors.dob ? "is-invalid" : ""}`}
//               name="Date of Birth"
//               type="date"
//               value={formData.dob}
//               onChange={(event) => {
//                 handleFieldChange(event, dobRegex, "dob");
//               }}
//               placeholder="Enter your Date of Birth"
//               required
//             />
//             <p className="error-message">{formErrors.dob}</p>
//           </div>

//           {/* <div className="col-md-6">
//             <label htmlFor="password" className="fw-bold">
//               Password
//             </label>
//             <InputText
//               // id="password"
//               type={showPassword ? "text" : "password"}
//               className="form-control input_border"
//               name="password"
//               value={formData.password}
//               onChange={(event) => {
//                 handleFieldChange(event, passwordRegex, "password");
//               }}
//             />
//             <span className="password-toggle">
//               <input
//                 type="checkbox"
//                 id="showPassword"
//                 onChange={() => setShowPassword(!showPassword)}
//               />
//               <label htmlFor="showPassword">Show</label>
//             </span>
//             <p className="error-message">{formErrors.passwordError}</p> */}
//           {/* <label className="fw-bold">Password</label>
//             <div className="">
//               <div className="input-field-wrapper">
//                 <input
//                   className={`form-control ${
//                     formErrors.password ? "is-invalid" : ""
//                   }`}
//                   name="Password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={(event) => {
//                     handleFieldChange(event, passwordRegex, "password");
//                   }}
//                   placeholder="Enter your Password"
//                   required
//                 />
//                 <button
//                   className="show-password-button fs-4 text-primary"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <FaEye /> : <FaEyeSlash />}
//                 </button>
//               </div>
//             </div>
//             <p className="error-message">{formErrors.passwordError}</p> */}
//           {/* </div> */}

//           {/* <div className="col-md-6">
//             <label className="fw-bold">Confirm password</label>
//             <div className="">
//               <div className="input-field-wrapper">
//                 <input
//                   className={`form-control ${
//                     formErrors.cpass ? "is-invalid" : ""
//                   }`}
//                   name="Confirm password"
//                   type={cshowPassword ? "text" : "password"}
//                   value={formData.cpass}
//                   onChange={(event) => {
//                     handleFieldChange(event, passwordRegex, "cpass");
//                   }}
//                   placeholder="Enter your Confirm password"
//                   required
//                 />
//                 <button
//                   className="show-password-button fs-4 text-primary"
//                   onClick={() => setCShowPassword(!cshowPassword)}
//                 >
//                   {cshowPassword ? <FaEye /> : <FaEyeSlash />}
//                 </button>
//               </div>
//             </div>

//             <p className="error-message">{formErrors.cpassError}</p>
//           </div> */}

//           {/* <div className="col-md-6">
//             <label htmlFor="floatingInput" className="fw-bold">
//               Confirm Password
//             </label>
//             <input
//               type={cshowPassword ? "password" : "text"}
//               // id="confirmPassword"
//               className="form-control input_border  "
//               name="Confirm password"
//               value={formData.cpass}
//               onChange={(event) => {
//                 handleFieldChange(event, passwordRegex, "cpass");
//               }}
//             />

//             <span className="password-toggle">
//               <input
//                 type="checkbox"
//                 id="showCpassword"
//                 onChange={() => setCShowPassword(!cshowPassword)}
//               />
//               <label htmlFor="showCpassword">Show</label>
//             </span>
//           </div>
//           <p className="error-message">{formErrors.cpassError}</p> */}

//           <div className="col-md-6 mb-3 mx-auto">
//             <label htmlFor="language" className="fw-bold text-dark">
//               Language:
//             </label>
//             <select
//               className={`form-select ${
//                 formErrors.language ? "is-invalid" : ""
//               }`}
//               id="language"
//               name="language"
//               value={formData.language}
//               onChange={(event) => {
//                 handleFieldChange(event, null, "language");
//               }}
//             >
//               <option value="">Select your Language</option>
//               <option value="english">English</option>
//               <option value="spanish">Spanish</option>
//               <option value="french">French</option>
//             </select>
//             {formErrors.language && (
//               <div className="text-danger">{formErrors.language}</div>
//             )}
//           </div>

//           <div className="col-md-6">
//             <label className="fw-bold">
//               Gender <span className="text-danger">*</span>
//             </label>
//             <div className="radio-group d-flex">
//               {["Male", "Female", "Others"].map((option) => (
//                 <div key={option}>
//                   <input
//                     type="radio"
//                     name="Gender"
//                     value={option}
//                     checked={formData.gender === option}
//                     onChange={(event) => {
//                       handleFieldChange(event, null, "gender");
//                     }}
//                     required
//                   />
//                   <label className="me-2">{option}</label>
//                 </div>
//               ))}
//             </div>
//             <p className="error-message">{formErrors.gender}</p>
//           </div>

//           <div className="d-flex justify-content-center">
//             <div className="">
//               <Button className="rounded-pill mb-4 mt-4" onClick={handleSubmit}>
//                 {id ? "Update" : "Submit"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReduxForm;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  getidUser,
  updateUser,
} from "../../../ReduxStore/ReduxAction";

const Reduxform = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.reducer);
  console.log(users);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    cpass: "",
    language: "",
    gender: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, setCShowPassword] = useState(false);

  const getid = async () => {
    console.log(getid);
    dispatch(getidUser(id));
  };

  useEffect(() => {
    if (id) {
      getid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (users.selectedEmployee) {
      setFormData({
        name: users.selectedEmployee.name,
        email: users.selectedEmployee.email,
        phone: users.selectedEmployee.phone,
        dob: users.selectedEmployee.dob,
        password: users.selectedEmployee.password,
        cpass: users.selectedEmployee.cpass,
        language: users.selectedEmployee.language,
        gender: users.selectedEmployee.gender,
        id: users.selectedEmployee.id,
      });
    }
    console.log(users);
  }, [users]);
  const nameRegex = /^[a-zA-Z ]{3,30}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  // const passwordRegex =
  //   /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;

  const dobRegex = /^\d{4}-\d{2}-\d{2}/;

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required*";
    } else if (!nameRegex.test(formData.name)) {
      errors.name = "Invalid name format*";
    } else {
      errors.name = ""; // Clear the error if the name is valid
    }

    if (!formData.email) {
      errors.email = "Email is required*";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format*";
    } else {
      errors.email = ""; // Clear the error if the email is valid
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required*";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone number format*";
    } else {
      errors.phone = ""; // Clear the error if the phone number is valid
    }

    if (!formData.password) {
      errors.password = "Password is required*";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Invalid password format*";
    } else {
      errors.password = ""; // Clear the error if the password is valid
    }

    if (!formData.cpass) {
      errors.cpass = "Confirm Password is required*";
    } else if (formData.cpass !== formData.password) {
      errors.cpass = "Passwords do not match*";
    } else {
      errors.cpass = ""; // Clear the error if the passwords match
    }

    if (!formData.language) {
      errors.language = "Language is required*";
    } else {
      errors.language = ""; // Clear the error if the language is selected
    }

    if (!formData.gender) {
      errors.gender = "Gender is required*";
    } else {
      errors.gender = ""; // Clear the error if the gender is selected
    }

    if (!formData.dob) {
      errors.dob = "Date of Birth is required*";
    } else if (!dobRegex.test(formData.dob)) {
      errors.dob = "Invalid Date of Birth format*";
    } else {
      errors.dob = ""; // Clear the error if the date of birth is valid
    }

    setFormErrors(errors);

    return Object.keys(errors).every((key) => errors[key] === "");
  };

  const handleFieldChange = (event, regex, fieldName) => {
    const value = event.target.value;

    if (regex && !regex.test(value)) {
      setFormErrors({
        ...formErrors,
        [fieldName]: `Invalid ${fieldName} format*`,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [fieldName]: "",
      });
    }

    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        if (id) {
          dispatch(updateUser(formData));
          toast.success("User Data Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          dispatch(addUser(formData));
          toast.success("User Data created successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        navigate("/Reduxtable");
      } catch (error) {
        toast.error('Error in the ${id ? "UPDATE" : "POST"} API', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <div className=" d-flex justify-content-center flex-column bgs mx-auto">
      <div className=" d-flex justify-content-end me-3 mt-3">
        <Link to="/reduxtable">
          <button className="btn btn-grad text-secondary"> Back</button>
        </Link>
      </div>
      <div className="container col-md-8 card p-5 shadow-secondary ">
        <Form className="form">
          <div className="row">
            <h1 className="text-center text-danger">Redux Form</h1>

            <div className="col-md-6 mx-auto">
              <label className="fw-bold">
                Name<span className="text-danger">*</span> :
              </label>
              <input
                className={`form-control ${
                  formErrors.name ? "is-invalid" : ""
                }`}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(event) => {
                  handleFieldChange(event, nameRegex, "name");
                }}
                placeholder="Enter your Name"
                required
              />
              <p className="error-message text-danger fw-bold">
                {formErrors.name}
              </p>
            </div>

            <div className="col-md-6 mx-auto">
              <label className="fw-bold">
                Date of Birth<span className="text-danger">*</span> :
              </label>
              <input
                className={`form-control ${formErrors.dob ? "is-invalid" : ""}`}
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={(event) => {
                  handleFieldChange(event, dobRegex, "dob");
                }}
                placeholder="Enter your Date of Birth "
              />
              <p className="error-message text-danger fw-bold">
                {formErrors.dob}
              </p>
            </div>
            <div className="col-md-6 mx-auto">
              <label className="fw-bold mb-3">
                Gender<span className="text-danger">*</span> :
              </label>
              <div className="radio-group d-flex">
                {["Male", "Female", "Other"].map((option) => (
                  <div key={option}>
                    <input
                      type="radio"
                      id={option}
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={(event) => {
                        handleFieldChange(event, null, "gender");
                      }}
                    />
                    <label className="me-2"> {option}</label>
                  </div>
                ))}
              </div>
              <p className="error-message text-danger fw-bold">
                {formErrors.gender}
              </p>
            </div>

            <div className="col-md-6  mx-auto">
              <label className="fw-bold">
                E-mail<span className="text-danger">*</span> :
              </label>
              <input
                className={`form-control ${
                  formErrors.email ? "is-invalid" : ""
                }`}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(event) => {
                  handleFieldChange(event, emailRegex, "email");
                }}
                placeholder="Enter your Email"
              />
              <p className="error-message text-danger fw-bold">
                {formErrors.email}
              </p>
            </div>

            <div className="col-md-6 mx-auto">
              <label className="fw-bold">
                Password<span className="text-danger">*</span> :
              </label>
              <div className="input-field-show">
                <input
                  className={`form-control ${
                    formErrors.password ? "is-invalid" : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(event) => {
                    handleFieldChange(event, passwordRegex, "password");
                  }}
                  placeholder="Enter your Password"
                />
                <button
                  className="show-password-button fs-4 text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <p className="error-message text-danger fw-bold">
                {formErrors.password}{" "}
              </p>
            </div>
            <div className="col-md-6 mx-auto">
              <label className="fw-bold">
                Confirm Password<span className="text-danger">*</span> :
              </label>
              <div className="input-field-show"></div>
              <input
                className={`form-control ${
                  formErrors.cpass ? "is-invalid" : ""
                }`}
                type={cshowPassword ? "text" : "password"}
                id="cpass"
                name="cpass"
                value={formData.cpass}
                onChange={(event) => {
                  handleFieldChange(event, passwordRegex, "cpass");
                }}
                placeholder="Confirm your Password"
              />
              <button
                className="show-passwordbuttons fs-4 text-primary"
                onClick={() => setCShowPassword(!cshowPassword)}
              >
                {cshowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>

              <p className="error-message text-danger fw-bold">
                {formErrors.cpass}
              </p>
            </div>

            <div className="col-md-6 mx-auto">
              <label className="fw-bold mb-3">
                Language<span className="text-danger">*</span> :
              </label>
              <select
                className={
                  'form-control ${formErrors.language ? "is-invalid" : ""}'
                }
                id="language"
                name="language"
                value={formData.language}
                onChange={(event) => {
                  handleFieldChange(event, null, "language");
                }}
              >
                <option value="">-- Select your Language --</option>
                <option value="tamil">Tamil</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="telugu">Telugu</option>
                <option value="malayalam">Malayalam</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="urdu">Urdu</option>
                <option value="Other">Other</option>
              </select>

              <p className="text-danger text-danger fw-bold">
                {formErrors.language}
              </p>
            </div>

            <div className="col-md-6 mx-auto">
              <label className="fw-bold">
                Phone Number<span className="text-danger">*</span> :
              </label>
              <input
                className={`form-control ${
                  formErrors.phone ? "is-invalid" : ""
                }`}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(event) => {
                  handleFieldChange(event, phoneRegex, "phone");
                }}
                placeholder="Enter your Phone Number"
              />
              <p className="error-message text-danger fw-bold">
                {formErrors.phone}
              </p>
            </div>

            <div className="d-flex justify-content-center">
              <div className="">
                <Button
                  className="btn btn-primary rounded-pill mb-4 mt-4"
                  onClick={handleSubmit}
                >
                  {id ? "Update" : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Reduxform;
