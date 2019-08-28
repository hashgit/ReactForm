import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPortrait } from '@fortawesome/free-solid-svg-icons'

class FormInput extends React.Component {

  onFieldChange = (event) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  }

  render() {
    const { label, name, required, icon, validated } = this.props;

    return (
      <div className={classNames('form-group', { required })}>
        <label className="control-label" htmlFor={name}>{label}</label>
        <div className="input-group">
          <input type="text" className="form-control" id={name} onChange={this.onFieldChange} />
          { icon && <span className="icon-inside"><FontAwesomeIcon icon={faPortrait} /></span>}
        </div>
        <div className={classNames("invalid-feedback", { validated })}>
          Please provide a valid value.
        </div>
      </div>
    );
  }
}

export default FormInput;