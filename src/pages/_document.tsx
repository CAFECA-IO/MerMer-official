import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="tw">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body className="bg-darkBlue3 text-lightWhite1 dark:bg-darkBlue3 dark:text-lightWhite1">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
