import React, { useState, useEffect } from 'react'
import styles from './Chatbot.module.css'
import FullStackedBarChart from './FullStackedBarChart'

export default function Chatbot(props) {
  const [
    fullscreen,
    setFullscreen,
  ] = useState(false)
  const [
    showSamiChatbot,
    setShowSamiChatbot,
  ] = useState(false)
  useEffect(() => {
    setTimeout(async () => {
      await new Promise((r) => setTimeout(r, 433))
      if (!showSamiChatbot) setFullscreen(false)
    })
  }, [showSamiChatbot])
  function toggleFullscreen() {
    setFullscreen((current) => !current)
  }
  function toggleShow() {
    setShowSamiChatbot((current) => !current)
  }
  return (
    <React.Fragment>
      <div
        className={`${styles.wrapper} ${
          showSamiChatbot ? styles.chatWindowBoxed : ''
        } ${fullscreen ? styles.chatWindowFullscreen : ''} `}
      >
        <div className={styles.acceleratorIntegration}>
          <iframe
            allow="microphone"
            allowusermedia=""
            id="chatbot-iframe"
            className={styles.chatWindow}
            src="https://chatbot.aramco.com.sa/mssd"
            chatbot="mssd"
          ></iframe>
          <div className={styles.control}>
            <span onClick={toggleFullscreen} className={styles.fullscreen}>
              F
            </span>
            <span onClick={toggleShow} className={styles.close}>
              X
            </span>
          </div>
        </div>
      </div>
      <div className={styles.sami}>
        <img
          onClick={() => setShowSamiChatbot(true)}
          src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/sami-chat-robot.png`}
        />
      </div>
    </React.Fragment>
  )
}
