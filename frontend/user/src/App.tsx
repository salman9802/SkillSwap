import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default App;
