import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch } from "../redux/store";
import { getSingleUserData } from "../redux/reduxReducers/reducers";
import { UserInterface } from "../interfaces";
import { Box, Card, Container, Flex, Text } from "@radix-ui/themes";

export default function UserHeader() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const { id } = useParams();
 

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleUserData(Number(id))).then((res) =>
      setUser(res.payload as UserInterface)
    );
  }, [dispatch, id]);

  if (!user) {
    return <>Loading</>;
  }
  return (
    <>
      <Box
        height={"210px"}
        style={{ background: "#A7A7A7", margin: "0 auto", marginTop: "20px" }}
      >
        <Container size={"2"} style={{}}>
          <Flex justify={"between"} style={{ paddingTop: "88px" }}>
            <Flex direction={"column"}>
              <Text
                weight={"regular"}
                size={"8"}
                style={{ color: "white" }}
              >{`${user.firstName} ${user.lastName}`}</Text>
              <Text size={"5"} style={{ color: "white" }}>
                {user.company.title} at {user.company.name}
              </Text>
              <Text size={"3"} style={{ color: "white" }}>
                {user.address.city}, {user.address.country}
              </Text>
            </Flex>

            <Card>
              <Flex
                direction={"column"}
                align={"center"}
                style={{
                  width: "300px",

                  borderRadius: "5px",
                  padding: "20px, 5px",
                }}
              >
                <Flex direction={"column"}>
                  <Text weight={"regular"} align={"left"} size={"8"}>
                    Education
                  </Text>
                  <Text size={"5"} align={"left"}>
                    {user.university}
                  </Text>
                  <Text size={"3"} align={"left"}>
                    {user.address.city}, {user.address.country}
                  </Text>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
