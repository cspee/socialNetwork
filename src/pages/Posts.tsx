import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { allPosts, toggleComment } from "../redux/reduxReducers/reducers";
import UserInfo from "../components/UserInfo";
import { NavLink } from "react-router";
import axios from "axios";
import {
  ChatBubbleIcon,
  EyeOpenIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import Comment from "../components/Comment";

export default function Posts() {
  const { posts, commentState } = useSelector(
    (state: RootState) => state.socNet
  );
  const dispatch = useDispatch<AppDispatch>();

  console.log("ПОСТЫ");
  axios.get("https://dummyjson.com/posts").then((res) => console.log(res));
  useEffect(() => {
    dispatch(allPosts());
  }, [dispatch]);
  //   posts is possibly null потому что в initalStae может быть null
  return (
    <>
      <Container size="4">
        <Heading style={{ padding: "10px 0" }}>Posts</Heading>
        <Flex gap={"9"} direction={"column"} style={{ marginTop: "20px" }}>
          {posts.map((el) => (
            <Card key={el.userId}>
              <Flex gap={"2"} direction={"column"}>
                <NavLink
                  to={`/user/${el.userId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Link color="sky" underline="hover">
                    Author - <UserInfo userId={el.userId} />
                  </Link>
                </NavLink>

                <Text weight={"bold"}>{el.title}.</Text>
                <Text>{el.body}</Text>
                <Flex gap={"2"}>
                  <Flex align={"center"} gap={"1"}>
                    <HeartIcon />
                    {el.reactions.likes}
                  </Flex>
                  <Flex align={"center"} gap={"1"}>
                    <HeartFilledIcon />
                    {el.reactions.dislikes}
                  </Flex>
                  <Flex align={"center"} gap={"1"}>
                    <EyeOpenIcon />
                    {el.views}
                  </Flex>
                  <Flex
                    align={"center"}
                    style={{cursor: 'pointer'}}
                    onClick={() => dispatch(toggleComment({ id: el.id  }))}
                  >
                    <ChatBubbleIcon />
                  </Flex>
                </Flex>
              </Flex>
              <Box
                style={{ padding: "5px", marginLeft: "15px", marginTop: "2px" }}
              >
                {commentState.find(
                  (comment) => comment.id === el.id && comment.active
                ) && (
                  <>
                    <Text>Comments:</Text>
                    <Comment postId={el.id} />
                  </>
                )}
              </Box>
            </Card>
          ))}
        </Flex>
      </Container>
    </>
  );
}
