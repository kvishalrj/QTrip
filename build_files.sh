#!/bin/bash

# Step 1: Download and install Python
PYTHON_VERSION="3.9.6"
PYTHON_TAR="Python-${PYTHON_VERSION}.tgz"
PYTHON_DIR="Python-${PYTHON_VERSION}"

# Download Python source
curl -O https://www.python.org/ftp/python/${PYTHON_VERSION}/${PYTHON_TAR}

# Extract the tarball
tar xzf ${PYTHON_TAR}

# Navigate to the Python directory
cd ${PYTHON_DIR}

# Configure and install Python locally
./configure --prefix=$HOME/python
make
make install

# Go back to the original directory
cd ..

# Update PATH to use the newly installed Python
export PATH=$HOME/python/bin:$PATH

# Verify Python installation
python --version

# Step 2: Install pip
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py --user

# Ensure pip is in PATH
export PATH=$HOME/.local/bin:$PATH

# Verify pip installation
pip --version

# Step 3: Install dependencies
pip install -r requirements.txt

# Step 4: Collect static files
python manage.py collectstatic --noinput

# Step 5: Apply database migrations
python manage.py migrate
