import SignInForm from "@/components/SignIn/signInForm";
import { Suspense } from "react";
export default function SignIn(){
    
    return (
        <>
        <Suspense><SignInForm/></Suspense>
          
        </>
    
    );
}