# where-is-band
It's a service to show where is you favorite music band is currently on tour. Or
you can check what musical events are happening in your city. The service uses
[Bandsintown API](https://www.bandsintown.com/) to get events information.

The purpose of this service is educational only. This is an example of how to 
create and test application with microservices architecture. 

## Application architecture
```
+--------+      +----------------+     +----------------+
| Client | ---> | WhereIsBandAPI |---> | BandsInTownAPI |
+--------+      +----------------+     +----------------+
```