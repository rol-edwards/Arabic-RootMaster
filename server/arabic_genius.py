import myConnection
from app_error import AppError
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__, static_folder='static',  template_folder='template')

CORS(app)

insert = myConnection.insert

from flask import render_template


"""@app.route('/')
def test():
	print 'test called'
	return jsonify(insert('select * from vocab', None))"""

@app.route('/vocab', methods=['GET'])
def getWords():
	response_object = insert("select * from vocab", None)
	return jsonify(response_object)

@app.route('/users', methods=['POST'])
def addUser():
	if request.method == 'POST':
		post_data = request.get_json()
		print 'request is', request.get_json()
		username = post_data.get('username')
		password = post_data.get('password')
		queryString = 'insert into users (username, password) values (%s, %s) returning id as id'
		data = (username, password)
		print 'query string is ', queryString
		response_object = insert(queryString, data)
		return jsonify(response_object)

@app.route('/login', methods=['POST'])
def login():
	if request.method == 'POST':
		data = request.get_json()
		username = data.get('username')
		print 'username:', username
		queryString = 'select * from users where username = %s'
		queryData = (username, )
		response_object = insert(queryString, queryData)
		if isinstance(response_object, AppError):
			return response_object.message
		return jsonify(response_object)


@app.route('/users_vocab', methods=['GET', 'POST', 'PUT'])
def addWords():
	print 'addWords called'

	if request.method == 'POST':
		print 'posting'
		data = request.get_json()
		user_id = data.get('user_id')
		word_id = data.get('word_id')
		queryString = 'insert into users_vocab (user_id, word_id, score) values (%s, %s, 0) returning id as id'
		queryData = (user_id, word_id)
		print 'query string is ', queryString
		return insert(queryString, queryData)

	if request.method == 'PUT':
		print 'putting'
		data = request.get_json()
		user_id = data.get('user_id')
		word_id = data.get('word_id')
		score = data.get('score')
		print 'to be put: ', user_id, word_id, score
		queryString = 'update users_vocab set score = %s where user_id = %s and word_id = %s returning score as score'
		queryData = (score, user_id, word_id)
		insert(queryString, queryData)
		return 'data put'

	else:
		print 'getting'
		queryString = 'select v.id, v.arabic, v.english, uv.score from vocab v inner join users_vocab uv on v.id = uv.word_id where uv.user_id = %s and uv.score < 5'
		user_id = request.args.get('id')
		print 'id is', user_id
		queryData = (user_id,)
		print queryData
		response_object = insert(queryString, queryData)
		return jsonify(response_object)


@app.route('/vocab_count')
def count_vocab():
	user_id = request.args.get('id')
	queryString = 'select count(id) from users_vocab where score = 5 and user_id = %s'
	queryData = (user_id, )
	dbData = insert(queryString, queryData)
	count = dbData[0][0]
	print 'count is ', count
	maxId = insert('select max(word_id) from users_vocab', None)
	vocabLow = maxId[0][0] + 1
	print 'vocabLow is ', vocabLow
	vocabHigh = vocabLow + count
	print 'vocabHigh is: ', vocabHigh
	i = vocabLow
	while i < vocabHigh:
		queryString = ('insert into users_vocab (user_id, word_id, score) values (%s, %s, 0) returning id as id')
		queryData = (user_id, i)
		insert(queryString, queryData)
		print i, ' inserted'
		i = i + 1
	insert('update users_vocab set score = 6 where score = 5 returning id as id', None)
	return 'done'



