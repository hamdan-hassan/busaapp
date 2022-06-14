import React from "react";

import TShirtStats from "../statistics/tshirtStats";
import CourseStats from "../statistics/courseStats";
import GenderStats from "../statistics/GenderStats";
import Summary from "../statistics/Summary";

const Statistics = () => {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2 mt-20 md:mt-2">
      <TShirtStats />
      <CourseStats />
      <GenderStats />
      <Summary />
    </div>
  );
};

export default Statistics;
