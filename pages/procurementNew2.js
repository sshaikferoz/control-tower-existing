import AlertList from '../components/customized/AlertList'
import GeoSpendMap from '../components/customized/GeoSpendMap'
import KPIBarFullWidth from '../components/customized/KPIBarFullWidth'
import ShipmentTrackingStatic from '../components/customized/ShipmentTrackingStatic'
import Sustainability from '../components/customized/Sustainability'
import SubGridBase from '../components/layout/SubGridBase'
import Zone from '../components/layout/Zone'
import LayoutBase from '../components/layout/LayoutBase'
import RSSFeeds2 from '../components/common/RSSFeeds-2'
export default function test() {
  // return <LayoutBase />
  // const topBar = <KPIBarFullWidth skip={8} />
  const topBar = (
    <div style={{display:'grid','alignContent':'center'}}>
    <div style={{paddingTop:'1em',paddingInlineStart:'1em'}}>
      <RSSFeeds2 />
    </div>
    </div>
  )
  return (
    <SubGridBase bgShift={3} topBar={topBar} padding={0} columnGap={28} rowGap={20}>
      <Zone GridColumns={'1/-1'} GridRows={'1/-1'} handleTitle={false}>
        <GeoSpendMap />
      </Zone>
    </SubGridBase>
  )
}
