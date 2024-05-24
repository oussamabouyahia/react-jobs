import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import JobListing from "./JobListing";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";
    (async () => {
      try {
        const data = await fetch(apiUrl);
        const res = await data.json();

        setJobs(res);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  // const recentJobs = isHome ? jobs.slice(0, 3) : jobs;
  if (!loading) {
    return (
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs?.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    );
  } else
    return (
      <ClipLoader
        // color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
};

export default JobListings;
