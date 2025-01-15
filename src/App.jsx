import React, { useEffect, useRef, useState } from "react";
import { useConversation } from "@11labs/react";
import Liyla from "./assets/Type=Layila.svg";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { JobProvider } from "./Context/LaiylaJobPostContext";
const App = () => {
  const [liylaStatus, setLiylaStatus] = useState(false);
  const conversation = useConversation();
  const gradientRef = useRef(null);
  const rotationRef = useRef(0);
  const toggleLiylaStatus = async () => {
    setLiylaStatus((prev) => !prev);
    if (!liylaStatus) {
      const conversationId = await conversation.startSession({
        agentId: import.meta.env.VITE_APP_ELEVENLABS,
      });
      console.log("11 labs activated: ", conversationId);
    } else {
      await conversation.endSession();
    }
  };
  useEffect(() => {
    const rotateGradient = () => {
      if (gradientRef.current) {
        rotationRef.current = (rotationRef.current - 0.7) % 360;
        gradientRef.current.style.transform = `translateY(10%) rotate(${rotationRef.current}deg)`;
      }
    };

    const animationFrame = requestAnimationFrame(function animate() {
      rotateGradient();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      <JobProvider>
        {/* Navbar */}
        <Navbar assistant={Liyla} onLiylaActivate={toggleLiylaStatus} />
        <main className="bg-[#464646] h-screen w-full flex justify-center items-center">
          <div className="w-1/2">
            <div className={`relative w-[780px]  `}>
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div
                  ref={gradientRef}
                  className="absolute inset-[-630%] origin-center"
                  style={{
                    background: `conic-gradient(from 180deg at 50% 50%, #002DBF 0deg, #4396F7 101.35deg, #FF9BD2 191.63deg, #C9FFFC 278.78deg, #002DBF 352.8deg, #002DBF 360deg)`,
                    transform: "translateY(10%)",
                  }}
                />
              </div>

              <form
                action=""
                className="bg-transparent px-8 py-4 flex items-center gap-3 rounded-full  w-full relative z-10 text-gray-600"
              >
                <FiSearch className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="AI Engineer with score above 95"
                  className="w-full bg-transparent border-none outline-none text-lg placeholder:text-gray-600 font-normal   text-gray-600"
                />
              </form>
            </div>
          </div>
        </main>
      </JobProvider>
    </>
  );
};

export default App;
