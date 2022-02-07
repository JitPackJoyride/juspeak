import { StarIcon } from "@heroicons/react/solid";
import { RecoilState, useRecoilState } from "recoil";
import { IStarRating } from "stores/ratingStore";

interface Props {
  ratingAmount: number;
  state: RecoilState<IStarRating>;
}

export default function StarRatingIcon({ ratingAmount, state }: Props) {
  const [starRating, setStarRating] = useRecoilState(state);

  const starColor = () => {
    if (
      starRating.rating >= ratingAmount &&
      starRating.hoverRating >= ratingAmount
    ) {
      return "text-yellow-400";
    }

    if (starRating.hoverRating >= ratingAmount) {
      return "text-gray-600";
    }

    return "text-gray-400";
  };

  return (
    <StarIcon
      onClick={() => {
        setStarRating((prevStarRating) => {
          return { ...prevStarRating, rating: ratingAmount };
        });
      }}
      onMouseEnter={() => {
        setStarRating((prevStarRating) => {
          return { ...prevStarRating, hoverRating: ratingAmount };
        });
      }}
      onMouseLeave={() => {
        setStarRating((prevStarRating) => {
          return { ...prevStarRating, hoverRating: prevStarRating.rating };
        });
      }}
      className={`h-7 w-7 ${starColor()}`}
    />
  );
}
