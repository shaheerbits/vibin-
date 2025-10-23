import type { MouseEventHandler } from "react";

interface ButtonPrimaryParams {
    buttonText: String;
    onClickHandler: MouseEventHandler<HTMLButtonElement>;
}

const ButtonPrimary = ({ buttonText, onClickHandler }: ButtonPrimaryParams) => {
  return (
    <button className="bg-zinc-900 text-zinc-100 p-3 rounded-lg cursor-pointer hover:bg-black" onClick={onClickHandler}>
      {buttonText}
    </button>
  )
}

export default ButtonPrimary
