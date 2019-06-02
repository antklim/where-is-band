# whats-the-tabs
This is an example service to find guitar tabs for the songs. The songs could be
searched by name pattern or by artist name. The service uses [Songsterr API](https://www.songsterr.com)
to get tabs.

The purpose of this service is educational only. This is an example of how to 
create and test application with microservices architecture. 

## Application architecture
```
+--------+      +----------------+     +--------------+
| Client | ---> | WhatsTheTabAPI |---> | SongsterrAPI |
+--------+      +----------------+     +--------------+
```

## Application configuration
The following environment variables are used by application:
- DEBUG - enables debug logging in application and supports logs filtering (see [debug](https://www.npmjs.com/package/debug))
- NODE_DEBUG - enables HTTP request/response logging (see [request debugging](https://www.npmjs.com/package/request#debugging))
- DEBUG_REQUEST_TIMINGS - when set to __true__ the request timings information will be added to the response payload (see [request time options](https://www.npmjs.com/package/request#requestoptions-callback))
- REQUEST_TIMEOUT - sets the HTTP request timeout in msec
- DOWNSTREAM_API_URL - the base URL of the downstream service to fetch data, in this example Songsterr is downstream service
