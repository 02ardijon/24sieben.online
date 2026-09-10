import { Hero } from "@/components/marketing/hero";
import { Services } from "@/components/marketing/services";
import { About } from "@/components/marketing/about";
import { Portfolio } from "@/components/marketing/portfolio";
import { Contact } from "@/components/marketing/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Contact />
    </>
  );
}
