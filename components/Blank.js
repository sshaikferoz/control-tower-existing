import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { container } from './Landing.module.css'

export default function Blank(props) {
  // by .html in the url path it won't work in localhost
  return (
    <div style={{ overflowY: 'hidden' }} className={container}>
      <img
        style={{ maxWidth: '1920px', height: 'auto' }}
        src={
          props.imageUrl ||
          `${process.env.NEXT_PUBLIC_BSP_NAME}/images/blank-screen-placeholder-left.jpg`
        }
      />
    </div>
  )
}
