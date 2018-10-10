import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Person from "@material-ui/icons/Person";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Alert } from "reactstrap";

import { loginUser } from "actions/authActions";

class SignIn extends Component {

  static alertVisible = true;

  state = {
    userId: "",
    password: "",
    showPassword: false,
    errors: { userId: false, password: false },
    alertVisible: true
  };

  componentDidUpdate(prevProps, prevState) {
    let nextProps = this.props;
    if (nextProps.user) {
      nextProps.history.push('/app/search_planet');
    }
  }

  onDismiss = () => {
    SignIn.alertVisible = false;
    this.setState({ alertVisible: !this.state.alertVisible });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    SignIn.alertVisible = true;
    const { userId, password } = this.state;
    if (userId && password) {
      this.props.loginUser({ userId, password });
    } else {
      this.setState({ errors: { userId: !userId, password: !password } });
    }
  };

  renderAlert = alert => {
    if (alert) {
      const { alertFor, alertType, alertMsg } = alert;
      if (alertFor === "Login") {
        return (
          <Alert
            color={alertType}
            isOpen={SignIn.alertVisible}
            toggle={this.onDismiss}
            className="alert__notify__top"
          >
            {alertMsg}
          </Alert>
        );
      }
    }
  };

  doNothing = e => {
    e.preventDefault();
  };

  togglePwd = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { alert } = this.props;
    const { errors } = this.state;
    return (
      <div className="login__container">
        {this.renderAlert(alert)}
        <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
          <div className="app-login-main-content">
            <div className="app-login-content">
              <div className="app-login-header mb-4">
                <h1 className="text-center">STAR WARS</h1>
              </div>
              <div className="app-login-form">
                <form onSubmit={this.onSubmit}>
                  <fieldset>
                    <Input
                      name="userId"
                      type="text"
                      fullWidth
                      placeholder="Username"
                      error={errors.userId}
                      onChange={this.onChange}
                      className="my-sm-3"
                      inputProps={{ tabIndex: "1" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onMouseDown={this.doNothing}
                            tabIndex="100"
                          >
                            <Person />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <Input
                      name="password"
                      type={this.state.showPassword ? "text" : "password"}
                      fullWidth
                      placeholder="password"
                      error={errors.password}
                      value={this.state.password}
                      onChange={this.onChange}
                      className="my-sm-3"
                      inputProps={{ tabIndex: "2" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.togglePwd}
                            onMouseDown={this.doNothing}
                            tabIndex="101"
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                                <Visibility />
                              )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <Button
                      type="submit"
                      variant="raised"
                      color="primary"
                      tabIndex="3"
                      fullWidth={true}
                      style={{ marginTop: '3em' }}
                    >
                      Sign In
                      </Button>
                  </fieldset>
                </form>
              </div>
            </div>
            <div className="app-logo-content d-flex align-items-center justify-content-center"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  alert: state.notification
});

export default connect(mapStateToProps, { loginUser })(SignIn);
