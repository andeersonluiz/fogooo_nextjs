"use client";
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Player } from "../domain/player";
import LocalData from "../service/local/local_data";
import SupabaseHandler from "../service/api/supabase_handler";

interface PlayerContextType {
  guessList: Player[];
  loadedData: boolean;
  addGuessList: (player: Player) => void;
  searchPlayer: (query: string) => Player[];
  handlePlayerWin: () => void;
  isLoading: boolean;
  sortedPlayer: Player;
  winGame: boolean;
  orderNumber: string;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const localDataRef = useRef<LocalData>(new LocalData());
  const supabaseRef = useRef<SupabaseHandler>(new SupabaseHandler());

  const [guessList, setGuessList] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [winGame, setWinGame] = useState<boolean | null>(null);
  const [orderNumber, setOrderNumber] = useState("");

  var sortedPlayer = useRef<Player | null>(null);
  var lastPlayerAdded: Player | null;
  const localData = localDataRef.current;
  const loadedDataRef = useRef(false);

  const addGuessList = (player: Player) => {
    setIsLoading(true);
    localData.addPlayerGuesses(player);
    lastPlayerAdded = player;
    setGuessList([player, ...guessList]);
  };

  const handlePlayerWin = () => {
    if (lastPlayerAdded == null && guessList.length > 0) {
      if (guessList[0].id == sortedPlayer.current.id) {
        localData.addWinGameToHistory(guessList.length);
        document.body.style.overflow = "hidden";
        return setWinGame(true);
      } else {
        return setWinGame(false);
      }
    } else {
      if (lastPlayerAdded.id == sortedPlayer.current.id) {
        localData.addWinGameToHistory(1);
        document.body.style.overflow = "hidden";
        return setWinGame(true);
      } else {
        return setWinGame(false);
      }
    }
  };

  const searchPlayer = (query: string) => {
    return localData.searchPlayer(query);
  };

  useEffect(() => {
    const getOrder = async () => {
      setOrderNumber(await supabaseRef.current.getOrderNumber());
    };

    getOrder();
  }, []);

  useEffect(() => {
    var guesses = localData.getPlayersGuesses();
    sortedPlayer.current = localData.getSortedPlayer();

    setGuessList(guesses);
    if (guesses.length > 0) {
      if (guesses[0].id == sortedPlayer.current.id) {
        document.body.style.overflow = "hidden";
        return setWinGame(true);
      } else {
        return setWinGame(false);
      }
    }
  }, []);

  useEffect(() => {
    loadedDataRef.current = true;
    setIsLoading(false);
  }, [guessList]);

  return (
    <PlayerContext.Provider
      value={{
        guessList,
        addGuessList,
        searchPlayer,
        handlePlayerWin,
        loadedData: loadedDataRef.current,
        isLoading,
        sortedPlayer: sortedPlayer.current,
        winGame,
        orderNumber,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context == null) {
    throw new Error("context player must be provided");
  }
  return context;
};
