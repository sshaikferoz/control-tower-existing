import React from 'react'

import styles from './EndToEndStaticImage.module.css'
const kpiLabelTemplate = ({ label = '', points = [], show = false }) => {
  const [kpiValue = '', kpiTarget = ''] = label?.split('/')
  // from polyline points we can find circle points and label x,y
  const [cx = 0, cy = 0] = points[0]?.split?.(',') //e.g points = ["245.5,136.2", "245.5,64.6", "212,37.5" ]
  const [x = 0, y = 0] = points[2]?.split?.(',')
  if (show !== true) return <g></g>
  return (
    <g>
      <text className="kpiLabel" transform={`matrix(1 0 0 1 ${x} ${y})`}>
        <tspan
          style={{ '--kpi-color': color || 'white' }}
          className="end-to-end-kpiValue"
          fontFamily="'Poppins'"
          fontSize="11px"
        >
          {kpiValue.trim()}
        </tspan>
        <tspan fontFamily="'Poppins'" fontSize="11px">
          {kpiTarget.trim() ? '/' : ''} {kpiTarget}
        </tspan>
      </text>
      <polyline
        fill="none"
        stroke="#BBFFE3"
        stroke-width="0.25"
        stroke-miterlimit="10"
        points={`${points.join(' ')}`}
      />
      <circle fill="#BBFFE3" cx={cx} cy={cy} r="0.9" />
    </g>
  )
}
const connectorTemplate = ({ id, d = '' }) => (
  <g id={id}>
    <path
      fill="none"
      stroke="#BBFFE3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d={d}
    />
  </g>
)

const EndToEndTemplate = () => <div></div>

const initialConnectors = [
  {
    id: 'agreementRelease--leftConnector',
    thikness: 1,
    label: '',
    points: ['245.5,136.2', '245.5,64.6', '212,37.5 '],
    color: 'white',
    show: false,
    d: 'M194.8,199.9h10 c18.2,0,33-14.8,33-33v0v0v0c0-18.2,14.8-33,33-33h96.9',
  },
  {
    id: 'agreementRelease--rightConnector',
    thikness: 1,
    label: '',
    points: ['519.3,136.2', '519.2,82.5', '540.6,55.4 '],
    color: 'white',
    show: false,
    d: 'M560.5,199.9 c-18.2,0-33-14.8-33-33v0v0v0c0-18.2-14.8-33-33-33h-96.9',
  },
  {
    id: 'manualReleaseIK--leftConnector',
    thikness: 1,
    label: '',
    points: ['320.5,196.1', '320.5,170', '308,159.8 '],
    color: 'white',
    show: false,
    d: ' M 204.7,203 L 370.2, 203 ',
  },
  {
    id: 'manualReleaseIK--rightConnector',
    thikness: 1,
    label: '',
    points: ['444,196.1', '444,170', '456.5,159.8 		'],
    color: 'white',
    show: false,
    d: ' M 395,203 L 568, 203 ',
  },
  {
    id: 'releaseToOOK--leftConnector',
    thikness: 1,
    label: '',
    points: ['245.7,264.9', '245.7,318.6', '224.3,345.7 '],
    color: 'white',
    show: false,
    d: 'M192.9,203.1H205 c18.2,0,33,14.8,33,33v0v0v0c0,18.2,14.8,33,33,33h99.7',
  },
  {
    id: 'releaseToOOK--rightConnector',
    thikness: 1,
    label: '',
    points: ['519.2,264.9', '519.2,318.6', '540.7,345.7 '],
    color: 'white',
    show: false,
    d: 'M560.6,203.1 c-18.2,0-33,14.8-33,33v0v0v0c0,18.2-14.8,33-33,33H395',
  },
  {
    id: 'vendorTo--leftConnector',
    thikness: 1,
    label: '',
    points: ['710,64.7', '710,37.2', '692.8,27 		'],
    color: 'white',
    show: false,
    d: 'M656.8,199.9 c18.2,0,33-14.8,33-33v0v0v-66.8c0-18.2,14.8-33,33-33H821',
  },
  {
    id: 'vendorTo--rightConnector',
    thikness: 1,
    label: '',
    points: ['957,64.6', '957,37.1', '974.2,26.9 		'],
    color: 'white',
    show: false,
    d: 'M1009.6,199.9 c-18.2,0-33-14.8-33-33v0v0v-66.8c0-18.2-14.8-33-33-33h-98.3',
  },
  {
    id: 'aramcoCarrier--leftConnector',
    thikness: 1,
    label: '',
    points: ['777,148.7', '777,121.2', '759.8,111 		'],
    color: 'white',
    show: false,
    d: 'M660.9,202h16.7 c13.4,0,24.3-10.9,24.3-24.3v0v0.4v0c0-13.4,10.9-24.3,24.3-24.3h94.3',
  },
  {
    id: 'aramcoCarrier--rightConnector',
    thikness: 1,
    label: '',
    points: ['886,148.7', '886,121.2', '903.2,111 		'],
    color: 'white',
    show: false,
    d: 'M1005.5,202h-16.7 c-13.4,0-24.3-10.9-24.3-24.3v0v0.4v0c0-13.4-10.9-24.3-24.3-24.3h-94.3',
  },
  {
    id: 'transportationTruck--leftConnector',
    thikness: 1,
    label: '',
    points: ['777,258.9', '777,286.4', '759.8,296.6 '],
    color: 'white',
    show: false,
    d: 'M660.9,204.8h16.7 c13.4,0,24.3,10.9,24.3,24.3v0v0.7v0c0,13.4,10.9,24.3,24.3,24.3h94.3',
  },
  {
    id: 'transportationTruck--rightConnector',
    thikness: 1,
    label: '',
    points: ['886,258.9', '886,286.4', '903.2,296.6 '],
    color: 'white',
    show: false,
    d: 'M1005.5,204.8h-16.7 c-13.4,0-24.3,10.9-24.3,24.3v0v0.7v0c0,13.4-10.9,24.3-24.3,24.3h-94.3',
  },
  {
    id: 'customerPickup--leftConnector',
    thikness: 1,
    label: '',
    points: ['710,339.8', '710,367.3', '692.8,377.5 '],
    color: 'white',
    show: false,
    d: 'M656.8,204.8 c18.2,0,33,14.8,33,33v0v0v66.8c0,18.2,14.8,33,33,33H821',
  },
  {
    id: 'customerPickup--rightConnector',
    thikness: 1,
    label: '',
    points: ['957,339.9', '957,367.4', '974.2,377.6 '],
    color: 'white',
    show: false,
    d: 'M1009.6,204.8 c-18.2,0-33,14.8-33,33v0v0v66.8c0,18.2-14.8,33-33,33h-98.3',
  },
]
export default function EndToEndStaticImage(props) {
  return (
    <div className={styles.container}>
      <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="1168px"
        height="409px"
        viewBox="0 0 1168 409"
        enableBackground="new 0 0 1168 409"
        xmlSpace="preserve"
      >
        <style jsx>{`
          .kpiLabel {
            fill: white;
          }
          .agreementRelease--leftConnector {
            stroke-width: 6px;
          }
        `}</style>
        <use
          className="agreementRelease--leftLabel"
          xlinkHref="#agreementRelease--leftLabel"
        />
        <use
          className="agreementRelease--rightLabel"
          xlinkHref="#agreementRelease--rightLabel"
        />
        <use
          className="manualRelease--leftLabel"
          xlinkHref="#manualRelease--leftLabel"
        />
        <use
          className="manualRelease--rightLabel"
          xlinkHref="#manualRelease--rightLabel"
        />
        <use
          className="agreementRelease--leftConnector"
          xlinkHref="#agreementRelease--leftConnector"
        />
        <use
          className="agreementRelease--rightConnector"
          xlinkHref="#agreementRelease--rightConnector"
        />
        <use
          className="manualReleaseIK--leftConnector"
          xlinkHref="#manualReleaseIK--leftConnector"
        />
        <use
          className="manualReleaseIK--rightConnector"
          xlinkHref="#manualReleaseIK--rightConnector"
        />
        <use
          className="releaseToOOK--leftConnector"
          xlinkHref="#releaseToOOK--leftConnector"
        />
        <use
          className="releaseToOOK--rightConnector"
          xlinkHref="#releaseToOOK--rightConnector"
        />
        <use
          className="vendorTo--leftConnector"
          xlinkHref="#vendorTo--leftConnector"
        />
        <use
          className="vendorTo--rightConnector"
          xlinkHref="#vendorTo--rightConnector"
        />
        <use
          className="aramcoCarrier--leftConnector"
          xlinkHref="#aramcoCarrier--leftConnector"
        />
        <use
          className="aramcoCarrier--rightConnector"
          xlinkHref="#aramcoCarrier--rightConnector"
        />
        <use
          className="transportationTruck--leftConnector"
          xlinkHref="#transportationTruck--leftConnector"
        />
        <use
          className="transportationTruck--rightConnector"
          xlinkHref="#transportationTruck--rightConnector"
        />
        <use
          className="customerPickup--leftConnector"
          xlinkHref="#customerPickup--leftConnector"
        />
        <use
          className="customerPickup--rightConnector"
          xlinkHref="#customerPickup--rightConnector"
        />

        <defs>
          <g id="agreementRelease--leftLabel">
            <text className="kpiLabel" transform="matrix(1 0 0 1 165 34)">
              <tspan className="kpiValue" fontFamily="'Poppins'" fontSize="11px">
                {'88'}
              </tspan>
              <tspan fontFamily="'Poppins'" fontSize="11px">
                {'/ 90 %'}
              </tspan>
            </text>
            <polyline
              fill="none"
              stroke="#BBFFE3"
              strokeWidth={0.25}
              strokeMiterlimit={10}
              points="245.5,136.2 245.5,64.6 212,37.5 "
            />
            <path
              fill="#BBFFE3"
              d="M246.4,136.1c0,0.5-0.4,0.9-0.9,0.9s-0.9-0.4-0.9-0.9c0-0.5,0.4-0.9,0.9-0.9S246.4,135.6,246.4,136.1z"
            />
          </g>
          <g id="agreementRelease--rightLabel">
            <text className="kpiLabel" transform="matrix(1 0 0 1 544 50)">
              <tspan className="kpiValue" fontFamily="'Poppins'" fontSize="11px">
                {'88'}
              </tspan>
              <tspan fontFamily="'Poppins'" fontSize="11px">
                {'/ 90 %'}
              </tspan>
            </text>
            <polyline
              fill="none"
              stroke="#BBFFE3"
              strokeWidth={0.25}
              strokeMiterlimit={10}
              points="519.3,136.2 519.2,82.5 540.6,55.4 "
            />
            <circle fill="#BBFFE3" cx={519.2} cy={137} r={0.9} />
          </g>
          <g id="manualRelease--leftLabel">
            <text className="kpiLabel" transform="matrix(1 0 0 1 259 158)">
              <tspan className="kpiValue" fontFamily="'Poppins'" fontSize="11px">
                {'88'}
              </tspan>
              <tspan fontFamily="'Poppins'" fontSize="11px">
                {'/ 90 %'}
              </tspan>
            </text>
            <polyline
              fill="none"
              stroke="#BBFFE3"
              strokeWidth={0.25}
              strokeMiterlimit={10}
              points="320.5,196.1 320.5,170 308,159.8 "
            />
            <path
              fill="#BBFFE3"
              d="M321.4,196.1c0,0.5-0.4,0.9-0.9,0.9s-0.9-0.4-0.9-0.9c0-0.5,0.4-0.9,0.9-0.9S321.4,195.5,321.4,196.1z"
            />
          </g>
          <g id="manualRelease--rightLabel">
            <text className="kpiLabel" transform="matrix(1 0 0 1 462 158)">
              <tspan className="kpiValue" fontFamily="'Poppins'" fontSize="11px">
                {'88'}
              </tspan>
              <tspan fontFamily="'Poppins'" fontSize="11px">
                {'/ 90 %'}
              </tspan>
            </text>
            <polyline
              fill="none"
              stroke="#BBFFE3"
              strokeWidth={0.25}
              strokeMiterlimit={10}
              points="444,196.1 444,170 456.5,159.8  "
            />
            <circle fill="#BBFFE3" cx={443.9} cy={197} r={0.9} />
          </g>
          <g id="releaseToOOK--leftConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M192.9,203.1H205 c18.2,0,33,14.8,33,33v0v0v0c0,18.2,14.8,33,33,33h99.7"
            />
          </g>
          <g id="releaseToOOK--leftConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M192.9,203.1H205 c18.2,0,33,14.8,33,33v0v0v0c0,18.2,14.8,33,33,33h99.7"
            />
          </g>
          <g id="releaseToOOK--rightConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M560.6,203.1 c-18.2,0-33,14.8-33,33v0v0v0c0,18.2-14.8,33-33,33H395"
            />
          </g>
          <g id="manualReleaseIK--leftConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d={`
              M 204.7,203 L 370.2, 203
              `}
            />
          </g>
          <g id="manualReleaseIK--rightConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d={`
              M 395,203 L 568, 203
              `}
            />
          </g>
          <g id="agreementRelease--leftConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M194.8,199.9h10 c18.2,0,33-14.8,33-33v0v0v0c0-18.2,14.8-33,33-33h96.9"
            />
          </g>
          <g id="agreementRelease--rightConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M560.5,199.9 c-18.2,0-33-14.8-33-33v0v0v0c0-18.2-14.8-33-33-33h-96.9"
            />
          </g>
          <g id="vendorTo--leftConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M656.8,199.9 c18.2,0,33-14.8,33-33v0v0v-66.8c0-18.2,14.8-33,33-33H821"
            />
          </g>
          <g id="vendorTo--rightConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M1009.6,199.9 c-18.2,0-33-14.8-33-33v0v0v-66.8c0-18.2-14.8-33-33-33h-98.3"
            />
          </g>
          <g id="aramcoCarrier--leftConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M660.9,202h16.7 c13.4,0,24.3-10.9,24.3-24.3v0v0.4v0c0-13.4,10.9-24.3,24.3-24.3h94.3"
            />
          </g>
          <g id="aramcoCarrier--rightConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M1005.5,202h-16.7 c-13.4,0-24.3-10.9-24.3-24.3v0v0.4v0c0-13.4-10.9-24.3-24.3-24.3h-94.3"
            />
          </g>
          <g id="transportationTruck--leftConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M660.9,204.8h16.7 c13.4,0,24.3,10.9,24.3,24.3v0v0.7v0c0,13.4,10.9,24.3,24.3,24.3h94.3"
            />
          </g>
          <g id="transportationTruck--rightConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M1005.5,204.8h-16.7 c-13.4,0-24.3,10.9-24.3,24.3v0v0.7v0c0,13.4-10.9,24.3-24.3,24.3h-94.3"
            />
          </g>
          <g id="customerPickup--leftConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M656.8,204.8 c18.2,0,33,14.8,33,33v0v0v66.8c0,18.2,14.8,33,33,33H821"
            />
          </g>
          <g id="customerPickup--rightConnector">
            <path
              fill="none"
              stroke="#BBFFE3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              d="M1009.6,204.8 c-18.2,0-33,14.8-33,33v0v0v66.8c0,18.2-14.8,33-33,33h-98.3"
            />
          </g>
        </defs>
        <line
          fill="none"
          stroke="#BBFFE3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          x1={64.7}
          y1={202.9}
          x2={177.2}
          y2={202.9}
        />
        <path
          fill="none"
          stroke="#BBFFE3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          d="M204.2,202.9h-22.6 c-18.2,0-33-14.8-33-33v0v0v0c0-18.2-14.8-33-33-33H65"
        />
        <path
          fill="none"
          stroke="#BBFFE3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          d="M204.2,202.9h-22.6 c-18.2,0-33,14.8-33,33v0v0v0c0,18.2-14.8,33-33,33H65"
        />
        <path
          fill="none"
          stroke="#BBFFE3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          d="M552.9,202.9"
        />
        <path
          fill="none"
          stroke="#BBFFE3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          d="M1025.1,202.9 c13.4,0,24.3,10.9,24.3,24.3v0v0.7v0c0,13.4,10.9,24.3,24.3,24.3h46.7"
        />
        <path
          fill="none"
          stroke="#BBFFE3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          d="M1025.1,202.9 c13.4,0,24.3-10.9,24.3-24.3v0v-0.7v0c0-13.4,10.9-24.3,24.3-24.3h46.7"
        />
        <line
          fill="none"
          stroke="#BBFFE3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          x1={568.3}
          y1={202.9}
          x2={651.5}
          y2={202.9}
        />
        <g>
          <polyline
            fill="none"
            stroke="#BBFFE3"
            strokeWidth={0.25}
            strokeMiterlimit={10}
            points="519.2,264.9 519.2,318.6 540.7,345.7 "
          />
          <circle fill="#BBFFE3" cx={519.2} cy={265} r={0.9} />
        </g>
        <g>
          <polyline
            fill="none"
            stroke="#BBFFE3"
            strokeWidth={0.25}
            strokeMiterlimit={10}
            points="245.7,264.9 245.7,318.6 224.3,345.7 "
          />
          <circle fill="#BBFFE3" cx={245.7} cy={264.9} r={0.9} />
        </g>
        <g>
          <polyline
            fill="none"
            stroke="#BBFFE3"
            strokeWidth={0.25}
            strokeMiterlimit={10}
            points="710,339.8 710,367.3 692.8,377.5 "
          />
          <circle fill="#BBFFE3" cx={710} cy={339.8} r={0.9} />
        </g>
        <g>
          <polyline
            fill="none"
            stroke="#BBFFE3"
            strokeWidth={0.25}
            strokeMiterlimit={10}
            points="957,339.9 957,367.4 974.2,377.6 "
          />
          <circle fill="#BBFFE3" cx={957} cy={339.9} r={0.9} />
        </g>
        <g>
          <polyline
            fill="none"
            stroke="#BBFFE3"
            strokeWidth={0.25}
            strokeMiterlimit={10}
            points="710,64.7 710,37.2 692.8,27  "
          />
          <circle fill="#BBFFE3" cx={710} cy={64.7} r={0.9} />
        </g>
        <g>
          <polyline
            fill="none"
            stroke="#BBFFE3"
            strokeWidth={0.25}
            strokeMiterlimit={10}
            points="957,64.6 957,37.1 974.2,26.9  "
          />
          <circle fill="#BBFFE3" cx={957} cy={64.6} r={0.9} />
        </g>
        <g>
          <polyline
            fill="none"
            stroke="#BBFFE3"
            strokeWidth={0.25}
            strokeMiterlimit={10}
            points="886,258.9 886,286.4 903.2,296.6 "
          />
          <circle fill="#BBFFE3" cx={886} cy={258.9} r={0.9} />
        </g>
        <g>
          <polyline
            fill="none"
            stroke="#BBFFE3"
            strokeWidth={0.25}
            strokeMiterlimit={10}
            points="777,258.9 777,286.4 759.8,296.6 "
          />
          <circle fill="#BBFFE3" cx={777} cy={258.9} r={0.9} />
        </g>
        <g>
          <polyline
            fill="none"
            stroke="#BBFFE3"
            strokeWidth={0.25}
            strokeMiterlimit={10}
            points="886,148.7 886,121.2 903.2,111  "
          />
          <circle fill="#BBFFE3" cx={886} cy={148.7} r={0.9} />
        </g>
        <g>
          <polyline
            fill="none"
            stroke="#BBFFE3"
            strokeWidth={0.25}
            strokeMiterlimit={10}
            points="777,148.7 777,121.2 759.8,111  "
          />
          <circle fill="#BBFFE3" cx={777} cy={148.7} r={0.9} />
        </g>
        <g id="dots">
          <path
            fill="#0A3C75"
            d="M182,202.5c0-5.9,4.9-10.7,10.8-10.7c6,0,10.8,4.8,10.8,10.7c0,5.9-4.9,10.7-10.8,10.7 C186.9,213.2,182,208.4,182,202.5z"
          />
          <path
            fill="#A56EFF"
            d="M184.7,202.5c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1 C188.3,210.6,184.7,207,184.7,202.5z"
          />
          <path
            fill="#A56EFF"
            d="M61.4,202.5c0-4.5-3.7-8.1-8.2-8.1c-4.5,0-8.2,3.6-8.2,8.1c0,4.5,3.7,8.1,8.2,8.1 C57.8,210.6,61.4,207,61.4,202.5z"
          />
          <path
            fill="#A56EFF"
            d="M45,136.2c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1C48.7,144.3,45,140.6,45,136.2 z"
          />
          <path
            fill="#A56EFF"
            d="M45,268.9c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1C48.7,277,45,273.3,45,268.9z"
          />
          <path
            fill="#A56EFF"
            d="M374.5,133.1c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1 C378.2,141.1,374.5,137.5,374.5,133.1z"
          />
          <path
            fill="#A56EFF"
            d="M825,68c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1C828.7,76.1,825,72.5,825,68z"
          />
          <path
            fill="#A56EFF"
            d="M1124.6,153.6c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1 C1128.2,161.6,1124.6,158,1124.6,153.6z"
          />
          <path
            fill="#A56EFF"
            d="M1124.6,252.2c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1 C1128.2,260.3,1124.6,256.6,1124.6,252.2z"
          />
          <path
            fill="#A56EFF"
            d="M374.5,202.5c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1 C378.2,210.6,374.5,207,374.5,202.5z"
          />
          <path
            fill="#0A3C75"
            d="M556.2,202.5c0-5.9,4.9-10.7,10.8-10.7c6,0,10.8,4.8,10.8,10.7c0,5.9-4.9,10.7-10.8,10.7 C561.1,213.2,556.2,208.4,556.2,202.5z"
          />
          <path
            fill="#0A3C75"
            d="M642.4,202.5c0-5.9,4.9-10.7,10.8-10.7c6,0,10.8,4.8,10.8,10.7c0,5.9-4.9,10.7-10.8,10.7 C647.2,213.2,642.4,208.4,642.4,202.5z"
          />
          <path
            fill="#0A3C75"
            d="M1002.2,202.5c0-5.9,4.9-10.7,10.8-10.7c6,0,10.8,4.8,10.8,10.7c0,5.9-4.9,10.7-10.8,10.7 C1007.1,213.2,1002.2,208.4,1002.2,202.5z"
          />
          <path
            fill="#A56EFF"
            d="M558.9,202.5c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1 C562.6,210.6,558.9,207,558.9,202.5z"
          />
          <path
            fill="#A56EFF"
            d="M645,202.5c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1 C648.7,210.6,645,207,645,202.5z"
          />
          <path
            fill="#A56EFF"
            d="M841.4,253.7c0,4.5-3.7,8.1-8.2,8.1c-4.5,0-8.2-3.6-8.2-8.1c0-4.5,3.7-8.1,8.2-8.1 C837.8,245.6,841.4,249.2,841.4,253.7z"
          />
          <path
            fill="#A56EFF"
            d="M841.4,337.5c0,4.5-3.7,8.1-8.2,8.1c-4.5,0-8.2-3.6-8.2-8.1s3.7-8.1,8.2-8.1 C837.8,329.4,841.4,333,841.4,337.5z"
          />
          <path
            fill="#A56EFF"
            d="M825,155.5c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1 C828.7,163.6,825,160,825,155.5z"
          />
          <path
            fill="#A56EFF"
            d="M1004.9,202.5c0-4.5,3.7-8.1,8.2-8.1c4.5,0,8.2,3.6,8.2,8.1c0,4.5-3.7,8.1-8.2,8.1 C1008.5,210.6,1004.9,207,1004.9,202.5z"
          />
          <path
            fill="#A56EFF"
            d="M374.5,268.4c-0.1-4.5,3.6-8.1,8.1-8.2c4.5-0.1,8.2,3.5,8.3,8c0.1,4.5-3.6,8.1-8.1,8.2 C378.3,276.4,374.6,272.8,374.5,268.4z"
          />
        </g>
        <text transform="matrix(1 0 0 1 344.1897 96.4121)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'Agreement '}
          </tspan>
          <tspan
            x={13.1}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'Release'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 183.1624 167.835)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'PR'}
          </tspan>
          <tspan
            x={-22.2}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'Released'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 351.3264 169.835)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'Manually '}
          </tspan>
          <tspan
            x={-1.2}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'Release IK'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 355.5066 237.8433)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'Release '}
          </tspan>
          <tspan
            x={4.5}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'to OOK'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 559.4841 167.835)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'PO '}
          </tspan>
          <tspan
            x={-19.4}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'Released'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 625.0193 167.835)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'Material'}
          </tspan>
          <tspan
            x={-0.3}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'is Ready'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 782.7683 277.2153)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'Transportation '}
          </tspan>
          <tspan
            x={32.5}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'Truck'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 799.4207 36.2295)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'Vendor to '}
          </tspan>
          <tspan
            x={1}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'Customer'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 798.9016 364.0229)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'Customer '}
          </tspan>
          <tspan
            x={9.4}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'Pick-up'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 803.0349 124.105)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'ARAMCO '}
          </tspan>
          <tspan
            x={7.2}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'Carrier'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 987.1267 161.835)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'Material'}
          </tspan>
          <tspan
            x={-3.1}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'Received'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 1097.3855 121.5718)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'Electronic '}
          </tspan>
          <tspan
            x={24.8}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'GR'}
          </tspan>
        </text>
        <text transform="matrix(1 0 0 1 1105.1077 221.4786)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'Manual '}
          </tspan>
          <tspan
            x={17.1}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'GR'}
          </tspan>
        </text>
        <text
          transform="matrix(1 0 0 1 6.8967 253.4706)"
          fill="#FFFFFF"
          fontFamily="'Poppins'"
          fontSize="13px"
        >
          {'Direct Charge'}
        </text>
        <text transform="matrix(1 0 0 1 24.4851 101.4122)">
          <tspan x={0} y={0} fill="#FFFFFF" fontFamily="'Poppins'" fontSize="13px">
            {'Satisfed'}
          </tspan>
          <tspan
            x={-7.2}
            y={15.6}
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'from Stock'}
          </tspan>
        </text>
        <g>
          <text
            transform="matrix(1 0 0 1 13.7405 186.0318)"
            fill="#FFFFFF"
            fontFamily="'Poppins'"
            fontSize="13px"
          >
            {'Reservation'}
          </text>
        </g>
      </svg>
    </div>
  )
}
