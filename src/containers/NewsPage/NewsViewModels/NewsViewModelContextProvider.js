import React from "react";
const NewsViewModelContext = React.createContext();

export const NewsViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <NewsViewModelContext.Provider value={viewModel}>
      {children}
    </NewsViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useNewsViewModel = () =>
  React.useContext(NewsViewModelContext);

/* HOC to inject store to any functional or class component */
export const withNewsViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useNewsViewModel()} />;
};
