import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { HiChevronDown } from 'react-icons/hi'
import useDropdownMenu from 'react-accessible-dropdown-menu-hook'

import {
  FaDollyFlatbed,
  FaShippingFast,
  FaFileInvoiceDollar,
  FaFunnelDollar,
} from 'react-icons/fa'

import styles from './Landing.module.css'
const iconSize = 30

function MenuWithSubMenu(props) {
  const { subItems } = props
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(subItems.length)
  return (
    <div style={{ position: 'relative' }}>
      <button className={styles.tile} {...buttonProps}>
        {props.children} <HiChevronDown />
      </button>
      <div
        className={styles.menuWithSubmenu}
        style={{ '--menu-visible': `${isOpen ? 'visible' : 'hidden'}` }}
        role="menu"
      >
        {props.subItems.map(({ title, path }, ind) => (
          <Link href={path} key={path}>
            <a className={styles.tile} {...itemProps[ind]}>
              {title}
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Landing(props) {
  // by .html in the url path it won't work in localhost
  const inventorySub = [
    {
      title: 'Inventory (New) ',
      path: '/inventoryNew' + process.env.NEXT_PUBLIC_PAGE_POSTFIX,
    },
    {
      title: 'Inventory',
      path: '/inventory' + process.env.NEXT_PUBLIC_PAGE_POSTFIX,
    },
  ]

  const logisticsSub = [
    {
      title: 'Logistics (New)',
      path: '/logisticsNew' + process.env.NEXT_PUBLIC_PAGE_POSTFIX,
    },
    {
      title: 'Logistics',
      path: '/logistics2' + process.env.NEXT_PUBLIC_PAGE_POSTFIX,
    },
  ]
  const procurement1Sub = [
    {
      title: 'Procurement 1 New',
      path: '/procurementNew1' + process.env.NEXT_PUBLIC_PAGE_POSTFIX,
    },
    {
      title: 'Procurement 1',
      path: '/procurement1' + process.env.NEXT_PUBLIC_PAGE_POSTFIX,
    },
  ]
  const procurement2Sub = [
    {
      title: 'Procurement 2 New',
      path: '/procurementNew2' + process.env.NEXT_PUBLIC_PAGE_POSTFIX,
    },
    {
      title: 'Procurement News Feed',
      path: '/procurement2-rss' + process.env.NEXT_PUBLIC_PAGE_POSTFIX,
    },
    {
      title: 'Procurement 2',
      path: '/procurement2' + process.env.NEXT_PUBLIC_PAGE_POSTFIX,
    },
  ]

  return (
    <div className={styles.container}>
      <nav className={styles.primeryNav}>
        <Link href={`/inventory${process.env.NEXT_PUBLIC_PAGE_POSTFIX}`}>
          <a className={styles.tile}>Inventory</a>
        </Link>
        <Link href={`/logistics${process.env.NEXT_PUBLIC_PAGE_POSTFIX}`}>
          <a className={styles.tile}>Logistics</a>
        </Link>
        <Link href={`/procurement1${process.env.NEXT_PUBLIC_PAGE_POSTFIX}`}>
          <a className={styles.tile}>Procurement1</a>
        </Link>
        <Link href={`/procurement2${process.env.NEXT_PUBLIC_PAGE_POSTFIX}`}>
          <a className={styles.tile}>Procurement2</a>
        </Link>
      </nav>
      <nav className={styles.secondaryNav}>
        <h2>Make sure to login to Hana and SAP Analytics Cloud </h2>
        <a
          href={process.env.NEXT_PUBLIC_HANA_LOGIN_URL}
          rel="noreferrer"
          target="_blank"
        >
          HANA Login →
        </a>
      </nav>
    </div>
  )
}
