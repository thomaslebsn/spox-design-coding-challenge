import React, { Component, lazy, Suspense } from "react";
import Spinner from "../../components/Spinner";

import HomeStore from "./HomeStore/HomeStore";
import ProjectStore from "../ProjectsPage/ProjectStore/ProjectStore";
import CampaignsStore from "../CampaignsPage/CampaignsStore/CampaignsStore";
import ContentStore from "../ContentPage/ContentStore/ContentStore";

import HomeViewModel from "./HomeViewModels/HomeViewModel";
import { HomeViewModelContextProvider } from "./HomeViewModels/HomeViewModelContextProvider";

const HomeList = lazy(() => import("./HomeList/HomeList"));

const projectStore = new ProjectStore();
const campaignsStore = new CampaignsStore();
const contentStore = new ContentStore();
const homeStore = new HomeStore();
const homeViewModel = new HomeViewModel(
  homeStore,
  projectStore,
  campaignsStore,
  contentStore
);

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <HomeViewModelContextProvider viewModel={homeViewModel}>
        <Suspense fallback={<Spinner />}>
          <HomeList />
        </Suspense>
      </HomeViewModelContextProvider>
    );
  }
}

export default HomePage;
