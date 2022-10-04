import { Html, Head, Main, NextScript } from "next/document";
import Page from "components/layout/Page";
import Link from "next/link";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Page>
          <Main />
        </Page>
        <footer className="flex h-24 w-full items-center justify-center border-t">
          <Link href="/e-norm">
            <a
              className="flex items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              E-norm since 2022
            </a>
          </Link>
        </footer>
        <NextScript />
      </body>
    </Html>
  );
}
