import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const PrivateRouter = ({ children }) => {
  const navigate = useNavigate()
  const signIn = useSelector(state => state.auth.signIn)

  useEffect(() => {
    if (signIn !== true) {
      navigate('/login')
    }
    else {
      navigate('/admin')
    }
  }, [signIn])

  return children
}