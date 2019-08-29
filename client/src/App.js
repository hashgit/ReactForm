import React from 'react';
import FormInput from './components/formInput';
import './App.css';

class App extends React.Component {

  state = {
    prestine: true,
    created: false,
    error: null,
    values: {
      firstName: '',
      lastName: '',
      email: '',
      mobilePhone: ''
    }  
  };

  onChange = (field) => (value) => {
    var values = this.state.values;
    values[field] = value;

    this.setState({ values });
  }

  formIsValid(values) {
    return !!values.firstName && !!values.lastName && !!values.email;
  }

  submit = () => {
    this.setState({ prestine: false });

    const that = this;

    if (this.formIsValid(this.state.values)) {
      fetch('http://localhost:5000/api/form', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          data: this.state.values
        })
      }).then(() => {
        that.setState({ created: true });
      }).catch(err => {
        that.setState({ error: err.Message });
      });
    }
  }

  isValid = (field) => () => {
    return !!this.state.values[field];
  }

  render() {
    const {prestine, error, created} = this.state;

    return (
      <React.Fragment>
        <nav className="navbar navbar-dark navbar-color">
          <div className="container">
            <div className="navbar-brand">Subscribe</div>
          </div>
        </nav>
        <div className="container">
          <form>
            <div className="row top-buffer">
              <div className="col-sm-12 col-md-6">
                <FormInput
                  label="First Name"
                  name="firstName"
                  required
                  onChange={this.onChange('firstName')}
                  validated={!prestine && !this.isValid('firstName')()}
                 />
              </div>
              <div className="col-sm-12 col-md-6">
                <FormInput
                  label="Last Name"
                  name="lastName"
                  required
                  onChange={this.onChange('lastName')}
                  validated={!prestine && !this.isValid('lastName')()}
                />
              </div>
            </div>
            <div className="row top-buffer">
              <div className="col-sm-12 col-md-6">
                <FormInput
                  label="Email"
                  name="email"
                  required
                  onChange={this.onChange('email')}
                  validated={!prestine && !this.isValid('email')()}
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <FormInput
                  label="Mobile Phone"
                  name="mobilePhone"
                  onChange={this.onChange('mobilePhone')}
                />
              </div>
            </div>
            <div className="row top-buffer">
              <div className="col-sm-12">
                <button type="button" className="btn" onClick={this.submit}>Submit</button>
              </div>
            </div>
            <div className="row top-buffer">
              <div className="col-sm-12">
                { created &&
                  <div class="alert alert-success" role="alert">
                    { created && "User has been created" }
                  </div>
                }
                {error &&
                  <div class="alert alert-danger" role="alert">
                    { error }
                  </div>
                }
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );  
  }
}

export default App;
