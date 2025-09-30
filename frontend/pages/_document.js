// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Move font imports here instead of Layout component */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="NumberLookup.us" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}