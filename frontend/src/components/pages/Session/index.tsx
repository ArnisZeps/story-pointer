import { FC, useEffect, useState, useCallback, ChangeEvent } from "react";
import * as S from "./styles";
import { useParams } from "react-router-dom";
import Footer from "../../organisms/footer";
import Header from "../../organisms/header";
import TextField from "../../molecules/textField";
import Button from "../../molecules/button";
import TextLabel from "../../molecules/textLabel";
import { handleApi } from "../../../api/api";

const Session: FC = () => {
  const [hasName, setHasName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [userList, setUserList] = useState<string[]>([])
  let { sessionId } = useParams();

  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8080?sessionId=${sessionId}`
    );
    socket.addEventListener("message", ({ data }) => {
      const { userName } = JSON.parse(data);
      setUserList((prev) => [...prev, userName])
    });
    const name = sessionStorage.getItem("name");
    if (name) {
      setHasName(true);
      sessionStorage.setItem("name", name);
    }
  }, []);

  const handleNameSave = useCallback(() => {
    sessionStorage.setItem("name", nameInput);
    setHasName(true);
    const addUserToSession = async () => {
      const { userId } = await handleApi({
        path: "/user",
        method: "POST",
        body: {
          userName: nameInput,
        },
      });
      await handleApi({
        path: "/session/user",
        method: "POST",
        body: {
          sessionId,
          userId,
        },
      });
    };
    addUserToSession();
  }, [nameInput, sessionId]);

  const handleNameInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNameInput(e.target.value);
    },
    [nameInput, sessionId]
  );

  return (
    <>
      <Header />
      {(
        <S.NameForm>
          <div>
            <TextLabel text="ENTER YOUR NAME" />
            <S.InputContainer>
              <TextField
                placeholder="NAME"
                name="name"
                handleChange={handleNameInput}
              />
            </S.InputContainer>
            <Button
              text="JOIN SESSION"
              type="submit"
              onClick={handleNameSave}
            />
          </div>
        </S.NameForm>
      )}
      <S.StyledCanvas className="canvas" />
      <S.PageWrapper className="body">
        <S.Main>
          <S.InputContainer>
            <TextField
              placeholder="Story Title"
              name="storyname"
              handleChange={handleNameInput}
            />
          </S.InputContainer>
          <S.Grid>
            <S.GridItem>1</S.GridItem>
            <S.GridItem>2</S.GridItem>
            <S.GridItem>3</S.GridItem>
            <S.GridItem>5</S.GridItem>
            <S.GridItem>8</S.GridItem>
            <S.GridItem>13</S.GridItem>
          </S.Grid>
          <Button text="SHOW ANSWERS" type="button" />
        </S.Main>
        <S.Results>
          <S.ResultsGrid>
            <div>RESULTS</div>
            {
              userList.map((user, index) => <div key={index}>{user}: ?</div>)
            }
            <div>AVARAGE: 123</div>
          </S.ResultsGrid>
        </S.Results>
      </S.PageWrapper>

      <Footer />
    </>
  );
};

export default Session;
