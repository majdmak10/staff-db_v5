import Link from "next/link";
// import { redirect } from "next/navigation";

const Homepage = () => {
  return (
    <div className="">
      <h1>Homepage</h1>
      <Link href="/dashboard">Go to Dashboard</Link>
    </div>
  );
  // redirect("/login");
};

export default Homepage;
