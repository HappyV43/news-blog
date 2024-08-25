import React from "react";
import { LoginForm } from "./login";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "./regsiter";
import { TabsContent } from "@radix-ui/react-tabs";

export default function Login() {
  return (
    <div className="relative flex w-full h-screen bg-background">
      <div className="max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-4"></div>
        <Tabs defaultValue="login">
          <div className="flex justify-center mb-4">
            <TabsList className="left-9">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
