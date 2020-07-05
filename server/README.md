# How to execute de Server

First create a `.env` file in the root of the server folder with the following content and the corrent changes according to your system configuration: 

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=(database name)
IMAGE_HOST=(your machine ip address)
```

###### Pay atention that tihs app is configured to run in a MySql server, if you want to change the database server, check the documentation on the way to do that on the [knex.js](http://knexjs.org/) site.

Once your database connection is configured, run the following commands:
```bash
yarn knex migrate:latest 
yarn knex seed:run
```

Those will run the migrations of the database tables and populate the `tags` table with some data.

Then, to populate the `books` table, it's needed to do manually. So go to the `web` folder and follow the steps inside the `README.md` file there.
