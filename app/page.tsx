import Sidebar from "@/components/layout/Sidebar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Gallery from "@/components/sections/Gallery";
import Blogs from "@/components/sections/Blogs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg text-primary">
      {/* Sidebar / Navbar Layout Component */}
      <Sidebar />

      {/* Main Content Area (Offset by 64 (16rem) on desktop to clear fixed left sidebar) */}
      <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Gallery />
          <Blogs />
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}

