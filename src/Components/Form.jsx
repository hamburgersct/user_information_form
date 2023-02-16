import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "./Form.css";
import {
  InputLabel,
  Select,
  TextField,
  MenuItem,
  FormControl,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getData, postData, URL, STATUS_OK } from "../utils/api";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

const Form = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userState, setUserState] = useState("");
  const [userOccupation, setUserOccupation] = useState("");

  const [isFnameValid, setIsFnameValid] = useState(true);
  const [isLnameValid, setIsLnameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isOccupationValid, setIsOccupationValid] = useState(true);
  const [isStateValid, setIsStateValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [occupationList, setOccupationList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [showSnackBar, setShowSnackBar] = useState(false);

  // helper functions
  // check whether all fields are good to submit
  const canSubmit = () => {
    return (
      isEmailValid &&
      email !== "" &&
      isFnameValid &&
      fname !== "" &&
      isLnameValid &&
      lname !== "" &&
      isPasswordValid &&
      password !== "" &&
      isConfirmPasswordValid &&
      confirmPassword === password &&
      isOccupationValid &&
      userOccupation !== "" &&
      isStateValid &&
      userState !== ""
    );
  };

  // only triggered when the first rendering
  useEffect(() => {
    getData(URL).then((data) => {
      setOccupationList(data.occupations);
      setStateList(data.states);
    });
  }, []);

  // click handlers
  const handleClickClear = () => {
    // reset name fields
    setFname("");
    setIsFnameValid(false);
    setLname("");
    setIsLnameValid(false);
    // reset email field
    setEmail("");
    setIsEmailValid(false);
    // reset password field
    setPassword("");
    setIsPasswordValid(false);
    setConfirmPassword("");
    setIsConfirmPasswordValid(false);
    // reset selectors
    setUserState("");
    setIsStateValid(false);
    setUserOccupation("");
    setIsOccupationValid(false);
  };

  // input change handler
  const handleChangeInput = (field, e) => {
    const input = e.target.value;
    switch (field) {
      case "fname":
        setFname(input);
        setIsFnameValid(input !== "");
        break;
      case "lname":
        setLname(input);
        setIsLnameValid(input !== "");
        break;
      case "email":
        setEmail(input);
        setIsEmailValid(isEmail(input));
        break;
      case "password":
        setPassword(input);
        setIsPasswordValid(isStrongPassword(input));
        break;
      case "confirmPassword":
        setConfirmPassword(input);
        setIsConfirmPasswordValid(
          isStrongPassword(password) && input === password
        );
        break;
      case "state":
        setUserState(input);
        setIsStateValid(input !== "");
        break;
      case "occupation":
        setUserOccupation(input);
        setIsOccupationValid(input !== "");
        break;
      default:
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleCloseSnackBar = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackBar(false);
  };

  // handle submit click & post data
  const handleClickSubmit = () => {
    const userInfo = {
      name: fname + " " + lname,
      email: email,
      password: password,
      occupation: userOccupation,
      state: userState,
    };
    postData(URL, userInfo).then((response) => {
      response.status === STATUS_OK && setShowSnackBar(true);
    });
  };

  return (
    <div className="form">
      <div className="form-title">
        <h1>User Information Form</h1>
      </div>
      <Box component="form" noValidate autoComplete="off">
        <div className="form-body">
          <div className="form-row">
            <TextField
              required
              error={!isFnameValid}
              helperText={isFnameValid ? "" : "First name is required"}
              id="fname"
              value={fname}
              label="First Name"
              sx={{ width: "35%" }}
              onChange={(e) => handleChangeInput("fname", e)}
            />
            <TextField
              required
              error={!isLnameValid}
              value={lname}
              helperText={isLnameValid ? "" : "Last name is required"}
              id="lname"
              label="Last Name"
              sx={{ width: "35%" }}
              onChange={(e) => handleChangeInput("lname", e)}
            />
          </div>
          <div className="form-row">
            <TextField
              required
              error={!isEmailValid}
              helperText={isEmailValid ? "" : "Email is invalid"}
              id="email"
              value={email}
              label="Email Address"
              type="email"
              sx={{ width: "85%" }}
              onChange={(e) => handleChangeInput("email", e)}
            />
          </div>
          <div className="form-row">
            <TextField
              required
              error={!isPasswordValid}
              helperText={isPasswordValid ? "" : "Please use a strong password"}
              id="password"
              label="Password"
              value={password}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              sx={{ width: "85%" }}
              onChange={(e) => handleChangeInput("password", e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="form-row">
            <TextField
              required
              error={!isConfirmPasswordValid}
              helperText={isConfirmPasswordValid ? "" : "Password do not match"}
              id="comfirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              sx={{ width: "85%" }}
              onChange={(e) => handleChangeInput("confirmPassword", e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="form-row">
            <FormControl
              required
              sx={{ width: "85%" }}
              error={!isOccupationValid}
            >
              <InputLabel id="occupation-label">Occupation</InputLabel>
              <Select
                labelId="occupation-label"
                id="occupation"
                value={userOccupation}
                label="Occupation"
                onChange={(e) => handleChangeInput("occupation", e)}
              >
                {occupationList.map((occupation, idx) => (
                  <MenuItem key={idx} value={occupation}>
                    {occupation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="form-row">
            <FormControl required sx={{ width: "85%" }} error={!isStateValid}>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                id="state"
                value={userState}
                label="State"
                onChange={(e) => handleChangeInput("state", e)}
              >
                {stateList.map((state) => (
                  <MenuItem
                    key={state.abbreviation}
                    value={state.name}
                  >{`${state.name} (${state.abbreviation})`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="form-row form-buttons">
            <Button variant="outlined" size="large" onClick={handleClickClear}>
              Clear
            </Button>
            <Button
              variant="contained"
              size="large"
              disabled={!canSubmit()}
              onClick={handleClickSubmit}
            >
              Submit
            </Button>
            <Snackbar
              open={showSnackBar}
              autoHideDuration={6000}
              onClose={handleCloseSnackBar}
              message="Successful!"
            />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Form;
