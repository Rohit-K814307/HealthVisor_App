
# Backend Docs

## Database

The database was built using postgres and hosted in docker. `import psycopg2` to connect the database in python. Read more about postgres in the [docs](https://www.postgresql.org).


#### Docker Desktop instructions

Follow the instructions in [the database docs](https://github.com/Rohit-K814307/Health_Visor_App/tree/master/backend/database#readme) to create a docker container with all the data.

The [add data file](https://github.com/Rohit-K814307/Health_Visor_App/blob/master/backend/database/db/db_data_setup/add_data.py) inserts the data in the database.
Change the information to be inserted into the db to change use


### Quick Start

Start the docker container to start the database. Docker desktop was used for the database


## Flask API

### Quick start

Enter the terminal
enter `cd backend/flask`
enter `python server.py`

Download requirements: view imports

### Running ML Models

Flask may throw a `modulenotfound OSError`. Simply **restart** the computer to get rid of `temp` files and follow the instructions to start the API


## Machine Learning

The models were built using `tensorflow`.


### Generate a Model

To generate a model, open the [Condition prediction File](machine_learning/condition_pred/Condition_pred2.ipynb) and simply run every cell. The model will be generated and the files can be moved to the flask api folder where the current model files are located

### Model Architecture

This model uses BERT for text-sentiment analysis. The outputs of BERT are then fed to a neural network to predict one of 41 different conditions.

The model has an *acuracy* of over **99%**.