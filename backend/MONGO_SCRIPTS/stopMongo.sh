mongo --port 27017 --eval "db.getSiblingDB(\"admin\").shutdownServer({'force':'true'});"

