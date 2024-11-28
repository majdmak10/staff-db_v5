import Link from "next/link";

const Homepage = () => {
  return (
    <div className="">
      <h1>Homepage</h1>
      <Link href="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default Homepage;
