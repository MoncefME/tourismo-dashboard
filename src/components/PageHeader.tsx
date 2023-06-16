import React from "react";

type Props = {
  title: string;
  currentTitle: string;
};

const Header: React.FC<Props> = ({ currentTitle, title }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase text-slate-500">{title}</p>
        <h2 className="text-xl font-medium ">{currentTitle}</h2>
      </div>
    </div>
  );
};

export default Header;
