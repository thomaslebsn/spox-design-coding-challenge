import React from "react";
import { makeAutoObservable } from "mobx";

class ProjectsListViewModel {
  projectStore = null;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }
}

export default ProjectsListViewModel;

const ProjectsListViewModelContext = React.createContext();

export const ProjectsListViewModelContextProvider = ({
  children,
  viewModel,
}) => {
  return (
    <ProjectsListViewModelContext.Provider value={viewModel}>
      {children}
    </ProjectsListViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useViewModel = () =>
  React.useContext(ProjectsListViewModelContext);

/* HOC to inject store to any functional or class component */
export const withProjectsListViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useViewModel()} />;
};
