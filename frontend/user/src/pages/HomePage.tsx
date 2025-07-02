import FloatingPiecesBg from "@/components/FloatingPiecesBg";
import Features from ".././components/Features";
import Footer from ".././components/Footer";
import Header from ".././components/Header";
import Hero from ".././components/Hero";
const HomePage = () => {
  return (
    <div className="w-full">
      <FloatingPiecesBg
        puzzlePieces={[
          { top: "10%", left: "15%", delay: "0s", size: "3rem" },
          // { top: "30%", left: "70%", delay: "2s", size: "4rem" },
          { top: "50%", left: "40%", delay: "4s", size: "2.5rem" },
          { top: "75%", left: "20%", delay: "1s", size: "3.5rem" },
          // { top: "20%", left: "85%", delay: "3s", size: "3rem" },

          { top: "110%", left: "20%", delay: "0s", size: "3rem" },
          // { top: "120%", left: "50%", delay: "1s", size: "4rem" },
          { top: "130%", left: "75%", delay: "2s", size: "3.2rem" },
          { top: "115%", left: "10%", delay: "0.5s", size: "2.8rem" },
          // { top: "125%", left: "60%", delay: "1.5s", size: "3.5rem" },
        ]}
      />
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default HomePage;
