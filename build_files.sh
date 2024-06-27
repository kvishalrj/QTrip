#!/bin/bash

# Install Python and pip
apt-get update && apt-get install -y python3 python3-pip

# Install project dependencies
pip install -r requirements.txt

pip install -r requirements.txt

# make migrations
python3.9 manage.py migrate 
python3.9 manage.py collectstatic