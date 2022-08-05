import React, { Component } from "react";
import "./SignUp.css";

import TextField from "@mui/material/TextField"; //https://mui.com/material-ui/react-text-field/

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Button from "@mui/material/Button";

import AuthServices from "../servicss/AuthServices";

import Snackbar from "@mui/material/Snackbar";

import IconButton from '@mui/material/IconButton';




const authService = new AuthServices();

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      UserName: "",
      Password: "",
      RoleValue: "",
      UserNameFlag: false,
      PasswordFlag: false,
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
    });
    if (this.state.UserName === "") {
      this.setState({ UserNameFlag: true });
    }
    if (this.state.Password === "") {
      this.setState({ PasswordFlag: true });
    }
  }

  handleSubmit = (e) => {
    this.CheckValidity();
    if (this.state.UserName !== "" && this.state.Password !== "") {
      console.log("Acceptable");

      let data = {
        userName: this.state.UserName,
        password: this.state.Password,
        role: this.state.RoleValue,
      };

      authService
        .SignIn(data)
        .then((data) => {
          console.log("data:", data);
          if (data.data.isSuccess) {
            this.props.history.push("/");
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

  handleSignUp = (e) => {
    this.props.history.push("/SignUp");
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
          <div className="Header"> Sign In </div>
          <div className="Body">
            <form className="form">
              <TextField
                error={this.state.UserNameFlag}
                className="TextField"
                name="UserName"
                label="UserName"
                variant="filled"
                size="small"
                type="UserName"
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
                type="Password"
                value={this.state.Password}
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
            <Button className="Btn" color="primary" onClick={this.handleSignUp}>
              Create New Account
            </Button>
            <Button
              className="Btn"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Sign In
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
