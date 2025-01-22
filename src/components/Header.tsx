import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, IconButton, TabNav } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";
import { setTheme } from "../redux/reduxReducers/reducers";
import { AppDispatch, RootState } from "../redux/store";

export default function Header() {
  //useLocation путь на котором сейчас пользователь
  const location = useLocation();
  const pathname = location.pathname;

  const { theme } = useSelector((state: RootState) => state.socNet);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      {/* sad asChild active={pathname === "/"} чтобы работал переход в radix */}
      <Box style={{ position: "relative" }}>
        <TabNav.Root justify={"center"}>
          <TabNav.Link asChild active={pathname === "/"}>
            <NavLink to="/">Home</NavLink>
          </TabNav.Link>
          <TabNav.Link asChild active={pathname === "/posts"}>
            <NavLink to="/posts">Posts</NavLink>
          </TabNav.Link>
          {/* <TabNav.Link asChild active={pathname === "/contact"}>
            <NavLink to="/contact">Contact</NavLink>
          </TabNav.Link> */}
          <IconButton
            style={{
              right: "0",
              position: "absolute",
              marginTop: "3px",
              marginRight: "4px",
            }}
            onClick={() => dispatch(setTheme())}
          >
            {theme == "light" ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </TabNav.Root>

        {/* <IconButton style={{right: '0', position: 'absolute', marginTop:'10px', marginRight: '10px'}} onClick={() => dispatch(setTheme())}>
          {theme == "light" ? <SunIcon /> : <MoonIcon />}
        </IconButton> */}
      </Box>
    </div>
  );
}
