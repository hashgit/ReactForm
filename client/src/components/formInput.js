import React from 'react';
import classNames from 'classnames';

class FormInput extends React.Component {

  onFieldChange = (event) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  }

  render() {
    const { label, name, required, validated } = this.props;

    return (
      <div className={classNames('form-group', { required })}>
        <label className="control-label" htmlFor={name}>{label}</label>
        <div className="input-group">
          <input type="text" className="form-control" id={name} onChange={this.onFieldChange} />
        </div>
        <div className={classNames("invalid-feedback", { validated })}>
          Please provide a valid value.
        </div>
      </div>
    );
  }
}

export default FormInput;