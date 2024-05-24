import { useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddJobPage from "./pages/AddJobPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import { toast } from "react-toastify";
import EditJobPage from "./pages/EditJobPage";

export default function App() {
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    res.ok ? toast.success("JOb added") : toast.error("error happened!");
    return;
  };
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    res.ok
      ? toast.success("job listing deleted successfully ")
      : toast.error("something wrong happened!");
    return;
  };
  const updateJob = async (id, job) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "Put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(job),
    });
    res.ok
      ? toast.success("job updated successfully ")
      : toast.error("something wrong happened!");
    return;
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJob={updateJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
