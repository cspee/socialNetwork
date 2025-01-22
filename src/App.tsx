import { Theme } from "@radix-ui/themes";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Header from "./components/Header";
import Posts from "./pages/Posts";
import Contact from "./pages/Contact";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import User from "./pages/User";

function App() {
  const { theme } = useSelector((state: RootState) => state.socNet);

  return (
    <>
      <BrowserRouter>
        <Theme accentColor="pink" radius="large" appearance={theme}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user/:id" element={<User />} />
          </Routes>
        </Theme>
      </BrowserRouter>
    </>
  );
}

export default App;
