import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/store";
import { getPostsComments } from "../redux/reduxReducers/reducers";
import { Comment as CommentType } from "../interfaces";
import { Flex, Text } from "@radix-ui/themes";

export default function Comment({ postId }: { postId: number }) {
  const dispatch = useAppDispatch();
  const [comments, setComments] = useState<CommentType[]>([]);
  
  console.log("Коммент");
  console.log(comments);

  useEffect(() => {
    dispatch(getPostsComments(postId)).then((res) =>
      setComments(res.payload.comments)
    );
  }, [dispatch, postId, setComments]);

  return (
    <>
      <Flex direction={"column"}>
        {comments.map((el, index) => (
          <Text key={index}>{el.body}</Text>
        ))}
      </Flex>
    </>
  );
}
