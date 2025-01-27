import React from "react";
import Confetti from "react-confetti";

export default function ConfettiAnimation() {
  return (
    <div className="absolute z-50 confetti-animation   w-full h-full flex   pointer-events-none">
      <Confetti
        colors={["#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF"]}
        drawShape={(ctx) => {
          ctx.beginPath();

          const spikes = 5; // Número de pontas da estrela
          const outerRadius = 10; // Raio externo (pontos da estrela)
          const innerRadius = 5; // Raio interno (entre as pontas)
          const angleOffset = Math.PI / 2; // Para começar o desenho na parte superior

          for (let i = 0; i < spikes * 2; i++) {
            const angle = angleOffset + (i * Math.PI) / spikes;
            const radius = i % 2 === 0 ? outerRadius : innerRadius; // Alterna entre raio externo e interno
            const x = radius * Math.cos(angle); // Posição x
            const y = radius * Math.sin(angle); // Posição y

            if (i === 0) {
              ctx.moveTo(x, y); // Move para o primeiro ponto
            } else {
              ctx.lineTo(x, y); // Conecta o ponto
            }
          }

          ctx.closePath();
          ctx.stroke(); // Contorno da estrela
          ctx.fill(); // Preenche a estrela
        }}
        gravity={0.2}
        initialVelocityX={2.0}
        initialVelocityY={2.0}
        numberOfPieces={1000}
        opacity={1}
        recycle={false}
        run
        wind={0.001}
      />
    </div>
  );
}
