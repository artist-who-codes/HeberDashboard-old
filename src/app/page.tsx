"use client";

import Image from "next/image";
import Blob from "../../public/Login/Blob.svg";
import { useState } from "react";
import { signUp } from "@/server/auth/auth-user";

export default function Homepage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function signupUser(email: string, password: string) {
    const res = await signUp(email, password);
    if (res.status) {
      console.log(res.data);
    } else {
      console.log(res.error);
    }
  }
  return (
    <div
      className="bg-cover bg-center pt-24 pb-20 px-52"
      style={{ backgroundImage: "url(./Login/Bg.svg)" }}
    >
      <h2 className="text-4xl font-bold text-center">
        Welcome To <span className="text-[#4B50F7]">Heber Dashboard</span>
      </h2>
      <div className="flex pt-12 gap-24 ">
        <div className="backdrop-blur shadow-lg border-[#ffffff]/20 border-r-2 border-b-2 bg-gradient-to-b from-[#4B50F7]/20 from-0% via-[#4B50F7]/10 to-[#4B50F7]/20 to-100% bg-gradient-to-r from-[#4B50F7]/20 from-0% via-[#4B50F7]/10 to-[#4B50F7]/20 to-100% w-[30vw] py-32 px-10 rounded-[2.5rem] text-center">
          <h3 className="text-xl font-medium">Sign Up to Continue</h3>
          <input
            className="bg-[#A7A9D2]/30 rounded-lg px-4 py-2 mt-8 w-full"
            placeholder="Your Name"
            type="text"
            id="name"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            className="bg-[#A7A9D2]/30 rounded-lg px-4 py-2 my-4 w-full"
            placeholder="Password"
            type="text"
            id="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button
            className="bg-[#4B50F7] rounded-lg text-white px-6 py-2 mt-4 mx-1"
            type="submit"
            onClick={() => {
              signupUser(email, password);
            }}
          >
            Sign Up
          </button>
          {/* <button className="bg-[#4B50F7] rounded-lg text-white px-6 py-2 mb-10 mx-1" type="submit" onClick={() => { SignUp(name, password) }}>Sign Up</button> */}
          {/* <p>Lazy to create account?<span className=" text-[#4B50F7] font-medium leading-10">Look at Sample Users</span></p> */}
        </div>
        <Image src={Blob} width={520} alt="Login Image"></Image>
      </div>
    </div>
  );
}
