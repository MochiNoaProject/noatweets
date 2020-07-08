export type Tweet = {
  text: string;
}

/*
 * 引数に受け取った文字列からURLっぽいやつだけ消し飛ばす
 * @params raw: 消し飛ばす対象の文字列
 * @return rawからURLを消し飛ばした文字列 Ex. https://example.com https://example.com 共感できる…よね？←かわいい #のあといっしょ -> 共感できる…よね？←かわいい #のあといっしょ
 * 
 */
export const extractURLString = (raw: string) => {
  const WEAK_URL_MATCHER = /(https?:\/\/[^ ]+)/g
  const matches = raw.match(WEAK_URL_MATCHER);

  if (matches) {
    // matchesに入ってるURLはURLの疑惑があるだけで本物のURLではない可能性がある
    // そのため、本当にそれがURLかどうかをチェックする
    const validURLs = matches.filter(url => {
      try {
        new URL(url)
        return true
      } catch {
        return false
      }
    })
    return validURLs.reduce((acc, url) => acc.replace(url, '') , raw).trim()
  }

  return raw
} 

export const replaceTweet = (tweet: Tweet) => {
  return extractURLString(tweet.text)
}

export const isHiddenText = (text: string) => {
  return ["#のあといっしょ", ''].some(t => text.trim() === t)
}
