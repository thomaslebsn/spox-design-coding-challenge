import React from 'react';

class ButtonConnect extends React.Component {
  render() {
    const { onClick, className, isDisabled, isConnected } = this.props;
    return (
      <>
        <button
          type="button"
          className={`cursor-pointer btn ${className ? className : 'btn-success'}`}
          onClick={onClick}
          disabled={isDisabled}
        >
          <span className="ms-2 text-white">{isConnected ? 'Disconnect' : 'Connect'}</span>
        </button>
      </>
    );
  }
}

export default ButtonConnect;
