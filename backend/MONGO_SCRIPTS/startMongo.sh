cd ~/Mongo/
mongod --dbpath $HOME/mern_intro/backend/data --port 27017 --logpath $HOME/mern_intro/backend/data/mongodb.log --fork --wiredTigerCacheSizeGB 1 --storageEngine wiredTiger
