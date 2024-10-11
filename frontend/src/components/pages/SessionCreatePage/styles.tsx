import styled from "@emotion/styled";
import Canvas from "../canvas";

export const StyledCanvas = styled(Canvas)`
  position: absolute;
  z-index: -999;
  background-color: black;
`;

export const PageWrapper = styled.div`
  max-width: 2560px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

`;

export const Text = styled.div`
  margin: 20px;
  padding: 20px;
  font-size: 15px;
  text-align: center;
  color: white;
  border-radius: 5px;
`;

export const InputContainer = styled.div`
  padding: 40px;
  border-radius: 6px;
  background-color: #354649;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 25px;
`;
