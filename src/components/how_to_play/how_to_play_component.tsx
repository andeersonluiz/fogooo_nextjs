import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MyUtils from "@/utils/utils";

const HowToPlayPopUp = () => {
  const [timeLeft, setTimeLeft] = useState(MyUtils.calculateTimeLeft());

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    setInterval(() => {
      setTimeLeft(MyUtils.calculateTimeLeft());
    }, 1000);
  }, []);

  return (
    <div
      onClick={handleContentClick}
      className="bg-black w-4/5 max-h-[75vh] z-50  rounded-2xl border border-white p-4 overflow-y-auto "
    >
      <div className="text-center text-white">
        <h2 className="text-4xl font-bold mt-4">COMO JOGAR</h2>
        <p className="text-base mt-4">
          Descubra o jogador que passou pelo Botafogo. A mudança é feita a cada
          24h.
        </p>
        <p className="text-base mt-4">Próximo jogador em:</p>
        <p className="text-lg font-bold mt-2">{timeLeft}</p>
      </div>

      <hr className="border-t border-white my-4" />

      <section className="text-white">
        <h3 className="text-2xl mb-2">Cores</h3>
        <p className="text-sm mb-2">
          As cores indicam o quão perto você está de acertar a característica.
        </p>
        <ul className="space-y-2">
          <li>
            <span className="font-bold text-green-700">Verde</span>: Você
            acertou exatamente a característica.
          </li>
          <li>
            <span className="font-bold text-orange-700">Laranja</span>: Você
            acertou parcialmente a característica.
          </li>
          <li>
            <span className="font-bold text-red-700">Vermelho</span>: Você errou
            a característica.
          </li>
          <li>
            <span className="font-bold text-blue-700">Setas</span>: As setas
            indicam se o palpite está acima ou abaixo do seu palpite.
          </li>
        </ul>
      </section>

      <hr className="border-t border-white my-4" />

      <section className="text-white">
        <h3 className="text-2xl mb-2">Características</h3>
        <p className="text-sm mb-2">
          Os dados dos jogadores foram obtidos através da plataforma
          <a
            href="https://www.ogol.com.br/team_players.php?pos=0&pais=0&epoca_stats_id=0&id=2233&menu="
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline ml-1"
          >
            oGol
          </a>
          . Caso haja alguma inconsistência, entre em contato por
          <a
            href="mailto:devowlytech@gmail.com"
            className="text-blue-500 underline ml-1"
          >
            email
          </a>
          .
        </p>
        <p className="text-sm mb-2">
          Apenas jogadores com mais de 10 partidas registradas foram incluídos.
        </p>
        <h4 className="text-lg font-bold">País de nascimento</h4>
        <p className="text-sm mb-2">
          Representa o país onde o jogador nasceu. País de nascimento ≠
          Nacionalidade.
        </p>
        <h4 className="text-lg font-bold">Idade</h4>
        <p className="text-sm mb-2">
          Indica a idade do jogador. Se o jogador for falecido, exibe
          "Falecido".
        </p>
        <h4 className="text-lg font-bold">Posição</h4>
        <p className="text-sm mb-2">
          Exibe a posição do jogador. Pode ser Goleiro, Defensor, Meia ou
          Atacante.
        </p>
        <h4 className="text-lg font-bold">Anos que jogou no Botafogo</h4>
        <p className="text-sm mb-2">
          Indica os anos em que esteve no Botafogo.
        </p>
        <h4 className="text-lg font-bold">Convocado pela seleção brasileira</h4>
        <p className="text-sm mb-2">
          Exibe se o jogador foi convocado pela seleção brasileira (apenas no
          nível profissional).
        </p>
      </section>

      <hr className="border-t border-white my-4" />

      <section className="text-white">
        <h3 className="text-2xl mb-2">Dicas</h3>
        <p className="text-sm mb-2">
          A cada 5 tentativas, são revelados alguns caracteres do jogador. A
          cada 5 tentativas adicionais, mais caracteres são exibidos até restar
          apenas um.
        </p>
        <p className=" flex justify-center p-8 text-xl font-bold mt-4">
          BOA SORTE E FOGOOO!!!
        </p>
      </section>
    </div>
  );
};

HowToPlayPopUp.propTypes = {
  timeRemaining: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HowToPlayPopUp;
