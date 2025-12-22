import React, { useEffect, useState, useRef, useContext } from 'react'

import styles from './MarketCard.module.css'
import useBexJson from '../../lib/useBexJson'
import { maskContext } from '../../lib/maskContext'
import { formatToBillion } from '../../lib/helpers/formatNumber'

export default function MarketCard(props) {
  return <div className={styles.wrap}>{props.children}</div>
}
