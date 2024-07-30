import { useDispatch, useSelector } from "react-redux"

import { fetchAuth } from "../../redux/authSlice"
import styles from './LoginPage.module.scss'




export const LoginPage = () => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.auth.error)

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formAuth)
    const a = {
      email: data.get('email'),
      password: data.get('password')
    }
    dispatch(fetchAuth(a))
  }



  return (
    <main className={styles.main}>
      <h1>
        Sign In
      </h1>
      <div>admin@mail.com</div>
      <p>admin123</p>

      <form className={styles.form} id="formAuth" onSubmit={onSubmit} >
        <input
          type="email"
          name="email"
          placeholder="email"
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className={styles.input}
        />
        {
          error &&
          <span className="error text-md">Wrong login or password</span>
        }
        <input type="submit" placeholder="Sing In" className="button" />
      </form>
    </main>
  )
}