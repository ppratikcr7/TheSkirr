import { backendLookup } from '../lookup'

export function apiTweetCreate(newTweet, callback) {
    backendLookup("POST", "/tweets/create/", callback, { content: newTweet })
}

export function apiTweetEdit(tweetId, newTweet, callback) {
    backendLookup("POST", "/tweets/edit/", callback, { id: tweetId, content: newTweet })
}

export function apiTweetAction(tweetId, action, callback) {
    const data = { id: tweetId, action: action }
    backendLookup("POST", "/tweets/action/", callback, data)
}

export function apiTweetDetail(tweetId, callback) {
    backendLookup("GET", `/tweets/${tweetId}/`, callback)
}

export function apiTweetFeed(callback, nextUrl) {
    let endpoint = "/tweets/feed/"
    if (nextUrl !== null && nextUrl !== undefined) {
        // endpoint = nextUrl.replace("https://www.theskirr.com/api", "")
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    backendLookup("GET", endpoint, callback)
}

export function apiTweetList(username, callback, nextUrl) {
    let endpoint = "/tweets/"
    if (username) {
        endpoint = `/tweets/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined) {
        // endpoint = nextUrl.replace("https://www.theskirr.com/api", "")
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    backendLookup("GET", endpoint, callback)
}

export function apiReclackList(username, callback, nextUrl) {
    let endpoint = "/tweets/reclacks/"
    if (username) {
        endpoint = `/tweets/reclacks/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined) {
        // endpoint = nextUrl.replace("https://www.theskirr.com/api", "")
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    backendLookup("GET", endpoint, callback)
}

export function apiLikedClacksList(username, callback, nextUrl) {
    let endpoint = "/tweets/liked_clacks/"
    if (username) {
        endpoint = `/tweets/liked_clacks/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined) {
        // endpoint = nextUrl.replace("https://www.theskirr.com/api", "")
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    backendLookup("GET", endpoint, callback)
}

export function apiSearchedClacksList(value, callback, nextUrl) {
    let endpoint = `/tweets/searched_clacks/?value=${value}`
    if (nextUrl !== null && nextUrl !== undefined) {
        // endpoint = nextUrl.replace("https://www.theskirr.com/api", "")
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    backendLookup("GET", endpoint, callback)
}

export function apiSearchedTrendAllClacksList(value, callback, nextUrl) {
    let endpoint = `/tweets/searched_trending_clacks/?value=${value}`
    if (nextUrl !== null && nextUrl !== undefined) {
        // endpoint = nextUrl.replace("https://www.theskirr.com/api", "")
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    backendLookup("GET", endpoint, callback)
}