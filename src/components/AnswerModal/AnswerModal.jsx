import styles from './AnswerModal.module.scss'


export const AnswerModal = ({ string, onClickOK }) => {

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.title}>{string}</div>
        <button className={styles.button} onClick={onClickOK}>ok</button>
      </div>
    </div>
  )
}