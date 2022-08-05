import React, { Component } from "react";
import "./SignUp.css";

import TextField from "@mui/material/TextField"; //https://mui.com/material-ui/react-text-field/

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";

import AuthServices from "../servicss/AuthServices";



import Snackbar from "@mui/material/Snackbar";

import IconButton from '@mui/material/IconButton';




const authService = new AuthServices();

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      UserName: "",
      Password: "",
      ConfirmPassword: "",
      RoleValue: "",
      UserNameFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,

      open: false,
      Message: "",
    };
  }

  handleValues = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, console.log("name", name, "value", value));
  };

  handleChangeRole = (e) => {
    this.setState({ RoleValue: e.target.value });
  };

  CheckValidity() {
    console.log("CheckValidity Calling...");
    this.setState({
      UserNameFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,
    });
    if (this.state.UserName === "") {
      this.setState({ UserNameFlag: true });
    }
    if (this.state.Password === "") {
      this.setState({ PasswordFlag: true });
    }

    if (this.state.ConfirmPassword === "") {
      this.setState({ ConfirmPasswordFlag: true });
    }
  }

  handleSubmit = (e) => {
    this.CheckValidity();
    if (
      this.state.UserName !== "" &&
      this.state.Password !== "" &&
      this.state.ConfirmPassword !== ""
    ) {
      console.log("Acceptable");

      let data = {
        userName: this.state.UserName,
        password: this.state.Password,
        confirmPassword: this.state.ConfirmPassword,
        role: this.state.RoleValue,
      };

      authService
        .SignUp(data)
        .then((data) => {
          console.log("data:", data);
          if (data.data.isSuccess) {
            this.props.history.push("/SignIn");
          } else {
            console.log("Something went wrong");
           
            this.setState({open:true,Message:data.data.message})

          }
        })
        .catch((error) => {
          console.log("Error :", error);
          this.setState({open:true,Message:"SomeThing went wrong"})
        });
    } else {
      console.log("Not Acceptable");

      this.setState({open:true,Message:"Some Field Are Empty"})

    }
  };

  handleSignIn = (e) => {
    this.props.history.push("/SignIn");
  };

  handleClose =  (e, reason) => {
    if (reason === "clickaway") {
      return
    }

    this.setState({ open: false })
  }




  render() {
    console.log("State : ", this.state);
    return (
      <div className="SignUp-Container">
        <div className="SignUp-SubContainer">
          <div className="Header"> Sign Up </div>
          <div className="Body">
            <form className="form">
              <TextField
                error={this.state.UserNameFlag}
                className="TextField"
                name="UserName"
                label="UserName"
                variant="filled"
                size="small"
                value={this.state.UserName}
                onChange={this.handleValues}
              />

              <TextField
                error={this.state.PasswordFlag}
                className="TextField"
                name="Password"
                label="Password"
                variant="filled"
                size="small"
                type="password"
                value={this.state.Password}
                onChange={this.handleValues}
              />
              <TextField
                error={this.state.ConfirmPasswordFlag}
                className="TextField"
                name="ConfirmPassword"
                label="ConfirmPassword"
                variant="filled"
                size="small"
                type="password"
                value={this.state.ConfirmPassword}
                onChange={this.handleValues}
              />

              <RadioGroup
                className="Role"
                name="Role"
                value={this.state.RoleValue}
                onChange={this.handleChangeRole}
              >
                <FormControlLabel
                  className="RoleValue"
                  value="Admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  className="RoleValue"
                  value="User"
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </form>
          </div>
          <div className="Buttons">
            <Button className="Btn" color="primary" onClick={this.handleSignIn}>
              Sign In
            </Button>
            <Button
              className="Btn"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
          </div>
        </div>


        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        message={this.state.Message}
        action={<React.Fragment>
          <Button color="secondary" size="small" onClick={this.handleClose}>
            UNDO
          </Button>
         
        </React.Fragment>}
      />

      </div>
    );
  }
}
