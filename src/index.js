import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
							<Link to='/your_vocab'>Your Vocab</Link>
						</li>
						<li>
							<Link to='/quiz'>Quiz</Link>
						</li>
					</ul>

					<hr/>
					<Route path='/home' component={Welcome} />
					<Route path='/your_vocab' component={YourVocab}/>
					<Route path='/quiz' render={(props) => <ArabicQuiz vocab={vocab}/>}/>
				</div>
			</Router>
		)
	}
}

class YourVocab extends React.Component{
	render(){
		return(
			<h1>Your Vocab</h1>
			)
	}
}

class Welcome extends React.Component{
	render(){
		return(
			<h1>Welcome to Arabic RootMaster!</h1>
			)
	}
}

class ArabicQuiz extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			vocab: this.props.vocab,
			questionWord: vocab[Math.floor(Math.random() * vocab.length)],
			score: 0,
			outOf: 0,
			gotRight: [],
			gotWrong: [],
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleClick(answer){
		if (answer === this.state.questionWord){
			console.log('correct');
			const gotRight = this.state.gotRight;
			gotRight.push(answer);
			this.setState({score: this.state.score + 1, gotRight: gotRight});

		}
		else {
			console.log('incorrect')
			const gotWrong = this.state.gotWrong;
			gotWrong.push(this.state.questionWord);
			this.setState({gotWrong: gotWrong})
		}
		const questionWord = this.state.questionWord;
		const newVocab = [];
		this.state.vocab.forEach(function(word){
			if (word != questionWord){
				newVocab.push(word)
			}
		})
		console.log(newVocab)
		this.setState({vocab: newVocab});
		console.log(this.state.vocab)
		this.setState({questionWord: this.state.vocab[Math.floor(Math.random() * this.state.vocab.length)], outOf: this.state.outOf + 1})
	}

	handleSubmit(){

		console.log('submitting:' + this.state.gotRight[0].arabic + this.state.gotRight.length);	
	}

	render(){
		return(
			<div>
				<h1>Arabic RootMaster</h1>
				<Question 
					word={this.state.questionWord}
					/>
				<Score 
					score={this.state.score}
					outOf={this.state.outOf}
				/>
				<Answers 
					vocab={this.state.vocab}
					handleClick={this.handleClick}
				/>
				<Submit 
					onSubmit={this.handleSubmit}
					/>
				<ToLearn
					items={this.state.gotWrong}
					/>

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
		return(
			<h2>{this.props.word.arabic}</h2>)
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
		this.props.vocab.forEach(function(word){
			answers.push(<Answer 
				key={word.arabic}
				ans={word}
				onClick={handleClick}/>)
		})
		return(
			<div>
				{answers}
			</div>
			)
	}
}

class Answer extends React.Component{
	//props: onClick, ans
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(answer){
		return this.props.onClick(answer)
	}
	render(){
		return(
			<button onClick={ () => this.handleClick(this.props.ans)}>
				{this.props.ans.english}
			</button>
			)
	}
}

class Submit extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(){
		return this.props.onSubmit();
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




const vocab = [ 
  { arabic: 'qbl',
    english: 'accept/before (spatial or temporal)' },
  { arabic: 'Swl', english: 'access' },
  { arabic: 'SHb', english: 'accompanied' },
  { arabic: 'Tbq', english: 'according to ' },
  { arabic: 'Hqq', english: 'achieve, check' },
  { arabic: 'br*', english: 'acquitted' },
  { arabic: 'nshT', english: 'active' },
  { arabic: 'DbT', english: 'adjust/monitor' },
  { arabic: '3jb', english: 'admire' },
  { arabic: 'qdm', english: 'advance' },
  { arabic: 'nSH', english: 'advise' },
  { arabic: 'jwy', english: 'aerial' },
  { arabic: 'KhTb', english: 'affiance' },
  { arabic: 'ftr', english: 'after' },
  { arabic: 'tfq', english: 'agreed' },
  { arabic: 'z3m', english: 'allege' },
  { arabic: 'wl*', english: 'allegiance' },
  { arabic: 'Hlf', english: 'alliance' },
  { arabic: 'khSS', english: 'allocated' },
  { arabic: 'smH', english: 'allow' },
  { arabic: 'shrd', english: 'amaze' },
  { arabic: 'ghDb', english: 'anger' },
  { arabic: 'Dmm', english: 'annexed (passive?)' },
  { arabic: 'rdd', english: 'answer' },
  { arabic: 'drr', english: 'answer?' },
  { arabic: 'bdw', english: 'appears, seems that' },
  { arabic: 'lHq', english: '8' },
  { arabic: '3yn', english: 'appoint' },
  { arabic: 'hjj', english: 'arguments' },
  { arabic: 'rtb', english: 'arrange ' },
  { arabic: 'nsq', english: 'arrangement' },
  { arabic: 'wSl', english: 'arrive' },
  { arabic: 'ghrr', english: 'arrogance' },
  { arabic: 'TrH', english: 'ask' },
  { arabic: 'Tlb', english: 'ask of + min' },
  { arabic: 's*l', english: 'ask, be responsible for' },
  { arabic: '3wn', english: 'assistance, backing' },
  { arabic: 'rfq', english: 'attach' },
  { arabic: 'hjm', english: 'attack' },
  { arabic: 'HDr', english: 'attend' },
  { arabic: 'jdhb', english: 'attract' },
  { arabic: 's lT', english: 'authority' },
  { arabic: 'fwD', english: 'authorize' },
  { arabic: 'w3y', english: 'awareness' },
  { arabic: 'khlw', english: 'bare, vacant' },
  { arabic: 'bdl', english: 'bargain' },
  { arabic: 'Hjz', english: 'barrier' },
  { arabic: 'kwn', english: 'be' },
  { arabic: 'sh h d', english: 'be a witness' },
  { arabic: 'qdr', english: 'be able' },
  { arabic: 'ghyb', english: 'be absent (of the sun - go down)' },
  { arabic: 'khwf', english: 'be afraid' },
  { arabic: 'wld', english: 'be born' },
  { arabic: 'tmm', english: 'be completed (+masdar)' },
  { arabic: 'qn3', english: 'be content' },
  { arabic: 'rDy', english: 'be content' },
  { arabic: 'ghrq', english: 'be drowned' },
  { arabic: 'krm', english: 'be generous' },
  { arabic: 's3d', english: 'be happy, lucky' },
  { arabic: 'Trb', english: 'be in a state of rapture' },
  { arabic: 'KhT*', english: 'be mistaken' },
  { arabic: 'hmm', english: 'be of interest to' },
  { arabic: 'skt', english: 'be quiet' },
  { arabic: 'Hzn', english: 'be sad' },
  { arabic: 'n3s', english: 'be sleepy' },
  { arabic: 'ftn', english: 'be subject to temptation' },
  { arabic: '3rD',
    english: 'be wide, come into someones awareness, offer, show' },
  { arabic: 'bd*', english: 'begin' },
  { arabic: 'khlf', english: 'behind' },
  { arabic: 'nf3', english: 'benefit, be of use' },
  { arabic: 'khyr', english: 'benevolent' },
  { arabic: 'ghdr', english: 'betray' }
]



ReactDOM.render(
	<IndexPage vocab={vocab}/>,
	document.getElementById('root')
	)


