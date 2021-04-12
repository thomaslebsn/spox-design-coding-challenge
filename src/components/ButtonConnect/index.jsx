import React from "react";

class ButtonConnect extends React.Component {
  render() {
    const { onClick, className, isDisabled, isConnected } = this.props;
    return (
      <>
        <button 
            type="button" 
            className={`cursor-pointer btn ${className ? className : 'btn-success'}`} 
            onClick={onClick}
            disabled={false}
        >
            <span className="ms-2">
                {isConnected ? "Connected" : "Connect"}
            </span>
        </button>
      </>
    );
  }
}

export default ButtonConnect;
