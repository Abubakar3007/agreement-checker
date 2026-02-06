import { ReactNode, MouseEventHandler } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Card = ({
  children,
  className = "",
  hover = false,
  onClick,
}: CardProps) => {
  const hoverClass = hover
    ? "hover:shadow-lg transition-shadow duration-200"
    : "";

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-md p-6
        ${hoverClass}
        ${onClick ? "cursor-pointer select-none" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
