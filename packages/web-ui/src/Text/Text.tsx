import { TextProps } from ".";

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

  clasNames += `text-text-${variant}-700`;

  // backgrounds
  //   TextClasses += `bg-${variant}-50 focus:bg-${variant}-100 `;

  //   if (fullWidth) {
  //     TextClasses += "w-full";
  //   } else {
  //     TextClasses += "w-1/2";
  //   }

  return <div className={clasNames}></div>;
};
