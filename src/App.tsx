import { useEffect } from "react";
import "./App.css";
import * as api from "./api/index";

function App() {
  useEffect(async () => {
    // const res = await api.newsApi.get(
    //   "/top-headlines?country=us&category=business"
    // );
    // const res = await api.guardianApi.get("/search?q=debate");
    // const res = await api.nytimesApi.get("");
    // console.log(res);
  }, []);
  return <div>a</div>;
}

export default App;
