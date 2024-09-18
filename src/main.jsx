import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Route from "./Route";
import AuthProviders from "./Shared/AuthProviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <RouterProvider router={Route} />
      </AuthProviders>
    </QueryClientProvider>
    <Toaster position="bottom-center" reverseOrder={false} />
  </React.StrictMode>
);
