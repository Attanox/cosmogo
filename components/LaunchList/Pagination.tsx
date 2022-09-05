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
        className={`btn btn-info gap-2 ${gettingLaunches ? "loading" : ""}`}
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

export default Pagination;
