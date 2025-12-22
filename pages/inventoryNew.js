import AlertList from '../components/customized/AlertList'
import KPIBarFullWidth from '../components/customized/KPIBarFullWidth'
import SubGridBase from '../components/layout/SubGridBase'
import Zone from '../components/layout/Zone'
import InventoryValueTrend from '../components/customized/InventoryValueTrend'
import OutsourcedInv from '../components/customized/OutsourcedInv'
import TestAndInspStatic from '../components/customized/TestAndInspStatic'
export default function test2() {
  // return <LayoutBase />
  const topBar = <KPIBarFullWidth />
  // const topBar = <div>kpis</div>
  return (
    <SubGridBase bgShift={0} topBar={topBar} padding={24} columnGap={28} rowGap={20}>
      <Zone GridColumns={'1/28'} GridRows={'1/-1'} title={'Inventory Value'}>
        <InventoryValueTrend />
      </Zone>
      <Zone
        GridColumns={'28/-1'}
        GridRows={'1/16'}
        centerTitle={true}
        title={''}
      >
        <OutsourcedInv />
      </Zone>
      <Zone GridColumns={'28/-1'} GridRows={'16/-1'} handleTitle={false}>
        <TestAndInspStatic />
      </Zone>
    </SubGridBase>
  )
}
