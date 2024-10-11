import { FC } from "react";
import { ButtonContainer } from "./styles";

interface IButton {
    text: string;
    type: "submit" | "button" | "reset";
    onClick?: () => void;
}

const Button: FC<IButton> = ({ text, type, ...rest}) => {

  return (
    <ButtonContainer type={type} value={text} {...rest}>
        {text}
    </ButtonContainer>
  );
};

export default Button;
