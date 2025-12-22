import React, { useRef, useState, useEffect } from 'react'

import { SVG } from '@svgdotjs/svg.js'
import styles from './EndToEnd.module.css'
import Block from '../common/Block'
import Dialog from '../common/Dialog'
import EndToEndDialog from './EndToEndDialog'
const delayGen = (waitTime) => {
  let timer = 0
  return (callback, ms = waitTime) => {
    try {
      clearTimeout(timer)
      timer = setTimeout(() => callback(), ms)
    } catch (e) {
      console.log({ e })
    }
  }
}

const showVisibilityDelay = delayGen(300)
const FONTSIZE = 10
const FONTWEIGHT = 200
const FONTFAMILY = 'poppins,Helvetica-Bold, Helvetica'
const noValues = Array.from({ length: 5 }).fill({ id: '', svg: null })
const withValues = [
  {
    id: 'pickup',
    svg: (
      <g key={'pickup'} transform="translate(1307 675.612)">
        <rect
          stroke="#fff6"
          opacity=".6"
          strokeWidth="1"
          x="1.5%"
          y="-4%"
          fill="var(--end-to-end-popup)"
          height="20"
          width="60"
          rx="5"
          ry="5"
        ></rect>
        <text
          id="Customer_Pick-up-value"
          data-name="Customer Pick-up value"
          fill="#fff"
          fontSize={FONTSIZE}
          fontFamily={FONTFAMILY}
          fontWeight={FONTWEIGHT}
          x="33"
        >
          <tspan fill="lightgreen">97%</tspan> / 95%
        </text>
      </g>
    ),
  },
  {
    id: 'transportation',
    svg: (
      <g key={'transportation'} transform="translate(1307 729)">
        <rect
          stroke="#fff6"
          opacity=".6"
          strokeWidth="1"
          x="1.5%"
          y="-4%"
          fill="var(--end-to-end-popup)"
          height="20"
          width="60"
          rx="5"
          ry="5"
        ></rect>
        <text
          id="transportation-value"
          data-name="Customer Pick-up value"
          fill="#fff"
          fontSize={FONTSIZE}
          fontFamily={FONTFAMILY}
          fontWeight={FONTWEIGHT}
          x="33"
        >
          <tspan fill="lightgreen">98%</tspan> / 95%
        </text>
      </g>
    ),
  },
  {
    id: 'Naqel',
    svg: (
      <g key={'Naqel'} transform="translate(1307 782)">
        <rect
          stroke="#fff6"
          opacity=".6"
          strokeWidth="1"
          x="1.5%"
          y="-4%"
          fill="var(--end-to-end-popup)"
          height="20"
          width="60"
          rx="5"
          ry="5"
        ></rect>
        <text
          id="Naqel-value"
          data-name="Naqel value"
          fill="#fff"
          fontSize={FONTSIZE}
          fontFamily={FONTFAMILY}
          fontWeight={FONTWEIGHT}
          x="33"
        >
          <tspan fill="lightgreen">98%</tspan> / 95%
        </text>
      </g>
    ),
  },
  {
    id: 'vendor',
    svg: (
      <g key={'vendor'} transform="translate(1307 842)">
        <rect
          stroke="#fff6"
          opacity=".6"
          strokeWidth="1"
          x="1.5%"
          y="-4%"
          fill="var(--end-to-end-popup)"
          height="20"
          width="60"
          rx="5"
          ry="5"
        ></rect>
        <text
          id="Customer_Pick-up-value"
          data-name="vendor value"
          fill="#fff"
          fontSize={FONTSIZE}
          fontFamily={FONTFAMILY}
          fontWeight={FONTWEIGHT}
          x="33"
        >
          <tspan fill="lightgreen">88%</tspan> / 88%
        </text>
      </g>
    ),
  },
  {
    id: 'PO',
    svg: (
      <g key={'PO'} transform="translate(680 812)">
        <rect
          stroke="#fff6"
          opacity=".6"
          strokeWidth="1"
          x="1.5%"
          y="-4%"
          fill="var(--end-to-end-popup)"
          height="20"
          width="60"
          rx="5"
          ry="5"
        ></rect>
        <text
          id="po-value"
          data-name="Customer Pick-up value"
          fill="#fff"
          fontSize={FONTSIZE}
          fontFamily={FONTFAMILY}
          fontWeight={FONTWEIGHT}
          x="33"
        >
          <tspan fill="#d6a006">93%</tspan> / 97%
        </text>
      </g>
    ),
  },
]
export default function EndToEnd(props) {
  const [
    showValue,
    setShowValue,
  ] = useState(false)
  const [
    dialog,
    setDialog,
  ] = useState({ state: 'close', name: '' })
  const mouseTrack = useRef([
    0,
    0,
  ])
  const dialogRef = useRef(null)
  const valuesToShow = !showValue ? noValues : withValues

  useEffect(() => {
    console.log({ showValue })
  }, [showValue])
  useEffect(() => {
    //Group_3826
    const roba = SVG('#Group_3826')
    const arwa = SVG('#Group_3666')
    const endToEndButton = SVG('#EndToEndButton')
    endToEndButton.click((e) => {
      showVisibilityDelay(() => {
        setShowValue((v) => !v)
      })
    })
    arwa.on('mouseover', (e) => {
      const { clientX, clientY } = e
      mouseTrack.current = [
        Number(clientX) - 325,
        Number(clientY) + 40,
      ]
      if (dialog?.state !== 'show') setDialog({ state: 'show', name: 'arwa' })
    })
    roba.on('mouseover', (e) => {
      const { clientX, clientY } = e
      mouseTrack.current = [
        clientX,
        clientY,
      ]
      if (dialog?.state !== 'show') setDialog({ state: 'show', name: 'roba' })
    })
  }, [])

  return (
    <div className={styles.wrap}>
      <Dialog
        size="20em"
        radius="14px"
        offsetTop={-123}
        offsetLeft={-3250}
        clientX={mouseTrack.current[0]}
        clientY={mouseTrack.current[1]}
        modalState={dialog?.state}
        ref={dialogRef}
        onModalClose={() => {
          // to make dailog content fade out smoothly with no sudden disappear
          setTimeout(async () => {
            setDialog({ ...dialog, state: 'close' })
            await new Promise((r) => setTimeout(r, 200))
            setDialog({ state: 'close', name: '' })
          })
        }}
      >
        <Block transparent={true}>
          <EndToEndDialog
            name={dialog?.name}
            query={{
              title: 'DIGITAL WORKFORCE',
              techname: 'YSCM_SCCT_PROC_RPA_01',
            }}
          ></EndToEndDialog>
        </Block>
      </Dialog>
      <h3 className={styles.title}>End-To-End Visibility</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={1768}
        transform="scale(1.1 1.1)"
        height={402}
        viewBox="0 0 1768.167 348.105"
        {...props}
      >
        <defs>
          <clipPath id="clip-path">
            <rect
              id="Rectangle_6017"
              data-name="Rectangle 6017"
              width={1768.167}
              height={338.309}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-2">
            <rect
              id="Rectangle_5949"
              data-name="Rectangle 5949"
              width={1768.173}
              height={338.309}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-3">
            <rect
              id="Rectangle_5916"
              data-name="Rectangle 5916"
              width={200.879}
              height={21.073}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-4">
            <path
              id="Path_11353"
              data-name="Path 11353"
              d="M0,0H200.879V11.619H0Z"
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-5">
            <rect
              id="Rectangle_5918"
              data-name="Rectangle 5918"
              width={200.878}
              height={15.687}
              fill="none"
              stroke="#00ceff"
              strokeWidth={9.622}
            />
          </clipPath>
          <clipPath id="clip-path-6">
            <path
              id="Path_11349"
              data-name="Path 11349"
              d="M0,0H200.877V20.992H0Z"
              fill="none"
              stroke="#e05a32"
              strokeWidth={6.5}
            />
          </clipPath>
          <clipPath id="clip-path-7">
            <rect
              id="Rectangle_5920"
              data-name="Rectangle 5920"
              width={200.878}
              height={55.736}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-8">
            <path
              id="Path_11354"
              data-name="Path 11354"
              d="M0,0H200.879V10.147H0Z"
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-9">
            <rect
              id="Rectangle_5922"
              data-name="Rectangle 5922"
              width={200.879}
              height={32.283}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-10">
            <rect
              id="Rectangle_5923"
              data-name="Rectangle 5923"
              width={200.879}
              height={43.188}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-11">
            <rect
              id="Rectangle_5924"
              data-name="Rectangle 5924"
              width={200.878}
              height={25.989}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-12">
            <rect
              id="Rectangle_5925"
              data-name="Rectangle 5925"
              width={200.877}
              height={42.001}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-13">
            <rect
              id="Rectangle_5926"
              data-name="Rectangle 5926"
              width={1036.358}
              height={63.457}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-14">
            <rect
              id="Rectangle_5927"
              data-name="Rectangle 5927"
              width={200.879}
              height={91.747}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-15">
            <rect
              id="Rectangle_5928"
              data-name="Rectangle 5928"
              width={1036.358}
              height={10.087}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-16">
            <rect
              id="Rectangle_5929"
              data-name="Rectangle 5929"
              width={200.878}
              height={104.857}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-17">
            <rect
              id="Rectangle_5930"
              data-name="Rectangle 5930"
              width={200.879}
              height={49.799}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-18">
            <rect
              id="Rectangle_5931"
              data-name="Rectangle 5931"
              width={200.879}
              height={100.123}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-19">
            <rect
              id="Rectangle_5932"
              data-name="Rectangle 5932"
              width={200.879}
              height={27.663}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-20">
            <rect
              id="Rectangle_5933"
              data-name="Rectangle 5933"
              width={200.879}
              height={77.987}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-21">
            <rect
              id="Rectangle_5934"
              data-name="Rectangle 5934"
              width={200.879}
              height={49.93}
              fill="none"
              stroke="#e6ab02"
              strokeWidth={0.6}
            />
          </clipPath>
          <clipPath id="clip-path-22">
            <rect
              id="Rectangle_5935"
              data-name="Rectangle 5935"
              width={200.879}
              height={45.287}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-23">
            <path
              id="Path_11356"
              data-name="Path 11356"
              d="M0,0H200.878V7.509H0Z"
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-24">
            <rect
              id="Rectangle_5937"
              data-name="Rectangle 5937"
              width={200.879}
              height={15.037}
              fill="none"
              stroke="#e05a32"
              strokeWidth={1.6}
            />
          </clipPath>
          <clipPath id="clip-path-25">
            <rect
              id="Rectangle_5938"
              data-name="Rectangle 5938"
              width={200.877}
              height={114.304}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-26">
            <rect
              id="Rectangle_5939"
              data-name="Rectangle 5939"
              width={200.877}
              height={89.758}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-27">
            <rect
              id="Rectangle_5940"
              data-name="Rectangle 5940"
              width={1036.358}
              height={43.123}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-28">
            <rect
              id="Rectangle_5941"
              data-name="Rectangle 5941"
              width={200.878}
              height={3.408}
              fill="none"
              stroke="#66a61e"
              strokeWidth={1}
            />
          </clipPath>
          <clipPath id="clip-path-29">
            <rect
              id="Rectangle_5942"
              data-name="Rectangle 5942"
              width={200.878}
              height={53.732}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-30">
            <rect
              id="Rectangle_5943"
              data-name="Rectangle 5943"
              width={200.879}
              height={141.952}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-31">
            <rect
              id="Rectangle_5944"
              data-name="Rectangle 5944"
              width={200.879}
              height={14.074}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-32">
            <rect
              id="Rectangle_5945"
              data-name="Rectangle 5945"
              width={200.877}
              height={63.019}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-33">
            <rect
              id="Rectangle_5946"
              data-name="Rectangle 5946"
              width={200.878}
              height={56.912}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-34">
            <rect
              id="Rectangle_5947"
              data-name="Rectangle 5947"
              width={200.879}
              height={14.117}
              fill="none"
            />
          </clipPath>
          <clipPath id="clip-path-35">
            <rect
              id="Rectangle_5948"
              data-name="Rectangle 5948"
              width={200.877}
              height={163.708}
              fill="none"
            />
          </clipPath>
        </defs>
        <g id="End-to-end" transform="translate(-42.579 -689.612)">
          <g
            id="Group_3825"
            data-name="Group 3825"
            transform="translate(42.579 699.409)"
          >
            <g id="Group_3824" data-name="Group 3824" clipPath="url(#clip-path)">
              <g id="Group_3722" data-name="Group 3722">
                <g
                  id="Group_3721"
                  data-name="Group 3721"
                  clipPath="url(#clip-path-2)"
                >
                  <g
                    id="Group_3624"
                    data-name="Group 3624"
                    transform="translate(1559.307 85.725)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3623" data-name="Group 3623">
                      <g
                        id="Group_3622"
                        data-name="Group 3622"
                        clipPath="url(#clip-path-3)"
                      >
                        <path
                          id="Path_11101"
                          data-name="Path 11101"
                          d="M1021.768,99.581c108.474,0,92.4-6.639,200.878-6.639"
                          transform="translate(-1021.771 -85.725)"
                          fill="none"
                          stroke="#aa2e8a"
                          strokeWidth={14.433}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3627"
                    data-name="Group 3627"
                    transform="translate(723.825 140.055)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3626" data-name="Group 3626">
                      <g
                        id="Mask_Group_313"
                        data-name="Mask Group 313"
                        clipPath="url(#clip-path-4)"
                      >
                        <path
                          id="Path_11102"
                          data-name="Path 11102"
                          d="M474.3,146.863c108.474,0,92.4-2,200.878-2"
                          transform="translate(-474.302 -140.055)"
                          fill="none"
                          stroke="#e6ab02"
                          strokeWidth={9.5}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3630"
                    data-name="Group 3630"
                    transform="translate(932.694 140.055)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3629" data-name="Group 3629">
                      <g
                        id="Group_3628"
                        data-name="Group 3628"
                        clipPath="url(#clip-path-5)"
                      >
                        <path
                          id="Path_11103"
                          data-name="Path 11103"
                          d="M611.168,144.866c108.474,0,92.4,6.065,200.878,6.065"
                          transform="translate(-611.168 -140.055)"
                          fill="none"
                          stroke="#e6ab02"
                          strokeWidth={9.5}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3633"
                    data-name="Group 3633"
                    transform="translate(1350.434 97.496)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3632" data-name="Group 3632">
                      <g
                        id="Mask_Group_312"
                        data-name="Mask Group 312"
                        clipPath="url(#clip-path-6)"
                      >
                        <path
                          id="Path_11104"
                          data-name="Path 11104"
                          d="M884.9,114.078c108.474,0,92.4-12.171,200.879-12.171"
                          transform="translate(-884.901 -97.496)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={6.5}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3636"
                    data-name="Group 3636"
                    transform="translate(97.215 72.199)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3635" data-name="Group 3635">
                      <g
                        id="Group_3634"
                        data-name="Group 3634"
                        clipPath="url(#clip-path-7)"
                      >
                        <path
                          id="Path_11105"
                          data-name="Path 11105"
                          d="M63.7,76.208c108.474,0,92.4,47.717,200.878,47.717"
                          transform="translate(-63.702 -72.199)"
                          fill="none"
                          stroke="#66a61e"
                          strokeWidth={8.018}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3639"
                    data-name="Group 3639"
                    transform="translate(306.085 117.788)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3638" data-name="Group 3638">
                      <g
                        id="Mask_Group_314"
                        data-name="Mask Group 314"
                        clipPath="url(#clip-path-8)"
                      >
                        <path
                          id="Path_11106"
                          data-name="Path 11106"
                          d="M200.569,123.925c108.474,0,92.4-2.128,200.878-2.128"
                          transform="translate(-200.569 -117.788)"
                          fill="none"
                          stroke="#00b4de"
                          strokeWidth={8}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3642"
                    data-name="Group 3642"
                    transform="translate(514.954 117.788)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3641" data-name="Group 3641">
                      <g
                        id="Group_3640"
                        data-name="Group 3640"
                        clipPath="url(#clip-path-9)"
                      >
                        <path
                          id="Path_11107"
                          data-name="Path 11107"
                          d="M337.435,121.8c108.474,0,92.4,24.264,200.878,24.264"
                          transform="translate(-337.435 -117.788)"
                          fill="none"
                          stroke="#00b4de"
                          strokeWidth={8}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3645"
                    data-name="Group 3645"
                    transform="translate(1141.565 112.073)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3644" data-name="Group 3644">
                      <g
                        id="Group_3643"
                        data-name="Group 3643"
                        clipPath="url(#clip-path-10)"
                      >
                        <path
                          id="Path_11108"
                          data-name="Path 11108"
                          d="M748.035,152.053c108.474,0,92.4-36.773,200.878-36.773"
                          transform="translate(-748.035 -112.073)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={6.5}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3648"
                    data-name="Group 3648"
                    transform="translate(97.215 46.21)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3647" data-name="Group 3647">
                      <g
                        id="Group_3646"
                        data-name="Group 3646"
                        clipPath="url(#clip-path-11)"
                      >
                        <path
                          id="Path_11109"
                          data-name="Path 11109"
                          d="M63.7,69.793c108.474,0,92.4-21.178,200.878-21.178"
                          transform="translate(-63.702 -46.21)"
                          fill="none"
                          stroke="#66a61e"
                          strokeWidth={4.811}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3651"
                    data-name="Group 3651"
                    transform="translate(1350.434 55.495)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3650" data-name="Group 3650">
                      <g
                        id="Group_3649"
                        data-name="Group 3649"
                        clipPath="url(#clip-path-12)"
                      >
                        <path
                          id="Path_11110"
                          data-name="Path 11110"
                          d="M884.9,57.42c108.474,0,92.4,38.152,200.879,38.152"
                          transform="translate(-884.901 -55.495)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={3.8}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3654"
                    data-name="Group 3654"
                    transform="translate(306.085 48.616)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3653" data-name="Group 3653">
                      <g
                        id="Group_3652"
                        data-name="Group 3652"
                        clipPath="url(#clip-path-13)"
                      >
                        <path
                          id="Path_11111"
                          data-name="Path 11111"
                          d="M200.569,49.818c559.633,0,476.724,61.052,1036.358,61.052"
                          transform="translate(-200.569 -48.616)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={2.5}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3657"
                    data-name="Group 3657"
                    transform="translate(1141.565 57.099)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3656" data-name="Group 3656">
                      <g
                        id="Group_3655"
                        data-name="Group 3655"
                        clipPath="url(#clip-path-14)"
                      >
                        <path
                          id="Path_11112"
                          data-name="Path 11112"
                          d="M748.035,147.723c108.474,0,92.4-89.5,200.878-89.5"
                          transform="translate(-748.035 -57.099)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={2.5}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3660"
                    data-name="Group 3660"
                    transform="translate(306.085 47.012)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3659" data-name="Group 3659">
                      <g
                        id="Mask_Group_3658"
                        data-name="Mask Group 3658"
                        clipPath="url(#clip-path-15)"
                      >
                        <path
                          id="Path_11113"
                          data-name="Path 11113"
                          d="M200.569,47.814c559.633,0,476.724,8.484,1036.358,8.484"
                          transform="translate(-200.569 -47.012)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={1.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3663"
                    data-name="Group 3663"
                    transform="translate(97.215 129.538)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3662" data-name="Group 3662">
                      <g
                        id="Group_3661"
                        data-name="Group 3661"
                        clipPath="url(#clip-path-16)"
                      >
                        <path
                          id="Path_11114"
                          data-name="Path 11114"
                          d="M63.7,233.593c108.474,0,92.4-103.253,200.878-103.253"
                          transform="translate(-63.702 -129.538)"
                          fill="none"
                          stroke="#66a61e"
                          strokeWidth={1.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3666"
                    data-name="Group 3666"
                    transform="translate(1577 74)"
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <path
                      id="Path_11187"
                      data-name="Path 11187"
                      d="M12.64,116.5l-.11,1.51a16.623,16.623,0,0,1,3.671-.2h.009l.076-1.27a3.04,3.04,0,0,1-.752.066Z"
                      transform="translate(-5.719 -53.173)"
                      fill="#666"
                    />
                    <path
                      id="Path_11188"
                      data-name="Path 11188"
                      d="M17.193,92.832l-1.087-.07a1.109,1.109,0,0,0-1.239.89l-.157,1.727a1.039,1.039,0,0,0,1.064,1.037l1.087.069A1.109,1.109,0,0,0,18.1,95.6l.157-1.726a1.039,1.039,0,0,0-1.064-1.037"
                      transform="translate(-6.712 -42.336)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11189"
                      data-name="Path 11189"
                      d="M3.321,126.449c0,.161.217.329.412.447a1.159,1.159,0,0,0,.6.16l7.636,0a1.181,1.181,0,0,0,.623-.174c.188-.117.387-.278.387-.432v-.194H3.321Z"
                      transform="translate(-1.516 -57.625)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11190"
                      data-name="Path 11190"
                      d="M12.007,118.906H12a16.625,16.625,0,0,0-3.671.2A6.45,6.45,0,0,0,3.4,122.514a.734.734,0,0,0-.081.338v.041h9.656v-3.121a.949.949,0,0,0-.97-.865"
                      transform="translate(-1.516 -54.259)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11191"
                      data-name="Path 11191"
                      d="M43.9,118.015l-.11-1.51-2.894.11a3.017,3.017,0,0,1-.752-.065l.076,1.27h.009a16.626,16.626,0,0,1,3.671.2"
                      transform="translate(-18.324 -53.173)"
                      fill="#666"
                    />
                    <path
                      id="Path_11192"
                      data-name="Path 11192"
                      d="M16.922,79.726l-.018-.008-2.166-1.006a1.954,1.954,0,0,0-1.1-.148,1.282,1.282,0,0,0-1.17.921L9.608,98.03c-.09.584.529,1.1,1.355,1.135l.34.013,2.894.11a2.993,2.993,0,0,0,.752-.066c.753-.162,1.312-.605,1.352-1.149l1.295-17.4a1.012,1.012,0,0,0-.673-.946m-1.153,9.38a1.109,1.109,0,0,1-1.239.89l-1.087-.07a1.038,1.038,0,0,1-1.064-1.037l.157-1.726a1.109,1.109,0,0,1,1.239-.89l1.087.07a1.039,1.039,0,0,1,1.064,1.037Z"
                      transform="translate(-4.381 -35.847)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11193"
                      data-name="Path 11193"
                      d="M43.265,98.03,40.409,79.485a1.282,1.282,0,0,0-1.17-.921,1.954,1.954,0,0,0-1.1.148l-2.166,1.006-.018.008a1.012,1.012,0,0,0-.673.946l1.295,17.4c.04.544.6.987,1.352,1.149a2.993,2.993,0,0,0,.752.066l2.894-.11.34-.013c.826-.032,1.445-.551,1.355-1.135M37.1,89.106l-.157-1.726a1.039,1.039,0,0,1,1.064-1.037l1.087-.07a1.109,1.109,0,0,1,1.239.89l.157,1.726a1.038,1.038,0,0,1-1.064,1.037L38.344,90a1.109,1.109,0,0,1-1.239-.89"
                      transform="translate(-16.1 -35.847)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11194"
                      data-name="Path 11194"
                      d="M40.831,96.417a1.039,1.039,0,0,0,1.064-1.037l-.157-1.726a1.109,1.109,0,0,0-1.239-.89l-1.087.069a1.039,1.039,0,0,0-1.064,1.037L38.5,95.6a1.109,1.109,0,0,0,1.239.89Z"
                      transform="translate(-17.5 -42.336)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11195"
                      data-name="Path 11195"
                      d="M38.5,126.452c0,.154.2.315.387.432a1.181,1.181,0,0,0,.623.174l7.636,0a1.156,1.156,0,0,0,.6-.16c.195-.118.412-.286.412-.447v-.191H38.5Z"
                      transform="translate(-17.573 -57.625)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11196"
                      data-name="Path 11196"
                      d="M48.079,122.514a6.449,6.449,0,0,0-4.924-3.414,16.625,16.625,0,0,0-3.671-.2h-.009a.949.949,0,0,0-.97.865v3.121H48.16v-.041a.734.734,0,0,0-.082-.338"
                      transform="translate(-17.573 -54.259)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11197"
                      data-name="Path 11197"
                      d="M20.5,57.917l.17,2.068h9.76l.17-2.069a17.175,17.175,0,0,1-10.1,0"
                      transform="translate(-9.359 -26.433)"
                      fill="#666"
                    />
                    <path
                      id="Path_11198"
                      data-name="Path 11198"
                      d="M17.023,72.736a1.949,1.949,0,0,1,1.1.148l2.166,1.006.489-4.931-2.988-3.187Z"
                      transform="translate(-7.769 -30.018)"
                      fill="#666"
                    />
                    <path
                      id="Path_11199"
                      data-name="Path 11199"
                      d="M38.638,65.771,35.65,68.959l.49,4.931,2.166-1.006a1.954,1.954,0,0,1,1.1-.148Z"
                      transform="translate(-16.271 -30.018)"
                      fill="#666"
                    />
                    <path
                      id="Path_11200"
                      data-name="Path 11200"
                      d="M30.832,62.679l-.044-.149a1.21,1.21,0,0,0-1.188-.808H18.7a1.21,1.21,0,0,0-1.188.808l-.044.149a.981.981,0,0,0,.241.957l.269.287,2.988,3.188.906.967a2.961,2.961,0,0,0,2.236.67h.083a2.962,2.962,0,0,0,2.236-.67l.906-.967,2.988-3.188.269-.287a.981.981,0,0,0,.241-.957"
                      transform="translate(-7.955 -28.17)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11201"
                      data-name="Path 11201"
                      d="M28.575,28.179H28.6a6.6,6.6,0,0,0,1.43-.147V26.618c-.179.022-.36.041-.544.055q-.442.033-.9.033t-.9-.033c-.183-.014-.364-.033-.544-.055v1.414a6.6,6.6,0,0,0,1.43.147Z"
                      transform="translate(-12.389 -12.149)"
                      fill="#666"
                    />
                    <path
                      id="Path_11202"
                      data-name="Path 11202"
                      d="M31.916,33.4v0c-.512-.913-7.242-4.665-8.346-4.961a8.26,8.26,0,0,0-3.53.379,6.631,6.631,0,0,1-1.43.147h-.02a6.626,6.626,0,0,1-1.43-.147,8.271,8.271,0,0,0-3.531-.379c-1.1.3-7.835,4.048-8.347,4.961a.142.142,0,0,0,.093.2L10.2,35.118l0,0,2.342,8.669a2.951,2.951,0,0,0,1.008.628,17.177,17.177,0,0,0,10.1,0,2.892,2.892,0,0,0,1.029-.651L27,35.123l0,0,4.828-1.513a.14.14,0,0,0,.093-.2"
                      transform="translate(-2.402 -12.936)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11203"
                      data-name="Path 11203"
                      d="M52.118,78.034l.2-.55a.41.41,0,0,1,.48-.236l.654.147a.387.387,0,0,1,.269.2l1.217,2.55a.422.422,0,0,0,.644.118.308.308,0,0,0,.1-.252L55.5,76.983a.326.326,0,0,0-.083-.2c-.28-.317-1.235-1.4-1.365-1.519a1.537,1.537,0,0,0-1.107-.369l-.041,0-.939.1c-.547.026-.959.41-.9.841l-.047,1.9a.3.3,0,0,0,0,.058c.077.5.384.653.893.439a.365.365,0,0,0,.2-.21"
                      transform="translate(-23.284 -34.183)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11204"
                      data-name="Path 11204"
                      d="M52.1,74.04l.939-.1.041,0a1.748,1.748,0,0,1,.637.092l-.128-1.244-1.954.092a2.489,2.489,0,0,1-.326-.007l.146,1.416a1.078,1.078,0,0,1,.645-.241"
                      transform="translate(-23.417 -33.217)"
                      fill="#666"
                    />
                    <path
                      id="Path_11205"
                      data-name="Path 11205"
                      d="M47.892,39.39l.467,4.515,1.6-.694a1.563,1.563,0,0,1,.611-.123l-.454-4.394Z"
                      transform="translate(-21.858 -17.66)"
                      fill="#666"
                    />
                    <path
                      id="Path_11206"
                      data-name="Path 11206"
                      d="M49.877,46.9l-1.644.715a.727.727,0,0,0-.515.654l.724,11.92c.029.489.725.853,1.553.814l2.415-.114c.616-.029,1.086-.39,1.027-.79L51.563,47.41c-.079-.537-.991-.813-1.686-.51"
                      transform="translate(-21.779 -21.348)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11207"
                      data-name="Path 11207"
                      d="M4.9,46.9l1.644.715a.727.727,0,0,1,.515.654L6.34,60.188c-.029.489-.725.853-1.553.814l-2.415-.114c-.616-.029-1.086-.39-1.027-.79L3.219,47.41c.079-.537.991-.813,1.686-.51"
                      transform="translate(-0.612 -21.348)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11208"
                      data-name="Path 11208"
                      d="M7.228,38.694l-.454,4.394a1.563,1.563,0,0,1,.611.123l1.6.695L9.45,39.39Z"
                      transform="translate(-3.092 -17.66)"
                      fill="#666"
                    />
                    <path
                      id="Path_11209"
                      data-name="Path 11209"
                      d="M3.558,78.034l-.2-.55a.41.41,0,0,0-.48-.236l-.654.147a.387.387,0,0,0-.269.2L.743,80.15a.422.422,0,0,1-.644.118.308.308,0,0,1-.1-.252l.174-3.033a.326.326,0,0,1,.083-.2c.28-.317,1.235-1.4,1.365-1.519A1.537,1.537,0,0,1,2.73,74.9l.041,0,.939.1c.547.026.959.41.9.841l.047,1.9a.3.3,0,0,1,0,.058c-.077.5-.384.653-.893.439a.365.365,0,0,1-.2-.21"
                      transform="translate(0 -34.183)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11210"
                      data-name="Path 11210"
                      d="M4.488,73.932l.041,0,.939.1a1.075,1.075,0,0,1,.645.241l.146-1.416a2.493,2.493,0,0,1-.326.006L3.978,72.78,3.85,74.024a1.763,1.763,0,0,1,.638-.092"
                      transform="translate(-1.757 -33.217)"
                      fill="#666"
                    />
                    <path
                      id="Path_11211"
                      data-name="Path 11211"
                      d="M22.474,45.639l-.253-.474H21.46l.176-.333h.407l-.329-.617-.757,1.424h-.439l1.025-1.892a.194.194,0,0,1,.372,0l1.025,1.892Z"
                      transform="translate(-9.364 -19.904)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11212"
                      data-name="Path 11212"
                      d="M27.25,45.662l-.439-.545h-.56V44.75h.7c.189,0,.292-.124.292-.336s-.109-.325-.292-.325h-.925v1.573H25.64v-2h1.31a.757.757,0,0,1,.308,1.4l.54.6Z"
                      transform="translate(-11.702 -19.927)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11213"
                      data-name="Path 11213"
                      d="M31.169,45.029l-.251.526a.212.212,0,0,1-.2.135.217.217,0,0,1-.2-.135L29.6,43.66h.462l.669,1.426.239-.473-.444-.953h.464l.63,1.426.672-1.426h.434l-.92,1.894a.217.217,0,0,1-.2.135.21.21,0,0,1-.2-.135Z"
                      transform="translate(-13.511 -19.927)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11214"
                      data-name="Path 11214"
                      d="M36.706,45.639l-.253-.474h-.762l.176-.333h.407l-.329-.617-.757,1.424h-.439l1.025-1.892a.194.194,0,0,1,.372,0l1.025,1.892Z"
                      transform="translate(-15.86 -19.904)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11215"
                      data-name="Path 11215"
                      d="M21.7,6.17c.293-.08.6-.148.915-.207.054-.01.106-.021.161-.03.317-.055.645-.1.981-.129l.2-.015c.35-.028.705-.046,1.07-.046h0c.364,0,.719.018,1.068.046.067.005.134.01.2.016q.5.046.978.128l.166.032c.312.058.615.126.906.2l.047.012c.3.084.582.18.855.284.027.01.058.018.085.028l1.053-2.915h0l.27-.749a.892.892,0,0,0-.3-1.009A8.533,8.533,0,0,0,25.16,0c-.045,0-.09,0-.135,0s-.09,0-.135,0a8.533,8.533,0,0,0-5.2,1.82.892.892,0,0,0-.3,1.009l.271.749,1.053,2.915c.026-.01.055-.017.081-.027.273-.1.558-.2.86-.286l.04-.01"
                      transform="translate(-8.828 0)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11216"
                      data-name="Path 11216"
                      d="M30.249,13.374c.082-.119.158-.24.23-.363.032-.054.064-.107.093-.161.07-.128.132-.259.191-.391.022-.049.047-.1.067-.148a5.09,5.09,0,0,0,.192-.556,4.849,4.849,0,0,0,.178-1.3c0-.111,0-.223-.012-.336,0-.038-.008-.076-.011-.114-.007-.074-.013-.149-.023-.224-.006-.046-.015-.092-.022-.138-.011-.067-.021-.134-.034-.2-.01-.049-.022-.1-.033-.148s-.028-.128-.045-.192-.029-.1-.043-.154-.035-.124-.055-.186c-.008-.025-.017-.05-.026-.076h0L30.87,8.6c-.021-.061-.042-.121-.065-.182s-.042-.106-.063-.159-.049-.119-.074-.177-.048-.107-.073-.16-.055-.116-.084-.173-.054-.107-.083-.16-.061-.114-.093-.17-.06-.106-.092-.159-.067-.112-.1-.167-.066-.1-.1-.157-.073-.11-.111-.165-.071-.1-.108-.153-.08-.108-.121-.162-.076-.1-.115-.149-.087-.107-.131-.16-.079-.1-.12-.144-.1-.107-.144-.16-.082-.091-.124-.135-.1-.108-.157-.161-.082-.084-.124-.125L28.761,5.4h0c-.084-.081-.169-.161-.256-.24l-.98,2.713L27.095,9c.038.017.072.037.109.054.128.06.253.121.372.185.054.029.105.06.158.09.108.063.213.126.313.192.053.035.1.071.153.107q.137.1.261.2c.049.04.1.08.141.121.076.067.146.136.213.207.042.044.085.088.123.133.061.07.115.142.167.215.034.047.07.094.1.142a2.552,2.552,0,0,1,.123.226c.024.049.052.1.072.146a2.228,2.228,0,0,1,.08.25c.013.046.03.09.04.136a1.985,1.985,0,0,1,.039.364c0,.011,0,.021,0,.032,0,.045,0,.09,0,.134a1.769,1.769,0,0,1-1.783,1.608H17.091a1.769,1.769,0,0,1-1.783-1.608c0-.045,0-.089,0-.134a1.957,1.957,0,0,1,.043-.4c.008-.038.023-.075.033-.113a2.142,2.142,0,0,1,.089-.274c.018-.044.043-.086.065-.13a2.452,2.452,0,0,1,.132-.242c.028-.044.061-.087.092-.13.055-.077.113-.153.177-.227.036-.042.076-.083.115-.123.07-.073.144-.146.223-.217.042-.038.086-.075.132-.112.086-.071.177-.14.272-.208.047-.033.093-.066.142-.1.1-.068.213-.135.326-.2.048-.028.1-.056.145-.083.124-.067.254-.131.388-.193.034-.016.064-.034.1-.049l-.43-1.125-.98-2.713c-.087.078-.172.159-.256.24h0l-.023.024c-.042.041-.083.084-.125.126s-.105.106-.157.16-.083.09-.124.136-.1.105-.143.159-.08.1-.12.144-.089.107-.132.16-.077.1-.115.149-.082.108-.121.162l-.108.153c-.038.055-.075.109-.111.165s-.067.1-.1.157-.069.111-.1.167-.061.105-.091.159-.063.114-.093.171-.056.106-.083.16-.057.116-.084.173-.05.107-.073.16-.051.118-.074.177-.043.106-.064.159-.044.121-.065.182-.037.1-.054.157-.037.124-.055.186-.03.1-.043.154-.03.128-.045.192-.023.1-.033.148c-.014.067-.023.135-.034.2-.007.046-.016.091-.022.138-.01.075-.017.149-.023.225,0,.038-.009.076-.011.114-.008.113-.012.225-.012.336a4.849,4.849,0,0,0,.178,1.3c0,.01.007.019.01.029a5.144,5.144,0,0,0,.18.522c.024.058.053.114.078.172.055.123.113.246.178.366.033.06.068.119.1.178.068.116.141.232.219.344q.056.082.116.163c.086.117.178.231.273.344a9.5,9.5,0,0,0,6.534,3.007q.442.033.9.034t.9-.034a9.5,9.5,0,0,0,6.525-3q.152-.177.288-.361c.036-.049.071-.1.1-.148m-6.368,1.462a1.989,1.989,0,0,1-1.43.483,1.878,1.878,0,0,1-1.481-.547.172.172,0,0,1,.143-.269h2.615a.2.2,0,0,1,.153.332"
                      transform="translate(-6.239 -2.355)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11217"
                      data-name="Path 11217"
                      d="M47.554,12.613a.184.184,0,0,0-.184.184v3.856a.184.184,0,0,0,.184.184.49.49,0,0,0,.533-.426V13.039a.49.49,0,0,0-.533-.426"
                      transform="translate(-21.62 -5.757)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11218"
                      data-name="Path 11218"
                      d="M45.526,12.194a.552.552,0,0,0-.552-.552h-.539c.009.025.018.05.026.075.02.062.038.124.055.186s.03.1.043.154.03.128.045.191.023.1.033.148c.013.067.023.135.034.2.007.046.016.092.022.138.01.075.016.149.023.224,0,.038.008.076.011.114.008.113.012.225.012.336a4.846,4.846,0,0,1-.178,1.3,5.053,5.053,0,0,1-.192.556c-.021.05-.045.1-.067.148-.059.132-.121.263-.19.391-.03.054-.062.108-.093.161-.072.123-.149.245-.231.364-.034.049-.069.1-.1.147-.09.123-.186.243-.287.361-.023.027-.042.055-.065.081h1.507c.3,0,.69-.247.69-.552V12.194Z"
                      transform="translate(-19.776 -5.313)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11219"
                      data-name="Path 11219"
                      d="M44.4,19.6c-.072.123-.149.245-.231.364.082-.119.159-.24.231-.364"
                      transform="translate(-20.159 -8.946)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11220"
                      data-name="Path 11220"
                      d="M44.955,18.586c-.059.132-.121.263-.191.391.07-.128.132-.259.191-.391"
                      transform="translate(-20.431 -8.483)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11221"
                      data-name="Path 11221"
                      d="M45.331,11.717c.02.062.037.124.055.185s.03.1.043.154.03.128.045.192.023.1.033.148c.013.067.023.134.034.2.008.046.016.092.022.138.01.074.016.149.023.224,0,.038.009.076.011.114.008.112.011.225.011.336a4.851,4.851,0,0,1-.178,1.3,5.132,5.132,0,0,1-.192.556,5.018,5.018,0,0,0,.192-.556,4.852,4.852,0,0,0,.178-1.3c0-.111,0-.224-.012-.336,0-.038-.008-.076-.011-.114-.007-.074-.013-.149-.023-.224-.006-.046-.015-.092-.022-.138-.011-.067-.021-.134-.034-.2-.009-.049-.022-.1-.033-.148s-.028-.128-.045-.192-.029-.1-.043-.154-.035-.123-.054-.185c-.008-.025-.017-.051-.026-.076l.026.076"
                      transform="translate(-20.647 -5.313)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11222"
                      data-name="Path 11222"
                      d="M43.447,20.9c.1-.118.2-.238.288-.361-.091.123-.187.244-.288.361"
                      transform="translate(-19.829 -9.375)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11223"
                      data-name="Path 11223"
                      d="M11.432,12.613a.49.49,0,0,0-.533.426v3.372a.49.49,0,0,0,.533.426.185.185,0,0,0,.184-.184V12.8a.185.185,0,0,0-.184-.184"
                      transform="translate(-4.974 -5.757)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11224"
                      data-name="Path 11224"
                      d="M13.954,16.324c-.078-.113-.15-.228-.219-.344-.035-.059-.071-.118-.1-.178-.065-.12-.123-.243-.178-.366-.026-.058-.054-.114-.078-.172a5.145,5.145,0,0,1-.18-.522c0-.01-.008-.019-.01-.029a4.845,4.845,0,0,1-.178-1.3q0-.167.011-.336c0-.038.008-.076.011-.114.007-.074.013-.149.023-.224.006-.046.015-.092.022-.138.01-.067.021-.134.034-.2.01-.049.022-.1.033-.148s.028-.128.045-.191.029-.1.043-.154.035-.124.055-.186l.026-.076h-.539a.552.552,0,0,0-.552.552V16.37c0,.3.384.552.689.552h1.507c-.026-.029-.047-.061-.073-.092-.1-.113-.187-.227-.273-.344-.04-.054-.078-.108-.116-.163"
                      transform="translate(-5.577 -5.313)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11225"
                      data-name="Path 11225"
                      d="M15.008,19.622c.068.116.141.231.219.344-.078-.113-.15-.228-.219-.344"
                      transform="translate(-6.85 -8.956)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11226"
                      data-name="Path 11226"
                      d="M14.014,17.344a4.965,4.965,0,0,0,.18.521,4.965,4.965,0,0,1-.18-.521"
                      transform="translate(-6.396 -7.916)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11227"
                      data-name="Path 11227"
                      d="M14.49,18.62c.055.123.113.246.178.366-.065-.12-.123-.243-.178-.366"
                      transform="translate(-6.613 -8.498)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11228"
                      data-name="Path 11228"
                      d="M15.9,20.9c-.1-.113-.187-.227-.273-.344.086.117.177.231.273.344"
                      transform="translate(-7.131 -9.381)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11229"
                      data-name="Path 11229"
                      d="M18.517,11.789c-.113.065-.222.131-.326.2l-.142.1q-.143.1-.272.208c-.045.037-.089.074-.132.112-.079.071-.153.143-.223.217-.039.041-.078.082-.115.123-.064.074-.121.15-.176.227-.032.043-.064.086-.092.131a2.507,2.507,0,0,0-.132.242c-.021.043-.046.086-.065.13a2.173,2.173,0,0,0-.089.274c-.01.038-.025.074-.033.112a1.96,1.96,0,0,0-.042.4c0,.045,0,.09,0,.135A1.768,1.768,0,0,0,18.465,16H29.151A1.768,1.768,0,0,0,30.934,14.4c0-.045,0-.09,0-.135,0-.01,0-.021,0-.032a1.985,1.985,0,0,0-.039-.364c-.009-.046-.027-.09-.04-.136a2.09,2.09,0,0,0-.08-.25c-.021-.049-.048-.1-.072-.146-.038-.076-.077-.152-.123-.227-.03-.048-.066-.1-.1-.142-.052-.072-.107-.144-.167-.214-.039-.045-.082-.089-.124-.133-.067-.07-.138-.139-.213-.207q-.068-.061-.142-.121-.124-.1-.26-.2c-.051-.036-.1-.072-.154-.107-.1-.066-.2-.129-.313-.192-.053-.03-.1-.061-.158-.09-.119-.064-.244-.126-.372-.185q-.263-.123-.549-.233c-.272-.1-.555-.2-.855-.284l-.047-.012c-.29-.079-.594-.146-.906-.2-.055-.011-.11-.022-.166-.032q-.475-.082-.978-.129l-.2-.016c-.35-.028-.7-.046-1.068-.046h0c-.365,0-.72.018-1.07.046-.066,0-.133.009-.2.016-.336.031-.664.074-.981.129-.055.009-.108.021-.161.03-.315.059-.622.127-.915.207l-.04.01c-.3.084-.587.182-.86.286q-.278.106-.534.226c-.133.063-.264.126-.387.193-.05.027-.1.055-.146.083m8.684.739a1.04,1.04,0,0,1,.307-.054,1.024,1.024,0,1,1-.307.054m-7.364,0a1.024,1.024,0,0,1,.737,1.91,1.024,1.024,0,1,1-.737-1.91"
                      transform="translate(-7.612 -4.821)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11230"
                      data-name="Path 11230"
                      d="M30.863,10.609c-.35-.027-.7-.046-1.068-.046.364,0,.719.019,1.068.046"
                      transform="translate(-13.599 -4.821)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11231"
                      data-name="Path 11231"
                      d="M22.023,11.655c.274-.1.559-.2.861-.286-.3.084-.587.181-.861.286"
                      transform="translate(-10.051 -5.189)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11232"
                      data-name="Path 11232"
                      d="M35.139,11.176c-.29-.079-.594-.146-.905-.2.311.058.615.125.905.2"
                      transform="translate(-15.625 -5.008)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11233"
                      data-name="Path 11233"
                      d="M33.107,10.806q-.475-.082-.978-.129.5.047.978.129"
                      transform="translate(-14.664 -4.873)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11234"
                      data-name="Path 11234"
                      d="M27.827,10.609c.35-.027.705-.046,1.07-.046h0c-.364,0-.72.019-1.069.046"
                      transform="translate(-12.7 -4.821)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11235"
                      data-name="Path 11235"
                      d="M24.593,10.971c-.315.059-.622.126-.915.207.293-.08.6-.148.915-.207"
                      transform="translate(-10.807 -5.007)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11236"
                      data-name="Path 11236"
                      d="M26.639,10.677c-.336.032-.664.074-.981.129.317-.055.645-.1.981-.129"
                      transform="translate(-11.71 -4.873)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11237"
                      data-name="Path 11237"
                      d="M36.842,11.654c-.272-.1-.555-.2-.855-.284.3.084.583.18.855.284"
                      transform="translate(-16.425 -5.189)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11238"
                      data-name="Path 11238"
                      d="M20.716,12.311c-.133.062-.263.126-.388.193.124-.067.254-.131.388-.193"
                      transform="translate(-9.278 -5.619)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11239"
                      data-name="Path 11239"
                      d="M17.51,14.81c.055-.077.112-.153.177-.227-.065.074-.122.15-.177.227"
                      transform="translate(-7.992 -6.656)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11240"
                      data-name="Path 11240"
                      d="M39.543,12.827c.108.063.213.126.313.192-.1-.066-.2-.129-.313-.192"
                      transform="translate(-18.048 -5.854)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11241"
                      data-name="Path 11241"
                      d="M38.568,12.32c.128.06.253.121.372.185-.119-.065-.244-.126-.372-.185"
                      transform="translate(-17.603 -5.623)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11242"
                      data-name="Path 11242"
                      d="M19.461,13.019c.1-.069.213-.135.326-.2-.113.065-.222.131-.326.2"
                      transform="translate(-8.882 -5.851)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11243"
                      data-name="Path 11243"
                      d="M40.4,13.377q.136.1.261.2c-.083-.068-.17-.134-.261-.2"
                      transform="translate(-18.439 -6.105)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11244"
                      data-name="Path 11244"
                      d="M18.045,14.174c.07-.073.144-.146.223-.216-.079.071-.153.143-.223.216"
                      transform="translate(-8.236 -6.371)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11245"
                      data-name="Path 11245"
                      d="M18.7,13.576c.086-.071.177-.14.272-.208-.1.068-.186.137-.272.208"
                      transform="translate(-8.534 -6.101)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11246"
                      data-name="Path 11246"
                      d="M42.612,15.932a2,2,0,0,1,.08.25,2,2,0,0,0-.08-.25"
                      transform="translate(-19.448 -7.271)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11247"
                      data-name="Path 11247"
                      d="M42.252,15.247a2.485,2.485,0,0,1,.123.227,2.559,2.559,0,0,0-.123-.227"
                      transform="translate(-19.284 -6.959)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11248"
                      data-name="Path 11248"
                      d="M42.835,16.641a1.938,1.938,0,0,1,.039.364,1.938,1.938,0,0,0-.039-.364"
                      transform="translate(-19.55 -7.595)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11249"
                      data-name="Path 11249"
                      d="M16.816,16.2a2.089,2.089,0,0,1,.089-.274,2.089,2.089,0,0,0-.089.274"
                      transform="translate(-7.675 -7.268)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11250"
                      data-name="Path 11250"
                      d="M16.682,17.168c0-.045,0-.09,0-.134a1.962,1.962,0,0,1,.043-.4,1.962,1.962,0,0,0-.043.4c0,.045,0,.09,0,.134a1.769,1.769,0,0,0,1.784,1.608,1.768,1.768,0,0,1-1.783-1.608"
                      transform="translate(-7.611 -7.592)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11251"
                      data-name="Path 11251"
                      d="M17.1,15.482a2.515,2.515,0,0,1,.132-.242,2.515,2.515,0,0,0-.132.242"
                      transform="translate(-7.804 -6.956)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11252"
                      data-name="Path 11252"
                      d="M41.141,13.965c.076.067.146.136.213.207-.067-.07-.137-.139-.213-.207"
                      transform="translate(-18.777 -6.374)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11253"
                      data-name="Path 11253"
                      d="M41.76,14.59c.061.07.115.142.167.214-.052-.072-.106-.144-.167-.214"
                      transform="translate(-19.06 -6.659)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11254"
                      data-name="Path 11254"
                      d="M29.831,22.349H27.216a.172.172,0,0,0-.143.269,1.88,1.88,0,0,0,1.481.547,1.988,1.988,0,0,0,1.43-.483.2.2,0,0,0-.153-.332"
                      transform="translate(-12.342 -10.2)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11255"
                      data-name="Path 11255"
                      d="M22.263,16.126a1.024,1.024,0,0,0-.048-2.048,1,1,0,0,0-.306.054,1.024,1.024,0,0,0,.354,1.993"
                      transform="translate(-9.682 -6.425)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11256"
                      data-name="Path 11256"
                      d="M35.809,16.126a1.024,1.024,0,1,0-.048-2.048,1,1,0,0,0-.306.054,1.024,1.024,0,0,0,.354,1.993"
                      transform="translate(-15.865 -6.425)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11257"
                      data-name="Path 11257"
                      d="M29.57,37.291c-.84-1.719-1.991-4.074-6.43-4.076h-.007c-4.44,0-5.59,2.356-6.431,4.076-.513,1.05-.828,1.612-1.5,1.782l.447,1.656a4.265,4.265,0,0,0,2.594-2.686c.783-1.6,1.522-3.114,4.895-3.115s4.112,1.513,4.894,3.115a4.266,4.266,0,0,0,2.593,2.686l.445-1.659c-.674-.172-.988-.734-1.5-1.78"
                      transform="translate(-6.938 -15.16)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11258"
                      data-name="Path 11258"
                      d="M31.309,55.324a.482.482,0,0,0-.482.482.476.476,0,0,0,.417.469v1.2l.129-.007v-1.19a.476.476,0,0,0,.417-.469.482.482,0,0,0-.482-.482"
                      transform="translate(-14.07 -25.25)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11259"
                      data-name="Path 11259"
                      d="M27.472,52.705a.482.482,0,0,0-.482.482.476.476,0,0,0,.417.469v2.614l.129.007V53.655a.476.476,0,0,0,.417-.469.482.482,0,0,0-.482-.482"
                      transform="translate(-12.318 -24.055)"
                      fill="#0083c1"
                    />
                    <path
                      id="Path_11260"
                      data-name="Path 11260"
                      d="M29.39,49.78a.482.482,0,0,0-.482.482.476.476,0,0,0,.417.469v4.232h.129V50.73a.476.476,0,0,0,.417-.469.482.482,0,0,0-.482-.482"
                      transform="translate(-13.194 -22.72)"
                      fill="#0083c1"
                    />
                  </g>

                  <g
                    id="Group_3826"
                    data-name="Group 3826"
                    transform="translate(366.085 147.935)"
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <path
                      id="Path_11134"
                      data-name="Path 11134"
                      d="M12.64,116.5l-.11,1.51a16.623,16.623,0,0,1,3.671-.2h.009l.076-1.27a3.04,3.04,0,0,1-.752.066Z"
                      transform="translate(-5.719 -53.173)"
                      fill="#666"
                    />
                    <path
                      id="Path_11135"
                      data-name="Path 11135"
                      d="M17.193,92.832l-1.087-.07a1.109,1.109,0,0,0-1.239.89l-.157,1.727a1.039,1.039,0,0,0,1.064,1.037l1.087.069A1.109,1.109,0,0,0,18.1,95.6l.157-1.726a1.039,1.039,0,0,0-1.064-1.037"
                      transform="translate(-6.712 -42.336)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11136"
                      data-name="Path 11136"
                      d="M3.321,126.449c0,.161.217.329.412.447a1.159,1.159,0,0,0,.6.16l7.636,0a1.181,1.181,0,0,0,.623-.174c.188-.117.387-.278.387-.432v-.194H3.321Z"
                      transform="translate(-1.516 -57.625)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11137"
                      data-name="Path 11137"
                      d="M12.007,118.906H12a16.625,16.625,0,0,0-3.671.2A6.45,6.45,0,0,0,3.4,122.514a.734.734,0,0,0-.081.338v.041h9.656v-3.121a.949.949,0,0,0-.97-.865"
                      transform="translate(-1.516 -54.259)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11138"
                      data-name="Path 11138"
                      d="M43.9,118.015l-.11-1.51-2.894.11a3.017,3.017,0,0,1-.752-.065l.076,1.27h.009a16.626,16.626,0,0,1,3.671.2"
                      transform="translate(-18.324 -53.173)"
                      fill="#666"
                    />
                    <path
                      id="Path_11139"
                      data-name="Path 11139"
                      d="M16.922,79.726l-.018-.008-2.166-1.006a1.954,1.954,0,0,0-1.1-.148,1.282,1.282,0,0,0-1.17.921L9.608,98.03c-.09.584.529,1.1,1.355,1.135l.34.013,2.894.11a2.993,2.993,0,0,0,.752-.066c.753-.162,1.312-.605,1.352-1.149l1.295-17.4a1.012,1.012,0,0,0-.673-.946m-1.153,9.38a1.109,1.109,0,0,1-1.239.89l-1.087-.07a1.038,1.038,0,0,1-1.064-1.037l.157-1.726a1.109,1.109,0,0,1,1.239-.89l1.087.07a1.039,1.039,0,0,1,1.064,1.037Z"
                      transform="translate(-4.381 -35.847)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11140"
                      data-name="Path 11140"
                      d="M43.265,98.03,40.409,79.485a1.282,1.282,0,0,0-1.17-.921,1.954,1.954,0,0,0-1.1.148l-2.166,1.006-.018.008a1.012,1.012,0,0,0-.673.946l1.295,17.4c.04.544.6.987,1.352,1.149a2.993,2.993,0,0,0,.752.066l2.894-.11.34-.013c.826-.032,1.445-.551,1.355-1.135M37.1,89.106l-.157-1.726a1.039,1.039,0,0,1,1.064-1.037l1.087-.07a1.109,1.109,0,0,1,1.239.89l.157,1.726a1.038,1.038,0,0,1-1.064,1.037L38.344,90a1.109,1.109,0,0,1-1.239-.89"
                      transform="translate(-16.1 -35.847)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11141"
                      data-name="Path 11141"
                      d="M40.831,96.417a1.039,1.039,0,0,0,1.064-1.037l-.157-1.726a1.109,1.109,0,0,0-1.239-.89l-1.087.069a1.039,1.039,0,0,0-1.064,1.037L38.5,95.6a1.109,1.109,0,0,0,1.239.89Z"
                      transform="translate(-17.5 -42.336)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11142"
                      data-name="Path 11142"
                      d="M38.5,126.452c0,.154.2.315.387.432a1.181,1.181,0,0,0,.623.174l7.636,0a1.156,1.156,0,0,0,.6-.16c.195-.118.412-.286.412-.447v-.191H38.5Z"
                      transform="translate(-17.573 -57.625)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11143"
                      data-name="Path 11143"
                      d="M48.079,122.514a6.449,6.449,0,0,0-4.924-3.414,16.625,16.625,0,0,0-3.671-.2h-.009a.949.949,0,0,0-.97.865v3.121H48.16v-.041a.734.734,0,0,0-.082-.338"
                      transform="translate(-17.573 -54.259)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11144"
                      data-name="Path 11144"
                      d="M20.5,57.917l.17,2.068h9.76l.17-2.069a17.175,17.175,0,0,1-10.1,0"
                      transform="translate(-9.359 -26.433)"
                      fill="#666"
                    />
                    <path
                      id="Path_11145"
                      data-name="Path 11145"
                      d="M17.023,72.736a1.949,1.949,0,0,1,1.1.148l2.166,1.006.489-4.931-2.988-3.187Z"
                      transform="translate(-7.769 -30.018)"
                      fill="#666"
                    />
                    <path
                      id="Path_11146"
                      data-name="Path 11146"
                      d="M38.638,65.771,35.65,68.959l.49,4.931,2.166-1.006a1.954,1.954,0,0,1,1.1-.148Z"
                      transform="translate(-16.271 -30.018)"
                      fill="#666"
                    />
                    <path
                      id="Path_11147"
                      data-name="Path 11147"
                      d="M30.832,62.679l-.044-.149a1.21,1.21,0,0,0-1.188-.808H18.7a1.21,1.21,0,0,0-1.188.808l-.044.149a.981.981,0,0,0,.241.957l.269.287,2.988,3.188.906.967a2.961,2.961,0,0,0,2.236.67h.083a2.962,2.962,0,0,0,2.236-.67l.906-.967,2.988-3.188.269-.287a.981.981,0,0,0,.241-.957"
                      transform="translate(-7.955 -28.17)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11148"
                      data-name="Path 11148"
                      d="M28.575,28.179H28.6a6.6,6.6,0,0,0,1.43-.147V26.618c-.179.022-.36.041-.544.055q-.442.033-.9.033t-.9-.033c-.183-.014-.364-.033-.544-.055v1.414a6.6,6.6,0,0,0,1.43.147Z"
                      transform="translate(-12.389 -12.149)"
                      fill="#666"
                    />
                    <path
                      id="Path_11149"
                      data-name="Path 11149"
                      d="M31.916,33.4v0c-.512-.913-7.242-4.665-8.346-4.961a8.26,8.26,0,0,0-3.53.379,6.631,6.631,0,0,1-1.43.147h-.02a6.626,6.626,0,0,1-1.43-.147,8.271,8.271,0,0,0-3.531-.379c-1.1.3-7.835,4.048-8.347,4.961a.142.142,0,0,0,.093.2L10.2,35.118l0,0,2.342,8.669a2.951,2.951,0,0,0,1.008.628,17.177,17.177,0,0,0,10.1,0,2.892,2.892,0,0,0,1.029-.651L27,35.123l0,0,4.828-1.513a.14.14,0,0,0,.093-.2"
                      transform="translate(-2.402 -12.936)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11150"
                      data-name="Path 11150"
                      d="M52.118,78.034l.2-.55a.41.41,0,0,1,.48-.236l.654.147a.387.387,0,0,1,.269.2l1.217,2.55a.422.422,0,0,0,.644.118.308.308,0,0,0,.1-.252L55.5,76.983a.326.326,0,0,0-.083-.2c-.28-.317-1.235-1.4-1.365-1.519a1.537,1.537,0,0,0-1.107-.369l-.041,0-.939.1c-.547.026-.959.41-.9.841l-.047,1.9a.3.3,0,0,0,0,.058c.077.5.384.653.893.439a.365.365,0,0,0,.2-.21"
                      transform="translate(-23.284 -34.183)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11151"
                      data-name="Path 11151"
                      d="M52.1,74.04l.939-.1.041,0a1.748,1.748,0,0,1,.637.092l-.128-1.244-1.954.092a2.489,2.489,0,0,1-.326-.007l.146,1.416a1.078,1.078,0,0,1,.645-.241"
                      transform="translate(-23.417 -33.217)"
                      fill="#666"
                    />
                    <path
                      id="Path_11152"
                      data-name="Path 11152"
                      d="M47.892,39.39l.467,4.515,1.6-.694a1.563,1.563,0,0,1,.611-.123l-.454-4.394Z"
                      transform="translate(-21.858 -17.66)"
                      fill="#666"
                    />
                    <path
                      id="Path_11153"
                      data-name="Path 11153"
                      d="M49.877,46.9l-1.644.715a.727.727,0,0,0-.515.654l.724,11.92c.029.489.725.853,1.553.814l2.415-.114c.616-.029,1.086-.39,1.027-.79L51.563,47.41c-.079-.537-.991-.813-1.686-.51"
                      transform="translate(-21.779 -21.348)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11154"
                      data-name="Path 11154"
                      d="M4.9,46.9l1.644.715a.727.727,0,0,1,.515.654L6.34,60.188c-.029.489-.725.853-1.553.814l-2.415-.114c-.616-.029-1.086-.39-1.027-.79L3.219,47.41c.079-.537.991-.813,1.686-.51"
                      transform="translate(-0.612 -21.348)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11155"
                      data-name="Path 11155"
                      d="M7.228,38.694l-.454,4.394a1.563,1.563,0,0,1,.611.123l1.6.695L9.45,39.39Z"
                      transform="translate(-3.092 -17.66)"
                      fill="#666"
                    />
                    <path
                      id="Path_11156"
                      data-name="Path 11156"
                      d="M3.558,78.034l-.2-.55a.41.41,0,0,0-.48-.236l-.654.147a.387.387,0,0,0-.269.2L.743,80.15a.422.422,0,0,1-.644.118.308.308,0,0,1-.1-.252l.174-3.033a.326.326,0,0,1,.083-.2c.28-.317,1.235-1.4,1.365-1.519A1.537,1.537,0,0,1,2.73,74.9l.041,0,.939.1c.547.026.959.41.9.841l.047,1.9a.3.3,0,0,1,0,.058c-.077.5-.384.653-.893.439a.365.365,0,0,1-.2-.21"
                      transform="translate(0 -34.183)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11157"
                      data-name="Path 11157"
                      d="M4.488,73.932l.041,0,.939.1a1.075,1.075,0,0,1,.645.241l.146-1.416a2.493,2.493,0,0,1-.326.006L3.978,72.78,3.85,74.024a1.763,1.763,0,0,1,.638-.092"
                      transform="translate(-1.757 -33.217)"
                      fill="#666"
                    />
                    <path
                      id="Path_11158"
                      data-name="Path 11158"
                      d="M29.57,37.291c-.84-1.719-1.991-4.074-6.43-4.076h-.007c-4.44,0-5.59,2.356-6.431,4.076-.513,1.05-.828,1.612-1.5,1.782l.447,1.656a4.265,4.265,0,0,0,2.594-2.686c.783-1.6,1.522-3.114,4.895-3.115s4.112,1.513,4.894,3.115a4.266,4.266,0,0,0,2.593,2.686l.445-1.659c-.674-.172-.988-.734-1.5-1.78"
                      transform="translate(-6.938 -15.16)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11159"
                      data-name="Path 11159"
                      d="M31.309,55.324a.482.482,0,0,0-.482.482.476.476,0,0,0,.417.469v1.2l.129-.007v-1.19a.476.476,0,0,0,.417-.469.482.482,0,0,0-.482-.482"
                      transform="translate(-14.07 -25.25)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11160"
                      data-name="Path 11160"
                      d="M27.472,52.705a.482.482,0,0,0-.482.482.476.476,0,0,0,.417.469v2.614l.129.007V53.655a.476.476,0,0,0,.417-.469.482.482,0,0,0-.482-.482"
                      transform="translate(-12.318 -24.055)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11161"
                      data-name="Path 11161"
                      d="M29.39,49.78a.482.482,0,0,0-.482.482.476.476,0,0,0,.417.469v4.232h.129V50.73a.476.476,0,0,0,.417-.469.482.482,0,0,0-.482-.482"
                      transform="translate(-13.194 -22.72)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11162"
                      data-name="Path 11162"
                      d="M28.378,4.5a3.485,3.485,0,0,1,1.543.363l.463-1.28.27-.749a.892.892,0,0,0-.3-1.009A8.535,8.535,0,0,0,25.16,0c-.045,0-.09,0-.135,0s-.091,0-.135,0a8.533,8.533,0,0,0-5.2,1.82.892.892,0,0,0-.3,1.009l.271.749.462,1.28A3.485,3.485,0,0,1,21.672,4.5Z"
                      transform="translate(-8.828 0)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11163"
                      data-name="Path 11163"
                      d="M47.554,16.838a.49.49,0,0,0,.533-.426V13.039a.49.49,0,0,0-.533-.426.184.184,0,0,0-.184.184v3.856a.184.184,0,0,0,.184.184"
                      transform="translate(-21.62 -5.757)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11164"
                      data-name="Path 11164"
                      d="M44.558,12.057c.016.064.03.128.045.191s.023.1.033.148c.014.067.023.135.034.2.007.046.016.092.022.138.01.075.017.149.023.225,0,.038.009.076.011.114.008.113.012.225.012.336a4.852,4.852,0,0,1-.178,1.3,5.035,5.035,0,0,1-.191.553c-.022.054-.048.107-.072.16-.057.128-.117.254-.184.378-.032.058-.065.114-.1.17-.071.12-.145.238-.225.353-.036.052-.073.1-.111.155-.088.12-.182.237-.28.352-.024.028-.044.059-.069.087h1.507c.3,0,.69-.247.69-.552V12.194a.552.552,0,0,0-.552-.552h-.539c.009.025.018.05.026.076.02.061.037.123.054.185s.03.1.043.154"
                      transform="translate(-19.775 -5.313)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11165"
                      data-name="Path 11165"
                      d="M11.433,12.613a.49.49,0,0,0-.533.426v3.372a.49.49,0,0,0,.533.426.184.184,0,0,0,.184-.184V12.8a.184.184,0,0,0-.184-.184"
                      transform="translate(-4.975 -5.757)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11166"
                      data-name="Path 11166"
                      d="M13.956,16.328c-.08-.116-.154-.234-.225-.354-.033-.056-.067-.112-.1-.169-.067-.124-.128-.251-.184-.379-.024-.054-.051-.106-.073-.16a5.042,5.042,0,0,1-.191-.553,4.918,4.918,0,0,1-.133-.641,4.837,4.837,0,0,1-.045-.66q0-.167.011-.336c0-.038.008-.076.011-.114.007-.074.014-.149.023-.224,0-.025.008-.05.012-.075l.01-.063c.011-.067.021-.135.034-.2.007-.038.016-.074.025-.112,0-.012,0-.024.008-.036.015-.064.028-.128.045-.191h0c.014-.051.029-.1.043-.154s.035-.124.055-.186l.026-.076h-.539a.552.552,0,0,0-.552.552V16.37c0,.3.384.552.689.552h1.507c-.024-.028-.045-.058-.069-.086-.1-.115-.192-.233-.28-.353-.038-.051-.074-.1-.11-.155"
                      transform="translate(-5.577 -5.313)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11167"
                      data-name="Path 11167"
                      d="M23.331,16.879a9.5,9.5,0,0,0,6.529-3c.1-.115.192-.233.28-.352.038-.052.074-.1.111-.156.079-.115.154-.233.224-.353.033-.057.067-.113.1-.17.067-.124.127-.251.184-.379.024-.053.051-.106.073-.16a5.044,5.044,0,0,0,.191-.553,4.846,4.846,0,0,0,.178-1.3c0-.111,0-.223-.012-.336,0-.038-.008-.076-.011-.114-.007-.074-.014-.149-.023-.224-.006-.046-.015-.092-.022-.138-.011-.067-.021-.134-.034-.2-.01-.049-.022-.1-.033-.148s-.028-.128-.045-.191-.029-.1-.043-.154-.035-.124-.055-.186-.035-.1-.053-.157-.042-.121-.065-.181-.042-.107-.064-.16-.048-.118-.074-.177-.048-.107-.073-.16-.055-.116-.084-.174-.054-.107-.083-.16-.061-.114-.093-.171-.06-.106-.091-.159-.067-.112-.1-.167l-.1-.157c-.036-.055-.074-.11-.111-.164s-.071-.1-.108-.154-.08-.108-.121-.162-.076-.1-.115-.149-.088-.107-.132-.16-.079-.1-.12-.143-.1-.107-.144-.16-.082-.091-.123-.135-.1-.108-.158-.161-.082-.084-.124-.126L28.761,5.4h0c-.084-.081-.169-.161-.257-.24l-.814,2.255a3.521,3.521,0,0,1-1.9,6.488H19.081a3.521,3.521,0,0,1-1.9-6.488L16.364,5.16c-.088.079-.172.159-.257.24h0l-.023.023c-.042.041-.083.084-.125.126s-.105.107-.157.16-.083.091-.124.136-.1.106-.143.159l-.12.144c-.045.053-.089.107-.132.16s-.077.1-.114.149-.082.108-.121.163-.072.1-.108.153-.075.11-.111.165l-.1.157c-.035.055-.068.111-.1.167s-.062.105-.092.159-.063.114-.093.171-.056.106-.083.16-.057.116-.084.174-.05.107-.073.16-.051.118-.074.177-.043.107-.064.16S14.02,8.541,14,8.6l-.028.082c-.009.025-.018.05-.026.075-.02.062-.038.124-.055.186s-.03.1-.043.154-.03.128-.045.192c0,.012,0,.024-.008.036-.008.038-.017.075-.024.112-.013.067-.023.135-.034.2l-.01.064c0,.024-.009.049-.012.074-.01.075-.016.15-.023.225,0,.038-.008.076-.011.114-.008.113-.012.225-.012.336a4.831,4.831,0,0,0,.046.66,4.9,4.9,0,0,0,.133.641,5.042,5.042,0,0,0,.191.553c.022.054.049.107.072.16.058.128.117.255.185.379.031.057.065.113.1.17.071.12.145.238.225.354.036.052.072.1.11.155.088.12.182.238.28.353a9.5,9.5,0,0,0,6.53,3q.442.033.9.033t.9-.033h0m-2.362-2.107a.172.172,0,0,1,.143-.269h2.615a.2.2,0,0,1,.153.332,1.988,1.988,0,0,1-1.43.483,1.879,1.879,0,0,1-1.481-.547"
                      transform="translate(-6.238 -2.355)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11168"
                      data-name="Path 11168"
                      d="M44.768,18.982c.067-.124.127-.251.184-.379-.057.128-.117.255-.184.379"
                      transform="translate(-20.432 -8.491)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11169"
                      data-name="Path 11169"
                      d="M45.241,17.844a5.279,5.279,0,0,0,.191-.553,5.157,5.157,0,0,1-.191.553"
                      transform="translate(-20.648 -7.892)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11170"
                      data-name="Path 11170"
                      d="M45.672,12.758c.011.049.023.1.033.148.014.067.023.134.034.2-.011-.067-.021-.134-.034-.2-.01-.049-.022-.1-.033-.148"
                      transform="translate(-20.845 -5.823)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11171"
                      data-name="Path 11171"
                      d="M44.174,19.965c.08-.116.154-.234.225-.353-.071.12-.145.238-.225.353"
                      transform="translate(-20.161 -8.951)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11172"
                      data-name="Path 11172"
                      d="M43.455,20.9c.1-.115.192-.232.28-.352-.088.12-.182.237-.28.352"
                      transform="translate(-19.833 -9.379)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11173"
                      data-name="Path 11173"
                      d="M14.041,11.9c-.015.051-.03.1-.043.154h0c.014-.051.029-.1.043-.154s.035-.123.055-.185l.026-.076-.026.076c-.02.062-.038.124-.055.186"
                      transform="translate(-6.389 -5.313)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11174"
                      data-name="Path 11174"
                      d="M15.9,20.9q-.148-.173-.28-.353.133.18.28.353"
                      transform="translate(-7.128 -9.378)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11175"
                      data-name="Path 11175"
                      d="M14,17.291a5.082,5.082,0,0,0,.191.553A5.082,5.082,0,0,1,14,17.291"
                      transform="translate(-6.388 -7.892)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11176"
                      data-name="Path 11176"
                      d="M14.482,18.6c.057.128.117.255.184.379-.067-.124-.127-.252-.184-.379"
                      transform="translate(-6.61 -8.491)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11177"
                      data-name="Path 11177"
                      d="M13.785,13.139c0,.021-.007.042-.01.063,0-.021.007-.042.01-.064.011-.067.021-.134.034-.2.007-.037.016-.074.024-.112-.009.038-.017.075-.025.112-.013.067-.023.135-.034.2"
                      transform="translate(-6.287 -5.853)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11178"
                      data-name="Path 11178"
                      d="M15,19.611c.07.12.145.238.225.354-.08-.116-.154-.234-.225-.354"
                      transform="translate(-6.847 -8.951)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11179"
                      data-name="Path 11179"
                      d="M29.273,8.834a3.573,3.573,0,0,0-1.9-.564H20.665a3.582,3.582,0,0,0-1.9.564,3.522,3.522,0,0,0,1.9,6.488h6.706a3.522,3.522,0,0,0,1.9-6.488m-8.527,3.843a1.024,1.024,0,1,1,.618-.964,1.027,1.027,0,0,1-.618.964m7.357,0a1.024,1.024,0,1,1,.618-.964,1.027,1.027,0,0,1-.618.964"
                      transform="translate(-7.822 -3.774)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11180"
                      data-name="Path 11180"
                      d="M29.831,22.349H27.216a.172.172,0,0,0-.143.269,1.88,1.88,0,0,0,1.481.547,1.988,1.988,0,0,0,1.43-.483.2.2,0,0,0-.153-.332"
                      transform="translate(-12.342 -10.2)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11181"
                      data-name="Path 11181"
                      d="M22.192,14.812a1.024,1.024,0,0,0-.048-2.048,1,1,0,0,0-.306.054,1.024,1.024,0,0,0,.354,1.993"
                      transform="translate(-9.65 -5.826)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11182"
                      data-name="Path 11182"
                      d="M35.726,14.812a1.024,1.024,0,0,0-.048-2.048,1,1,0,0,0-.306.054,1.024,1.024,0,0,0,.354,1.993"
                      transform="translate(-15.827 -5.826)"
                      fill="#fff"
                    />
                    <path
                      id="Path_11183"
                      data-name="Path 11183"
                      d="M21.335,44.09h.925c.183,0,.292.113.292.325s-.1.336-.292.336h-.7v.366h.56l.439.545h.548l-.54-.6a.757.757,0,0,0-.308-1.4h-1.31v2h.384Z"
                      transform="translate(-9.562 -19.927)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11184"
                      data-name="Path 11184"
                      d="M26.248,45.663h.446a.941.941,0,0,0,.9-1.022.9.9,0,0,0-.9-.981h-.446a.9.9,0,0,0-.89.981.939.939,0,0,0,.89,1.022m0-1.573h.446a.575.575,0,0,1,0,1.143h-.446a.576.576,0,0,1,0-1.143"
                      transform="translate(-11.574 -19.927)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11185"
                      data-name="Path 11185"
                      d="M32.216,45.026a.458.458,0,0,0-.243-.429.425.425,0,0,0,.208-.413c0-.347-.243-.523-.608-.523H30.247v2h1.374a.576.576,0,0,0,.6-.636m-1.582.209V44.087h.888c.166,0,.265.047.265.2,0,.129-.065.193-.206.193h-.724v.339h.751a.191.191,0,0,1,.214.209c0,.146-.107.212-.271.212Z"
                      transform="translate(-13.805 -19.927)"
                      fill="#24a7aa"
                    />
                    <path
                      id="Path_11186"
                      data-name="Path 11186"
                      d="M35.4,44.216l.329.617h-.407l-.176.333h.762l.252.473h.464L35.6,43.748a.194.194,0,0,0-.371,0L34.2,45.639h.439Z"
                      transform="translate(-15.611 -19.904)"
                      fill="#24a7aa"
                    />
                  </g>

                  <g
                    id="Group_3666"
                    data-name="Group 3666"
                    transform="translate(306.085 127.935)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3665" data-name="Group 3665">
                      <g
                        id="Group_3664"
                        data-name="Group 3664"
                        clipPath="url(#clip-path-17)"
                      >
                        <path
                          id="Path_11115"
                          data-name="Path 11115"
                          d="M200.569,128.736c108.474,0,92.4,48.2,200.878,48.2"
                          transform="translate(-200.569 -127.935)"
                          fill="none"
                          stroke="#00b4de"
                          strokeWidth={1.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3669"
                    data-name="Group 3669"
                    transform="translate(306.085 129.538)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3668" data-name="Group 3668">
                      <g
                        id="Group_3667"
                        data-name="Group 3667"
                        clipPath="url(#clip-path-18)"
                      >
                        <path
                          id="Path_11116"
                          data-name="Path 11116"
                          d="M200.569,130.34c108.474,0,92.4,98.519,200.878,98.519"
                          transform="translate(-200.569 -129.538)"
                          fill="none"
                          stroke="#00b4de"
                          strokeWidth={1.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3672"
                    data-name="Group 3672"
                    transform="translate(514.954 150.071)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3671" data-name="Group 3671">
                      <g
                        id="Group_3670"
                        data-name="Group 3670"
                        clipPath="url(#clip-path-19)"
                      >
                        <path
                          id="Path_11117"
                          data-name="Path 11117"
                          d="M337.435,176.932c108.474,0,92.4-26.059,200.878-26.059"
                          transform="translate(-337.435 -150.071)"
                          fill="none"
                          stroke="#00b4de"
                          strokeWidth={1.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3675"
                    data-name="Group 3675"
                    transform="translate(514.954 151.674)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3674" data-name="Group 3674">
                      <g
                        id="Group_3673"
                        data-name="Group 3673"
                        clipPath="url(#clip-path-20)"
                      >
                        <path
                          id="Path_11118"
                          data-name="Path 11118"
                          d="M337.435,228.859c108.474,0,92.4-76.383,200.878-76.383"
                          transform="translate(-337.435 -151.674)"
                          fill="none"
                          stroke="#00b4de"
                          strokeWidth={1.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3678"
                    data-name="Group 3678"
                    transform="translate(723.825 151.674)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3677" data-name="Group 3677">
                      <g
                        id="Group_3676"
                        data-name="Group 3676"
                        clipPath="url(#clip-path-21)"
                      >
                        <path
                          id="Path_11119"
                          data-name="Path 11119"
                          d="M474.3,152.476c108.474,0,92.4,48.326,200.878,48.326"
                          transform="translate(-474.302 -151.674)"
                          fill="none"
                          stroke="#e6ab02"
                          strokeWidth={0.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3681"
                    data-name="Group 3681"
                    transform="translate(1559.307 106.798)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3680" data-name="Group 3680">
                      <g
                        id="Group_3679"
                        data-name="Group 3679"
                        clipPath="url(#clip-path-22)"
                      >
                        <path
                          id="Path_11120"
                          data-name="Path 11120"
                          d="M1021.768,107.6c108.474,0,92.4,43.684,200.878,43.684"
                          transform="translate(-1021.771 -106.798)"
                          fill="none"
                          stroke="#a92e8a"
                          strokeWidth={1.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3684"
                    data-name="Group 3684"
                    transform="translate(932.694 200)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3683" data-name="Group 3683">
                      <g
                        id="Mask_Group_315"
                        data-name="Mask Group 315"
                        clipPath="url(#clip-path-23)"
                      >
                        <path
                          id="Path_11121"
                          data-name="Path 11121"
                          d="M611.168,200.722c108.474,0,92.4,6.065,200.878,6.065"
                          transform="translate(-611.168 -200)"
                          fill="rgba(0,0,0,0)"
                          stroke="#e6ab02"
                          strokeWidth={1.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3687"
                    data-name="Group 3687"
                    transform="translate(1141.565 206.065)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3686" data-name="Group 3686">
                      <g
                        id="Group_3685"
                        data-name="Group 3685"
                        clipPath="url(#clip-path-24)"
                      >
                        <path
                          id="Path_11122"
                          data-name="Path 11122"
                          d="M748.035,206.787c98.061,0,94.342,11.108,173.029,13.246,8.17.222,17.436.347,27.849.347"
                          transform="translate(-748.035 -206.065)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={1.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3690"
                    data-name="Group 3690"
                    transform="translate(1350.434 106.798)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3689" data-name="Group 3689">
                      <g
                        id="Group_3688"
                        data-name="Group 3688"
                        clipPath="url(#clip-path-25)"
                      >
                        <path
                          id="Path_11123"
                          data-name="Path 11123"
                          d="M884.9,220.38c108.474,0,92.4-112.861,200.879-112.861"
                          transform="translate(-884.901 -106.798)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={1.5}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3693"
                    data-name="Group 3693"
                    transform="translate(1350.434 3.889)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3692" data-name="Group 3692">
                      <g
                        id="Group_3691"
                        data-name="Group 3691"
                        clipPath="url(#clip-path-26)"
                      >
                        <path
                          id="Path_11124"
                          data-name="Path 11124"
                          d="M884.9,4.531c108.474,0,92.4,88.475,200.879,88.475"
                          transform="translate(-884.901 -3.889)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={1.3}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3696"
                    data-name="Group 3696"
                    transform="translate(306.085 3.889)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3695" data-name="Group 3695">
                      <g
                        id="Group_3694"
                        data-name="Group 3694"
                        clipPath="url(#clip-path-27)"
                      >
                        <path
                          id="Path_11125"
                          data-name="Path 11125"
                          d="M200.569,46.611C760.2,46.611,677.293,4.29,1236.927,4.29"
                          transform="translate(-200.569 -3.889)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={0.8}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3699"
                    data-name="Group 3699"
                    transform="translate(97.215 127.935)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3698" data-name="Group 3698">
                      <g
                        id="Group_3697"
                        data-name="Group 3697"
                        clipPath="url(#clip-path-28)"
                      >
                        <path
                          id="Path_11126"
                          data-name="Path 11126"
                          d="M63.7,130.942c108.474,0,92.4-2.606,200.878-2.606"
                          transform="translate(-63.702 -127.935)"
                          fill="none"
                          stroke="#66a61e"
                          strokeWidth={1}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3702"
                    data-name="Group 3702"
                    transform="translate(97.215 128.736)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3701" data-name="Group 3701">
                      <g
                        id="Group_3700"
                        data-name="Group 3700"
                        clipPath="url(#clip-path-29)"
                      >
                        <path
                          id="Path_11127"
                          data-name="Path 11127"
                          d="M63.7,182.067c108.474,0,92.4-52.929,200.878-52.929"
                          transform="translate(-63.702 -128.736)"
                          fill="none"
                          stroke="#66a61e"
                          strokeWidth={0.8}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3705"
                    data-name="Group 3705"
                    transform="translate(1141.565 4.67)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3704" data-name="Group 3704">
                      <g
                        id="Group_3703"
                        data-name="Group 3703"
                        clipPath="url(#clip-path-30)"
                      >
                        <path
                          id="Path_11128"
                          data-name="Path 11128"
                          d="M748.035,146.36c108.474,0,92.4-141.429,200.878-141.429"
                          transform="translate(-748.035 -4.67)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={0.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3708"
                    data-name="Group 3708"
                    transform="translate(1141.565 155.24)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3707" data-name="Group 3707">
                      <g
                        id="Group_3706"
                        data-name="Group 3706"
                        clipPath="url(#clip-path-31)"
                      >
                        <path
                          id="Path_11129"
                          data-name="Path 11129"
                          d="M748.035,155.5c108.474,0,92.4,13.551,200.878,13.551"
                          transform="translate(-748.035 -155.24)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={0.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3711"
                    data-name="Group 3711"
                    transform="translate(1350.434 106.295)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3710" data-name="Group 3710">
                      <g
                        id="Group_3709"
                        data-name="Group 3709"
                        clipPath="url(#clip-path-32)"
                      >
                        <path
                          id="Path_11130"
                          data-name="Path 11130"
                          d="M884.9,169.052c108.474,0,92.4-62.5,200.879-62.5"
                          transform="translate(-884.901 -106.295)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={0.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3714"
                    data-name="Group 3714"
                    transform="translate(932.694 201.262)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3713" data-name="Group 3713">
                      <g
                        id="Group_3712"
                        data-name="Group 3712"
                        clipPath="url(#clip-path-33)"
                      >
                        <path
                          id="Path_11131"
                          data-name="Path 11131"
                          d="M611.168,201.524c68.773,0,87.484,22.665,119.777,39.342,18.381,9.492,41.4,17.046,81.1,17.046"
                          transform="translate(-611.168 -201.262)"
                          fill="rgba(0,0,0,0)"
                          stroke="#e6ab02"
                          strokeWidth={0.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3717"
                    data-name="Group 3717"
                    transform="translate(1141.565 257.65)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3716" data-name="Group 3716">
                      <g
                        id="Group_3715"
                        data-name="Group 3715"
                        clipPath="url(#clip-path-34)"
                      >
                        <path
                          id="Path_11132"
                          data-name="Path 11132"
                          d="M748.035,257.912c108.474,0,92.4,13.593,200.878,13.593"
                          transform="translate(-748.035 -257.65)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={0.6}
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3720"
                    data-name="Group 3720"
                    transform="translate(1350.434 108.059)"
                    opacity={0.45}
                    style={{
                      mixBlendMode: 'normal',
                      isolation: 'isolate',
                    }}
                  >
                    <g id="Group_3719" data-name="Group 3719">
                      <g
                        id="Group_3718"
                        data-name="Group 3718"
                        clipPath="url(#clip-path-35)"
                      >
                        <path
                          id="Path_11133"
                          data-name="Path 11133"
                          d="M884.9,271.505c108.474,0,92.4-163.184,200.879-163.184"
                          transform="translate(-884.901 -108.059)"
                          fill="none"
                          stroke="#e05a32"
                          strokeWidth={0.6}
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <path
                id="Path_11351"
                data-name="Path 11351"
                d="M0,0H7.992V4.811H0Z"
                transform="translate(298.093 46.21)"
                fill="#a84e4e"
              />

              <rect
                id="Rectangle_5951"
                data-name="Rectangle 5951"
                width={7.992}
                height={1.283}
                transform="translate(1342.443 3.889)"
                fill="#af5a1b"
              />
              <rect
                id="Rectangle_5952"
                data-name="Rectangle 5952"
                width={7.992}
                height={3.849}
                transform="translate(1342.443 55.495)"
                fill="#af5a1b"
              />
              <rect
                id="Rectangle_5953"
                data-name="Rectangle 5953"
                width={7.992}
                height={8.82}
                transform="translate(1342.443 109.668)"
                fill="#af5a1b"
              />
              <rect
                id="Rectangle_5954"
                data-name="Rectangle 5954"
                width={7.992}
                height={12.83}
                transform="translate(89.224 67.388)"
                fill="#66a61e"
              />
              <path
                id="Path_11355"
                data-name="Path 11355"
                d="M0,0H7.992V11.226H0Z"
                transform="translate(298.093 119.916)"
                fill="#00b1ff"
              />
              <path
                id="Path_11347"
                data-name="Path 11347"
                d="M0,0H7.991V.8H0Z"
                transform="translate(89.224 130.54)"
                fill="#66a61e"
              />
              <rect
                id="Rectangle_5957"
                data-name="Rectangle 5957"
                width={7.991}
                height={0.802}
                transform="translate(89.224 181.666)"
                fill="#66a61e"
              />
              <rect
                id="Rectangle_5958"
                data-name="Rectangle 5958"
                width={7.992}
                height={1.604}
                transform="translate(89.224 232.791)"
                fill="#66a61e"
              />
              <rect
                id="Rectangle_5959"
                data-name="Rectangle 5959"
                width={7.992}
                height={8.018}
                transform="translate(506.964 117.788)"
                fill="#00b1ff"
              />
              <rect
                id="Rectangle_5960"
                data-name="Rectangle 5960"
                width={7.992}
                height={1.604}
                transform="translate(506.964 176.13)"
                fill="#00b1ff"
              />
              <rect
                id="Rectangle_5961"
                data-name="Rectangle 5961"
                width={7.992}
                height={1.604}
                transform="translate(506.964 228.057)"
                fill="#00b1ff"
              />
              <path
                id="Path_11348"
                data-name="Path 11348"
                d="M0,0H7.992V11.226H0Z"
                transform="translate(715.833 142.052)"
                fill="#e6ab02"
              />
              <rect
                id="Rectangle_5963"
                data-name="Rectangle 5963"
                width={7.992}
                height={9.622}
                transform="translate(924.703 140.055)"
                fill="#e6ab02"
              />
              <rect
                id="Rectangle_5964"
                data-name="Rectangle 5964"
                width={7.992}
                height={1.604}
                transform="translate(924.703 200)"
                fill="#e6ab02"
              />
              <path
                id="Path_11350"
                data-name="Path 11350"
                d="M0,0H7.992V9.622H0Z"
                transform="translate(1133.573 146.12)"
                fill="#af5a1b"
              />
              <rect
                id="Rectangle_5966"
                data-name="Rectangle 5966"
                width={7.992}
                height={0.524}
                transform="translate(1342.442 168.811)"
                fill="#af5a1b"
              />
              <path
                id="Path_11352"
                data-name="Path 11352"
                d="M0,0H7.992V16.037H0Z"
                transform="translate(1551.312 92.364)"
                fill="#e7298a"
              />
              <rect
                id="Rectangle_5968"
                data-name="Rectangle 5968"
                width={7.992}
                height={1.443}
                transform="translate(1133.573 206.065)"
                fill="#af5a1b"
              />
              <rect
                id="Rectangle_5969"
                data-name="Rectangle 5969"
                width={7.992}
                height={0.524}
                transform="translate(1133.573 257.832)"
                fill="#af5a1b"
              />
              <rect
                id="Rectangle_5970"
                data-name="Rectangle 5970"
                width={7.992}
                height={1.443}
                transform="translate(1342.443 219.658)"
                fill="#af5a1b"
              />
              <rect
                id="Rectangle_5971"
                data-name="Rectangle 5971"
                width={7.992}
                height={0.524}
                transform="translate(1342.442 271.424)"
                fill="#af5a1b"
              />
              <rect
                id="Rectangle_5972"
                data-name="Rectangle 5972"
                width={7.991}
                height={14.433}
                transform="translate(1760.183 85.725)"
                fill="#e7298a"
              />
              <rect
                id="Rectangle_5973"
                data-name="Rectangle 5973"
                width={7.991}
                height={1.604}
                transform="translate(1760.183 150.482)"
                fill="#e7298a"
              />
            </g>
          </g>
          {valuesToShow[0].svg}
          <text
            id="Customer_Pick-up"
            data-name="Customer Pick-up"
            transform="translate(1342 695.612)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={-34} y={0}>
              {'Customer Pick-up'}
            </tspan>
          </text>
          {valuesToShow[1].svg}
          <text
            id="Transportation"
            transform="translate(1348 748.502)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={-27} y={0} letterSpacing="-0.054em">
              {'T'}
            </tspan>
            <tspan y={0}>{'ransportation'}</tspan>
          </text>
          {valuesToShow[2].svg}
          <text
            id="_3PL_Naqel"
            data-name="3PL Naqel"
            transform="translate(1357 805.159)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={-19} y={0}>
              {'3P'}
            </tspan>
            <tspan y={0} letterSpacing="-0.017em">
              {'L'}
            </tspan>
            <tspan y={0} xmlSpace="preserve">
              {' Naqel'}
            </tspan>
          </text>
          {valuesToShow[3].svg}
          <text
            id="Vendor_to_Customer"
            data-name="Vendor to Customer"
            transform="translate(1338 860.154)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={-38} y={0} letterSpacing="-0.054em">
              {'V'}
            </tspan>
            <tspan y={0}>{'endor to Customer'}</tspan>
          </text>
          {valuesToShow[4].svg}
          <text
            id="Seaport"
            transform="translate(1361 911.462)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={-14} y={0}>
              {'Seaport'}
            </tspan>
          </text>
          <text
            id="Airport"
            transform="translate(1363 962.769)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={-13} y={0}>
              {'Airport'}
            </tspan>
          </text>
          <text
            id="Customer_Warehouse"
            data-name="Customer/Warehouse"
            transform="translate(1506.5 779.159)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'Customer/'}
            </tspan>
            <tspan y={0} letterSpacing="-0.036em">
              {'W'}
            </tspan>
            <tspan y={0}>{'arehouse'}</tspan>
          </text>
          <text
            id="ASN"
            transform="translate(1168 839.013)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={-16} y={0}>
              {'ASN'}
            </tspan>
          </text>
          <text
            id="Sea"
            transform="translate(1168 898.868)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={-14} y={0}>
              {'Sea'}
            </tspan>
          </text>
          <text
            id="Air"
            transform="translate(1168 951.176)"
            fill="#fff"
            fontSize={8}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={-11} y={0}>
              {'Air'}
            </tspan>
          </text>
          <text
            id="In-Kingdom"
            transform="translate(915.89 829.948)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'In-Kingdom'}
            </tspan>
          </text>
          <text
            id="OOK"
            transform="translate(941.781 892.884)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'OOK'}
            </tspan>
          </text>
          <text
            id="PO_Released"
            data-name="PO Released"
            transform="translate(704.858 829.747)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'PO Released'}
            </tspan>
          </text>
          <text
            id="Electronic_GR"
            data-name="Electronic GR"
            transform="translate(1743 776.023)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'Electronic GR'}
            </tspan>
          </text>
          <text
            id="Manual_GR"
            data-name="Manual GR"
            transform="translate(1754 841.779)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'Manual GR'}
            </tspan>
          </text>
          <text
            id="Agreement"
            transform="translate(501 810.879)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'Agreement'}
            </tspan>
          </text>
          <text
            id="IK_Spot_Purchase"
            data-name="IK Spot Purchase"
            transform="translate(477 865.014)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'IK Spot Purchase'}
            </tspan>
          </text>
          <text
            id="OOK_Spot_Purchase"
            data-name="OOK Spot Purchase"
            transform="translate(467 939.675)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'OOK Spot Purchase'}
            </tspan>
          </text>
          <text
            id="PR_Released"
            data-name="PR Released"
            transform="translate(287.83 807.61)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'PR Released'}
            </tspan>
          </text>
          <text
            id="Warehouse"
            transform="translate(292.33 739.698)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0} letterSpacing="-0.036em">
              {'W'}
            </tspan>
            <tspan y={0}>{'arehouse'}</tspan>
          </text>
          <text
            id="Reservations"
            transform="translate(66 775.885)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'Reservations'}
            </tspan>
          </text>
          <text
            id="WBS"
            transform="translate(97 833.023)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'WBS'}
            </tspan>
          </text>
          <text
            id="Work_Order"
            data-name="Work Order"
            transform="translate(72 884.149)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0} letterSpacing="-0.017em">
              {'W'}
            </tspan>
            <tspan y={0}>{'ork Order'}</tspan>
          </text>
          <text
            id="Direct_Charge"
            data-name="Direct Charge"
            transform="translate(64 935.675)"
            fill="#fff"
            fontSize={FONTSIZE}
            fontFamily={FONTFAMILY}
            fontWeight={FONTWEIGHT}
          >
            <tspan x={0} y={0}>
              {'Direct Charge'}
            </tspan>
          </text>
          <g
            id="legends_end_to_end"
            data-name="legends end to end"
            transform="translate(0 -20)"
          >
            <g id="Group_4171" data-name="Group 4171" transform="translate(493.065)">
              <text
                id="Demand"
                transform="translate(152.412 1031.801)"
                fill="#fff"
                fontSize="9"
                fontFamily="Poppins-Regular, Poppins"
              >
                <tspan x="0" y="0">
                  Demand
                </tspan>
              </text>
              <g
                id="Group_4170"
                data-name="Group 4170"
                transform="translate(133.845 1023.295)"
                opacity="0.7"
              >
                <g id="Group_3852" data-name="Group 3852">
                  <g
                    id="Group_3851"
                    data-name="Group 3851"
                    clipPath="url(#clip-path)"
                  >
                    <rect
                      id="Rectangle_6036"
                      data-name="Rectangle 6036"
                      width="10"
                      height="10"
                      transform="translate(0)"
                      fill="#66a61e"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g id="Group_4172" data-name="Group 4172" transform="translate(608.165)">
              <text
                id="Procurement"
                transform="translate(152.412 1031.801)"
                fill="#fff"
                fontSize="9"
                fontFamily="Poppins-Regular, Poppins"
              >
                <tspan x="0" y="0">
                  Procurement
                </tspan>
              </text>
              <g
                id="Group_4170-2"
                data-name="Group 4170"
                transform="translate(133.845 1023.295)"
                opacity="0.7"
              >
                <g id="Group_3852-2" data-name="Group 3852">
                  <g
                    id="Group_3851-2"
                    data-name="Group 3851"
                    clipPath="url(#clip-path-2)"
                  >
                    <rect
                      id="Rectangle_6036-2"
                      data-name="Rectangle 6036"
                      width="10"
                      height="10"
                      transform="translate(0)"
                      fill="#00b1ff"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g id="Group_4173" data-name="Group 4173" transform="translate(743.264)">
              <text
                id="Fulfillment"
                transform="translate(152.412 1031.801)"
                fill="#fff"
                fontSize="9"
                fontFamily="Poppins-Regular, Poppins"
              >
                <tspan x="0" y="0">
                  Fulfillment
                </tspan>
              </text>
              <g
                id="Group_4170-3"
                data-name="Group 4170"
                transform="translate(133.845 1023.295)"
                opacity="0.7"
              >
                <g id="Group_3852-3" data-name="Group 3852">
                  <g
                    id="Group_3851-3"
                    data-name="Group 3851"
                    clipPath="url(#clip-path-3)"
                  >
                    <rect
                      id="Rectangle_6036-3"
                      data-name="Rectangle 6036"
                      width="10"
                      height="10"
                      transform="translate(0)"
                      fill="#e6ab02"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g id="Group_4174" data-name="Group 4174" transform="translate(865.364)">
              <text
                id="Logistics"
                transform="translate(152.412 1031.801)"
                fill="#fff"
                fontSize="9"
                fontFamily="Poppins-Regular, Poppins"
              >
                <tspan x="0" y="0">
                  Logistics
                </tspan>
              </text>
              <g
                id="Group_4170-4"
                data-name="Group 4170"
                transform="translate(133.845 1023.295)"
                opacity="0.7"
              >
                <g id="Group_3852-4" data-name="Group 3852">
                  <g
                    id="Group_3851-4"
                    data-name="Group 3851"
                    clipPath="url(#clip-path-4)"
                  >
                    <rect
                      id="Rectangle_6036-4"
                      data-name="Rectangle 6036"
                      width="10"
                      height="10"
                      transform="translate(0)"
                      fill="#af5a1b"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g id="Group_4175" data-name="Group 4175" transform="translate(979.463)">
              <text
                id="Receiving"
                transform="translate(152.412 1031.801)"
                fill="#fff"
                fontSize="9"
                fontFamily="Poppins-Regular, Poppins"
              >
                <tspan x="0" y="0">
                  Receiving
                </tspan>
              </text>
              <g
                id="Group_4170-5"
                data-name="Group 4170"
                transform="translate(133.845 1023.295)"
                opacity="0.7"
              >
                <g id="Group_3852-5" data-name="Group 3852">
                  <g
                    id="Group_3851-5"
                    data-name="Group 3851"
                    clipPath="url(#clip-path-5)"
                  >
                    <rect
                      id="Rectangle_6036-5"
                      data-name="Rectangle 6036"
                      width="10"
                      height="10"
                      transform="translate(0)"
                      fill="#e7298a"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g
              id="EndToEndButton"
              transform="translate(880.91 979.301)"
              opacity="0.3"
            >
              <rect
                id="Rectangle_5782"
                data-name="Rectangle 5782"
                width="40"
                height="17"
                rx="8.5"
                fill="#001439"
              />
              <g id="Group_5579" data-name="Group 5579" transform="translate(0.035)">
                <path
                  id="Path_2748"
                  data-name="Path 2748"
                  d="M1318.3-798.816h14.145"
                  transform="translate(-1305.334 804.127)"
                  fill="none"
                  stroke="#97b3e6"
                  strokeLinecap="round"
                  strokeWidth="1"
                />
                <path
                  id="Path_11576"
                  data-name="Path 11576"
                  d="M1318.3-798.816h14.145"
                  transform="translate(-1305.334 807.127)"
                  fill="none"
                  stroke="#97b3e6"
                  strokeLinecap="round"
                  strokeWidth="1"
                />
                <path
                  id="Path_11577"
                  data-name="Path 11577"
                  d="M1318.3-798.816h14.145"
                  transform="translate(-1305.334 810.127)"
                  fill="none"
                  stroke="#97b3e6"
                  strokeLinecap="round"
                  strokeWidth="1"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
