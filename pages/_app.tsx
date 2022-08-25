import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useClient } from "lib/apollo.client";
import { ApolloProvider } from "@apollo/client";
import Layout from "components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useClient();

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
