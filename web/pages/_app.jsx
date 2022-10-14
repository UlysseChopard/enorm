import "styles/globals.css";
import fetcher from "lib/fetcher";
import { SWRConfig } from "swr";
import RootLayout from "components/layout/Root";
import DefaultLayout from "components/layout/Default";

function App({ Component, pageProps }) {
  const Layout = Component.Layout || DefaultLayout;

  return (
    <SWRConfig value={{ fetcher }}>
      <RootLayout>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RootLayout>
    </SWRConfig>
  );
}

export default App;
