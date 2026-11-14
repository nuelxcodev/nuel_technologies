import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-display text-7xl font-semibold text-accent">404</p>
        <h1 className="mt-4 text-3xl">This page does not exist.</h1>
        <p className="mt-3 text-mute">The link may be broken or the page may have moved.</p>
        <Link href="/" className="btn mt-8">Back to home</Link>
      </div>
    </main>
  );
}
