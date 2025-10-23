import { useState } from "react"
import InputField from "../../../components/InputField";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import showToast from "../../../utils/showToast";
import fetcherClient from "../../../utils/fetcherClient";

const LogInForm = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  if (!usernameOrEmail || !password) {
    showToast("All fields are required.", "error");
    return;
  }

  try {
    const response = await fetcherClient.post("/auth/login", {
      usernameOrEmail,
      password,
    });

    console.log("Login Response:", response.data);

    localStorage.setItem("token", response.data.token);

    showToast("Login successful!", "default", 3000);

    setTimeout(() => navigate("/"), 3000);
  } catch (error: any) {
    console.error("Login Error:", error);

    if (!error?.response) {
      showToast("No server response!", "error");
    } else if (error.response.status === 400) {
      showToast(error.response.data.message || "Invalid username or password!", "error");
    } else if (error.response.status === 500) {
      showToast("Server error! Try again later.", "error");
    } else {
      showToast("Something went wrong. Try again.", "error");
    }
  }
};

  return (
    <div className="w-full max-w-lg">
        <h2 className="text-lg font-semibold">Log in to VIBIN'</h2>
        <h3 className="text-sm text-zinc-700">New to VIBIN'? <Link to="/sign-up" className="text-blue-600 underline">Sign up</Link></h3>
        
        <form className="mt-6 flex flex-col gap-3">
          <div className="w-full max-w-2xl">
            <InputField type="text" forId="usernameOrEmail" label="Username or Email" value={usernameOrEmail} onChangeHandler={(e) => setUsernameOrEmail(e.target.value)} />
          </div>

          <div className="mb-4 w-full max-w-2xl">
            <InputField type="password" forId="password" label="Password" value={password} onChangeHandler={(e) => setPassword(e.target.value)} />
          </div>

          <ButtonPrimary buttonText="Log in" onClickHandler={(e) => handleLogin(e)} />
        </form>
    </div>
  )
}

export default LogInForm
