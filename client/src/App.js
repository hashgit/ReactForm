import React from 'react';
import FormInput from './components/formInput';
import './App.css';

class App extends React.Component {

  state = {
    prestine: true,
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

  submit = () => {
    this.setState({ prestine: false });
  }

  isValid = (field) => () => {
    return !!this.state.values[field];
  }

  render() {
    const {prestine} = this.state;

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
                  required icon
                  onChange={this.onChange('firstName')}
                  validated={!prestine && this.isValid('firstName')}
                 />
              </div>
              <div className="col-sm-12 col-md-6">
                <FormInput
                  label="Last Name"
                  name="lastName"
                  required
                  onChange={this.onChange('lastName')}
                  validated={!prestine && this.isValid('lastName')}
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
                  validated={!prestine && this.isValid('email')}
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
          </form>
        </div>
      </React.Fragment>
    );  
  }
}

export default App;
