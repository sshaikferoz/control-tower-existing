import React, { useEffect, useRef, useState } from 'react'
import styles from './RSSFeeds.module.css'
import useNewsFeedConfigurations from '../../lib/useNewsFeedConfigurations'

const useAnimationFrame = (callback, state) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef()
  const previousTimeRef = useRef()

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [state]) // Make sure the effect runs only once
}

const RSSFeeds2 = () => {
  const { data } = useNewsFeedConfigurations()
  const feeds = data?.d?.results || []
  const ref = useRef(null)
  const inputRef = useRef(null)
  const lastNewsItemLengthTrack = useRef(0)
  const maxLengthOfMotion = useRef(0)
  const progressTrack = useRef(1)
  const totalWidthTrack = useRef(0)
  let offset = 1412
  useEffect(() => {
    setTimeout(async () => {
      if (
        !ref.current ||
        (ref.current && ref.current.offsetWidth == 0) ||
        feeds.length === 0
      )
        return console.log('returning nothing')
      await new Promise((r) => setTimeout(r, 1000))
      const listItemCount = ref.current?.childNodes?.length
      maxLengthOfMotion.crrent = ref.current.offsetWidth

      ref.current?.childNodes?.forEach?.((i, ind) => {
        const inc = i.offsetWidth + 80
        totalWidthTrack.current += inc
        if (listItemCount === ind + 1)
          lastNewsItemLengthTrack.current = i.offsetWidth
      })
    })
  }, [feeds])
  const [speed, setSpeed] = useState(232)
  useAnimationFrame(() => {
    if (
      totalWidthTrack.current > 1 &&
      Math.abs(progressTrack.current) - Math.abs(totalWidthTrack.current) >
        Math.max(
          lastNewsItemLengthTrack.current,
          Number(inputRef.current?.offsetWidth * 1.6)
        )
    ) {
      progressTrack.current = 1
    }
    progressTrack.current = progressTrack.current - Number(speed / 300)

    const inc = progressTrack.current
    ref.current.style.transform = `translate3d(${inc + offset}px, 0, 0)`
  }, speed)

  return (
    <React.Fragment>
      <input
        type="range"
        ref={inputRef}
        min="150"
        max="4000"
        onChange={({ target }) => setSpeed(target.valueAsNumber)}
        style={{
          zIndex: '3',
          position: 'absolute',
          marginBlockStart: '4em',
          minWidth: '40vw',
          visibility: 'hidden',
        }}
      />
      <div className={styles.main}>
        <h4 className={styles.latest}>Latest News</h4>

        <div className={styles.newsWrap}>
          <div
            ref={ref}
            className={styles.wrapper}
            style={{
              '--news-count': feeds?.length || 1,
            }}
          >
            {feeds?.map?.(({ Title, Link, PublishedDate }, ind) => (
              <section key={`${ind + Math.random()}`}>
                <a target="_blank" rel="noreferrer" href={Link}>
                  {Title}
                </a>
                <dt>
                  <dt>
                    {new Date(
                      Number(PublishedDate?.match?.(/\d+/)?.[0])
                    )?.toLocaleDateString?.('en', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </dt>
                </dt>
              </section>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default RSSFeeds2
