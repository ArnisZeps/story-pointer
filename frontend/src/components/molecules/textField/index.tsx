import { FC, ChangeEvent, ChangeEventHandler} from "react";
import { TextFieldContainer } from "./styles";

interface ITextField {
    placeholder: string
    name: string
    handleChange: ChangeEventHandler<HTMLInputElement>
}

const TextField: FC<ITextField> = ({ placeholder, name, handleChange }) => {
  return (
    <TextFieldContainer type={"text"} placeholder={placeholder} name={name} onChange={handleChange} />
  );
};

export default TextField;
