import { Player } from "@/modules/domain/player";
import { UserHistory } from "@/modules/domain/user_history";
import MyUtils from "@/utils/utils";
import { differenceInDays } from "date-fns";

class LocalData {
  versionNumberKey = "versionNumberKey";
  playerListKey = "playerListKey";
  sortedPlayerKey = "sortedPlayerKey";
  playerGuessKey = "playerGuessKey";
  userHistoryKey = "UserHistoryKey";

  getVersionNumber() {
    const result = localStorage.getItem(this.versionNumberKey);
    return result != null ? parseInt(result, 10) : null;
  }

  saveVersionNumber(versionNumber: number) {
    try {
      localStorage.setItem(this.versionNumberKey, versionNumber.toString());
      return true;
    } catch {
      return false;
    }
  }

  getPlayerList(removeGuessData: boolean = false) {
    const result = localStorage.getItem(this.playerListKey);

    let playerData: Player[] = result != null ? JSON.parse(result) : [];
    if (removeGuessData) {
      let guessIds: number[] = [];
      const guessList = this.getPlayersGuesses();
      guessIds = guessList.map((item) => item.id);
      playerData = playerData.filter((item) => !guessIds.includes(item.id));
    }
    return playerData;
  }

  savePlayerList(listPlayer) {
    try {
      localStorage.setItem(this.playerListKey, JSON.stringify(listPlayer));
      return true;
    } catch {
      return false;
    }
  }

  getSortedPlayer() {
    const result = localStorage.getItem(this.sortedPlayerKey);
    return result != null ? JSON.parse(result) : null;
  }

  saveSortedPlayer(player) {
    try {
      localStorage.setItem(this.sortedPlayerKey, JSON.stringify(player));

      return true;
    } catch {
      return false;
    }
  }

  addPlayerGuesses(player: Player) {
    const result = localStorage.getItem(this.playerGuessKey);
    try {
      if (result == null) {
        const listPlayers = [player];
        localStorage.setItem(this.playerGuessKey, JSON.stringify(listPlayers));
      } else {
        let listUpdated: Player[] = JSON.parse(result);
        listUpdated = [...listUpdated, player];
        localStorage.setItem(this.playerGuessKey, JSON.stringify(listUpdated));
      }

      return true;
    } catch {
      return false;
    }
  }

  searchPlayer(query: string) {
    const listPlayers: Player[] = this.getPlayerList(true);

    const lowerCaseQueryParts = MyUtils.removeAccents(
      query.toLowerCase()
    ).split(" ");

    return listPlayers
      .filter((data: Player) => {
        const nameParts = data.name
          .toLowerCase()
          .split(" ")
          .map((part) => MyUtils.removeAccents(part));
        return lowerCaseQueryParts.every((queryPart) =>
          nameParts.some((namePart) => namePart.startsWith(queryPart))
        );
      })
      .slice(0, 15);
  }

  getPlayersGuesses(): Player[] {
    const result = localStorage.getItem(this.playerGuessKey);

    return result != null ? (JSON.parse(result) as Player[]).reverse() : [];
  }

  getUserHistory() {
    const result = localStorage.getItem(this.userHistoryKey);
    if (result == null) {
      return { streaks: 0, victorys: 0, victoryList: [] };
    } else {
      return JSON.parse(result);
    }
  }

  setUserHistory(userHistoryModel: UserHistory) {
    try {
      localStorage.setItem(
        this.userHistoryKey,
        JSON.stringify(userHistoryModel)
      );

      return true;
    } catch {
      return false;
    }
  }

  addWinGameToHistory(attempts: number) {
    const oldUserHistory: UserHistory = this.getUserHistory();
    if (oldUserHistory.victorys != 0) {
      const lastVictoryDate = new Date(
        oldUserHistory.victoryList[oldUserHistory.victoryList.length - 1].date
      );
      const newVictoryDate = new Date();

      const differenceInDaysValue = differenceInDays(
        newVictoryDate,
        lastVictoryDate
      );
      if (differenceInDaysValue === 1) {
        oldUserHistory.streaks += 1;
      } else {
        oldUserHistory.streaks == 1;
      }

      oldUserHistory.victorys += 1;
      oldUserHistory.victoryList.push({
        date: new Date().toISOString(),
        attempts,
      });
    } else {
      oldUserHistory.victorys = 1;
      oldUserHistory.streaks = 1;
      oldUserHistory.victoryList.push({
        date: new Date().toISOString(),
        attempts,
      });
    }
    this.setUserHistory(oldUserHistory);
  }
  resetPlayerGuesses() {
    try {
      localStorage.removeItem(this.playerGuessKey);
      return true;
    } catch {
      return false;
    }
  }
}
export default LocalData;
