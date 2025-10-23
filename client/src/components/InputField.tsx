import type { HTMLInputTypeAttribute } from "react"

interface InputFieldParams {
    type: HTMLInputTypeAttribute;
    forId: string;
    label: string;
    value: string | number | readonly string[] | undefined;
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

const InputField = ({ type, forId, label, value, onChangeHandler }: InputFieldParams) => {
  return (
    <div className="flex flex-col w-full">
        <label htmlFor={forId} className="text-sm">{label}</label>
        <input type={type} id={forId} className="bg-zinc-200 px-4 py-2 outline-0 rounded-lg w-full" value={value} onChange={onChangeHandler} />
    </div>
  )
}

export default InputField
