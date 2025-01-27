export class Attribution {
  static generateUrlAttribution(path: string): string {
    const initial = path.split("/").pop()?.substring(0, 2) || "";

    switch (initial) {
      case "01":
        return "https://www.tiktok.com/@homem.aranha.alvinegro";
      case "02":
        return "https://twitter.com/Botafogo";
      case "03":
        return "https://www.tiktok.com/@gordin_rj";
      case "04":
        return "https://www.tiktok.com/@botafogo";
      case "05":
        return "https://www.tiktok.com/@mcjackbrabo_";
      case "06":
        return "https://www.tiktok.com/@informafogo";
      case "07":
        return "https://www.tiktok.com/@paporetobotafogo";
      case "08":
        return "https://www.tiktok.com/@pedrobfr19";
    }

    return "";
  }

  static generateNameAttribution(path: string): string {
    const initial = path.split("/").pop()?.substring(0, 2) || "";
    let value = "";

    switch (initial) {
      case "01":
        value = "Sigam o Tiktok do @homem.aranha.alvinegro";
        break;
      case "02":
        value = "Sigam o X do @Botafogo";
        break;
      case "03":
        value = "Sigam o Tiktok do @gordin_rj";
        break;
      case "04":
        value = "Sigam o Tiktok do @Botafogo";
        break;
      case "05":
        value = "Sigam o Tiktok do @mcjackbrabo_";
        break;
      case "06":
        value = "Sigam o Tiktok do @informafogo";
        break;
      case "07":
        value = "Sigam o Tiktok do @paporetobotafogo";
        break;
      case "08":
        value = "Sigam o Tiktok do @pedrobfr19";
        break;
    }

    return value;
  }
}
