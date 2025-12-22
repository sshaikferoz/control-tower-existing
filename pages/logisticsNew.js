import AlertList from '../components/customized/AlertList'
import KPIBarFullWidth from '../components/customized/KPIBarFullWidth'
import ShipmentTrackingStatic from '../components/customized/ShipmentTrackingStatic'
import Sustainability from '../components/customized/Sustainability'
import SubGridBase from '../components/layout/SubGridBase'
import Zone from '../components/layout/Zone'
import InventoryMap from '../components/inventory/InventoryMap'
import EmployeeMap from '../components/inventory/EmployeeMap'
import BlockToggleHeader from '../components/common/BlockToggleHeader'
import LayoutBase from '../components/layout/LayoutBase'
export default function test() {
  // return <LayoutBase />
  const topBar = <KPIBarFullWidth skip={4} />
  // const topBar = <div>kpis</div>
  return (
    <SubGridBase bgShift={1}  topBar={topBar} padding={20} columnGap={28} rowGap={20}>
      <Zone
        GridColumns={'1/44'}
        GridRows={'3/24'}
        handleTitle={false}
      >
        <BlockToggleHeader
          style={{ paddingBlockStart: '1.5em', paddingBlockEnd: '2.2em' }}
          transparent={true}
          title1="Inventory Map"
          title2="Employee Travel Care"
        >
          <EmployeeMap tileSize='sm' />
          <InventoryMap />
          {/* <div></div> */}
        </BlockToggleHeader>
        {/* <ShipmentTrackingStatic /> */}
      </Zone>
      <Zone GridColumns={'1/44'} GridRows={'23/-1'} handleTitle={false}>
        <div style={{ display: 'grid', alignContent: 'center' }}>
          <Sustainability />
        </div>
      </Zone>
      <Zone
        GridColumns={'44/-1'}
        GridRows={'1/-1'}
        title={'Alert Intelligence'}
        centerTitle={true}
      >
        <AlertList />
      </Zone>
    </SubGridBase>
  )
}
