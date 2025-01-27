import { useEffect, useRef, useState } from "react";
import gif from "../../../public/gifs/01_01.gif";
import ConfettiAnimation from "./component/confetti_animation";
import { usePlayerContext } from "@/modules/context/player_context";
import MyUtils from "@/utils/utils";
import GraphButton from "../graph_history/components/graph_button";
import { PiXLogoFill } from "react-icons/pi";
import { Attribution } from "@/utils/attribution";

export default function WinGameComponent() {
  const [timeLeft, setTimeLeft] = useState(MyUtils.calculateTimeLeft());
  const handleContentClick = (event) => {
    event.stopPropagation();
  };
  const playerContext = usePlayerContext();
  const gifPath = MyUtils.generateGif();
  useEffect(() => {
    setInterval(() => {
      setTimeLeft(MyUtils.calculateTimeLeft());
    }, 1000);
  }, []);
  return (
    <div
      onClick={handleContentClick}
      className="w-auto p-8 max-h-[78 vh] z-50  rounded-2xl border border-white bg-black  overflow-y-scroll"
    >
      <div className="relative flex flex-col justify-center items-center">
        <h2 className="text-2xl sm:text-4xl font-bold pb-8 pl-8 pr-8 text-center">
          Você ganhou!
        </h2>
        <img
          className="max-h-[45vh] max-w-[45vh] bg-black bg-center object-fill pb-3"
          src={`/gifs/${gifPath}.gif`}
        />
        <p
          className="cursor-pointer pb-6 customBlue text-customBlue "
          onClick={() =>
            MyUtils.launchUrl(Attribution.generateUrlAttribution(gifPath))
          }
        >
          {Attribution.generateNameAttribution(gifPath)}
        </p>

        <GraphButton
          Icon={PiXLogoFill}
          iconColor="black"
          backgroundColor="bg-white"
          hoverColor="hover:bg-gray-300"
          text="Compartilhar"
          textColor="text-black"
          onClick={() => {
            MyUtils.launchUrl(MyUtils.generateShareTextX(playerContext));
          }}
        />
        <p className=" text-white text-lg p-4 pb-2 pt-5 ">
          Proximo jogador em:
        </p>
        <p className="text-white text-2xl">{timeLeft}</p>
      </div>
    </div>
  );
}
