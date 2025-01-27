import { useEffect, useRef, useState } from "react";
import CardPlayer from "../tile/card_player_tile";
import { usePlayerContext } from "@/modules/context/player_context";
import CardHeader from "../tile/card_header";
import { Player } from "@/modules/domain/player";
import CardPlayerTile from "../tile/card_player_tile";

export enum AgeStatus {
  None,
  Lower,
  Equal,
  Upper,
}

export default function PlayerInfoComponent() {
  const playerContext = usePlayerContext();

  const firstLoad = useRef<boolean>(true);
  const timeoutIds = useRef([]);
  if (playerContext.guessList == null) {
    return <p> Carregando...</p>;
  }

  const [flippedData, setFlippedIndex] = useState<boolean[]>(
    Array(6).fill(true)
  );

  const flipCards = () => {
    flippedData.forEach((_, index) => {
      const timeoutId = setTimeout(() => {
        setFlippedIndex(
          [...flippedData].map((_, i) => {
            return i <= index ? true : false;
          })
        );
        if (index == 5) {
          playerContext.handlePlayerWin();
        }
      }, (index + 1) * 500);
      timeoutIds.current.push(timeoutId);
    });
  };

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach(clearTimeout);
      timeoutIds.current = [];
    };
  }, []);

  useEffect(() => {
    if (
      playerContext.guessList.length > 0 &&
      playerContext.guessList[0].id != playerContext.sortedPlayer.id
    ) {
      playerContext.handlePlayerWin();
    }

    if (!firstLoad.current) {
      timeoutIds.current.forEach(clearTimeout);
      timeoutIds.current = [];
      setFlippedIndex(Array(6).fill(false));
    }

    if (playerContext.loadedData) {
      firstLoad.current = false;
    }
  }, [playerContext.guessList]);

  useEffect(() => {
    if (!flippedData.includes(true)) {
      flipCards();
    }
  }, [flippedData]);

  const getAgeStatus = (ageSorted: number, agePlayer: number) => {
    if (agePlayer == -1) {
      return AgeStatus.None;
    }
    if (ageSorted > agePlayer) {
      return AgeStatus.Upper;
    } else if (ageSorted < agePlayer) {
      return AgeStatus.Lower;
    }

    return AgeStatus.Equal;
  };

  const getPlayerInterval = (playerInterval: number[]): string => {
    const result: number[][] = [];
    playerInterval.reduce((old, item) => {
      if (result.length == 0 || item - old !== 1) {
        result.push([item]);
      } else {
        result[result.length - 1].push(item);
      }

      return item;
    }, -1);
    return result
      .map((subArray) =>
        subArray.length === 1
          ? `[${subArray[0]}]`
          : `[${subArray[0]}-${subArray[subArray.length - 1]}]`
      )
      .join(",");
  };

  const renderPlayerInfo = (player: Player, index: number) => {
    const playerData = [
      <CardPlayerTile backgroundColor="bg-black">
        <img
          className="object-contain w-full h-full"
          src={player.imageUrl}
          alt={`Imagem do jogador ${player.name}`}
        />
      </CardPlayerTile>,

      <CardPlayerTile
        backgroundColor={
          playerContext.sortedPlayer.nationality.country ==
          player.nationality.country
            ? "bg-green-700"
            : "bg-red-600 "
        }
      >
        <img src={player.nationality.image} alt="Nacionalidade" />
      </CardPlayerTile>,

      <CardPlayerTile
        ageStatus={getAgeStatus(playerContext.sortedPlayer.age, player.age)}
        backgroundColor={
          playerContext.sortedPlayer.age == player.age
            ? "bg-green-700"
            : "bg-red-600"
        }
      >
        <p className="text-white">
          {player.age == -1 ? "Falecido" : player.age}
        </p>
      </CardPlayerTile>,

      <CardPlayerTile
        backgroundColor={
          playerContext.sortedPlayer.pos == player.pos
            ? "bg-green-700"
            : "bg-red-600"
        }
      >
        <p className="text-white">{player.pos}</p>
      </CardPlayerTile>,
      <CardPlayerTile
        backgroundColor={
          JSON.stringify(playerContext.sortedPlayer.yearsPlayed) ==
          JSON.stringify(player.yearsPlayed)
            ? "bg-green-700"
            : playerContext.sortedPlayer.yearsPlayed.some((yearData) =>
                player.yearsPlayed.includes(yearData)
              )
            ? "bg-yellow-600"
            : "bg-red-600"
        }
      >
        <p className="text-white lines">
          {getPlayerInterval(player.yearsPlayed)}
        </p>
      </CardPlayerTile>,
      <CardPlayerTile
        backgroundColor={
          playerContext.sortedPlayer.playedForNationalTeam ==
          player.playedForNationalTeam
            ? "bg-green-700"
            : "bg-red-600"
        }
      >
        <p className="text-white">
          {player.playedForNationalTeam ? "Sim" : "Não"}
        </p>
      </CardPlayerTile>,
    ];
    return playerData[index];
  };

  return (
    <div className={``}>
      {playerContext.guessList.length > 0 && (
        <div className="flex items-center justify-center align-center gap-4 pt-4">
          <CardHeader text="Jogador" />
          <CardHeader text="Nacionalidade" />
          <CardHeader text="Idade" />
          <CardHeader text="Posição" />
          <CardHeader text="Anos Jogados" />
          <CardHeader text="Jogou pela sua seleção nacional" />
        </div>
      )}
      {playerContext.guessList.map((player, index) => (
        <div className="flex flex-col items-center" key={player.id}>
          <p className="pt-8 pb-5 text-white text-lg ">{player.name}</p>
          <div className="flex items-center justify-center align-center gap-4 ">
            {index === 0 ? (
              flippedData.map((flipped, i) => (
                <div
                  key={i}
                  className={` ${playerContext.isLoading ? "opacity-0" : ""} ${
                    flipped
                      ? "transition-transform duration-700 transform-style-preserve-3d [transform:rotateY(0deg)]"
                      : "[transform:rotateY(90deg)]"
                  }`}
                >
                  <div>{renderPlayerInfo(player, i)}</div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center align-center gap-4 ">
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i}>
                      <div>{renderPlayerInfo(player, i)}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
