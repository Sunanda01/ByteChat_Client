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
import { useLoginMutation } from "@/services/appAPI";
import { Eye, EyeClosed, Key, User, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
const initialData = {
  email: "",
  password: "",
};
export default function Login() {
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    if (res?.data?.success) {
      toast.success(res?.data?.msg);
      navigate("/chat");
      setFormData(initialData);
    } else {
      toast.error(error?.data?.msg);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-[calc(100vh-4rem)] mt-16">
      <div className="h-full lg:block hidden justify-center items-center overflow-hidden border-r border-gray-300">
        <img src="/bg2.jpg" className="w-auto object-contain h-full " />
      </div>
      <div className="flex items-center justify-center flex-col gap-5 ">
        <Card className="w-[350px] sm:w-[450px] bg-gradient-to-r from-blue-300 to-green-300 ">
          <CardHeader>
            <CardTitle className="font-bold text-xl text-center">
              <div className="flex gap-2 justify-center">
                <h1>👋 Welcome Back</h1>
              </div>
            </CardTitle>
            <CardDescription className="font-semibold text-white text-center"></CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4 ">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="bg-white"
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
                      className="bg-white pr-10"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
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
            </CardContent>
            <CardFooter className="flex justify-center flex-col gap-2">
              <Button
                type="submit"
                className="mt-4 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? <PulseLoader color="#ffffff" size={5} /> : "Login"}
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
          </form>
        </Card>
      </div>
    </div>
  );
}
