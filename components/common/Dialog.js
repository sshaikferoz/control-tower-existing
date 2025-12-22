import React, { useCallback, useState, useEffect } from 'react'
import styles from './Dialog.module.css'

const delayGen = () => {
  let timer = 0
  return (callback, ms = 50) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(), ms)
  }
}
const popupPositions = [
  'top-left',
  'top-center',
  'top-right',
  'middle-left',
  'middle-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
]
const delayForCloseHandling = delayGen() // Todo:this may not be needed
const Dialog = React.forwardRef((props, ref) => {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false)
  const {
    popupAt = 'center',
    size = '55em',
    radius = '12px',
    offsetLeft = 0,
    offsetTop = 0,
  } = props
  const dialog = ref.current
  const defaultPosition = popupAt === 'center' || !popupPositions.includes(popupAt)
  let CSSVariableClientXY = {}
  let centerCssClas = null
  if (defaultPosition && dialog) {
    let { clientX, clientY } = props
    console.log({ clientX, clientY })
    if (!isNaN(clientX))
      CSSVariableClientXY = {
        '--size-x': `${clientX}px`,
        '--size-y': `${clientY}px`,
      }
    else centerCssClas = styles.defaultCenter
  }
  useEffect(() => {
    if (props?.modalState === 'show' && !isOpen) {
      if (defaultPosition && dialog) {
        dialog?.showModal?.()
        // dialog.style.left = `${parseInt(window.innerWidth) / 2 + offsetLeft}px`
        // dialog.style.top = `${parseInt(window.innerHeight) / 2 + offsetTop}px`
        setIsOpen(true)
        return
      }
      try {
        const wrapper = ref.current.ownerDocument.querySelector('.dialog-outer')
        console.log({ wrapper })
        let vw = window.innerWidth
        let vh = window.innerHeight
        const zoomRationW =
          vw / 1920 > 1.0 ? vw / 1920 + Math.abs(1 - vw / 1920) * 2 : vw / 1920

        const cell = wrapper.querySelector(`div[data-area="${popupAt}"]`) || wrapper
        console.log({ cell })
        const _size = parseInt(size) * (16 / zoomRationW)
        const isRight = popupAt.match(/right/i)
        const isBottom = popupAt.match(/bottom/i)
        const isTop = popupAt.match(/top/i)
        const largeNumber = 40
        const offsetLeftRatio = isRight ? 5 : largeNumber
        const offsetTopRatio = isBottom ? 4 / zoomRationW : isTop ? largeNumber : 10
        // dialog.style.left = `${
        //   cell.offsetLeft +
        //   offsetLeft -
        //   Number(_size / offsetLeftRatio / zoomRationW)
        // }px`
        dialog.style.top = `${
          cell.offsetTop + offsetTop - Number(_size / offsetTopRatio / zoomRationW)
        }px`
        dialog.showModal()
        setIsOpen(true)
      } catch (e) {
        console.error({ closingModalError: e })
      }
    }
  })
  function handleClosing() {
    try {
      ref.current.setAttribute('closing', '')
      props.onModalClose()
      ref.current.addEventListener(
        'animationend',
        () => {
          ref.current.close()
          ref.current.removeAttribute('closing')
          setIsOpen(false) //internal state
        },
        { once: true }
      )
    } catch (e) {
      console.error({ closingModalError: e })
    }
  }
  useEffect(() => {
    console.log({ propModalStat: props?.modalState })
    if (props.modalState !== 'show') return
    const escFunction = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        delayForCloseHandling(() => {
          if (ref?.current?.open) handleClosing()
        })
      }
    }
    document?.addEventListener?.('keydown', escFunction, { once: true })

    console.log({
      isDialogInOpenStatttt: ref?.current?.open,
      andTheState: props?.modalState,
    })

    ref?.current?.addEventListener('click', (e) => {
      if (e.target.nodeName === 'DIALOG') handleClosing()
    })
    return () => {}
  }, [props?.modalState])
  return (
    <dialog
      style={{
        '--dialog-size': size,
        '--dialog-radius': radius,
        ...CSSVariableClientXY,
      }}
      className={`${styles.dialog} ${
        defaultPosition && props.clientX && styles.center
      } ${centerCssClas}`}
      ref={ref}
    >
      {props.children}
    </dialog>
  )
})

export default Dialog
