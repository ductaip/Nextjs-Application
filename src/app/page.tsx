import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl roboto-medium text-center">Hi guys  it going?</h1>
      <Link href='/login'>Login</Link>
    </main>
  );
}
