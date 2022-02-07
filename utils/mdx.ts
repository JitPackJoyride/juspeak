import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

export type IExerciseState = "current" | "upcoming" | "complete";

interface IExerciseBase {
  frontmatter: { [p: string]: any };
}

export type IExercise = IExerciseBase & {
  id?: string;
  slug: string;
  state: IExerciseState;
  ratingId?: string;
};

export type IExercises = IExercise[];

export const EXERCISES_PATH = path.join(process.cwd(), "data/exercises");

export const getSourceOfFile = (fileName: string) => {
  return fs.readFileSync(path.join(EXERCISES_PATH, fileName), "utf-8");
};

export const getAllExercises: () => IExercises = () => {
  return fs
    .readdirSync(EXERCISES_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const source = getSourceOfFile(fileName);
      const slug = fileName.replace(/\.mdx?$/, "");
      const { data } = matter(source);

      return {
        frontmatter: data,
        slug: slug,
        state: "upcoming",
      };
    });
};

export const getSingleExercise: (
  slug: string
) => Promise<IExerciseBase & { code: string }> = async (slug) => {
  const source = getSourceOfFile(slug + ".mdx");

  const { code, frontmatter } = await bundleMDX(source, {
    cwd: EXERCISES_PATH,
  });

  return {
    frontmatter,
    code,
  };
};
