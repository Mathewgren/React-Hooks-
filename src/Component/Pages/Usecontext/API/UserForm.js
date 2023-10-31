// UserForm.js
import React, { useState, useEffect } from "react";
import { useUserContext } from "./UserContext";
import { InputText } from "primereact/inputtext";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import "../../Usereducer/API/ReducerForm/ReducerForm.css";

const UserForm = () => {
  const { addUser, getdatabyid, update } = useUserContext();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    language: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [dobError, setDobError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userDetails = useNavigate();
  const { id } = useParams();
  console.log("ID from route:", id);

  const back = async () => {
    userDetails("/usecontext-api");
  };

  const fetchDataById = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
      const response = await getdatabyid(id);
      console.log("API Response:", response);

      if (response) {
        setUser({
          name: response.data.name || "",
          email: response.data.email || "",
          password: response.data.password || "",
          confirmPassword: response.data.confirmPassword || "",
          phoneNumber: response.data.phoneNumber || "",
          gender: response.data.gender || "",
          language: response.data.language || "",
          dob: response.data.dob || "",
        });
      } else {
        console.error("API Response is undefined");
        toast.error("Error Fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        gender: "",
        language: "",
        dob: "",
      });
      toast.error("Error Fetching data");
    }
  };

  useEffect(() => {
    if (id) {
      fetchDataById(id); // Uncomment this line to fetch data when 'id' is present.
    }
  }, [id]);

  // useEffect(() => {
  //   if (id) {
  //     // fetchDataById(id);
  //     try {
  //       const response = getdatabyid(id);
  //       console.log("Fetched dtata:", response);

  //       // fetchDataById(id);
  //       if (response) {
  //         setUser(response);
  //         // setUser({
  //         //   name: response.name || "",
  //         //   email: response.email || "",
  //         //   password: response.password || "",
  //         //   confirmPassword: response.confirmPassword || "",
  //         //   phoneNumber: response.phoneNumber || "",
  //         //   gender: response.gender || "",
  //         //   language: response.language || "",
  //         //   dob: response.dob || "",
  //         // });
  //       } else {
  //         console.error("API Response is undefined");
  //         toast.error("Error Fetching data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setUser({
  //         name: "",
  //         email: "",
  //         password: "",
  //         confirmPassword: "",
  //         phoneNumber: "",
  //         gender: "",
  //         language: "",
  //         dob: "",
  //       });
  //       toast.error("Error Fetching data");
  //     }
  //   }
  // }, [id, getdatabyid]);

  const validatePassword = (password) => {
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    return (
      password.length >= 8 &&
      specialCharRegex.test(password) &&
      lowercaseRegex.test(password) &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password)
    );
  };

  const validateForm = () => {
    let hasError = false;
    if (!/^[a-zA-Z\s]*$/.test(user.name) || /\d/.test(user.name)) {
      setNameError("Name should contain only letters and spaces.");

      hasError = true;
    } else if (user.name.trim().length < 2) {
      setNameError("Name should be at least 2 characters long.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!user.email.trim() || !isValidEmail(user.email)) {
      setEmailError("Enter a valid Email Address*");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!validatePassword(user.password)) {
      setPasswordError(
        "Password must contain at least one special character, one lowercase letter, one uppercase letter, one number, and be at least 8 characters long"
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (user.confirmPassword !== user.password) {
      setConfirmPasswordError("Passwords do not match*");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (!isValidNumber(user.phoneNumber)) {
      setPhoneNumberError("Enter a valid Mobile number*");
      hasError = true;
    } else {
      setPhoneNumberError("");
    }

    if (!user.dob.trim()) {
      setDobError("Date of Birth is required*");
      hasError = true;
    } else {
      setDobError("");
    }

    if (!user.gender.trim()) {
      setGenderError("Gender is required*");
      hasError = true;
    } else {
      setGenderError("");
    }

    if (!user.language.trim()) {
      setLanguageError("Language is required*");
      hasError = true;
    } else {
      setLanguageError("");
    }

    return !hasError;
  };

  const isValidNumber = (phoneNumber) => {
    const numberpattern = /^\d{10}$/;
    return numberpattern.test(phoneNumber);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log("Submit button clicked");
  //   // const resetForm = () => {
  //   //   setState({
  //   //     name: "",
  //   //     email: "",
  //   //     password: "",
  //   //     confirmPassword: "",
  //   //     phoneNumber: "",
  //   //     gender: "",
  //   //     language: "",
  //   //     dob: "",
  //   //   });
  //   // };

  //   // if (isSubmitting) {
  //   //   return;
  //   // }

  //   // setIsSubmitting(true);
  //   const isValid = validateForm();

  //   if (isValid) {
  //     const formData = {
  //       name: user.name,
  //       email: user.email,
  //       password: user.password,
  //       confirmPassword: user.confirmPassword,
  //       phoneNumber: user.phoneNumber,
  //       dob: user.dob,
  //       gender: user.gender,
  //       language: user.language,
  //     };
  //     // setIsSubmitting(true);
  //     // setIsLoading(true);
  //     console.log("ID:", id);
  //     if (typeof id === "undefined" && isValid) {
  //       addUser(formData);
  //       userDetails("/usecontext-api");
  //       // setIsLoading(false);
  //       // setIsSubmitting(false);
  //     } else {
  //       update(id, formData);
  //       userDetails("/usecontext-api");
  //       // setIsLoading(false);
  //       // setIsSubmitting(false);
  //     }
  //   }
  //   //  else {
  //   //   setIsSubmitting(false);
  //   //   setIsLoading(false);
  //   // }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const valid = validateForm();
  //   if (valid) {
  //     const formData = {
  //       name: user.name,
  //       email: user.email,
  //       password: user.password,
  //       confirmPassword: user.confirmPassword,
  //       phoneNumber: user.phoneNumber,
  //       dob: user.dob,
  //       gender: user.gender,
  //       language: user.language,
  //     };
  //     if (typeof id === "undefined" && valid) {
  //       try {
  //         await addUser(formData);
  //         userDetails("/usecontext-api");
  //         toast.success("Form submitted successfully!");
  //       } catch (error) {
  //         console.error("Error submitting form:", error);
  //         toast.error("Error submitting form");

  //         // setIsLoading(false);
  //         // setIsSubmitting(false);
  //       }
  //     } else {
  //       try {
  //         await update(id, formData);
  //         userDetails("/usecontext-api");
  //         // resetForm();
  //         // setTimeout(() => {
  //         //   userDetails("/usestate-api");
  //         //   setIsLoading(true);
  //         // }, 3000);
  //         console.log("Navigating to /usestate-api");
  //         toast.success("Form updated successfully!");
  //       } catch (error) {
  //         console.error("Error updating form:", error);
  //         toast.error("Error updating form");

  //         // setIsLoading(false);
  //         // setIsSubmitting(false);
  //       }
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setIsLoading(true);
    const valid = validateForm();
    if (valid) {
      const formData = {
        name: user.name,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        phoneNumber: user.phoneNumber,
        dob: user.dob,
        gender: user.gender,
        language: user.language,
      };
      setIsSubmitting(true);
      if (typeof id === "undefined" && valid) {
        try {
          await addUser(formData);

          setIsSubmitting(false);
          setTimeout(() => {
            userDetails("/usecontext-api");
            setIsLoading(true);
          }, 3000);
          toast.success("Form submitted successfully!");
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Error submitting form");
          setIsLoading(false);
        }
      } else {
        try {
          await update(id, formData);

          setTimeout(() => {
            userDetails("/usecontext-api");
            setIsLoading(true);
          }, 3000);
          setIsSubmitting(false);
          toast.success("Form updated successfully!");
        } catch (error) {
          console.error("Error updating form:", error);
          toast.error("Error updating form");
          setIsLoading(false);
        }
      }
    } else {
      setIsSubmitting(false);
      setIsLoading(false);
    }

    //   if (isEditing) {
    //     try {
    //       await update(id, formData);
    //       userDetails("/usecontext-api");
    //       setIsSubmitting(false);
    //       toast.success("Form updated successfully!");
    //     } catch (error) {
    //       console.error("Error updating form:", error);
    //       toast.error("Error updating form");
    //     }
    //   } else {
    //     try {
    //       await addUser(formData);
    //       userDetails("/usecontext-api");
    //       setIsSubmitting(false);
    //       toast.success("Form submitted successfully!");
    //     } catch (error) {
    //       console.error("Error submitting form:", error);
    //       toast.error("Error submitting form");
    //     }
    //   }
    // } else {
    //   setIsSubmitting(false);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validateForm();
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const numberRegex = /[0-9]/;
    if (name === "phoneNumber") {
      if (isValidNumber(value)) {
        e.target.classList.add("green-border");
        setPhoneNumberError("");
      } else {
        e.target.classList.remove("green-border");
        setPhoneNumberError("Enter a valid Mobile number*");
      }
    } else {
      if (
        name === "name" &&
        /^[a-zA-Z\s]*$/.test(value) &&
        !/\d/.test(value) &&
        value.trim().length >= 2
      ) {
        e.target.classList.add("green-border");
        setNameError("");
      } else if (name === "email" && isValidEmail(value)) {
        e.target.classList.add("green-border");
        setEmailError("");
      } else if (
        name === "password" &&
        value.trim().length >= 8 &&
        specialCharRegex.test(user.password) &&
        lowercaseRegex.test(user.password) &&
        uppercaseRegex.test(user.password) &&
        numberRegex.test(user.password)
      ) {
        e.target.classList.add("green-border");
        setPasswordError("");
      } else if (name === "confirmPassword" && value === user.password) {
        e.target.classList.add("green-border");
        setConfirmPasswordError("");
      } else if (name === "dob" && value.trim()) {
        e.target.classList.add("green-border");
        setDobError("");
      } else if (name === "gender" && value.trim()) {
        e.target.classList.add("green-border");
        setGenderError("");
      } else if (name === "language" && value.trim()) {
        e.target.classList.add("green-border");
        setLanguageError("");
      } else {
        e.target.classList.remove("green-border");
      }
    }
  };

  return (
    <div>
      <div className="d-flex mt-3 ms-md-5">
        {" "}
        <button
          type="button"
          className="btn ms-2 btn-dark text-light "
          onClick={back}
        >
          Back
        </button>
      </div>
      <h2>User Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="container ">
          <div className="row mt-5 shadow  gap-3">
            <div className=" custom-border  col ">
              <div className="p-4 ">
                <div className=" form-floating mb-3">
                  {" "}
                  <input
                    type="text"
                    id="name"
                    className="form-control input_border"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingInput" className="fw-bold ">
                    Name
                  </label>
                </div>
                <p id="nameError" className="text-danger">
                  {nameError}
                </p>
                <div className=" form-floating mb-3">
                  <input
                    type="text"
                    id="email"
                    className="form-control input_border"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingInput" className="fw-bold">
                    Email
                  </label>
                </div>
                <p id="emailError" className="text-danger">
                  {emailError}
                </p>

                <div className="form-floating mb-3">
                  <InputText
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control input_border"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="password" className="fw-bold">
                    Password
                  </label>
                  <span className="password-toggle">
                    <input
                      type="checkbox"
                      id="showPassword"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword">Show</label>
                  </span>
                </div>

                {/* </div> */}
                <p id="passwordError" className="text-danger">
                  {passwordError}
                </p>
                <div className=" form-floating mb-3">
                  <input
                    type={showCpassword ? "text" : "password"}
                    id="confirmPassword"
                    className="form-control input_border  "
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingInput" className="fw-bold">
                    Confirm Password
                  </label>
                  <span className="password-toggle">
                    <input
                      type="checkbox"
                      id="showCpassword"
                      onChange={() => setShowCpassword(!showCpassword)}
                    />
                    <label htmlFor="showCpassword">Show</label>
                  </span>
                </div>
                <p id="confirmPassword" className="text-danger">
                  {confirmPasswordError}
                </p>
              </div>
            </div>

            <div className=" col  custom-border">
              <div className="p-4">
                <div className=" form-floating mb-3">
                  {" "}
                  <input
                    type="number"
                    id="phoneNumber"
                    className="form-control input_border "
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingInput" className="fw-bold">
                    Phone Number
                  </label>
                </div>
                <p id="phoneNumberError" className="text-danger">
                  {phoneNumberError}
                </p>
                <div className=" form-floating mb-5">
                  <input
                    type="date"
                    id="dob"
                    className="form-control input_border  "
                    name="dob"
                    value={user.dob}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingInput" className="fw-bold">
                    Date of Birth
                  </label>
                </div>
                <p id="dobError" className="text-danger">
                  {dobError}
                </p>

                <div className="input-group mb-lg-4 mb-md-0">
                  <div className="fw-bold">
                    <label className="">Gender</label>
                  </div>
                  <div className="ms-5 d-flex">
                    {" "}
                    <div className="form-check">
                      <input
                        type="radio"
                        id="maleGender"
                        className="form-check-input "
                        name="gender"
                        value="Male"
                        checked={user.gender === "Male"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="maleGender">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="femaleGender"
                        className="form-check-input ms-2"
                        name="gender"
                        value="Female"
                        checked={user.gender === "Female"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label ms-2"
                        htmlFor="femaleGender"
                      >
                        Female
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="othersGender"
                        className="form-check-input ms-2"
                        name="gender"
                        value="Others"
                        checked={user.gender === "Others"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label ms-2"
                        htmlFor="OthersGender"
                      >
                        Others
                      </label>
                    </div>
                  </div>
                </div>
                <p id="genderError" className="text-danger">
                  {genderError}
                </p>
                <div className="input-group mb-4">
                  <label
                    className="input-group-text"
                    htmlFor="floatingInputtGroupSelect01"
                  >
                    Language
                  </label>
                  <select
                    className="form-select input-group form-control input_border"
                    id="language"
                    name="language"
                    value={user.language}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>Arabic</option>
                    <option>English</option>
                    <option>French</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                  </select>
                </div>
                <p id="languageError" className="text-danger">
                  {languageError}
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-2 pt-3 pb-3">
            {/* <button type="submit" onClick={handleSubmit}>
              Submit
            </button> */}
            {/* <button
              type="button"
              className="btn btn-success "
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : id !== undefined ? (
                "Save"
              ) : (
                "Submit"
              )}
            </button> */}
            <div className="text-center mt-2 pt-3 pb-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {id ? "Save" : "Submit"}
              </button>
              {/* <button
                type="button"
                className="btn btn-success "
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </>
                ) : id !== undefined ? (
                  "Save"
                ) : (
                  "Submit"
                )}
              </button> */}
            </div>
          </div>
        </div>
      </form>

      {isLoading && (
        <div className="loading-spinner-container">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default UserForm;
