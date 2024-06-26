#!/bin/bash

# Ensure the correct Python environment is activated
source /vercel/path/to/python/bin/activate

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --noinput

# Apply database migrations
python manage.py migrate
