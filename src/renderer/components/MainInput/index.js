import React, { Component } from 'react'
import styles from './styles.scss'

class MainInput extends Component {
  /**
   * TODO:production 每日一句古诗？英语？日语？
   */

  constructor() {
    super()

    this.inputRef = React.createRef()
    this.autoTextRef = React.createRef()
    this.dragLayerRef = React.createRef()

    this.getTextWidth = (el, value) => {
      // uses a cached canvas if available
      const canvas = this.getTextWidth.canvas || (this.getTextWidth.canvas = document.createElement('canvas'))
      const context = canvas.getContext('2d')
      // get the full font style property

      const font = window.getComputedStyle(el, null).getPropertyValue('font')
      context.font = font
      const text = value || el.value
      // set the font attr for the canvas text
      return context.measureText(text).width
    }
  }

  focus = () => {
    this.inputRef.current.focus()
  }

  onInput = (e, txt) => {
    const { value, onChange } = this.props
    const width = txt === 0 ? txt : Math.floor(this.getTextWidth(e.target, txt))
    // add 10 px to pad the input.

    this.dragLayerRef.current.style.left = `${width + 14}px`
    this.autoTextRef.current.scrollLeft = this.inputRef.current.scrollLeft
    setTimeout(() => {
      this.inputRef.current.scrollLeft = width
    }, 500)
  }

  handleOnScroll = (e) => {
    console.log('handleOnScroll', e)
    this.autoTextRef.current.scrollLeft = e.target.scrollLeft
  }

  onMouseDown = (e) => {
    this.windowMove(true)
  }

  onMouseUp = (e) => {
    this.focus()
    this.windowMove(false)
  }

  // 拖动移动三兄弟
  windowMove(canMove) {
    return mainRpc.rendererSend('window-move-open', canMove)
  }

  render() {
    const { term, autoHolder } = this.props

    return (
      <>
        <input
          type="text"
          id="main-input"
          ref={this.inputRef}
          value={term}
          placeholder="Bing, Bing, Bing"
          className={styles.mainInput}
          onInput={this.onInput}
          onChange={(e) => this.props.onChange(e.target.value)}
          onKeyDown={this.props.onKeyDown}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onScroll={this.handleOnScroll}
        />
        <input disabled type="text" ref={this.autoTextRef} className={`${styles.mainInput} ${styles.autoHolder}`} value={autoHolder} />
        <div ref={this.dragLayerRef} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} className={styles.drag_layer} />
      </>
    )
  }
}
export default MainInput