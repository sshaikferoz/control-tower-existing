export default function FontStyle() {
  return (
    <style jsx global>{`
      /*
      Poppins fonts (fron google fonts) hosted in BSP
    */
      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 200;
        font-display: block;
        src: url(${process.env
            .NEXT_PUBLIC_BSP_NAME}/fonts/google/poppins/pxiByp8kv8JHgFVrLFj_Z1xlFQ.woff2)
          format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
          U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
          U+FEFF, U+FFFD;
      }

      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-display: block;
        src: url(${process.env
            .NEXT_PUBLIC_BSP_NAME}/fonts/google/poppins/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2)
          format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
          U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
          U+FEFF, U+FFFD;
      }

      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        font-display: block;
        src: url(${process.env
            .NEXT_PUBLIC_BSP_NAME}/fonts/google/poppins/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2)
          format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
          U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
          U+FEFF, U+FFFD;
      }

      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: block;
        src: url(${process.env
            .NEXT_PUBLIC_BSP_NAME}/fonts/google/poppins/pxiEyp8kv8JHgFVrJJfecg.woff2)
          format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
          U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
          U+FEFF, U+FFFD;
      }

      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-display: block;
        src: url(${process.env
          .NEXT_PUBLIC_BSP_NAME}/fonts/google/poppins/Poppins-SemiBold.ttf);
      }
    `}</style>
  )
}
