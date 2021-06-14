import Head from "next/head";
import {useRouter} from "next/router";
import {traverseHeadings} from "../../utils/traverseHeadings";
import CodeBlockProvider from "../CodeBlockProvider/index";
import TableOfContents from "../TableOfContents/index";
import UniversalNav from "../UniversalNav/index";
import SecondaryNav from "../SecondaryNav/index";
import Footer from "../Footer/index";
import {ContentStyle, LayoutStyle} from "./styles";
import {Container} from "../Container";

export default function Layout({children, meta}: {children: any; meta?: any}) {
  const router = useRouter();
  const {platform} = router.query;
  const headers = traverseHeadings(children, platform as string);
  const basePath = "docs.amplify.aws";
  return (
    <>
      {meta && (
        <Head>
          <meta property="og:title" content={meta.title} key="og:title" />
          <meta
            property="og:description"
            content={meta.description}
            key="og:description"
          />
          <meta
            property="og:url"
            content={basePath + router.pathname}
            key="og:url"
          />
          <meta
            property="og:image"
            content="https://docs.amplify.aws/assets/ogp.jpg"
            key="og:image"
          />
          <meta
            property="description"
            content={meta.description}
            key="description"
          />
          <meta property="twitter:card" content="summary" key="twitter:card" />
          <meta
            property="twitter:title"
            content={meta.title}
            key="twitter:title"
          />
          <meta
            property="twitter:description"
            content={meta.description}
            key="twitter:description"
          />
          <meta
            property="twitter:image"
            content="https://docs.amplify.aws/assets/ogp.jpg"
            key="twitter:image"
          />
        </Head>
      )}
      <UniversalNav
        heading="Amplify Docs"
        brandIcon="/assets/logo-light.svg"
        blend={false}
      />
      <SecondaryNav platform={platform} pageHasMenu={false} />
      <LayoutStyle>
        <Container>
          {meta ? metaContent({meta, headers, children}) : children}
        </Container>
      </LayoutStyle>
      <Footer />
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>
    </>
  );
}

function metaContent({meta, headers, children}) {
  return (
    <>
      <ContentStyle>
        <h1>{meta.title}</h1>
        <CodeBlockProvider>{children}</CodeBlockProvider>
      </ContentStyle>
      <TableOfContents title={meta.title}>{headers}</TableOfContents>
    </>
  );
}
