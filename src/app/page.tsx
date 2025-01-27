"use client";

import InputTextComponent from "@/components/home/components/input_text_component";
import PlayerInfoComponent from "@/components/home/components/player_info_component";
import {
  PlayerContext,
  PlayerProvider,
  usePlayerContext,
} from "@/modules/context/player_context";
import { Player } from "@/modules/domain/player";
import LocalData from "@/modules/service/local/local_data";
import {
  Autocomplete,
  Button,
  Input,
  MantineProvider,
  TextInput,
} from "@mantine/core";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import logo from "../../public/images/white_logo.png";
import PlayerHintComponent from "@/components/home/components/player_hint_component";
import Popup from "@/utils/pop_up";
import HowToPlayPopUp from "@/components/how_to_play/how_to_play_component";
import { FaChartArea, FaQuestion } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import GraphHistoryComponent from "@/components/graph_history/graph_history_component";
import { UserHistory } from "@/modules/domain/user_history";
import { toast } from "react-hot-toast";
import FeedbackComponent from "@/components/feedback/feedback_component";
import WinGameComponent from "@/components/win_game/win_game_component";
import ConfettiAnimation from "@/components/win_game/component/confetti_animation";
import MyUtils from "@/utils/utils";
import Footer from "@/components/footer/footer";

export default function Home() {
  const [queryResults, setQueryResults] = useState<Player[]>([]);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showGraphHistory, setShowGraphHistory] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [winGame, showWinGame] = useState(false);
  const playerContext = usePlayerContext();

  const handleInputChange = (event: any) => {
    const value = event.target.value;

    if (value.length > 0) {
      setQueryResults(playerContext.searchPlayer(value));
    } else {
      setQueryResults([]);
    }
  };

  useEffect(() => {
    if (playerContext.winGame) {
      showWinGame(playerContext.winGame);
    }
  }, [playerContext.winGame]);

  useEffect(() => {
    setInterval(() => {
      if (MyUtils.calculateTimeLeft() == "00:00:00") {
        window.location.reload();
      }
    }, 1000);
  }, []);

  return (
    <div className=" h-full flex flex-1 flex-col">
      <main className="flex flex-col ">
        <MantineProvider>
          <Popup
            isOpen={showHowToPlay}
            onClose={() => {
              document.body.style.overflow = "auto";
              setShowHowToPlay(false);
            }}
          >
            <HowToPlayPopUp timeRemaining={30} />
          </Popup>
          <Popup
            isOpen={showGraphHistory}
            onClose={() => {
              document.body.style.overflow = "auto";
              setShowGraphHistory(false);
            }}
          >
            <GraphHistoryComponent />
          </Popup>
          <Popup
            isOpen={showFeedback}
            onClose={() => {
              document.body.style.overflow = "auto";
              setShowFeedback(false);
            }}
          >
            <FeedbackComponent
              onClose={() => {
                document.body.style.overflow = "auto";
                setShowFeedback(false);
                toast.success(
                  "Feedback enviado com sucesso. Obrigado por nos ajudar a melhorar cada vez mais!!"
                );
              }}
            />
          </Popup>

          <Popup
            isOpen={winGame}
            showConffetti={true}
            onClose={() => {
              document.body.style.overflow = "auto";
              showWinGame(false);
            }}
          >
            <WinGameComponent />
          </Popup>
          <div className="flex justify-center p-8   ">
            <img src={logo.src} className="w-80 " />
          </div>

          <div className="flex gap-4 mb-6 justify-center space-x-3">
            <Button
              onClick={() => {
                document.body.style.overflow = "hidden";
                setShowHowToPlay(true);
              }}
              className="p-4 items-center bg-white text-white rounded-full"
            >
              <FaQuestion color="black" size={20} />
            </Button>

            <Button
              onClick={() => {
                document.body.style.overflow = "hidden";
                setShowGraphHistory(true);
              }}
              className={`p-4 items-center bg-white  text-white rounded-full`}
            >
              <FaChartArea color="black" size={20} />
            </Button>
            <Button
              onClick={() => {
                document.body.style.overflow = "hidden";
                setShowFeedback(true);
              }}
              className="p-4 items-center bg-white text-white rounded-full"
            >
              <MdFeedback color="black" size={20} />
            </Button>
          </div>

          <div className="flex w-full  items-center justify-center">
            <PlayerHintComponent />
          </div>
          {!playerContext.winGame && (
            <div className="flex w-full  items-center justify-center px-8 ">
              <InputTextComponent
                onChangeData={handleInputChange}
                queryResults={queryResults}
                clearResults={() => setQueryResults([])}
              />
            </div>
          )}
          {!playerContext.isLoading && playerContext.guessList.length == 0 && (
            <div className="flex justify-center  w-full pt-4 px-8 ">
              <p className=" border-gray-300    border-2 p-6 max-w-[500px] w-full text-center rounded-2xl bg-black bg-opacity-50">
                Mais 5 tentativas para dica
              </p>
            </div>
          )}

          <div className="w-full overflow-x-auto flex justify-start md:justify-center px-8 ">
            <PlayerInfoComponent />
          </div>
        </MantineProvider>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
