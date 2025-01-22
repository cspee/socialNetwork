import { Box, Card, Container, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import { getUsersPosts, toggleComment } from "../redux/reduxReducers/reducers";
import { useParams } from "react-router";
import { Post, UserInterface } from "../interfaces";
import {
  ChatBubbleIcon,
  EyeOpenIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import Comment from "./Comment";

export default function UsersPosts() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [userPosts, setUsersPosts] = useState<Post[]>([]);
  const { commentState } = useSelector((state: RootState) => state.socNet);
  console.log("вызов");
  console.log(userPosts);
  //Типизация
  useEffect(() => {
    dispatch(getUsersPosts(Number(id))).then((res) => {
      const result = res.payload as UserInterface;
      setUsersPosts(result.data.posts);
    });
  }, [dispatch, id]);
  return (
    <>
      <Container>
        <Flex direction={"column"} gap={"3"} style={{ marginTop: "25px" }}>
          User posts:
          {userPosts.map((el) => (
            <Card key={el.userId}>
              <Flex gap={"2"} direction={"column"}>
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
                    style={{ cursor: "pointer" }}
                    onClick={() => dispatch(toggleComment({ id: el.id }))}
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
