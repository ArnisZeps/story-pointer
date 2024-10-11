import ReactDOM from "react-dom/client";
import "./index.css";
import styled from "@emotion/styled";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const MainLayout = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
`;

root.render(
    <MainLayout>
      <App />
    </MainLayout>
);
