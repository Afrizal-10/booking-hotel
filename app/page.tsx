import Hero from "@/components/hero";
import Body from "@/components/body";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <div className="mt-16" />
      <div className="text-center">
        <h1 className="text-4xl font-bold uppercase">Room & Rates</h1>
        <p className="py-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          doloribus?
        </p>
      </div>
      <Body />
    </>
  );
}
