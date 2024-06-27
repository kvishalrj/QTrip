#!/bin/bash

# Update package lists
sudo apt-get update

# Install Python and pip
sudo apt-get install -y python3.9 python3.9-venv python3.9-dev

# Ensure pip is installed and upgrade to the latest version
sudo apt-get install -y python3-pip
python3.9 -m pip install --upgrade pip

# Install project dependencies
python3.9 -m pip install -r requirements.txt

# Make migrations and collect static files
python3.9 manage.py migrate
python3.9 manage.py collectstatic --noinput
