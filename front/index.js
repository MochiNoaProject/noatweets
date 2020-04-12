import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { animated, useTransition } from "react-spring";
import clsx from "clsx";

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

let maxId = "0000000";

const App = () => {
  const [message, setMessage] = useState("");
  const transitions = useTransition(message, null, {
    from: { position: "absolute", opacity: 0, transform: "translateX(200%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(200%)" },
  });
  useEffect(() => {
    const main = async () => {
      const reponse = await (
        await fetch(
          process.env.URL_SEARCH_TWEETS,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              data: {
                text: `#${encodeURI("のあといっしょ")} -RT -https -http`,
                bearer: process.env.TOKEN,
                since_id: `${maxId}`,
              },
            }),
          }
        )
      ).json();

      console.log(reponse);

      maxId = reponse.result.max_id;
      for (let tweet of reponse.result.tweets) {
        setMessage(tweet.text);
        await sleep(5 * 1000);
      }
      setMessage("");
      await sleep(3 * 1000);
      main();
    };

    main();
  }, []);
  return transitions.map(({ item, key, props }) => (
    <animated.div
      style={{ ...props }}
      className={clsx(item && "message")}
      key={key}
    >
      {item}
    </animated.div>
  ));
};

const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
