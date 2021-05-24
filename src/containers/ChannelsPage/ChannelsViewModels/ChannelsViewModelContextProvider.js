import React from "react";
const ChannelsViewModelContext = React.createContext();

export const ChannelsViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ChannelsViewModelContext.Provider value={viewModel}>
      {children}
    </ChannelsViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useChannelsViewModel = () =>
  React.useContext(ChannelsViewModelContext);

/* HOC to inject store to any functional or class component */
export const withChannelsViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useChannelsViewModel()} />;
};
