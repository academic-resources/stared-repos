import React from "react";
import { supabase } from "../lib/initSupabase";
import { Auth, Card, Typography, Space } from "@supabase/ui";

// TODO: delete
const AuthPage = () => {
  return (
      <div className="authcontainer">
        <Card>
          <Space direction="vertical" size={8}>
            <div>
              <Typography.Title level={3}>Welcome</Typography.Title>
            </div>
            <Auth
              supabaseClient={supabase}
              providers={["google", "github"]}
              view={"sign_in"}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
            />
          </Space>
        </Card>
      </div>
    </>
  );
};

export default AuthPage;
