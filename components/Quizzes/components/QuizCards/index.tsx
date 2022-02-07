import QuizCard from "./components/QuizCard";
import { TypeformEmbedId } from "stores/quizStore";
import { useState } from "react";

export default function QuizCards() {
  const [currentQuiz, setCurrentQuiz] = useState<TypeformEmbedId | null>(null);

  const quizzes = [
    {
      title: "How resilient are you?",
      description: "Take this test to assess your current resilience levels.",
      id: TypeformEmbedId.ResilienceTest,
    },
    {
      title: "How good are you at conversations?",
      description: "Take this quiz to see how you handle difficult situations.",
      id: TypeformEmbedId.ConversationTest,
    },
  ];

  return (
    <div
      className={
        "mx-auto flex min-h-[650px] max-w-7xl flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 lg:text-center"
      }
    >
      <h2 className="mt-2 text-2xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-3xl">
        Assess your skills
      </h2>
      <p className="mt-4 text-lg text-gray-500 lg:mx-auto lg:max-w-4xl">
        Begin by taking these two tests below to explore your resilience and
        conversation levels. <br />
        This program will help you progress in your mental health journey, no
        matter your level.
      </p>
      <div className={"my-10 flex flex-col justify-center gap-10 lg:flex-row"}>
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            title={quiz.title}
            description={quiz.description}
            id={quiz.id}
            onStart={() => {
              setCurrentQuiz(quiz.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
