import React from 'react'

import styles from './EndToEndStaticImage.module.css'

export default function EndToEndStaticImage(props) {
  return (
    <div className={styles.container}>
      <img
        className={styles.endToEndImg}
        // src="https://sharek.aramco.com.sa/orgs/30002047/Documents/SCCT/end_to_end.png"
        src="https://sharek.aramco.com.sa/orgs/30002047/Documents/SCCT/end2end.svg"
        alt="End to End Visibility"
      />
    </div>
  )
}
