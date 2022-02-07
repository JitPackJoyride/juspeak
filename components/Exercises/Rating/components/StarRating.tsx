import StarRatingIcon from "./StarRatingIcon";
import { RecoilState } from "recoil";
import { IStarRating } from "stores/ratingStore";

interface Props {
  state: RecoilState<IStarRating>;
  minDescription: string;
  maxDescription: string;
}

export default function StarRating({
  state,
  minDescription,
  maxDescription,
}: Props) {
  return (
    <>
      <div className={"-mt-6 flex items-center gap-2"}>
        <p className={"text-sm sm:text-base lg:text-xl"}>{minDescription}</p>
        <div className={"flex"}>
          {[...Array(5)].map((item, i) => (
            <StarRatingIcon key={i} ratingAmount={i + 1} state={state} />
          ))}
        </div>
        <p className={"text-sm sm:text-base lg:text-xl"}>{maxDescription}</p>
      </div>
    </>
  );
}
