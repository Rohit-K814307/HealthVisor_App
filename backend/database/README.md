
# To create the database

## open the terminal, then do the following

First enter `cd backend/database/db`

then simply enter `docker build -t healthvisordb ./`

Finally `docker run -d --name healthvisordb-container -p 5432:5432 healthvisordb`

Make sure to run the python file to add the data:
`cd ../db_data_setup`
`python add_data.py`

## to stop the database container:

`docker stop healthvisordb-container`

## start database

`docker run -d --name healthvisordb-container -p 5432:5432 hvdatabaseimg` 
 - for the above, make sure to save the container (with the data in it) as an image to do the run