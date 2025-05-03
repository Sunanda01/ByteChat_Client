import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, Key, User, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const initialData = {
  email: "",
  password: "",
};
export default function Login() {
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }
  return (
    <div className="grid grid-cols-2 w-full h-[calc(100vh-4rem)] mt-16">
       <div className="h-full flex justify-center items-center overflow-hidden border-r border-gray-300">
        <img src="/bg2.jpg" className="w-auto object-contain h-full " />
      </div>
      <div className="flex items-center justify-center flex-col gap-5">
        <div className="flex items-center justify-center flex-row gap-4">
          <img
            src="/ByteChat.svg"
            alt=""
            className="h-14 w-14 rounded-full shadow"
          />
          <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-600">
            Connect With ByteChat
          </h1>
        </div>
        <Card className="w-[450px] bg-gradient-to-r from-blue-300 to-green-300 ">
          <CardHeader>
            <CardTitle className="font-bold text-xl text-center">
          <div className="flex gap-2 justify-center">
          <img src="/hey.svg"className="rounded-full h-6 w-6" alt="" />
         <h1>Welcome Back</h1>
          </div>
            </CardTitle>
            <CardDescription className="font-semibold text-white text-center"></CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4 ">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="you@gmail.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative w-full">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword((v) => !v)}
                      className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer h-5 w-5"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeClosed className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center flex-col gap-2">
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <div className="inline-flex justify-center gap-2 text-white">
              <span className="text-sm font-semibold">
                Don't Have an Account?{" "}
              </span>
              <Link
                to="/register"
                className="inline-flex items-center space-x-1 "
              >
                <span className="text-sm font-semibold">SignUp </span>
                <UserRoundPlus className="h-4 w-4" />
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
     
    </div>
  );
}
