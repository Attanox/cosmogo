import React from "react";
import { getSpacexClient } from "lib/apollo.client";
import { Launch } from "types/spaceXTypes";
import { launchData, PAGINATE_BY } from "graphql/spaceX";
import { gql } from "@apollo/client";
import { Filters } from "./types";

const usePagination = (
  setLaunches: (launches: Launch[]) => void,
  filters: Filters
) => {
  const client = getSpacexClient();

  const [offset, setOffset] = React.useState(0);
  const [gettingLaunches, setGettingLaunches] = React.useState(false);

  const getLaunches = async (offset: number) =>
    await client.query<{
      launches: Launch[];
    }>({
      query: gql`
        query GetLaunches {
          launches(limit: ${PAGINATE_BY}, offset: ${offset}, order: "${filters.order}", sort: "${filters.sort}") {
            ${launchData}
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

  return { gettingLaunches, offset, onNextPage, onPrevPage };
};

interface Props {
  setLaunches: (launches: Launch[]) => void;
  filters: Filters;
}

const Pagination = (props: Props) => {
  const { setLaunches, filters } = props;
  const { gettingLaunches, onNextPage, onPrevPage, offset } = usePagination(
    setLaunches,
    filters
  );

  const onFirstPage = offset - PAGINATE_BY < 0;

  return (
    <div className="w-full flex items-center justify-between">
      <button
        type="button"
        disabled={onFirstPage || gettingLaunches}
        onClick={onPrevPage}
        className={`btn btn-info gap-2 ${gettingLaunches ? "loading" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>
      <button
        type="button"
        disabled={gettingLaunches}
        onClick={onNextPage}
        className={`btn btn-info gap-2 ${gettingLaunches ? "loading" : ""}`}
      >
        <span className="hidden sm:inline">Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
