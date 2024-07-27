import { useRef, useEffect } from 'react'
import styles from './AnswerModal.module.scss'


export const AnswerModal = ({ string, onClickOK, onKeyDown }) => {
  const ref = useRef()

  // устанавливает фокус на ref при открытии
  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.title}>{string}</div>
        <button ref={ref} className={styles.button} onClick={onClickOK} onKeyDown={onKeyDown}>ok</button>
      </div>
    </div>
  )
}