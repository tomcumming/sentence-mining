import * as React from "react";

export type Props = {
  icon: string;
  className?: string;
  onClick?: () => void;
};

function RoundBtn({ icon, className, onClick }: Props) {
  return (
    <button
      className={`round-btn ${className || ""}`}
      onClick={onClick}
      disabled={!onClick}
    >
      {icon}
    </button>
  );
}

export default React.memo(RoundBtn);
