import * as React from "react";
import { signIn } from "next-auth/react";
import Button from "../atoms/Button";
import Image from "next/image";

function loginWithDiscord() {
  return signIn("discord");
}
type Props = {
  sessionStatus: string;
  children: any;
};
const AuthenticationGate: React.FunctionComponent<Props> = ({ sessionStatus, children }: Props) => {
  const isAuthenticated = sessionStatus === "authenticated";

  return (
    <>
      {children}
      {!isAuthenticated && (
        <div className="fixed inset-0 w-screen h-screen bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-md w-full max-w-md p-12">
            <h3 className="text-3xl font-extrabold text-gray-900 text-center mb-2">Login to apply</h3>
            <p className="text-sm text-gray-400 text-center mb-5">Sign in using Discord to apply to Hyperscale.</p>
            <Button className="w-full flex items-center justify-center" color="primary" onClick={loginWithDiscord}>
              <Image src="/discord.svg" width="20" height="20" alt="" />
              <span className="ml-3">Login with Discord</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthenticationGate;
