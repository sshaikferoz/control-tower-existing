// import RSSFeeds3 from '../../common/RSSFeeds-3'
// import SpendMap from '../../procurement/SpenMap'
import Sustainability from '../customized/Sustainability'
import useScreenSize from '../../lib/hooks/useScreenSize'
import KPIBarFullWidth from '../customized/KPIBarFullWidth'
import SampleChart from '../customized/SampleChart'
import Zone from './Zone'
import AlertList from '../customized/AlertList'
function LayoutBase(props) {
  const screenSize = useScreenSize()
  if (screenSize.width === 0) return null
  let cellSize = 32
  const numOfColumns = Math.ceil(screenSize.width / cellSize)
  const numOfRows = Math.ceil(screenSize.height / cellSize)
  const gap = 18
  const border = 'solid 0px transparent'
  const titleStyle = {
    display: 'grid',
    gridRow: 'span 1',
    gridColumn: '1/-1',
    color: 'white',
    lineHeight: '1.1',
    fontSize: '1rem',
    alignContent: 'baseline',
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numOfColumns},${cellSize - gap}px)`,
        gridTemplateRows: `repeat(${numOfRows},${cellSize - gap}px)`,
        gap: `${gap}px`,
      }}
    >
      {/* KPIs Zone */}
      <div
        style={{
          display: 'grid',
          gridColumn: '1/90',
          gridRow: '1/4',
          paddingInline: '1em',
        }}
      >
        <KPIBarFullWidth />
      </div>
      <div
        style={{
          display: 'grid',
          gridColumn: '-1/-40',
          gridRow: '1/4',
          border,
        }}
      >
        <div>news news</div>
        {/* <RSSFeeds3 /> */}
      </div>
      {/* Normal Comp */}
      <Zone {...{ GridColumns: '1/15', GridRows: '3/-1' }}></Zone>
      {/* Normal Comp */}
      {/* Normal Comp */}
      <Zone {...{ GridColumns: '15/21', GridRows: '3/10' }}></Zone>
      <Zone {...{ GridColumns: '21/31', GridRows: '3/10' }}></Zone>
      <Zone {...{ GridColumns: '15/31', GridRows: '10/-1' }}></Zone>
      {/* Normal Comp */}
      <Zone {...{ GridColumns: '31/51', GridRows: '3/12' }}></Zone>
      <Zone
        {...{
          GridColumns: '31/51',
          GridRows: '12/-1',
          title: 'Sustainability ',
        }}
      >
        {/* <Sustainability /> */}
      </Zone>
      <Zone {...{ GridColumns: '51/61', GridRows: '3/-1', title: 'asdfad' }}>
        <AlertList />
      </Zone>
      <Zone {...{ GridColumns: '61/71', GridRows: '3/10', title: 'asdfad' }}></Zone>
      <Zone {...{ GridColumns: '71/81', GridRows: '3/10', title: 'asdfad' }}></Zone>
      <Zone {...{ GridColumns: '81/90', GridRows: '3/10', title: 'asdfad' }}></Zone>
      <Zone {...{ GridColumns: '61/90', GridRows: '10/-1', title: 'asdfad' }}></Zone>
      <Zone {...{ GridColumns: '90/-1', GridRows: '3/-1', handleTitle: false }}>
        {/* <SpendMap /> */}
      </Zone>
    </div>
  )
}
export default LayoutBase
