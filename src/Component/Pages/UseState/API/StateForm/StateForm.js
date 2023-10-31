import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Divider } from "primereact/divider";
import { ProgressSpinner } from "primereact/progressspinner";

// import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import {
  postData,
  getData,
  putData,
} from "../../../../../Service/MockAPI/MockAPI";
import "./StateForm.css";

export default function StateForm() {
  const { id } = useParams();
  console.log(id);
  const userDetails = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    language: "",
    dob: "",
    editedData: -1,
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

  useEffect(() => {
    if (id) {
      fetchDataById(id);
    }
  }, [id]);

  const fetchDataById = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
      const response = await getData(id);
      console.log("API Response:", response);

      if (response) {
        setState({
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
        // Handle the case where the response is undefined
        console.error("API Response is undefined");
        toast.error("Error Fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setState({
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

  // const fetchDataById = async (id) => {
  //   console.log("Fetching data for ID:", id);
  //   try {
  //     const response = await getData(id);
  //     console.log("API Response:", response);
  //     setState({
  //       name: response.name || "",
  //       email: response.email || "",
  //       password: response.password || "",
  //       confirmPassword: response.confirmPassword || "",
  //       phoneNumber: response.phoneNumber || "",
  //       gender: response.gender || "",
  //       language: response.language || "",
  //       dob: response.dob || "",
  //     });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setState({
  //       name: "",
  //       email: "",
  //       password: "",
  //       confirmPassword: "",
  //       phoneNumber: "",
  //       gender: "",
  //       language: "",
  //       dob: "",
  //     });
  //     toast.error("Error Fetching data");
  //   }
  // };

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
    if (!/^[a-zA-Z\s]*$/.test(state.name) || /\d/.test(state.name)) {
      setNameError("Name should contain only letters and spaces.");

      hasError = true;
    } else if (state.name.trim().length < 2) {
      setNameError("Name should be at least 2 characters long.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!state.email.trim() || !isValidEmail(state.email)) {
      setEmailError("Enter a valid Email Address*");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!validatePassword(state.password)) {
      setPasswordError(
        "Password must contain at least one special character, one lowercase letter, one uppercase letter, one number, and be at least 8 characters long"
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    // const uppercaseRegex = /[A-Z]/;
    // const lowercaseRegex = /[a-z]/;
    // const numberRegex = /[0-9]/;

    // if (state.password.length < 7) {
    //   setPasswordError("Password must contain at least 8 characters");
    //   hasError = true;
    // } else if (
    //   !uppercaseRegex.test(state.password) ||
    //   !lowercaseRegex.test(state.password) ||
    //   !numberRegex.test(state.password)
    // ) {
    //   setPasswordError(
    //     "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    //   );
    //   hasError = true;
    // } else {
    //   setPasswordError("");
    // }

    if (state.confirmPassword !== state.password) {
      setConfirmPasswordError("Passwords do not match*");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (!isValidNumber(state.phoneNumber)) {
      setPhoneNumberError("Enter a valid Mobile number*");
      hasError = true;
    } else {
      setPhoneNumberError("");
    }

    if (!state.dob.trim()) {
      setDobError("Date of Birth is required*");
      hasError = true;
    } else {
      setDobError("");
    }

    if (!state.gender.trim()) {
      setGenderError("Gender is required*");
      hasError = true;
    } else {
      setGenderError("");
    }

    if (!state.language.trim()) {
      setLanguageError("Language is required*");
      hasError = true;
    } else {
      setLanguageError("");
    }

    return !hasError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
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
        specialCharRegex.test(state.password) &&
        lowercaseRegex.test(state.password) &&
        uppercaseRegex.test(state.password) &&
        numberRegex.test(state.password)
      ) {
        e.target.classList.add("green-border");
        setPasswordError("");
      } else if (name === "confirmPassword" && value === state.password) {
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

  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit button clicked");
    // const resetForm = () => {
    //   setState({
    //     name: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     phoneNumber: "",
    //     gender: "",
    //     language: "",
    //     dob: "",
    //   });
    // };

    if (isSubmitting) {
      return;
    }

    // setIsSubmitting(true);
    const isValid = validateForm();

    if (isValid) {
      const formData = {
        name: state.name,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
        phoneNumber: state.phoneNumber,
        gender: state.gender,
        language: state.language,
        dob: state.dob,
      };
      setIsSubmitting(true);
      setIsLoading(true);
      console.log("ID:", id);
      if (typeof id === "undefined" && isValid) {
        try {
          const response = await postData(formData);
          console.log(response);
          // resetForm();

          setTimeout(() => {
            userDetails("/usestate-api");
            setIsLoading(true);
          }, 3000);
          toast.success("Form submitted successfully!");
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Error submitting form");

          setIsLoading(false);
          setIsSubmitting(false);
        }
      } else {
        try {
          const response = await putData(id, formData);
          console.log(response);
          // resetForm();
          setTimeout(() => {
            userDetails("/usestate-api");
            setIsLoading(true);
          }, 3000);
          console.log("Navigating to /usestate-api");
          toast.success("Form updated successfully!");
        } catch (error) {
          console.error("Error updating form:", error);
          toast.error("Error updating form");

          setIsLoading(false);
          setIsSubmitting(false);
        }
      }
    } else {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const isValidNumber = (phoneNumber) => {
    const numberpattern = /^\d{10}$/;
    return numberpattern.test(phoneNumber);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  return (
    <div>
      <div className="bg-color">
        <div className="d-flex mt-3 ms-md-5">
          {" "}
          <NavLink to="/usestate-api">
            <button type="button" className="btn ms-2 btn-dark text-light">
              Back
            </button>
          </NavLink>
        </div>
        <h1 className="text-center mt-2 fw-bold">Workers's Details</h1>

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
                      value={state.name}
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
                      value={state.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingInput" className="fw-bold">
                      Email
                    </label>
                  </div>
                  <p id="emailError" className="text-danger">
                    {emailError}
                  </p>

                  {/* <label htmlFor="floatingInput" className="">
                    Password
                  </label> */}
                  {/* <div className="form-floating mb-3"> */}
                  {/* <Password
                    id="password"
                    className="form-control input_border "
                    name="password"
                    footer={footer}
                    value={state.password}
                    onChange={handleChange}
                    toggleMask
                  /> */}
                  <div className="form-floating mb-3">
                    <InputText
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="form-control input_border"
                      name="password"
                      value={state.password}
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
                      value={state.confirmPassword}
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
                      value={state.phoneNumber}
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
                      value={state.dob}
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
                          checked={state.gender === "Male"}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="maleGender"
                        >
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
                          checked={state.gender === "Female"}
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
                          checked={state.gender === "Others"}
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
                      value={state.language}
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
              <button
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
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
