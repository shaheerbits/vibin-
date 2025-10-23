import { Route, Routes } from "react-router-dom"
import AuthLayout from "./pages/_auth/AuthLayout"
import SignUpForm from "./pages/_auth/forms/SignUpForm"
import LogInForm from "./pages/_auth/forms/LogInForm"

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/log-in" element={<LogInForm />} />
      </Route>
    </Routes>
  )
}

export default App
