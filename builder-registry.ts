"use client";
import { builder, Builder } from "@builder.io/react";
import HamburgerIcon from "./components/UI/hamburger";
import Header from "./components/UI/header";
import SignInForm from "./components/SignIn/signInForm";
import SignUpForm from "./components/SignUp/signUpForm";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(SignInForm, {
  name: "SignInForm",
});

Builder.registerComponent(SignUpForm, {
  name: "SignUpForm",
});

Builder.registerComponent(Header, {
  name: "Header",
});

Builder.registerComponent(HamburgerIcon, {
  name: "HamburgerIcon",
});
