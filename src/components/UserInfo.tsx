import { useEffect, useState } from "react";
import { getSingleUserName } from "../redux/reduxReducers/reducers";
import { useAppDispatch } from "../redux/store";

export default function UserInfo({ userId }: { userId: number }) {
  const [userName, setUserName] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSingleUserName(userId)).then(
      (res) => setUserName(res.payload as string) 
    );
  }, [dispatch, userId]);
  return <>{userName}</>;
}
