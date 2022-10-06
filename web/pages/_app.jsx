import "styles/globals.css";
import fetcher from "lib/fetcher";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
  return (<SWRConfig value={{ fetcher }}>
            <Component {...pageProps} />
          </SWRConfig>);
}

export default MyApp;
