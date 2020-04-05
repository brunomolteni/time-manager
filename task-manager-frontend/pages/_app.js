import { SWRConfig } from "swr";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import App from "next/app";
import nookies from "nookies";
import Head from "next/head";

import "../scss/index.scss";
import { get } from "../util/fetch";
import { userActions } from "../redux";
import { makeStore } from "../redux/store";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookies = nookies.get(ctx);

    if (cookies.user) {
      const user = JSON.parse(cookies.user);
      ctx.store.dispatch(userActions.init(user));
    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <SWRConfig
          value={{
            dedupingInterval: 10000,
            fetcher: get,
          }}
        >
          <Head>
            <title>Work-o-tron 3000</title>
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </SWRConfig>
      </Provider>
    );
  }
}

export default withRedux(makeStore)(MyApp);
