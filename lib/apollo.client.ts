import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const protocol = `${
  process.env.NODE_ENV === "development" ? "http" : "https"
}://`;

const host =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
    : // Use host on the client since using VERCEL_URL can lead to CORS errors due to aliases
      window.location.host;

export const origin = `${protocol}${host}`;

export const useClient = () => {
  const client = useMemo(
    () =>
      new ApolloClient({
        uri: `${origin}/api`,
        cache: new InMemoryCache(),
      }),
    []
  );
  return client;
};

const link = new HttpLink({
  uri: "https://api.spacex.land/graphql/",
});

export const getSpacexClient = () => {
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};
