import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div className="font-mono fixed flex h-screen w-screen animate-pulse items-center justify-center text-[16em] tracking-tighter text-primary-content/20 transition-all md:text-[25em]">
        404
      </div>
      <div className="fixed z-10 flex h-screen w-screen flex-col items-center justify-center gap-8 drop-shadow-xl backdrop-blur">
        <h1 className="text-5xl font-extrabold tracking-tight transition-all md:text-[5rem]">
          Where <span className="text-primary">Am</span> I?
        </h1>
        <div>
          <Link href="/" className="btn-ghost btn rounded-full bg-white/10">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
