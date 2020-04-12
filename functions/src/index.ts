import * as functions from 'firebase-functions';
import * as request from "request";
import 'date-utils'

interface Data {
  text:string
  since_id:string
  bearer:string
}

export const searchTweets = functions.https.onCall(async ({
  text, since_id, bearer
}:Data)=> {
  return new Promise((resolve, reject) =>{
    console.log(`searchRequest:${text}, ${since_id}`)
    request.get({
        uri: 'https://api.twitter.com/1.1/search/tweets.json',
        headers: {
          authorization: `Bearer ${bearer}`,
        },
        qs: {
          q: text,
          count: 10,
          //@ts-ignore
          since: new Date().toFormat("YYYY-MM-DD"),
          since_id: since_id,
        },
        json: true
      }, (err, _, data)=> {
        if (err) {
          reject(err)
        } else {
          const result = {
                max_id : data.search_metadata.max_id_str,
                tweets : data.statuses
            }
          resolve(result)
        }
      }
    );
  });
});
