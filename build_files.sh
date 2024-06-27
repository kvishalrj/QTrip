#!/bin/bash

# Update and install Python and pip
sudo apt-get update && sudo apt-get install -y python3.9 python3.9-venv python3.9-dev python3-pip

# Ensure pip is using Python 3.9
sudo apt-get install -y python3-pip
sudo python3.9 -m pip install --upgrade pip

# Install project dependencies
python3.9 -m pip install -r requirements.txt

# Make migrations and collect static files
python3.9 manage.py migrate
python3.9 manage.py collectstatic --noinput
