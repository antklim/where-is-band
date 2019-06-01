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