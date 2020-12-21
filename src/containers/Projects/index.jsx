import React from "react";

import ProjectsList from "./ProjectsList/ProjectsList";
import ProjectActionBar from "./ProjectForm/ProjectActionBar";

import ProjectsListViewModel, {
  ProjectsListViewModelContextProvider,
} from "./ProjectsList/ProjectsListViewModel";

import ProjectFormViewModel, {
  ProjectFormViewModelContextProvider,
} from "./ProjectForm/ProjectFormViewModel";

import ProjectStore, {
  ProjectStoreContextProvider,
} from "./ProjectStore/ProjectStore";

const projectListViewModel = new ProjectsListViewModel();
const projectFormViewModel = new ProjectFormViewModel();
const projectsStore = new ProjectStore();

function Projects() {
  return (
    <>
      <ProjectFormViewModelContextProvider viewModel={projectFormViewModel}>
        <ProjectStoreContextProvider store={projectsStore}>
          <ProjectActionBar />
        </ProjectStoreContextProvider>
      </ProjectFormViewModelContextProvider>

      <ProjectsListViewModelContextProvider viewModel={projectListViewModel}>
        <ProjectStoreContextProvider store={projectsStore}>
          <ProjectsList />
        </ProjectStoreContextProvider>
      </ProjectsListViewModelContextProvider>
    </>
  );
}

export default Projects;
