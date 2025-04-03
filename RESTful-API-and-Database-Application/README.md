# Metadata
 - Author:      `Theo Platt`
 - Course:      `CS-532-M01 Modern Web Technologies; Dr. Bill Hamilton`
 - Assignment:  `Individual Assignment: Distributed Multiplayer Game`
 - Deadline:    `03/19/2025`

---

# Description
In this assignment I create a database powered web app using node.js and MongoDB.

### Deliverables
[x] `/upload`
    HTTP POST request allowing for the entry of a new document into the MongoDB. </br>
[x] `/list`
    lists all objects within your collection. This page can be either rendered server side or client side using AJAX to a rest route.</br>
[ ] `/query`
    Takes some input into a form and makes a parameterized query of the data set. This request must be made via AJAX from the page at /query, i.e., using XMLHttpRequest or Fetch.</br>
[x] `/anime`
    HTTP POST request to create an object in the dataset</br>
[ ] `/animes`
    HTTP GET request that takes query parameters to make to return query result of objects</br>
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
`kill -9 "$(cat /run/user/"$(id -u)"/containers/networks/aardvark-dns/aardvark.pid)"`
