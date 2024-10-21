import styled from "@emotion/styled";
import Canvas from "../canvas";

export const NameForm = styled.div`
  position: absolute;
  z-index: 1;
  background: rgba(0, 0, 0, 0.8);
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
`;

export const StyledCanvas = styled(Canvas)`
  position: absolute;
  z-index: -999;
  background-color: black;
`;

export const PageWrapper = styled.div`
  max-width: 2560px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const Main = styled.div`
  margin: 20px;
`;

export const Results = styled.div`
  margin: 20px;
`;

export const ResultsGrid = styled.div`
  overflow: auto;
  color: white;
  height: 320px;
  background-color: #354649;
  margin: 25px 0px;
  border-radius: 10px;
  border: 0px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 10px;
  row-gap: 10px;
  padding: 50px;
`;

export const Grid = styled.div`
  background-color: #354649;
  margin: 25px 0px;
  border-radius: 10px;
  border: 0px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 10px;
  padding: 10px;
`;

export const GridItem = styled.button`
  padding: 20px;
  overflow-wrap: break-word;
  font-size: 16px;
  text-align: center;
  background-color: #a3c6c4;
  color: white;
  border-radius: 5px;
  :hover {
    background-color: #6c7a89;
  }
`;

export const InputContainer = styled.div`
  margin-bottom: 25px;

  padding: 40px;
  border-radius: 6px;
  background-color: #354649;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
`;