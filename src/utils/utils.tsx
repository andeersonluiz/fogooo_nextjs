export default class MyUtils {
  static now = new Date();

  static targetDate = new Date(
    this.now.getFullYear(),
    this.now.getMonth(),
    this.now.getDate(),
    23,
    59,
    29
  );
  static patternGif = [
    "01_01",
    "01_02",
    "01_03",
    "02_01",
    "02_02",
    "02_03",
    "03_01",
    "04_01",
    "04_02",
    "04_03",
    "04_04",
    "04_05",
    "05_01",
    "06_01",
    "07_01",
    "08_01",
  ];

  static removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  static normalizeDate(isoString: string) {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  static launchUrl = (url) => {
    window.open(url, "_blank");
  };

  static calculateTimeLeft() {
    const difference = +this.targetDate - +new Date();
    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    return "00:00:00";
  }

  static generateGif() {
    const now = new Date();

    const formattedDate = now.toLocaleDateString("pt-BR").replace(/\//g, "");

    const randomSeed = parseInt(formattedDate, 10);

    const randomIndex = Math.floor(randomSeed % this.patternGif.length);

    const result = this.patternGif[randomIndex];
    console.log(result);
    return result;
  }

  static _generateEmojiByNumber(number) {
    switch (number) {
      case "0":
        return "0⃣";
      case "1":
        return "1⃣";
      case "2":
        return "2⃣";
      case "3":
        return "3⃣";
      case "4":
        return "4⃣";
      case "5":
        return "5⃣";
      case "6":
        return "6⃣";
      case "7":
        return "7⃣";
      case "8":
        return "8⃣";
      case "9":
        return "9⃣";
    }
    return "";
  }

  static generateShareTextX(playerContext): string {
    let result = "";
    let count = 0;
    let extra = 0;

    const sortedPlayer = playerContext.sortedPlayer;
    const guessList = playerContext.guessList;

    for (const item of guessList) {
      if (count > 5) {
        extra += 1;
        continue;
      }

      if (item.nationality.id === sortedPlayer.nationality.id) {
        result += "🟩";
      } else {
        result += "🟥";
      }

      if (item.age === sortedPlayer.age) {
        result += "🟩";
      } else if (item.age > sortedPlayer.age) {
        result += "⬇️";
      } else {
        result += "⬆️";
      }

      if (item.pos === sortedPlayer.pos) {
        result += "🟩";
      } else {
        result += "🟥";
      }

      if (
        item.yearsPlayed.length === sortedPlayer.yearsPlayed.length &&
        item.yearsPlayed.every(
          (year, idx) => year === sortedPlayer.yearsPlayed[idx]
        )
      ) {
        result += "🟩";
      } else if (
        sortedPlayer.yearsPlayed.some((year) => item.yearsPlayed.includes(year))
      ) {
        result += "🟧";
      } else {
        result += "🟥";
      }

      if (item.playedForNationalTeam === sortedPlayer.playedForNationalTeam) {
        result += "🟩";
      } else {
        result += "🟥";
      }

      result += "%0a";
      count += 1;
    }

    if (extra > 0) {
      result += "➕";
      for (const char of extra.toString()) {
        result += this._generateEmojiByNumber(char);
      }
      result += "";
    } else {
      result += "";
    }

    return `https://x.com/intent/tweet?text=Ganhei no %23fogooo %23${playerContext.orderNumber} em ${guessList.length} tentativas.%0a%0a${result}%0a%0aJogue %23fogooo em: https://foogooo.com  %0a%0a%23Botafogo %23TempoDeBotafogo %23fogooo %23wordle %23VamosBOTAFOGO %23BFR`;
  }
}
