import { useRecoilState } from "recoil";
import { userState } from "stores/dbStore";

export default function Avatar() {
  const [{ userProfile }] = useRecoilState(userState);
  const imageSize = 32;

  return (
    <>
      <img
        src={`${userProfile?.avatarUrl}`}
        alt="Avatar"
        height={imageSize}
        width={imageSize}
        className={"inline-block rounded-full"}
      />
    </>
  );
}
