import { Auth } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";

import Link from "next/link";

export default function Login() {
  const { user } = Auth.useUser();

  // useEffect(() => {
  //   if (user) {
  //     router.push({
  //       pathname: "/",
  //     });
  //   }
  // }, []);

  return (
    <>
      {!user ? (
        <Auth
          supabaseClient={supabase}
          providers={["google", "github"]}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
        />
      ) : (
        // TODO: redirect automatically if logged in already similar to https://linear.app
        <span>
          You are logged in. Go{" "}
          <Link href="/">
            <a className="inline">home</a>
          </Link>
          .
        </span>
      )}
    </>
  );
}
