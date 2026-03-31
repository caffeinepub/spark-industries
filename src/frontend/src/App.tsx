import { Toaster } from "@/components/ui/sonner";
import About from "./components/About";
import AdminPage from "./components/AdminPage";
import Capabilities from "./components/Capabilities";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import QuoteForm from "./components/QuoteForm";
import Services from "./components/Services";
import UtilityBar from "./components/UtilityBar";

export default function App() {
  const isAdminPage = window.location.pathname === "/admin";
  if (isAdminPage) return <AdminPage />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-right" />
      <UtilityBar />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Capabilities />
        <About />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
