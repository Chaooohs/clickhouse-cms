import { useDispatch } from "react-redux"

import { fetchAuth } from "../../redux/authSlice"




export const LoginPage = () => {
  const dispatch = useDispatch()

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
    <div>
      <h1>
        Login page
      </h1>
      <p>admin@mail.com</p>
      <p>admin123</p>

      <form id="formAuth" onSubmit={onSubmit} >
        <input
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
        />
        <input type="submit" placeholder="Sing In" />
      </form>
    </div>
  )
}