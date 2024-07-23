# T-YEP-600

# Installation

## Backend

### Update Node.js to the last version

```
sudo npm install -g n
sudo n lts
sudo n prune
```

### Create your .env based on .env.example
```dotenv
BACKEND_PORT=3000
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_PORT=
DB_NAME=
JWT_SECRET=
```
### Install dependancies

```sh
cd backend
npm install
```

### Start DB and Run migrations

```bash
docker compose up -d
```

```bash
npm run migration:run
```

### Run the API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Frontend

Install Node modules

```sh
# From T-YEP-600-PAR_6
cd frontend
npm install
```

Start on expo

```sh
npm run start
```
