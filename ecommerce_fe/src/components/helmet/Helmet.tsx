import React, { ReactNode } from "react";

type title = {
  title: string;
  children: ReactNode;
};
const Helmet = (props: title) => {
  document.title = "Anks - " + props.title;
  return <div className="w-100">{props.children}</div>;
};

export default Helmet;
