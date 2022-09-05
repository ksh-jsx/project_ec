import React from "react";

const Survey = ({ Q, input }) => {
  return (
    <>
      <div className="title" dangerouslySetInnerHTML={{ __html: Q }} />
      <div className="article" dangerouslySetInnerHTML={{ __html: input }} />
    </>
  );
};

export default Survey;
