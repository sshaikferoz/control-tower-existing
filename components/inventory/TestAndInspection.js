import React from 'react'

export default function TestAndInspection(props) {
  return (
    <div style={{ display: 'grid', position: 'relative' }}>
      <img
        style={{
          height: 'auto',
          position: 'absolute',
          inset: '1.5em em',
        }}
        
        src={`https://sharek.aramco.com.sa/orgs/30002047/Documents/SCCT/TI_image.svg`}
        // src={`images/TI_image.svg`}
      />
    </div>
  )
}
