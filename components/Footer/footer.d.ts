import { SVGProps } from "react";

export type NavigationProps = {
  [key in NavigationCategories]: Array<LinkProps>;
};
type NavigationCategories = "support" | "company";
export type SocialProps = Array<
  LinkProps & {
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }
>;

interface LinkProps {
  title: string;
  href: string;
}
