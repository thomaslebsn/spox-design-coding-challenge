import React, { lazy } from "react";
import { Route } from "react-router-dom";
import ContentActionBar from "./ContentForm/ContentActionBar";
import ContentStore from "./ContentStore/ContentStore";
import ContentViewModel from "./ContentViewModels/ContentViewModel";
import { ContentViewModelContextProvider } from "./ContentViewModels/ContentViewModelContextProvider";

const ContentFormPage = lazy(() => import("./ContentForm/ContentFormPage"));
const ContentsList = lazy(() => import("./ContentsList/ContentsList"));

const contentStore = new ContentStore();
const contentViewModel = new ContentViewModel(contentStore);

function Contents({ match }) {
  console.log("Debugging Route Contents");
  console.log(contentViewModel);
  return (
    <ContentViewModelContextProvider viewModel={contentViewModel}>
      <div className="py-4 px-3">
        <Route exact path="/content">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="text-blue-0">List Posts</h2>
            <ContentActionBar />
          </div>
          <ContentsList />
        </Route>

        <Route exact path={["/content/create", "/content/edit/:id"]}>
          <ContentFormPage match={match} />
        </Route>
      </div>
    </ContentViewModelContextProvider>
  );
}

export default Contents;
