import FloatingPiecesBg from "@/components/FloatingPiecesBg";
import Features from ".././components/Features";
import Footer from ".././components/Footer";
import Header from ".././components/Header";
import Hero from ".././components/Hero";
import Gamification from "@/components/Gamification";
import DemoAnnouncement from "@/components/DemoAnnouncement";
const HomePage = () => {
  return (
    <div className="w-full">
      <FloatingPiecesBg
        puzzlePieces={[
          { top: "10%", left: "15%", delay: "0s", size: "3rem", rotate: "12" },
          // { top: "30%", left: "70%", delay: "2s", size: "4rem" , rotate: "245"},
          {
            top: "50%",
            left: "40%",
            delay: "4s",
            size: "2.5rem",
            rotate: "98",
          },
          {
            top: "75%",
            left: "20%",
            delay: "1s",
            size: "3.5rem",
            rotate: "37",
          },
          // { top: "20%", left: "85%", delay: "3s", size: "3rem" , rotate: "183"},

          {
            top: "110%",
            left: "20%",
            delay: "0s",
            size: "3rem",
            rotate: "321",
          },
          // { top: "120%", left: "50%", delay: "1s", size: "4rem" , rotate: "67"},
          {
            top: "130%",
            left: "75%",
            delay: "2s",
            size: "3.2rem",
            rotate: "209",
          },
          {
            top: "115%",
            left: "10%",
            delay: "0.5s",
            size: "2.8rem",
            rotate: "154",
          },
          // { top: "125%", left: "60%", delay: "1.5s", size: "3.5rem" , rotate: "290"},
        ]}
      />
      <DemoAnnouncement />
      <div className="px-2">
        <Header />
        <Hero />
        <Features />
        <Gamification />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
