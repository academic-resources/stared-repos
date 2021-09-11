import { Auth, Button } from "@supabase/ui";
import Link from "next/link";
import { supabase } from "../lib/initSupabase";

export default function Home() {
  const { user } = Auth.useUser();

  return (
    <div className="w-full h-full">
      {!user ? (
        <div className="text-center mt-5">
          <h1 className="font-bold text-xl">Learn Anything</h1>
          <h2>
            You can save and search all your notes and links with this tool.
            Have to
            <Link href="/login">
              <a className="inline"> Login / Sign Up </a>
            </Link>
            first!
          </h2>
        </div>
      ) : (
        <div>
          <span>Signed in: {user.email}</span>
          <Button block onClick={() => supabase.auth.signOut()}>
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
