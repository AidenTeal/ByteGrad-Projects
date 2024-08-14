import H1 from "@/components/h1";
import { getEvent } from "@/lib/server-utils";
import { capitalize } from "@/lib/utils";
import axios from "axios";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

type TEventPage = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: TEventPage): Promise<Metadata> {
  const slug = params.slug;

  const event = await getEvent(slug);

  return {
    title: `${capitalize(event.name)} Event`,
  };
}

export async function generateStaticParams() {
  // top 100 more popular events
  return [{
    slug: 'comedy extravaganza'
  },
  {
    slug: 'dj-practice-session'
  }]; 
}

export default async function EventPage({ params }: TEventPage) {
  const slug = params.slug;
  const event = await getEvent(slug);

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          src={event.imageUrl}
          alt="Background Image"
          fill
          quality={50}
          sizes="(max-width: 1280) 100vw, 1280px"
          className="object-cover blur-3xl z-0"
          priority
        />

        <div className="z-1 flex flex-col relative gap-6 lg:gap-16 lg:flex-row">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />

          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {" "}
              {event.name}{" "}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              {" "}
              Organized by{" "}
              <span className="italic"> {event.organizerName} </span>
            </p>
            <button className="bg-white/20 text-lg capitalize w-[95vw] sm:w-full py-2 rounded-md border-white/10 border-2 bg-blur mt-5 lg:mt-auto state-effects">
              {" "}
              Get Tickets{" "}
            </button>
          </div>
        </div>
      </section>

      <div className="text-center px-5 py-16 min-h-[75vh]">
        <Section>
          <SectionHeading> About this event </SectionHeading>
          <SectionDetails> {event.description} </SectionDetails>
        </Section>
        <Section>
          <SectionHeading> Location </SectionHeading>
          <SectionDetails> {event.location} </SectionDetails>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="mb-12">
        {children}
    </section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8"> {children} </h2>;
}

function SectionDetails({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
      {children}
    </p>
  );
}
