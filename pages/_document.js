import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            href={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/ct_icon.png`}
          />
          {/* <link
            rel="manifest"
            href={`${process.env.NEXT_PUBLIC_BSP_NAME}/manifest.json`}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
