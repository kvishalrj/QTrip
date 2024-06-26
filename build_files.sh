# build_files.sh
pip3 install -r requirements.txt

# make migrations
python3.9 manage.py migrate 
python3.9 manage.py collectstatic
