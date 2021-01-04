import React, { lazy } from "react";

import ContentActionBar from "./ContentForm/ContentActionBar";
import ContentStore from "./ContentStore/ContentStore";
import ContentViewModel from "./ContentViewModels/ContentViewModel";
import { ContentViewModelContextProvider } from "./ContentViewModels/ContentViewModelContextProvider";

const ContentFormPage = lazy(() => import("./ContentForm/ContentFormPage"));
const ContentsList = lazy(() => import("./ContentsList/ContentsList"));

const contentStore = new ContentStore();
const contentViewModel = new ContentViewModel(contentStore);

function Contents({ match, location }) {
  let form = false;
  let id = 0;

  if (location.pathname === "/content/create") {
    form = true;
  }

  if (typeof match.params.id !== "undefined") {
    form = true;
    id = match.params.id;
  }

  console.log("Debugging Route Contents");
  console.log(contentViewModel);
  return (
    <ContentViewModelContextProvider viewModel={contentViewModel}>
      <div className="py-4 px-3">
        {form ? (
          <ContentFormPage id={id} />
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-blue-0">List Posts</h2>
              <ContentActionBar />
            </div>
            <ContentsList />
          </>
        )}
      </div>
    </ContentViewModelContextProvider>
  );
}

export default Contents;
