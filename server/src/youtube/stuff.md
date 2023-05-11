    This is the video category for Gaming stuff in youtube API:
    <!-- { -->
    <!--   "kind": "youtube#videoCategory", -->
    <!--   "etag": "0Hh6gbZ9zWjnV3sfdZjKB5LQr6E", -->
    <!--   "id": "20", -->
    <!--   "snippet": { -->
    <!--     "title": "Gaming", -->
    <!--     "assignable": true, -->
    <!--     "channelId": "UCBR8-60-B28hp2BmDPdntcQ" -->
    <!--   } -->
    <!-- }, -->


search list
set regionCode = US
type = video
eventType = live
maxResults = 30 (0-50)

gets this response:

    {
      "kind": "youtube#searchResult",
      "etag": "8y7qq_77k62cpm669S6SMvILLyA",
      "id": {
        "kind": "youtube#video",
        "videoId": "YVnZf9KyHRs"
      },
      "snippet": {
        "publishedAt": "2023-05-08T06:46:11Z",
        "channelId": "UCV1xUwfM2v2oBtT3JNvic3w",
        "title": "【STAR WARS JEDI: SURVIVOR】i have the pink poncho【NIJISANJI EN | Selen Tatsuki】",
        "description": "i basically completed the game 「Streamlabs Donations」 https://streamlabs.com/tatsukiselen/tip 「Voice Packs Out」 ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/YVnZf9KyHRs/default_live.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/YVnZf9KyHRs/mqdefault_live.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/YVnZf9KyHRs/hqdefault_live.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Selen Tatsuki 【NIJISANJI EN】",
        "liveBroadcastContent": "live",
        "publishTime": "2023-05-08T06:46:11Z"
      }
    },

can use https://www.youtube.com/watch?v={id.videoId} as link to the stream

-------------------------------------------------------------------------------
Everything above sucks ass bc youtube API is trash. Need to scrape the following
url:

get live events for search query (space separated pluses) and sorted by viewers
https://www.youtube.com/results?search_query=smash+bros&sp=CAMSAkAB

search for itemSectionRenderer and then in the contents block ignore the first
item because that's going to be all the ads, then I _think_ the rest of them are
the actual content that I'm looking for.
