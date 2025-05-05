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
import { useRegisterMutation } from "@/services/appAPI";
import { Eye, EyeClosed, Plus, User, UserRoundPlusIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { uploadToCloudinary } from "@/services/cloudinary";
const initialData = {
  name: "",
  email: "",
  password: "",
  picture: "",
};
export default function Register() {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);
    if (res?.data?.success) {
      toast.success(res?.data?.msg);
      navigate("/chat");
      setFormData(initialData);
    } else {
      toast.error(error?.data?.msg);
    }
  };

  const handleImgChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({
        ...prev,
        picture: url,
      }));
    } catch (err) {
      toast.error("Failed to Upload image");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full h-[calc(100vh-4rem)] mt-16 ">
        <div className="flex items-center justify-center flex-col gap-5">
          <Card className="w-[350px] bg-gradient-to-r from-blue-300 to-green-300 sm:w-[450px]">
            <CardHeader>
              <CardTitle className="font-bold text-xl text-center">
                <div className="flex justify-center gap-2">
                  <UserRoundPlusIcon />
                  Create New Account
                </div>
              </CardTitle>
              <CardDescription className="font-semibold text-gray-600 text-center">
                Fill the details
              </CardDescription>
            </CardHeader>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="profileImg"
              onChange={handleImgChange}
            />

            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid w-full items-center gap-4 ">
                  <div className="flex justify-center items-end">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 shadow-md ">
                      <img
                        src={formData.picture || "/avatar.png"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label
                      htmlFor="profileImg"
                      className="h-6 w-6  bg-green-600 rounded-full p-1 cursor-pointer absolute ml-19 mb-2"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </label>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      className="bg-white"
                      id="name"
                      placeholder="Write your name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                      }}
                    />
                  </div>
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
                  disabled={isLoading && isUploading}
                >
                  {isLoading ? (
                    <PulseLoader color="#ffffff" size={5} />
                  ) : (
                    "Submit"
                  )}
                </Button>

                <div className="inline-flex justify-center gap-2 text-white">
                  <span className="text-sm font-semibold">
                    Already Have an Account?{" "}
                  </span>
                  <Link
                    to="/login"
                    className="inline-flex items-center space-x-1 "
                  >
                    <span className="text-sm font-semibold">Login </span>
                    <User className="h-4 w-4" />
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
        <div className="h-full  lg:block hidden justify-center items-center overflow-hidden border-l-1 border-gray-300">
          <img src="/bg.jpg" className="w-auto object-contain h-full " />
        </div>
      </div>
    </>
  );
}
