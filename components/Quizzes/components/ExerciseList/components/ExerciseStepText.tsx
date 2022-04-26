interface Props {
  title: string;
  description: string;
}

export default function ExerciseStepText({ title, description }: Props) {
  return (
    <span className="ml-4 flex h-full flex-col justify-center">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </span>
      {description ? <span className="text-sm text-gray-500"></span> : null}
    </span>
  );
}
