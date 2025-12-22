import React, { useEffect, useRef, useState } from 'react'
import styles from './RSSFeeds.module.css'
import useNewsFeedConfigurations from '../../lib/useNewsFeedConfigurations'

const RSSFeeds = () => {
  const { data } = useNewsFeedConfigurations()
  const feeds = data?.d?.results || []
  const ref = useRef(null)
  const fetchRSS = async (url) => {
    /*
     * given url, fetch the xml and parse it with window.DOMParser */

    const itemsFormatted = [...items].map((item) => ({
      title: item.getElementsByTagName('title')[0],
      link: item.getElementsByTagName('link')[0],
    }))
  }

  return (
    <div className={styles.main}>
      <h4 className={styles.latest}>Latest News</h4>
      <div
        ref={ref}
        className={styles.wrap}
        style={{ '--news-count': feeds?.length || 1 }}
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
  )
}
export default RSSFeeds
