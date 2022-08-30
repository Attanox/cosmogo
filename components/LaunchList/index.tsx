import React from "react";

import type { Dragon, Launch } from "types/spaceXTypes";
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
  sort: "mission_name",
  order: "asc",
} as Filters;

const LaunchList = (props: LocalProps) => {
  const { dragons, initialLaunches } = props;

  const [display, setDisplay] = React.useState<Display>("grid");
  const [launches, setLaunches] = React.useState<Launch[]>(initialLaunches);
  const [filters, setFilters] = React.useState<Filters>(INITIAL_FILTERS);

  return (
    <div id="launches" className={`sm:w-4/5 sm:mx-auto mx-2 w-full my-4`}>
      <div className="w-full h-1" />
      <div className="bg-neutral bg-opacity-50 rounded-lg p-2 py-4 flex justify-between">
        <OrderSelect
          initialFilters={INITIAL_FILTERS}
          setFilters={setFilters}
          setLaunches={setLaunches}
        />
        <LayoutSelect display={display} setDisplay={setDisplay} />
      </div>
      <div className="w-full h-4" />
      <div
        style={
          display === "grid"
            ? {
                display: "grid",
                gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )",
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
