import React from 'react'
import InventoryTrendStaticImage from '../inventory/InventoryTrendStaticImage'
import InventoryTrendFrame from '../inventory/InventoryTrendFrame'
import InventoryValueFigure from '../inventory/InventoryValueFigure'
import InventoryMap from '../inventory/InventoryMap'
import UpcomingPO from '../inventory/UpcomingPO'
import TestAndInspection from '../inventory/TestAndInspection'
import OutsourcedInventory from '../procurement/OutsourcedInventory'
import LostOpportunity from '../procurement/LostOpportunity'
import Iktva from '../procurement/Iktva'
import InventoryTrendRange from '../inventory/InventoryTrendRange'
import PressureIndex from '../procurement/PressureIndex'
import ShippingPriceIndex from '../logistics/ShippingPriceIndex'
export default function ComponentById({ componentId, componentProps = {} }) {
  const componentIdUppercase = componentId?.toUpperCase()
  switch (componentIdUppercase) {
    case 'INVENTORYVALUEFIGURE':
      return <InventoryValueFigure {...componentProps} />
    case 'INVENTORYTRENDCHART':
      return <InventoryTrendRange {...componentProps} />
    case 'INVENTORYTRENDFRAME':
      return <InventoryTrendFrame {...componentProps} />
    case 'UPCOMINGPO':
      return <UpcomingPO {...componentProps} />
    case 'TESTANDINSPECTION':
      return <TestAndInspection {...componentProps} />
    case 'OUTSOURCEDINVENTORY':
      return <OutsourcedInventory {...componentProps} />
    case 'PRESSUREINDEX':
      return <PressureIndex {...componentProps} />
    case 'SHIPPINGPRICEINDEX':
      return <ShippingPriceIndex {...componentProps} />
    case 'LOSTOPPORTUNITY':
      return <LostOpportunity {...componentProps} />
    case 'IKTVA':
      return <Iktva {...componentProps} />
  }
  return null
}
