import styles from './CloseButton.module.scss'
import CloseIcon from '/public/image/svg/close.svg?react'


export const CloseButton = ({ onClickClose }) => {

  return (
    <button
      className={styles.button}
      onClick={onClickClose}
    >
      <CloseIcon />
    </button>
  )
}