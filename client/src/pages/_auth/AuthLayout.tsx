import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const AuthLayout = () => {
  return (
    <div className="flex bg-zinc-100 text-zinc-900">
      <div className="w-1/2 h-screen p-16 flex items-center justify-center">
        <div className="w-[80%]">
          <img className="w-full" src="auth_layout_image.png" alt="." />
        </div>
      </div>

      <div className="flex items-center pl-10 w-1/2">
        <Outlet />
      </div>

      <ToastContainer />
    </div>
  )
}

export default AuthLayout
