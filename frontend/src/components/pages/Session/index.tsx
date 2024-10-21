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
  const [userList, setUserList] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);

  let { sessionId } = useParams();

  useEffect(() => {
    try {
      const socket = new WebSocket(`ws://localhost:8080?sessionId=${sessionId}`);
      socket.addEventListener("message", (event) => {
        console.log(event);
        const { data } = event;
        const { messageType } = JSON.parse(data);
        let userName: string, userId: string, evaluation: number;
        switch (messageType) {
          case "user":
            ({ userName } = JSON.parse(data));
            setUserList((prev) => [...prev, userName]);
            break;
          case "evaluation":
            ({ userId, userName, evaluation } = JSON.parse(data));
            setEvaluations((prev) => [...prev, { userId, userName, evaluation }]);
            break;
        }
      });
      const name = sessionStorage.getItem("name");
      if (name) {
        setHasName(true);
        setUserList((prev) => [...prev, name]);
        sessionStorage.setItem("name", name);
      }
    } catch (e) {
      console.log(e);
    }
  }, [sessionId]);

  const handleEvaluation = useCallback(
    (e: any) => {
      console.log(e.target.value);
      const userId = sessionStorage.getItem("userId");
      const postEvaluation = async () => {
        await handleApi({
          path: "/session/evaluation",
          method: "POST",
          body: {
            userId,
            sessionId,
            evaluation: e.target.value,
          },
        });
      };
      postEvaluation();
    },
    [sessionId],
  );

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
  console.log(evaluations)
  const handleNameInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  }, []);
  console.log(hasName);
  return (
    <>
      <Header />
      {!hasName && (
        <S.NameForm>
          <div>
            <TextLabel text="ENTER YOUR NAME" />
            <S.InputContainer>
              <TextField placeholder="NAME" name="name" handleChange={handleNameInput} />
            </S.InputContainer>
            <Button text="JOIN SESSION" type="submit" onClick={handleNameSave} />
          </div>
        </S.NameForm>
      )}
      <S.StyledCanvas className="canvas" />
      <S.PageWrapper className="body">
        <S.Main>
          <S.InputContainer>
            <TextField placeholder="Story Title" name="storyname" handleChange={handleNameInput} />
          </S.InputContainer>
          <S.Grid>
            <S.GridItem onClick={handleEvaluation} value={1}>
              1
            </S.GridItem>
            <S.GridItem onClick={handleEvaluation} value={2}>
              2
            </S.GridItem>
            <S.GridItem onClick={handleEvaluation} value={3}>
              3
            </S.GridItem>
            <S.GridItem onClick={handleEvaluation} value={5}>
              5
            </S.GridItem>
            <S.GridItem onClick={handleEvaluation} value={8}>
              8
            </S.GridItem>
            <S.GridItem onClick={handleEvaluation} value={13}>
              13
            </S.GridItem>
          </S.Grid>
          <Button text="SHOW ANSWERS" type="button" />
        </S.Main>
        <S.Results>
          <S.ResultsGrid>
            <div>RESULTS</div>
            {userList.map((user, index) => (
              <div key={index}>{user}: ?</div>
            ))}
            <div>AVARAGE: 123</div>
          </S.ResultsGrid>
        </S.Results>
      </S.PageWrapper>

      <Footer />
    </>
  );
};

export default Session;
