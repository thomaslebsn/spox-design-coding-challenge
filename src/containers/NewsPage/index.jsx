import React from "react";

import NewsList from "./NewsList/NewsList";
import NewsActionBar from "./NewsForm/NewsActionBar";
import NewsStore from "./NewsStore/NewsStore";
import NewsViewModel from "./NewsViewModels/NewsViewModel";
import { NewsViewModelContextProvider } from "./NewsViewModels/NewsViewModelContextProvider";


const projectStore = new NewsStore();
const projectViewModel = new NewsViewModel(projectStore);

function NewsPage() {
  console.log("Debugging Route News");
  console.log(projectViewModel);
  return (
    <NewsViewModelContextProvider viewModel={projectViewModel}>
      <div className="py-4 px-3">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="text-blue-0">News</h2>
          <NewsActionBar />
        </div>
        <NewsList />
      </div>
    </NewsViewModelContextProvider>
  );
}

export default NewsPage;
