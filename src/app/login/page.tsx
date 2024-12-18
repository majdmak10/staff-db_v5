"use client";

import { loginAdmin } from "@/lib/actions";

const LoginPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = await loginAdmin(formData);

    if (token) {
      document.cookie = `authToken=${token}; path=/;`;
      window.location.href = "/dashboard";
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-stretch">
        <div className="flex flex-col bg-white p-12 w-[500px] rounded-l-lg">
          <h2 className="mb-8 text-mBlue text-2xl font-bold">
            UNHCR Aleppo SO Staff Database
          </h2>
          <h3 className="text-gray-800 text-xl font-semibold">Welcome back!</h3>
          <p className="mb-6 text-gray-600 text-sm">
            Please enter your credentials to login.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex justify-between items-center mb-5 gap-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-gray-700">
                  Remember me
                </label>
              </div>
              <a
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
        <div className="bg-[url('/login/unhcr-bg.jpg')] bg-cover bg-center w-[600px] rounded-r-lg overflow-hidden"></div>
      </div>
    </div>
  );
};

export default LoginPage;
