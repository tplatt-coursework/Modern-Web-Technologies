# Metadata
 - Author:      `Theo Platt`
 - Course:      `CS-532-M01 Modern Web Technologies; Dr. Bill Hamilton`
 - Assignment:  `Individual Assignment: Distributed Multiplayer Game`
 - Deadline:    `03/19/2025`

---

# Description
In this assignment I create a database powered web app using node.js and MongoDB. The base URL hosted on NMSU's provided server is `https://tplatt.cs382.net/`. If run locally, this webapp listens on `localhost` on port `3000`.

## Deliverables

### HTTP GET Requests
[x] `/upload`
    Sends the client `form.html`, allowing them to input data which will be uploaded to the database via a form directed at the `/anime` API.</br>
[x] `/list`
    Sends the client `animeList.html` which uses the `/animes` API to receive all data.</br>
[x] `/query`
    Sends the client `query.html` allowing them to input search criteria which will be sent in as parameters with the `/animes` API.</br>
[x] `/animes`
    HTTP GET request that takes query parameters to make to return query result of objects</br>

### HTTP POST Requests
[x] `/anime`
    HTTP POST request to create an object in the dataset</br>

---

# Files included
 - `/models/TODO.js`
 - `/mongo/docker-compose.yml`
 - `/views/form.ejs`
 - `/views/form.ejs`
 - `/views/form.ejs`

---

# Running on localhost
These instructions are for running this assignment on localhost `127.0.0.1`. If running on localhost, you will need to have a mongodb listening on the default port `27017` with no authentication set up.

### Setting up Mongo
To set up mongo, a simple dockerfile is included in `/mongo` that spins up a simple mongo database. Run this inside docker locally. Docker's documentation can be found [here](https://docs.docker.com/).

### Running the assignment code
In the config file `config.js`, ensure that the variable `localhost` is set to `true`.

To download dependencies: 
    `npm install`
To run:
    `node index.js`

---

# Running on pdmn.cs.nmsu.edu
These instructions are for running this assignment on the department server `pdmn.cs.nmsu.edu`. It is worth noting that Podman's container will not be taken down if a `ctrl-c` keyboard interrupt occurs.

In the config file `config.js`, ensure that the variable `localhost` is set to `false`

To start the podman container:  
    `podman-compose -f compose.yml up`
To start the podman container running in the background:   
    `podman-compose -f compose.yml  up --detach`
To stop the podman container:
    `podman-compose -f compose.yml down`
To view all podman processes:
    `podman ps`
To stop a specific container:
    `podman stop <CONTAINER ID>`

---

# Known Issues
### aardvark DNS issue
When stopping a podman container, sometimes something with the aardvark dns goes wrong. If this happens, this error will show:
```js
[ERROR netavark::dns::aardvark] aardvark-dns runs in a different netns, dns will not work for this container. To resolve please stop all containers, kill the aardvark-dns process, remove the /run/user/<uid>/containers/networks/aardvark-dns directory and then start the containers again
```

If the instructor has not fixed this issue yet, running this command after stopping the podman container will temporarily fix the issue. The issue will occur again after successfully starting and stopping a container.
`kill -9 "$(cat /run/user/"$(id -u)"/containers/networks/aardvark-dns/aardvark.pid)";rm -rf /run/user/"$(id -u)"/containers/networks/aardvark-dns/*`

### aardvark issue

```js
ERRO[0000] "netavark: IO error: Error while applying dns entries: IO error: aardvark-dns failed to start: Error from child process\nError starting server failed to bind udp listener on 10.89.0.1:53: IO error: Cannot assign requested address (os error 99)"
```

Same command from above will fix this.

### podman Issues   
The class's server periodically goes down. My code is running in podman at the time of submission, but I have no way to guarentee this will continue to be the case at the time of grading. If issues arise, please reach out and I can easily re-up my container. If the container goes down causing a grade deduction, I will be sure to complain profusely :p