import { useState, useEffect } from "react";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router";

export const Signin = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="Goutam@gmail.com"
            label={"Email"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                if (!username || !password) {
                  alert("Please fill in both fields");
                  return;
                }
                try {
                  let result = await axios.post(
                    "http://localhost:3000/api/v1/user/signin",
                    { username, password }
                  );
                  localStorage.setItem("token", result.data.token);
                  navigate("/dashboard");
                } catch (error) {
                  console.error("Sign in failed", error);
                  alert("Sign in failed. Please check your credentials.");
                }
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};
