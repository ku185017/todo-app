import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
// import theme from "./theme/theme";
import Todo from "./components/todo";

const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(
  <>
    <CssBaseline />
    <Todo />
  </>,
);
