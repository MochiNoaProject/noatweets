declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "production" | "test"
        readonly URL_SEARCH_TWEETS: string
        readonly TOKEN: string
    }
}