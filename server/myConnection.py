import config
from app_error import AppError
import psycopg2

hostname = config.hostname
username = config.username
password = config.password
database = config.database


myConnection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)

def insert(query, data):
	print 'query called', query
	cur = myConnection.cursor()
	try:
		cur.execute(query, data)
		first = cur.fetchall()
		print 'first is', first
		myConnection.commit()
		return first
	except psycopg2.Error, e:
		print 'error'
		return AppError('db error')

