import styled from "@emotion/styled";
import { FC, useEffect, useState, useCallback, ChangeEvent } from "react";
import { useParams } from 'react-router-dom';
import Footer from "../../organisms/footer";
import Header from "../../organisms/header";
import Canvas from "../canvas";
import TextField from "../../molecules/textField";
import Button from "../../molecules/button";
import TextLabel from "../../molecules/textLabel";
import { handleApi } from "../../../api/api";

const NameForm = styled.div`
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

const StyledCanvas = styled(Canvas)`
  position: absolute;
  z-index: -999;
  background-color: black;
`;

const PageWrapper = styled.div`
  max-width: 2560px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const Main = styled.div`
  margin: 20px;
`;

const Results = styled.div`
  margin: 20px;
`;

const ResultsGrid = styled.div`
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

const Grid = styled.div`
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

const GridItem = styled.div`
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

const InputContainer = styled.div`
  margin-bottom: 25px;

  padding: 40px;
  border-radius: 6px;
  background-color: #354649;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const Session: FC = () => {
  const [hasName, setHasName] = useState(true);
  const [name, setName] = useState("");
  let { sessionId } = useParams();

  const handleNameSave = useCallback(() => {
    sessionStorage.setItem("name", name);
    setHasName(true);

    const addUserToSession = async () => {
      const { userId } = await handleApi({ 
        path: "/user", 
        method: "POST", 
        body: {
          userName: name
        } 
      });

      await handleApi({ 
        path: "/session/user", 
        method: "POST", 
        body: {
          sessionId,
          userId
        } 
      });
    }

    addUserToSession();
  }, [name, sessionId]);

  const handleNameInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    console.log(name)
    console.log(sessionId)
    
  }, [name, sessionId]);

  useEffect(() => {
    const currentName = sessionStorage.getItem("name");
    if (!currentName) {
      setHasName(false);
    } else {
      setHasName(true);
    }
  }, [handleNameSave, handleNameInput, name, hasName, setHasName]);

  return (
    <>
      {hasName || (
        <NameForm>
          <div>
            <TextLabel text="ENTER YOUR NAME" />
            <InputContainer>
              <TextField placeholder="NAME" name="name" handleChange={handleNameInput} />
            </InputContainer>
            <Button text="JOIN SESSION" type="submit" onClick={handleNameSave} />
          </div>
        </NameForm>
      )}
      <Header />
      <StyledCanvas className="canvas" />
      <PageWrapper className="body">
        <Main>
          <InputContainer>
            <TextField placeholder="Story Title" name="storyname" handleChange={handleNameInput} />
          </InputContainer>
          <Grid>
            <GridItem>1</GridItem>
            <GridItem>2</GridItem>
            <GridItem>3</GridItem>
            <GridItem>5</GridItem>
            <GridItem>8</GridItem>
            <GridItem>13</GridItem>
          </Grid>
          <Button text="SHOW ANSWERS" type="button" />
        </Main>
        <Results>
          <ResultsGrid>
            <div>RESULTS</div>
            <div>Name: ?</div>
            <div>Name: ?</div>
            <div>Name: ?</div>
            <div>Name: ?</div>
            <div>Name: ?</div>
            <div>Name: ?</div>
            <div>Name: ?</div>
            <div>Name: ?</div>
            <div>AVARAGE: 123</div>
          </ResultsGrid>
        </Results>
      </PageWrapper>

      <Footer />
    </>
  );
};

export default Session;
