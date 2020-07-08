import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { animated, useTransition } from "react-spring"
import clsx from "clsx"
import { searchTweets, Tweet } from "./api/searchTweets"
import { sleep } from "./helper/sleep"

let maxId = "0000000"

export const filterTweets = (tweet: Tweet) => {
  // unimplemented
}

const App: React.FC = () => {
    const [message, setMessage] = useState("")
    const transitions = useTransition(message, null, {
        from: {
            position: "absolute",
            opacity: 0,
            transform: "translateX(200%)",
        },
        enter: { opacity: 1, transform: "translateX(0%)" },
        leave: { opacity: 0, transform: "translateX(200%)" },
    })

    useEffect(() => {
        const main = async () => {
            const reponse = await searchTweets(maxId)
            maxId = reponse.result.max_id
            for (let tweet of reponse.result.tweets) {
                setMessage(tweet.text)
                await sleep(5 * 1000)
            }
            setMessage("")
            await sleep(3 * 1000)
            main()
        }
        main()
    }, [])
    return (
        <>
            {transitions.map(({ item, key, props }) => (
                <animated.div
                    style={{ ...props }}
                    className={clsx(item && "message")}
                    key={key}
                >
                    {item}
                </animated.div>
            ))}
        </>
    )
}

ReactDOM.render(<App />, document.getElementById("app"))
