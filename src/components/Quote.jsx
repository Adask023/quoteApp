import React from "react";
import "../styles/quote.css";

export const Quote = ({ content }) => {
  const { quote, author } = content;
  console.log(content);
  return (
    <blockquote className="sidekick">
      {quote}
      <cite>{author}</cite>
    </blockquote>
  );
};
