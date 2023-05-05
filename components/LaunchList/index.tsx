import React from "react";

import type { Dragon, Launch } from "types/appTypes";
import type { Display, Filters } from "./types";
import OrderSelect from "./OrderSelect";
import LayoutSelect from "./LayoutSelect";
import Pagination from "./Pagination";
import LaunchDetail from "components/LaunchDetail";

interface LocalProps {
  initialLaunches: Launch[];
  dragons: Dragon[];
}

export const INITIAL_FILTERS = {
  sort: "launch_date_utc",
  order: "asc",
} as Filters;

const LaunchList = (props: LocalProps) => {
  const { dragons, initialLaunches } = props;

  const [display, setDisplay] = React.useState<Display>("grid");
  const [launches, setLaunches] = React.useState<Launch[]>(initialLaunches);
  const [filters, setFilters] = React.useState<Filters>(INITIAL_FILTERS);

  return (
    <div
      id="launches"
      className={`sm:w-full sm:mx-auto mx-0 -mt-20 w-full my-4`}
    >
      <div className="w-full h-1" />
      <div className="w-full md:w-2/3 mx-auto relative z-20 bg-base-100 shadow-md rounded-md px-4 py-8 flex flex-col sm:flex-row justify-between">
        <OrderSelect
          initialFilters={INITIAL_FILTERS}
          setFilters={setFilters}
          setLaunches={setLaunches}
        />
        <div className="w-4 h-4" />
        <LayoutSelect display={display} setDisplay={setDisplay} />
      </div>
      <div className="w-full h-4" />
      <div
        style={
          display === "grid"
            ? {
                display: "grid",
                gridTemplateColumns: "repeat( 3, 1fr )",
              }
            : { display: "flex", flexDirection: "column" }
        }
        className={`gap-4 items-stretch`}
      >
        {launches.map((launch) => (
          <LaunchDetail
            key={`${launch.id}-${launch.mission_name}`}
            launch={launch}
            dragons={dragons}
            display={display}
          />
        ))}
      </div>
      <div className="w-full h-2" />
      <Pagination filters={filters} setLaunches={setLaunches} />
      <div className="w-full h-4" />
    </div>
  );
};

export default LaunchList;
