import config

hostname = config.hostname
username = config.username
password = config.password
database = config.database

import psycopg2
myConnection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)

def insert(query, data):
	print 'query called', query
	cur = myConnection.cursor()
	cur.execute(query, data)
	first = cur.fetchall()
	print 'first is', first
	myConnection.commit()
	return first

