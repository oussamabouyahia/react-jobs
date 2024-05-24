import React from "react";
import Hero from "../components/Hero";
import JobListings from "../components/JobListings";
import ViewAllJobs from "../components/ViewAllJobs";
import HomeCards from "../components/HomeCards";
const HomePage = () => {
  return (
    <div>
      <Hero />
      <HomeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </div>
  );
};

export default HomePage;
