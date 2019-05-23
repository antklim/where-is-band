# where-is-band
It's a service to show where is you favorite music band is currently on tour. Or
you can check musical events are coming to your city. The service uses [Bandsintown](https://www.bandsintown.com/)
to provide events information.

The purpose of this service is educational only. This is an example of how to 
create and test application with microservices architecture. 

## Application architecture
```
+--------+      +----------------+     +----------------+
| Client | ---> | WhereIsBandAPI |---> | BandsInTownAPI |
+--------+      +----------------+     +----------------+
```