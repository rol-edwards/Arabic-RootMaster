import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';


class Answer extends React.Component{
	//props: onClick, ans
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(answer, question){
		return this.props.onClick(answer, question)
	}
	render(){
		return(
			<button onClick={ () => this.handleClick(this.props.ans, this.props.question)}>
				{this.props.ans.english}
			</button>
		)
	}
}

class Answers extends React.Component{
	//props: vocab
	constructor(props){
		super(props);
	}
	
	render(){
		const handleClick = this.props.handleClick;
		const answers = [];
		
		for (var i = 0; i < this.props.vocab.length; i++){
			answers.push(<Answer 
				key={this.props.vocab[i].id}
				ans={this.props.vocab[i]}
				onClick={handleClick}
				question={this.props.question}
				/>)
		}
		return(
			<div>
				{answers}
			</div>
			)
	}
}

class Login extends React.Component{
	constructor(props){
		super(props);
		this.createUser = this.createUser.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
		this.getId = this.getId.bind(this);
		//this.handlePassword = this.handlePassword.bind(this);
	}
	
	handleUsername(input) {
		this.props.onUsername(input.target.value)
	}
	/*handlePassword(input){
		this.props.onPassword(input.target.value)
	}*/
	getId(){
		this.props.onId()
	}
	createUser() {
		axios.post('http://localhost:5000/users', {username: "jethro_tull", password: "seeddrill", vocab: 20})
        .then((res) => {
        	console.log('' + res.data[0])
	        var id = res.data[0];
	        for (var i = 0; i<=20; i++){
	        	console.log('adding word: ' + i)
	        	console.log('id is ' + id + res.data)
	        	axios.post('http://localhost:5000/users_vocab', {user_id: id, word_id: i})
	        	.then((res) => {
	        		console.log('word added')
	        		var result = res.data;
	        	})
	        }
        })
        .catch((error) => {
          console.error(error);
        });
	}
	render(){
		return(
			<div>
				<button onClick={this.createUser}>Create User</button>
				<div>
					<h2>Login</h2>
					<label htmlFor='username'>Username</label>
					<input type='text' onChange={this.handleUsername} id='username'/>
					<button onClick={this.getId}>Submit</button>
				</div>
			</div>
		)
	}
}

class Score extends React.Component{
	render(){
		return(
			<h2>Score: {this.props.score}/{this.props.outOf}</h2>
			)
	}
}

class Question extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log('question rendering; question word is ' + JSON.stringify(this.props.word))
		return(
			<h2>{this.props.word.arabic}</h2>)
	}
}

class Submit extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(){
		return this.props.onSubmit(0);
	}
	render(){
		return(
			<button onClick={ () => this.handleSubmit()}>QUIT AND SUBMIT RESULTS</button>
			)
	}
}

class ToLearn extends React.Component{
	render(){
		const list = [];
		this.props.items.forEach(function(item){
			console.log('item is: ' + JSON.stringify(item))
			list.push(<p>{item.arabic} = {item.english}</p>)
		})
		return(
			<div>

				<h2>To learn:</h2>
				{list}
			</div>
			)
	}
}

class GameOver extends React.Component {
	constructor(props){
		super(props);
		this.reset = this.reset.bind(this)
	}
	reset(){
		this.props.onReset()
	}
	render(){
		return(
			<div>
			<h1>Test Complete</h1>
			<p>You attempted {this.props.outOf} questions and got {this.props.gotRight} correct!</p>
			<button onClick={this.reset}>Reset</button>
		</div>
		)
		
	}
}

class ArabicQuiz extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			//password: '',
			id: 63,
			vocab: [{arabic: 'dummy', english: 'other_dummy'}],
			//questionWord: {},
			score: 0,
			outOf: 0,
			gotRight: [],
			gotWrong: [{arabic: 'dummy', english: 'other_dummy'}],
			toggle: true,
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getVocab = this.getVocab.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
		//this.handlePassword = this.handlePassword.bind(this);
		this.getId = this.getId.bind(this);
		this.reset = this.reset.bind(this);
		
	}
	reset(){
		this.setState({id: 63,
			vocab: [{arabic: 'dummy', english: 'other_dummy'}],
			//questionWord: {},
			score: 0,
			outOf: 0,
			gotRight: [],
			gotWrong: [{arabic: 'dummy', english: 'other_dummy'}],
			toggle: true,})
	}
	handleUsername(username){
		this.setState({username: username})
	}

	/*handlePassword(password) {
		this.setState(password: password)
	}*/

	getId() {
		axios.post('http://localhost:5000/login', {username: this.state.username})
		.then((res) => {
			console.log('state should change to ' + JSON.stringify(res.data))
			this.setState({id: res.data[0][0]})
			this.getVocab()
		})
	}

	getVocab(){
		axios.get('http://localhost:5000/users_vocab?id=' + this.state.id)
        .then((res) => {
        	console.log('getting users_vocab')
	        var vocab2 = '';	
	          vocab2 = res.data;
	          console.log('users vocab is: ' + JSON.stringify(res.data))
	          var newVocab = [];
	          vocab2.forEach(function(word){
	          	newVocab.push({id: word[0], arabic: word[1], english: word[2], score: word[3]})
	          })
	          //console.log('newVocab: ' + JSON.stringify(newVocab))
	          //console.log('newVocab[1].arabic is: ' + newVocab[1].arabic);
	          this.setState({vocab: newVocab});
	          //console.log('state vocab: ' + JSON.stringify(this.state.vocab));
        })
        .catch((error) => {
          console.error(error);
        });
	}

	handleClick(answer, question) {

		//const questionWord = this.state.questionWord;
		var questionWord = this.questionWord
		console.log('your answer is: ' + JSON.stringify(answer));
		console.log('the correct answer was: ' + JSON.stringify(question))
		if (answer === question){
			console.log('correct');
			const gotRight = this.state.gotRight;
			gotRight.push(answer);
			console.log('gotRight: ' + JSON.stringify(gotRight))
			this.setState({score: this.state.score + 1, gotRight: gotRight});

		}
		else {
			console.log('incorrect')
			const gotWrong = this.state.gotWrong;
			gotWrong.push(question);
			this.setState({gotWrong: gotWrong})
			console.log('got wrong: ' + JSON.stringify(gotWrong))
		}
		const newVocab = [];
		this.state.vocab.forEach(function(word){
			if (word != question){
				newVocab.push(word)
			}
		})
		if(newVocab.length < 1) {
			console.log('now would be the time to conditionally render something')
			this.setState({toggle: false});
			this.handleSubmit(0)
		}
		console.log('newVocab is: ' + JSON.stringify(newVocab))
		//this.setState({vocab: newVocab});
		//console.log('the new vocab list is: ' + JSON.stringify(this.state.vocab))
	
		this.setState({vocab: newVocab, outOf: this.state.outOf + 1})
	}

	handleSubmit(i){
		var words = this.state.gotRight
		console.log('word id: ' + words[i].id)
		console.log('word.score: ' + words[i].score)
		console.log('state id:' + this.state.id)
		var newScore = words[i].score + 1;
		axios.put('http://localhost:5000/users_vocab', {user_id: this.state.id, word_id: words[i].id, score: newScore})
        .then((res) => {
	        console.log('done')
	        i = i + 1;
	        if (i < words.length){
	         this.handleSubmit(i)
	        }
	        else this.updateVocab()
        })
        .catch((error) => {
        	console.error(error);
        });
	}

	updateVocab() {
		axios.get('http://localhost:5000/vocab_count?id=' + this.state.id)
		.then((res) => {
			var count = JSON.stringify(res.data)
			console.log('count worked: ' + count)
		})
	}

	render(){
	
		var questionWord = this.state.vocab[Math.floor(Math.random() * this.state.vocab.length)]
		console.log('question word is: ' + questionWord)

		/*
		some diagnostics:
		console.log('the questionword should be: ' + JSON.stringify(questionWord))
		console.log('the questionword arabic is: ' + questionWord.arabic)
		console.log("entering rendering, and the question word is: " + JSON.stringify(questionWord) + ' and the score is ' + this.state.score)*/
		if(this.state.toggle){
			return(
				<div>
					<h1>Arabic RootMaster</h1>
					<p>ID is {this.state.id}</p>
					<Login
						username={this.state.username}
						password={this.state.password}
						onUsername={this.handleUsername}
						onPassword={this.handlePassword}
						onId={this.getId}
						/>
					<Question 
						word={questionWord}
						/>
					<Score 
						score={this.state.score}
						outOf={this.state.outOf}
					/>
					<Answers 
						vocab={this.state.vocab}
						handleClick={this.handleClick}
						question={questionWord}
					/>
					<Submit 
						onSubmit={this.handleSubmit}
						/>
					

				</div>
			)
		}
		else {
			return(
				<div>
					<GameOver
						onReset={this.reset}
						outOf={this.state.outOf}
						gotRight={this.state.gotRight.length}
						/>
					<ToLearn
						items={this.state.gotWrong}
						/>
				</div>)
		}
		
	}
}

class Welcome extends React.Component{
	render(){
		return(
			<h1>Welcome to Arabic RootMaster!</h1>
		)
	}
}

class IndexPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			 <Router>
				<div>
					<ul>
						<li>
							<Link to='/home'>Home</Link>
						</li>
						<li>
							<Link to='/quiz'>Quiz</Link>
						</li>
					</ul>
					<hr/>
					<Route path='/home' component={Welcome} />
					<Route path='/quiz' component={ArabicQuiz}/>
				</div>
			</Router>
		)
	}
}

ReactDOM.render(
	<IndexPage />,
	document.getElementById('root')
	)
