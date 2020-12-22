import React from "react";

import ProjectsList from "./ProjectsList/ProjectsList";
import ProjectActionBar from "./ProjectForm/ProjectActionBar";
import ProjectStore from "./ProjectStore/ProjectStore";
import ProjectViewModel from "./ProjectViewModels/ProjectViewModel";
import { ProjectViewModelContextProvider } from "./ProjectViewModels/ProjectViewModelContextProvider";

const projectStore = new ProjectStore();
const projectViewModel = new ProjectViewModel(projectStore);

function Projects() {
  console.log("Debugging Route Projects");
  console.log(projectViewModel);
  return (
    <>
      <ProjectViewModelContextProvider viewModel={projectViewModel}>
        <ProjectActionBar />
        <ProjectsList />
      </ProjectViewModelContextProvider>
    </>
  );
}

export default Projects;
