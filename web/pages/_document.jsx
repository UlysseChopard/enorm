import { Html, Head, Main, NextScript } from "next/document";
import Page from "components/layout/Page";
import Footer from "components/layout/Footer";
import MainWrapper from "components/layout/Main";
import Link from "next/link";
import NavBar from "components/navigation/NavBar";
import { useRouter } from "next/router";

export default function Document() {
  const router = useRouter();
  return (
    <Html>
      <Head />
      <body>
        <Page>
          <NavBar
            backBtn={router}
            accountManagement={router?.pathname === "/login"}
          />
          <MainWrapper>
            <Main />
          </MainWrapper>
          <Footer>
            <Link href="/e-norm">
              <a
                className="flex items-center justify-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                E-norm since 2022
              </a>
            </Link>
          </Footer>
        </Page>
        <NextScript />
      </body>
    </Html>
  );
}
