# Doodly (in development)

Basic drawing and account endpoints are available

## Running the app
### Prereqs
This guide relies on Docker to run so you'll need to install Docker Desktop:
```sh
https://www.docker.com/products/docker-desktop/
```

### Installation
1. Clone the repo:
    ```
    git clone https://github.com/vlinGit/Doodly.git
    ```
2. Start the Docker Desktop app. If it's not installed refer to <a href="#Prereqs">Preqreqs</a>.
3. Open up a terminal and CD to where you downloaded the repo. Do an ls command and make sure you see docker-compose.yml in the list of files.
4. Run the following command:
    ```
    docker compose up --build
    ```
5. The site is hosted on: http://localhost:8000 <br> The server is hosted on: http://localhost:5000
