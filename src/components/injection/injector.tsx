"use client";

import SupabaseHandler from "../../modules/service/api/supabase_handler";
import LocalData from "../../modules/service/local/local_data";
import { ReactNode, useEffect, useState } from "react";
interface InjectorProps {
  children: ReactNode;
}

export default function Injector({ children }: InjectorProps) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const supabase_handler = new SupabaseHandler();
    const localData = new LocalData();
    const loadData = async () => {
      setIsLoading(true);
      var versionNumberResult = await supabase_handler.getVersionNumber();

      if (versionNumberResult != null) {
        const oldVersionNumber = localData.getVersionNumber();
        if (oldVersionNumber != versionNumberResult) {
          console.warn("new version detected");
          var playersList = await supabase_handler.getAllPlayers();
          if (playersList != null) {
            localData.savePlayerList(playersList!);
            localData.saveVersionNumber(versionNumberResult);
          } else {
            console.error("error: playersList");
          }
        }
      } else {
        console.error("error: versionNumberResult");
      }

      var sortedPlayer = await supabase_handler.getSortedPlayer();

      if (sortedPlayer != null) {
        var localSortedPlayer = localData.getSortedPlayer();
        if (
          localSortedPlayer == null ||
          sortedPlayer.id != localSortedPlayer.id
        ) {
          localData.saveSortedPlayer(sortedPlayer);
          localData.resetPlayerGuesses();
        }
      } else {
        console.error("error: sortedPlayer");
      }
      if (
        localData.getSortedPlayer() == null ||
        localData.getPlayerList().length == 0
      ) {
        console.error("error: tudo");
      }
      setIsLoading(false);
      return [];
    };

    loadData();
  }, []);

  return !isLoading && <>{children}</>;
}
