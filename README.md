# Todo List Application. 
## A complete project with backend + fronted + Docker

### Demo available on this link: http://arbhuiyan.altervista.org

#### System requirements:
* Docker
* Docker Compose
* Node & NPM

# How to start
### API: Node - express
* cd to `api/node and run npm install`
* from *docker/docker-compose.yml* you can manage port mapping
### Web App: Angular + Material
* cd to `web/angular`
* run: `npm install `
* set `taskApiUrl` in *src/environments/environment.prod.ts*
    - use docker host ip and API application port
* run: `npm run deploy:prd`
#### You can also run the application without Docker and Server using `ng serve -o` on your machine. Angular in memory data service has also been implemented.
### Finally run dockers
 - cd to `docker/`
 - run: `docker-compose up -d`

#### use `docker-compose up -d --rebuild` to rebuild images

### Open a browser and hit your docker host IP (port 80)




@uthor Abdur Rahman abdur.rahman994@hotmail.com