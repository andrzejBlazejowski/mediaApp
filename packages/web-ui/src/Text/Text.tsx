import { TextProps } from ".";
import { cn } from "../utils";

export const Input: React.FC<TextProps> = ({ variant, children, type }) => {
  let clasNames = `p-0 m-0 `;
  const usedClasses = [
    "prose-sm prose-base prose-lg prose-xl prose-2xl",
    "prose-h1 prose-h2 prose-h3 prose-h4 prose-lead prose-p ",
    "text-text-primary-700 text-text-secondary-700 text-text-ternitary-700 ",
    "text-danger-primary-700 text-danger-secondary-700 text-danger-ternitary-700 ",
    "text-warning-primary-700 text-warning-secondary-700 text-warning-ternitary-700 ",
    "text-info-primary-700 text-info-secondary-700 text-info-ternitary-700 ",
  ];

  clasNames = cn(clasNames, `text-text-${variant}-700`);

  clasNames = cn(clasNames, `prose-${type}`);
  let element = <p className={cn(clasNames, "")}>{children}</p>;
  switch (type) {
    case "lead":
    case "h1":
      element = <h1 className={clasNames}>{children}</h1>;
      break;
    case "h2":
      element = <h2 className={clasNames}>{children}</h2>;
      break;
    case "h3":
      element = <h3 className={clasNames}>{children}</h3>;
      break;
    case "h4":
      element = <h4 className={clasNames}>{children}</h4>;
      break;
    case "base":
    case "sm":
    case "lg":
    case "xl":
    case "2xl":
    case "p":
    default:
      element = <p className={clasNames}>{children}</p>;
      break;
  }

  return element;
};
