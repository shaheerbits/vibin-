import { Link, useNavigate } from "react-router-dom"
import InputField from "../../../components/InputField"
import ButtonPrimary from "../../../components/ButtonPrimary"
import { useEffect, useState } from "react";
import showToast from "../../../utils/showToast";
import fetcherClient from "../../../utils/fetcherClient";
import eraseInput from "../../../utils/eraseInput";

const SignUpForm = () => {
  const USERNAME_REGEX = /^[a-zA-Z0-9_]{2,30}$/;
  const PASSWORD_REGEX = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [username, setUsername] = useState("");
  const [usernameValidated, setUsernameValidated] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValidated, setEmailValidated] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValidated, setPasswordValidated] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setUsernameValidated(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setEmailValidated(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setPasswordValidated(PASSWORD_REGEX.test(password));
  }, [password]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {  
    e.preventDefault();
    
    if (!usernameValidated) {
      showToast("Invalid username. It should be 2-30 characters long and can include letters, numbers, and underscores only.", "error");
      return;
    } else if (!emailValidated) {
      showToast("Invalid email format.", "error");
      return;
    } else if (!passwordValidated) {
      showToast("Weak password. It should be at least 8 characters long and include at least one letter, one number, and one special character.", "error");
      return;
    } else {
      try {
        await fetcherClient.post("/auth/signup", {
          name: firstName + " " + lastName,
          email,
          username,
          password,
        });  
        
        eraseInput(setFirstName, setLastName, setEmail, setUsername, setPassword);
        showToast("User registered successfully!", "default", 3000);
        setTimeout(() => navigate("/log-in"), 3000);
      } catch (error: any) {
        if (!error?.response) {
          showToast("No server response!", "error");
        } else if (error.response?.status === 409) {
          showToast("Username or email already in use!", "error");
        } else {
          showToast("Uncaught error", "error");
        }
      }
    }
  }

  return (
    <div className="w-full max-w-lg">
        <h2 className="text-lg font-semibold">Get started with VIBIN'</h2>
        <h3 className="text-sm text-zinc-700">Already have an account? <Link to="/log-in" className="text-blue-600 underline">Log in</Link></h3>
        
        <form className="mt-6 flex flex-col gap-3">
          <div className="flex gap-4">
            <InputField type="text" forId="firstName" label="First Name" value={firstName} onChangeHandler={(e) => setFirstName(e.target.value)} />
            <InputField type="text" forId="lastName" label="Last Name" value={lastName} onChangeHandler={(e) => setLastName(e.target.value)} />
          </div>

          <div>
            <InputField type="text" forId="username" label="Username" value={username} onChangeHandler={(e) => setUsername(e.target.value)} />
          </div>

          <div>
            <InputField type="email" forId="email" label="Email" value={email} onChangeHandler={(e) => setEmail(e.target.value)} />
          </div>

          <div className="mb-4">
            <InputField type="password" forId="password" label="Password" value={password} onChangeHandler={(e) => setPassword(e.target.value)} />
          </div>

          <ButtonPrimary buttonText="Sign up" onClickHandler={(e) => handleSubmit(e)} />
        </form>
    </div>
  )
}

export default SignUpForm
