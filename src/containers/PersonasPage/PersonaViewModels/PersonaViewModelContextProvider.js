import React from "react";
const PersonaViewModelContext = React.createContext();

export const PersonaViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <PersonaViewModelContext.Provider value={viewModel}>
      {children}
    </PersonaViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const usePersonaViewModel = () =>
  React.useContext(PersonaViewModelContext);

/* HOC to inject store to any functional or class component */
export const withPersonaViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={usePersonaViewModel()} />;
};
