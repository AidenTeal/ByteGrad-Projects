"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { loginUser, signUpUser } from "@/actions/actions";
import AuthFormBtn from "./auth-form-btn";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useFormState(signUpUser, undefined)
  const [loginError, dispatchLogin] = useFormState(loginUser, undefined)

  return (
    <form
      action={type === "login" ? dispatchLogin : dispatchSignUp}
    >
      <div className="space-y-1">
        <Label> Email </Label>
        <Input
          type="email"
          id="email"
          name="email"
          className="border-zinc-400"
          required
          maxLength={100}
        />
      </div>

      <div className="space-y-1 mt-2 mb-4">
        <Label> Password </Label>
        <Input
          type="password"
          id="password"
          name="password"
          className="border-zinc-400"
          required
          maxLength={100}
        />
      </div>

      <AuthFormBtn type={type} />

      {signUpError && (
        <p className="text-red-500 text-sm mt-2"> {signUpError.message} </p>
      )}
      {loginError && (
        <p className="text-red-500 text-sm mt-2"> {loginError.message} </p>
      )}
    </form>
  );
}
