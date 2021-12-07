import React, { useEffect, useState } from "react";
import { Quote } from "../components/Quote";
import "../styles/homePage.css";

export const HomePage = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState();
  const [loading, setLoading] = useState(true);
  const [quoteHistory, setQuoteHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch(
        "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
      )
        .then((res) => res.json())
        .then((data) => {
          setQuotes(data);
          setLoading(false);
          getRandomQuote(data);
        })
        .catch((e) => console.log(e));
    };

    fetchData();
  }, []);

  const getRandomQuote = (quoteData) => {
    if (quote) {
      setQuoteHistory([...quoteHistory, quote]);
    }

    let quoteToDisplay = quoteData[Math.floor(Math.random() * quoteData.length)];
    while(quote?.quote === quoteToDisplay.quote) {
      quoteToDisplay = quoteData[Math.floor(Math.random() * quoteData.length)];
    }

    setQuote(quoteToDisplay);
  };

  const getLastHistoryQuote = () => {
    if (quoteHistory.length > 0) {
      const quoteArr = quoteHistory;
      setQuote(quoteArr.pop());
      setQuoteHistory(quoteArr);
    } else {
      console.log("No data in quote history");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-width">
      <div className="content-wrapper">
        <div className="buttons-wrapper">
          <button onClick={() => getRandomQuote(quotes)}>random</button>
          <button
            onClick={getLastHistoryQuote}
            disabled={quoteHistory.length > 0 ? false : true}
            style={quoteHistory.length > 0 ? null: {cursor: "not-allowed"}}
          >
            previous
          </button>
        </div>
        <div className="content">
          {quote && (
            <div>
              <Quote content={quote} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
