import { Player } from "@/modules/domain/player";

export default function SearchPlayerTile({
  player,

  onClick,
}: {
  player: Player;
  onClick: () => void;
}) {
  return (
    <li
      key={player.id}
      className="px-4 py-2 cursor-pointer hover:bg-gray-100 "
      onClick={onClick}
    >
      <div className="flex h-[100px] flex-row  items-center justify-center">
        <div className="flex flex-1 h-full justify-center px-2 items-center overflow-hidden">
          <img className=" object-cover h-full w-full" src={player.imageUrl} />
        </div>
        <div className="flex flex-[4] line-clamp-2 ">
          <p className=" text-gray-500 line-clamp-2  w-full  text-gray-60 text-ellipsis">
            {player.name}
          </p>
        </div>
      </div>
    </li>
  );
}
