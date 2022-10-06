import { Html, Head, Main, NextScript } from "next/document";
import Page from "components/layout/Page";
import Link from "next/link";
import NavBar from "components/navigation/NavBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Document() {
  const router = useRouter();
  const [noBackBtn, setNoBackBtn] = useState(true);
  useEffect(() => {
    if (router) {
      setNoBackBtn(false);
    } else {
      setNoBackBtn(true);
    }
  }, [router]);
  return (
    <Html>
      <Head />
      <body>
        <Page>
          <NavBar noBack={noBackBtn} />
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
