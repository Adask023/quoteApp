import React from "react";
import "../styles/quote.css";

export const Quote = ({ content }) => {
  const { quote, author } = content;
  return (
    <blockquote className="quote-wrapper">
      {quote}
      <cite>{author}</cite>
    </blockquote>
  );
};
