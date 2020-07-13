import { Tweet } from "../tweet"

interface Response {
    result: {
        max_id: string
        tweets: Tweet[]
    }
}

export const searchTweets = async (since_id: string) => {
    /* dead code eliminationされない...
    if (process.env.NODE_ENV === "development"){
        return {
            result: {
                max_id: since_id,
                tweets: [
                    {
                        text:
                            "げみみちゃんの裏事情、ニコニコ動画とかに切り抜き動画上がってほしい #のあといっしょ",
                    },
                    { 
                        text: "共感できる…よね？←かわいい #のあといっしょ" 
                    },
                    {
                        text:
                            "音質クリアなのと後ろで❤がぽわぽわしてるのよかった #のあといっしょ",
                    },
                    {
                        text:
                            "新しい曲だったりのあちゃんの声で聞き慣れた曲だったりチルノのパーフェクトさんすう教室だったり、色々聞けたしテンションめちゃくちゃ上がったお歌配信だった！！。最後にファンサが来ると思ってなかったので最後の最後でめちゃくちゃテンション上がった！！！#のあといっしょ",
                    },
                ],
            },
        }
    }
    */
    const response: Response = await (
        await fetch(process.env.URL_SEARCH_TWEETS, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                data: {
                    text: `#${encodeURI("のあといっしょ")} -RT`,
                    bearer: process.env.TOKEN,
                    since_id,
                },
            }),
        })
    ).json()
    return response
}
