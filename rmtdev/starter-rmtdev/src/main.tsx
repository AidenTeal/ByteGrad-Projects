import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarkIDProvider from "./components/contexts/BookmarkIDProvider.tsx";
import ActiveIDContextProvider from "./components/contexts/ActiveIDContextProvider.tsx";
import SearchTextContextProvider from "./components/contexts/SearchTextContextProvider.tsx";
import JobItemsContextProvider from "./components/contexts/JobItemsContextProvider.tsx";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BookmarkIDProvider>
      <ActiveIDContextProvider>
        <SearchTextContextProvider>
          <JobItemsContextProvider>
              <App />
          </JobItemsContextProvider>
        </SearchTextContextProvider>
      </ActiveIDContextProvider>
    </BookmarkIDProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
