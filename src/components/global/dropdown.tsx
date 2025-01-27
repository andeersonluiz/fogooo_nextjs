import { useState } from "react";

const Dropdown = ({
  options,
  placeholder = "Selecione uma opção",
  onChangeOption,
}: {
  options: string[];
  placeholder: string;
  onChangeOption: (e) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
    onChangeOption(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className=" relative inline-block text-left   w-full ">
      <button
        type="button"
        onClick={toggleDropdown}
        className=" text-left  bg-white p-3 w-full text-black  shadow-sm text-sm font-medium  focus:outline-none"
      >
        {selectedOption || placeholder}
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full rounded-md shadow-lg text-black bg-white ring-1 ring-black ring-opacity-5">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => selectOption(option)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
