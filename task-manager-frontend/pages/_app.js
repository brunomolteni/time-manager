import { SWRConfig } from "swr";
import { get } from "../util/fetch";
import "../scss/index.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 10000,
        dedupingInterval: 10000,
        fetcher: get,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
