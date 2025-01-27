import { useEffect, useState } from "react";
import Dropdown from "../global/dropdown";
import LocalData from "@/modules/service/local/local_data";
import SupabaseHandler from "@/modules/service/api/supabase_handler";
import { Feedback } from "@/modules/domain/feedback";
enum TypeFeedback {
  Name,
  Email,
  Subject,
  Content,
}

export default function FeedbackComponent({
  onClose,
}: {
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Feedback>({
    name: "",
    email: "",
    subject: "",
    content: "",
  });

  const options = [
    "Reclamação",
    "Bug",
    "Sugestão de correção ou atualização",
    "Criticas/elogios",
  ];
  const [errors, setErrors] = useState({ subject: "", content: "" });

  const handleChange = (event, type: TypeFeedback) => {
    var data = "";
    if (type == TypeFeedback.Subject) {
      data = event;
    } else {
      data = event.target.value;
    }

    switch (type) {
      case TypeFeedback.Name:
        setFormData({ ...formData, name: data });
        break;

      case TypeFeedback.Email:
        setFormData({ ...formData, email: data });

        break;

      case TypeFeedback.Subject:
        if (!!errors["subject"]) {
          setErrors({ ...errors, subject: "" });
        }
        setFormData({ ...formData, subject: data });

        break;

      case TypeFeedback.Content:
        if (!!errors["content"]) {
          setErrors({ ...errors, content: "" });
        }
        setFormData({ ...formData, content: data });

        break;
    }
  };

  const validate = () => {
    const errorsTemp = { subject: "", content: "" };
    var hasError = false;
    if (!formData["subject"]) {
      errorsTemp["subject"] = "Selecione um assunto";
      hasError = true;
    }
    if (!formData["content"]) {
      errorsTemp["content"] = "O conteúdo não pode estar vazio";
      hasError = true;
    }
    if (hasError) {
      setErrors(errorsTemp);
    } else {
      new SupabaseHandler().sendFeedback(formData);
      onClose();
    }
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div
      onClick={handleContentClick}
      className="bg-black w-4/5 max-h-[75vh] z-50  rounded-2xl border border-white p-4 overflow-y-scroll"
    >
      <form className=" gap-4 flex flex-col">
        <h2 className="text-center text-4xl font-bold my-4">
          MELHORE O FOG.OOO
        </h2>
        <input
          onChange={(e) => handleChange(e, TypeFeedback.Name)}
          className="w-full p-3 text-black  "
          placeholder="Digite seu nome (opcional)"
        />
        <input
          onChange={(e) => handleChange(e, TypeFeedback.Email)}
          className="w-full p-3 text-black  "
          placeholder="Digite seu email (opcional)"
        />
        <Dropdown
          onChangeOption={(option) =>
            handleChange(option, TypeFeedback.Subject)
          }
          placeholder="Selecione uma assunto..."
          options={options}
        ></Dropdown>
        {errors["subject"] && (
          <p className="text-white text-sm pb-2">{errors["subject"]}</p>
        )}
        <textarea
          onChange={(e) => handleChange(e, TypeFeedback.Content)}
          className="w-full h-[300px] p-3 text-black  rows-5"
          placeholder=" Digite o conteúdo (Para solicitações relacionadas a um jogador específico, por favor, forneça o nome completo do jogador)..."
        />
        {errors["content"] && (
          <p className="text-white text-sm  pb-2">{errors["content"]}</p>
        )}
        <div className="flex justify-center p-3 ">
          <button
            type="button"
            onClick={() => validate()}
            className="text-lg  bg-gray-500 w-[250px] hover:bg-gray-700 p-2 rounded-md font-bold"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
