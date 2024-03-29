import React from "react";
import { gql } from "@apollo/client";
import { launchData, PAGINATE_BY } from "graphql/spaceX";
import { getClient } from "lib/apollo.client";
import { Launch } from "types/appTypes";
import type { Filters, Order, Sort } from "./types";

interface LocalProps {
  setLaunches: (launches: Launch[]) => void;
  initialFilters: Filters;
  setFilters: (filters: Filters) => void;
}

const SEPARATOR = "+";

const processFilter = (filter: string) => {
  const sort = filter.split(SEPARATOR)[0] as Sort;
  const order = filter.split(SEPARATOR)[1] as Order;

  return { order, sort };
};

const OrderSelect = (props: LocalProps) => {
  const { setLaunches, initialFilters, setFilters } = props;
  const client = getClient();
  const [loading, setLoading] = React.useState(false);

  const orderLaunches = async (order: Order, sort: Sort) => {
    setLoading(true);
    const { data } = await client.query<{
      launches: Launch[];
    }>({
      query: gql`
        query GetLaunches {
          launches(take: ${PAGINATE_BY}, skip: 0, orderDirection: "${order}", orderBy: "${sort}") {
            ${launchData}
          }
        }
      `,
    });
    setLoading(false);
    setLaunches(data.launches);
  };

  const onOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const { order, sort } = processFilter(value);
    setFilters({ order, sort });
    orderLaunches(order, sort);
  };

  return (
    <div className="relative form-control w-full max-w-xs">
      <div className="indicator w-full">
        <span className="left-12 indicator-start indicator-item badge badge-info">
          Order by
        </span>
        <select
          onChange={onOrder}
          disabled={loading}
          className="w-full select select-bordered select-info"
          defaultValue={`${initialFilters.sort}${SEPARATOR}${initialFilters.order}`}
        >
          <option value={`launch_date_utc${SEPARATOR}asc`}>
            Launch Date ascending
          </option>
          <option value={`launch_date_utc${SEPARATOR}desc`}>
            Launch Date descending
          </option>
          <option value={`mission_name${SEPARATOR}asc`}>
            Mission name ascending
          </option>
          <option value={`mission_name${SEPARATOR}desc`}>
            Mission name descending
          </option>
          <option value={`site_name_long${SEPARATOR}asc`}>
            Launch site ascending
          </option>
          <option value={`site_name_long${SEPARATOR}desc`}>
            Launch site descending
          </option>
        </select>
      </div>
    </div>
  );
};

export default OrderSelect;
