import { FC } from "react";
import { StyledTextLabel } from "./styles";

interface ITextLabel {
    text: string
}

const TextLabel: FC<ITextLabel> = ({ text }) => {
  return (
    <StyledTextLabel>
        {text}
    </StyledTextLabel>
  );
};

export default TextLabel;
