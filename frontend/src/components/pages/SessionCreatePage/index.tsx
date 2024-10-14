import { FC, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../../organisms/header";
import Footer from "../../organisms/footer";
import { useNavigate } from "react-router-dom";
import { InputContainer, PageWrapper, StyledCanvas, Text } from "./styles";
import Button from "../../molecules/button";
import TextField from "../../molecules/textField";
import TextLabel from "../../molecules/textLabel";
import { handleApi } from "../../../api/api";

const SessionCreatePage: FC = () => {
  const navigate = useNavigate();

  const handleCreation = async (event: any) => {
    event.preventDefault();
    const { target } = event;
    const { value } = target[0];

    // call backebd
    const { userId } = await handleApi({ 
      path: "/user", 
      method: "POST", 
      body: {
        userName: value
      } 
    });
    const { sessionId } = await handleApi({ 
      path: "/session", 
      method: "POST", 
      body: {
        userId
      } 
    });

    const socket = new WebSocket(`ws://localhost:8080?sessionId=${sessionId}`);
    console.log(socket)
    socket.addEventListener('message', (event) => {
      console.log(event)
    });

    return navigate(`/${sessionId}?name=${value}`);
  };

  return (
    <>
      <Header />
      <StyledCanvas className="canvas" />
      <PageWrapper className="body">
        <TextLabel text="SESSION CREATION WIZARD" />
        <form onSubmit={handleCreation}>
          <InputContainer>
            <TextField
              placeholder="NAME"
              name="name"
              handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                //do
              }}
            />
          </InputContainer>
          <Button text="CREATE SESSION" type="submit" />
        </form>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default SessionCreatePage;
