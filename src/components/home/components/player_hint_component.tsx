import { useEffect, useRef, useState } from "react";
import SHA256 from "crypto-js/sha256";
import seedrandom from "seedrandom";
import { usePlayerContext } from "@/modules/context/player_context";
import Spacer from "@/utils/spacer";
import MyUtils from "@/utils/utils";

export default function PlayerHintComponent() {
  const playerContext = usePlayerContext();
  const [hiddenName, setHiddenName] = useState("");
  const [winGame, setWinGame] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(MyUtils.calculateTimeLeft());

  const firstLoad = useRef<boolean>(true);

  const getHiddenName = () => {
    let name = playerContext.sortedPlayer.name;
    const count = playerContext.guessList.length;
    const orderStrings = _shuffleName(name).filter((e) => e.trim() !== "");

    let hiddenName = name
      .split("")
      .map((e) => (e !== " " ? "_" : e))
      .join("");

    const countRodadas = Math.floor(count / 5);
    let dicas = countRodadas * Math.ceil(name.length * 0.1);
    dicas = dicas < 1 ? 1 : dicas;

    if (orderStrings.length <= dicas + 1) {
      dicas = orderStrings.length - 1;
    }

    for (let j = 0; j < dicas; j++) {
      const characters = hiddenName.split("");
      const index = name.indexOf(orderStrings[0]);

      characters[index] = orderStrings[0];
      const nameTemp = name.split("");
      nameTemp[index] = "_";
      name = nameTemp.join("");
      hiddenName = characters.join("");
      orderStrings.shift();
    }
    setHiddenName(hiddenName);
  };

  const _shuffleName = (name) => {
    const hash = SHA256(name).toString();
    const numbers = Array.from(hash).map((char: string) => parseInt(char, 16));
    const letters = name.split("");
    const random = seedrandom(numbers.reduce((a, b) => a + b, 0).toString());
    letters.sort(() => random() - 0.5);
    return letters;
  };

  useEffect(() => {
    if (playerContext.winGame != null) {
      if (playerContext.winGame) {
        setWinGame(true);
      } else {
        setWinGame(false);
      }
    }
  }, [playerContext.winGame]);

  useEffect(() => {
    if (
      playerContext.loadedData &&
      firstLoad.current &&
      !playerContext.isLoading &&
      playerContext.guessList.length > 0
    ) {
      if (playerContext.guessList[0].id == playerContext.sortedPlayer.id) {
        setWinGame(true);
      } else {
        setWinGame(false);
      }
      if (playerContext.guessList.length >= 5) {
        getHiddenName();
      }
      firstLoad.current = false;
    }

    if (
      playerContext.guessList.length != 0 &&
      playerContext.guessList.length % 5 == 0
    ) {
      getHiddenName();
    }
  }, [playerContext.guessList]);

  useEffect(() => {
    setInterval(() => {
      setTimeLeft(MyUtils.calculateTimeLeft());
    }, 1000);
  }, []);

  if (!winGame && playerContext.guessList.length < 5) {
    return <div></div>;
  }

  return (
    <div className="h-[200px]  border-white border-2 w-full max-w-[500px] flex flex-col items-center justify-center  mb-8">
      {winGame != null && (
        <div className="h-full  w-full flex flex-col items-center justify-center  ">
          {!winGame ? (
            <>
              <p className="text-white text-2xl pt-8 font-bold">Dica</p>
              <Spacer />
              <p className="text-white text-2xl tracking-custom pb-8">
                {hiddenName}
              </p>
              <Spacer />
            </>
          ) : (
            <>
              <p className="text-white  text-2xl font-bold">Voce acertou!!!</p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-x-2 text-xl pt-4 px-2">
                <p className="text-white ">O jogador era: </p>
                <p className="text-white  font-bold">
                  {playerContext.sortedPlayer.name}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-x-2 text-xl pt-4">
                <p className="text-white ">Próximo jogador em:</p>
                <p className="text-white text-2xl pt-1 font-semibold ">
                  {" "}
                  {timeLeft}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
