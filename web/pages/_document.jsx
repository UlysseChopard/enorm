import { Html, Head, Main, NextScript } from 'next/document';
import Page from "components/layout/Page";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
            <Page>
                <Main />
            </Page>
        <NextScript />
      </body>
    </Html>
  )
}