# marka.club

### Docker


#### Builds
```
docker build ./APIGATEWAY -t apigateway:marka
docker build ./AuthService -t authservice:marka
docker build ./UserService -t userservice:marka
docker build ./CodeService -t codeservice:marka
docker build ./TransactionService -t transactionservice:marka
docker build ./QRService -t qrservice:marka
docker build ./FrontEnd -t frontend:marka
```
#### Docker Compose
This is for quick check.
```
docker-compose up
docker-compose scale <service>=<replicas>
docker-compose down
```

#### Docker Stack/Swarm
```
docker swarm init # ignore for kubernetes
docker stack deploy --compose-file=docker-compose.yml marka
docker service scale marka_frontend=2
docker stack ls
docker stack rm marka
```

###Kubernetes
#### Kompose
Install kompose to convert docker compose config.
https://kubernetes.io/docs/tasks/configure-pod-container/translate-compose-kubernetes/#install-kompose
```
curl -L https://github.com/kubernetes/kompose/releases/download/v1.21.0/kompose-darwin-amd64 -o kompose

```
```
brew install kompose
```


### JMeter
```
jmeter -n -t test.jmx -l log.jtl 
```

### TODO
* Check and fix APIDOCS
* Create the APIDOCS on swagger
* Set frontend services for selectable API DOMAIN like as api1.marka.club and api2.marka.club
* Serve the frontend on https://marka.club as PWA
* Set Dockerfiles
* Create micro services and serve them

EXTRA
----
#### Mongo
* docker run -d -p 27017-27019:27017-27019 --name mongodb mongo
* docker exec -it mongodb bash

#### Mongo Sharding
https://medium.com/@cn007b/super-simple-mongodb-sharding-example-ea8de81ed3ab
##### Prerequisites
Install docker on your machine.
##### Preparation
Topology for our super simple cluster base on using:
* 1 node as config server
* 1 node as router (mongos)
* 2 nodes as shards

Create docker net for our cluster:
docker network create --driver bridge xnet
Run config node:
```
docker run -it --rm --net=xnet -p 27016:27016 \
    --hostname config-1 --name config-1 \
    mongo:3.4.9 --port 27016 --replSet config --configsvr
```
    
Init config node (init Replica Set for config):
```
docker exec -it config-1 mongo --port 27016 --eval '
    rs.initiate({ _id: "config", members: [
        { _id : 0, host : "config-1:27016" }
    ]});
'
```
Run router node (mongos):
```
docker run -it --rm --net=xnet -p 27015:27015 \
    --hostname mongos --name mongos \
    mongo:3.4.9 mongos \
    --port 27015 --configdb config/config-1:27016
```
    
Run node for shard 1:
```
docker run -it --rm --net=xnet -p 27018:27018 \
    --hostname shard-1 --name shard-1 \
    mongo:3.4.9 --port 27018 --shardsvr
```
    
Run node for shard 2:
```
docker run -it --rm --net=xnet -p 27019:27019 \
    --hostname shard-2 --name shard-2 \
    mongo:3.4.9 --port 27019 --shardsvr
```
    
All nodes already launched, it’s time to configure sharding cluster:
```
docker exec -it mongos mongo --port 27015 --eval '
    sh.addShard("shard-1:27018");
    sh.addShard("shard-2:27019");
    sh.enableSharding("test_db");
    sh.shardCollection("test_db.test_collection", {"tag": 1});
    sh.status();
'
```
