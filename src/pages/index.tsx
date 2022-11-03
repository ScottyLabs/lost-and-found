import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { trpc } from "../utils/trpc";

function AuthShowcase() {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl">
          Logged in as{" "}
          <span className="font-bold text-accent">
            {sessionData?.user?.name}
          </span>
        </p>
      )}
      {secretMessage && <p className="text-xl font-thin">{secretMessage}</p>}
      <button
        type="button"
        className="btn-primary btn my-2"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

function TechnologyCard({
  name,
  description,
  documentation,
}: TechnologyCardProps) {
  return (
    <section className="justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 hover:scale-105">
      <Link
        className="link-secondary link text-lg font-bold"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        {name}
      </Link>
      <p>{description}</p>
    </section>
  );
}

function Home() {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>ScottyLabs Full-Stack Template</title>
        <link rel="icon" href="/dog-logo.svg" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal md:text-[5rem]">
          Scotty<span className="text-red-500">Labs</span>
        </h1>
        <p className="text-2xl">This stack uses:</p>
        <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-3 lg:w-2/3">
          <TechnologyCard
            name="NextJS"
            description="The React framework for production"
            documentation="https://nextjs.org/"
          />
          <TechnologyCard
            name="TypeScript"
            description="Strongly typed programming language that builds on JavaScript"
            documentation="https://www.typescriptlang.org/"
          />
          <TechnologyCard
            name="TailwindCSS"
            description="Rapidly build modern websites without ever leaving your HTML"
            documentation="https://tailwindcss.com/"
          />
          <TechnologyCard
            name="tRPC"
            description="End-to-end typesafe APIs made easy"
            documentation="https://trpc.io/"
          />
          <TechnologyCard
            name="Next-Auth"
            description="Authentication for Next.js"
            documentation="https://next-auth.js.org/"
          />
          <TechnologyCard
            name="Prisma"
            description="Build data-driven JavaScript & TypeScript apps in less time"
            documentation="https://www.prisma.io/docs/"
          />
          <TechnologyCard
            name="Eslint"
            description="Find and fix problems in your JavaScript code"
            documentation="https://eslint.org/docs/latest/"
          />
          <TechnologyCard
            name="Prettier"
            description="You press save and code is formatted"
            documentation="https://prettier.io/docs/en/"
          />
          <TechnologyCard
            name="Husky"
            description="Modern native git hooks made easy"
            documentation="https://typicode.github.io/husky/#/"
          />
        </div>
        <div className="flex w-full items-center justify-center py-6 text-2xl text-success">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
        <AuthShowcase />
      </main>
    </>
  );
}

export default Home;
