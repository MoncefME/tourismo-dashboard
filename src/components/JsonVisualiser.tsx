import React from "react";

type Props = {
  data: any;
};

const JsonVisualiser: React.FC<Props> = ({ data }) => {
  return <pre className="bg-white p-4 ">{JSON.stringify(data, null, 2)}</pre>;
};

export default JsonVisualiser;
