import { Route, Redirect } from "react-router-dom";

export default function AdminRoute({ component: Component, ...rest }) {
  const localStorage = window.localStorage;

  const userLogin = JSON.parse(localStorage.getItem("user"));

  const user = userLogin.type === "Admin";

  return <Route {...rest}>{user ? <Component /> : <Redirect to='/home' />}</Route>;
}
