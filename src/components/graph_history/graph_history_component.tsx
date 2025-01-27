import { UserHistory } from "@/modules/domain/user_history";
import LocalData from "@/modules/service/local/local_data";
import { useEffect, useState } from "react";
import LabelTile from "./components/label_tile";
import CardLineChart from "./components/line_chart";
import GraphButton from "./components/graph_button";
import { FaCopy } from "react-icons/fa";
import { PiXLogoFill } from "react-icons/pi";
import { IoMdShare } from "react-icons/io";
import MyUtils from "@/utils/utils";
import toast from "react-hot-toast";

export default function GraphHistoryComponent() {
  const [userHistory, setUserHistory] = useState<UserHistory | null>(null);

  const handleContentClick = (event) => {
    event.stopPropagation();
  };
  let meanAttempts = 0;
  let firstVictory = 0;
  useEffect(() => {
    const userHistoryTemp = new LocalData().getUserHistory();
    setUserHistory(userHistoryTemp);

    meanAttempts =
      userHistoryTemp.victoryList.reduce(
        (sum, data) => sum + data.attempts,
        0
      ) /
        userHistoryTemp.victoryList.length ==
      0
        ? 1
        : userHistoryTemp.victoryList.length;
    firstVictory = userHistoryTemp.victoryList.filter(
      (value) => value.attempts == 1
    ).length;
  }, []);

  if (userHistory == null) {
    return <div />;
  }
  const dataCopy = `Minhas estatísticas em fogooo:\n✌️ Vitórias: ${userHistory.victorys}\n🤓 Média de adivinhações: ${meanAttempts}\n🥇 De primeira: ${firstVictory}\n🔥 Sequência de vitórias: ${userHistory.streaks}\n\nJogue #fogooo em: https://fogooo.vercel.app \n\n #Botafogo #TempoDeBotafogo #fogooo #wordle #VamosBOTAFOGO #BFR `;
  const dataShareX = `Minhas estatísticas em %23fogooo:%0a✌️ Vitórias: ${userHistory.victorys}%0a🤓 Média de adivinhações: ${meanAttempts}%0a🥇 De primeira: ${firstVictory}%0a🔥 Sequência de vitórias: ${userHistory.streaks}%0aJogue %23fogooo em: https://fogooo.vercel.app %0a%0a %23Botafogo %23TempoDeBotafogo %23fogooo %23wordle %23VamosBOTAFOGO %23BFR`;
  const dataShare = `Minhas estatísticas em fogooo:\n✌️ Vitórias: ${userHistory.victorys}\n🤓 Média de adivinhações: ${meanAttempts}\n🥇 De primeira: ${firstVictory}\n🔥 Sequência de vitórias: ${userHistory.streaks}\n\nJogue #fogooo em: https://fogooo.vercel.app`;

  return (
    <div
      onClick={handleContentClick}
      className="bg-black w-4/5 max-h-[75vh] z-50  rounded-2xl border border-white p-4 overflow-y-auto "
    >
      <div className="text-center text-white">
        <h2 className="text-4xl font-bold p-4">ESTATÍSTICAS</h2>
      </div>

      <hr className="border-t border-white my-4" />

      <div className="flex flex-wrap sm:flex-nowrap  text-white justify-center  p-2 gap-8">
        <LabelTile
          title="Jogos ganhos"
          value={userHistory.victorys}
        ></LabelTile>
        <LabelTile
          title=" Média de tentativas por jogo"
          value={meanAttempts}
        ></LabelTile>
        <LabelTile title="De primeira" value={firstVictory}></LabelTile>
        <LabelTile
          title="Sequência de vitórias"
          value={userHistory.streaks}
        ></LabelTile>
      </div>

      <section className="text-white pt-2">
        {userHistory.victoryList.length != 0 ? (
          <CardLineChart victoryInfo={userHistory.victoryList} />
        ) : (
          <p className=" text-center text-xl flex justify-center h-[400px] items-center">
            Não há dados suficientes para gerar o grafico
          </p>
        )}
      </section>

      <section className=" py-8 flex gap-8 p-4  justify-center flex-wrap sm:flex-nowrap text-black">
        <GraphButton
          Icon={PiXLogoFill}
          iconColor="black"
          backgroundColor="bg-white"
          hoverColor="hover:bg-gray-300"
          text="Compartilhar no X"
          textColor="text-black"
          onClick={() => {
            MyUtils.launchUrl(`https://x.com/intent/tweet?text=${dataShareX}`);
          }}
        />

        <GraphButton
          Icon={IoMdShare}
          iconColor="white"
          backgroundColor="bg-blue-500"
          hoverColor="hover:bg-blue-400"
          text="Compartilhar"
          textColor="text-white"
          onClick={async () => {
            if (navigator.share) {
              try {
                await navigator.share({
                  title: "Minhas estatísticas em #fogooo",
                  text: dataShare,
                });
              } catch {
                toast.error("Erro ao compartilhar,tente novamente mais tarde");
              }
            } else {
              toast.error(
                "Erro ao compartilhar, seu navegador é suportado, por favor, tente outro navegador"
              );
            }
          }}
        />
        <GraphButton
          Icon={FaCopy}
          iconColor="white"
          backgroundColor="bg-pink-500"
          hoverColor="hover:bg-pink-400"
          text="Copiar conteúdo"
          textColor="text-white"
          onClick={() => navigator.clipboard.writeText(dataCopy)}
        />
      </section>
    </div>
  );
}
