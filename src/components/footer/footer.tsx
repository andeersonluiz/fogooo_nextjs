import React from "react";
import { SiGmail } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  const handleLaunchUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="self-end w-full bg-black/55 py-4 mt-6 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center items-center gap-2">
        <p className="text-white text-center leading-relaxed">
          © 2025 | Desenvolvido por Anderson Luiz | Todos os direitos reservados
          | Contato:
        </p>
        <button
          className="p-3.5 hover:bg-gray-300 bg-white rounded-full transition-colors"
          onClick={() => handleLaunchUrl("mailto:devowlytech@gmail.com")}
        >
          <SiGmail color="red" />
        </button>
        <p className="text-white">| Siga-me:</p>

        <button
          className="p-3.5 hover:bg-gray-300 bg-white rounded-full transition-colors"
          onClick={() => handleLaunchUrl("https://twitter.com/Luizinnh01")}
        >
          <FaXTwitter color="black" />
        </button>

        <button
          className="p-3 hover:bg-gray-300 bg-white  rounded-full transition-colors"
          onClick={() => handleLaunchUrl("https://github.com/andeersonluiz")}
        >
          <FaGithub color="black" size={20} />
        </button>
      </div>
    </div>
  );
}
