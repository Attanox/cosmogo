import React from "react";

import LaunchDetail from "./LaunchDetail";
import { getSpacexClient } from "lib/apollo.client";
import { gql } from "@apollo/client";
import { Dragon, Launch } from "types/spaceXTypes";

interface LocalProps {
  initialLaunches: Launch[];
  dragons: Dragon[];
}

type Display = "list" | "grid";
type Order = "mission_name" | "site_name_long";
type Sort = "asc" | "des";

const SEPARATOR = "+";

const LayoutSelect = (props: {
  setDisplay: (d: Display) => void;
  display: Display;
}) => {
  const { display, setDisplay } = props;

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => setDisplay("grid")}
        className={`btn btn-square ${display === "grid" ? "btn-active" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      </button>
      <div className="w-2" />
      <button
        type="button"
        onClick={() => setDisplay("list")}
        className={`btn btn-square ${display === "list" ? "btn-active" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </button>
    </div>
  );
};

const OrderSelect = (props: { setLaunches: (launches: Launch[]) => void }) => {
  const { setLaunches } = props;
  const client = getSpacexClient();
  const [loading, setLoading] = React.useState(false);

  const orderLaunches = async (order: Order, sort: Sort) => {
    setLoading(true);
    const { data } = await client.query<{
      launches: Launch[];
    }>({
      query: gql`
        query GetLaunches {
          launches(order: ${order}, sort: ${sort}) {
            details
            id
            mission_name
            launch_site {
              site_name_long
            }
            links {
              article_link
              mission_patch
            }
          }
        }
      `,
    });
    setLoading(false);
    setLaunches(data.launches);
  };

  const onOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const order = value.split(SEPARATOR)[0] as Order;
    const sort = value.split(SEPARATOR)[1] as Sort;

    orderLaunches(order, sort);
  };

  return (
    <div className="relative form-control w-full max-w-xs">
      <div className="indicator w-full">
        <span className="left-12 indicator-start indicator-item badge badge-primary">
          Order by
        </span>
        <select
          onChange={onOrder}
          disabled={loading}
          className="w-full select select-bordered select-primary"
        >
          <option value={`mission_name${SEPARATOR}ASC`}>
            Mission name ascending
          </option>
          <option value={`mission_name${SEPARATOR}DESC`}>
            Mission name descending
          </option>
          <option value={`site_name_long${SEPARATOR}ASC`}>
            Launch site ascending
          </option>
          <option value={`site_name_long${SEPARATOR}DESC`}>
            Launch site descending
          </option>
        </select>
      </div>
    </div>
  );
};

const PAGINATE_BY = 10;

const usePagination = (setLaunches: (launches: Launch[]) => void) => {
  const client = getSpacexClient();

  const [offset, setOffset] = React.useState(0);
  const [gettingLaunches, setGettingLaunches] = React.useState(false);

  const getLaunches = async (offset: number) =>
    await client.query<{
      launches: Launch[];
    }>({
      query: gql`
        query GetLaunches {
          launches(limit: ${PAGINATE_BY}, offset: ${offset}) {
            details
            id
            mission_name
            launch_site {
              site_name_long
            }
            links {
              article_link
              mission_patch
            }
          }
        }
      `,
    });

  const onNextPage = async () => {
    const newOffset = offset + PAGINATE_BY;
    setGettingLaunches(true);
    const { data } = await getLaunches(newOffset);
    setGettingLaunches(false);
    setLaunches(data.launches);
    setOffset(newOffset);
  };
  const onPrevPage = async () => {
    const newOffset = offset - PAGINATE_BY ? offset - PAGINATE_BY : 0;
    setGettingLaunches(true);
    const { data } = await getLaunches(newOffset);
    setGettingLaunches(false);
    setLaunches(data.launches);
    setOffset(newOffset);
  };

  return { gettingLaunches, onNextPage, onPrevPage };
};

const Pagination = (props: { setLaunches: (launches: Launch[]) => void }) => {
  const { setLaunches } = props;
  const { gettingLaunches, onNextPage, onPrevPage } =
    usePagination(setLaunches);

  return (
    <div className="w-full flex items-center justify-between">
      <button
        type="button"
        disabled={gettingLaunches}
        onClick={onPrevPage}
        className={`btn btn-primary gap-2 ${gettingLaunches ? "loading" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
          />
        </svg>
        Previous
      </button>
      <button
        type="button"
        disabled={gettingLaunches}
        onClick={onNextPage}
        className={`btn btn-primary gap-2 ${gettingLaunches ? "loading" : ""}`}
      >
        Next{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
          />
        </svg>
      </button>
    </div>
  );
};

const LaunchList = (props: LocalProps) => {
  const { dragons, initialLaunches } = props;

  const [display, setDisplay] = React.useState<Display>("grid");
  const [launches, setLaunches] = React.useState<Launch[]>(initialLaunches);

  return (
    <div id="launches" className={`sm:w-4/5 sm:mx-auto mx-2 w-full my-4`}>
      <div className="w-full h-1" />
      <div className="bg-neutral bg-opacity-50 rounded-lg p-2 py-4 flex justify-between">
        <OrderSelect setLaunches={setLaunches} />
        <LayoutSelect display={display} setDisplay={setDisplay} />
      </div>
      <div className="w-full h-4" />
      <Pagination setLaunches={setLaunches} />
      <div className="w-full h-2" />
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
      <Pagination setLaunches={setLaunches} />
      <div className="w-full h-4" />
    </div>
  );
};

export default LaunchList;
