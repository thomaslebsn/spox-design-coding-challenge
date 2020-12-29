import React from "react";

import ProjectsList from "./ProjectsList/ProjectsList";
import ProjectActionBar from "./ProjectForm/ProjectActionBar";
import ProjectStore from "./ProjectStore/ProjectStore";
import ProjectViewModel from "./ProjectViewModels/ProjectViewModel";
import { ProjectViewModelContextProvider } from "./ProjectViewModels/ProjectViewModelContextProvider";
import Layout from "../../hoc/Layout";

const projectStore = new ProjectStore();
const projectViewModel = new ProjectViewModel(projectStore);

function Projects() {
  console.log("Debugging Route Projects");
  console.log(projectViewModel);
  return (
    <Layout>
      <ProjectViewModelContextProvider viewModel={projectViewModel}>
        <div className="py-4 px-3">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="text-blue-0">Projects</h2>
            <ProjectActionBar />
          </div>
          <ProjectsList />
        </div>
      </ProjectViewModelContextProvider>
    </Layout>
  );
}

export default Projects;
