import { useEffect, useRef } from "react";
import { Player } from "@/modules/domain/player";
import { usePlayerContext } from "@/modules/context/player_context";
import SearchPlayerTile from "../tile/search_player_tile";
export default function InputTextComponent({
  onChangeData,
  queryResults,
  clearResults,
}: {
  onChangeData: (event) => void;
  queryResults: Player[];
  clearResults: () => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const playerContext = usePlayerContext();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        clearResults();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (playerContext.isLoading && !playerContext.loadedData) {
    return <div></div>;
  }

  return (
    <div ref={divRef} className="max-w-[500px] w-full relative  ">
      <input
        ref={inputRef}
        type="text"
        onChange={onChangeData}
        onClick={onChangeData}
        placeholder="Buscar jogador..."
        className="w-full text-gray-500 p-2  border rounded-md shadow-sm focus:outline-none focus:ring-2 h-[50px]  bg-white  focus:ring-black "
      ></input>

      {queryResults.length > 0 && (
        <ul className="absolute z-30 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[50vh] overflow-y-auto ">
          {queryResults.map((player, _) => (
            <SearchPlayerTile
              key={player.id}
              player={player}
              onClick={() => {
                clearResults();
                inputRef.current!.value = "";
                playerContext.addGuessList(player);
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
/*{data != null && <CardPlayer />}*/
