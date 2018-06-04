import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


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
		/*
			http.post('/users_vocab', this.state.gotRight)
			*/
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
  { arabic: 'حول ', english: 'about' },
  { arabic: 'فوق ', english: 'above, super-' },
  { arabic: 'غياب', english: 'absence' },
  { arabic: 'الإدارة', english: 'administration' },
  { arabic: 'ستشار', english: 'adviser' },
  { arabic: 'إيجاب', english: 'affirmative' },
  { arabic: 'سن', english: 'age' },
  { arabic: 'كالات', english: 'agencies' },
  { arabic: 'ولئ', english: 'allegiance' },
  { arabic: 'حلفاء', english: 'allies' },
  { arabic: 'بالفعل', english: 'already' },
  { arabic: 'أيضًا', english: 'also' },
  { arabic: 'كذلك ', english: 'also (as this)' },
  { arabic: 'الغضب', english: 'anger' },
  { arabic: 'ضم ', english: 'annexation' },
  { arabic: 'اعلن', english: 'announced' },
  { arabic: 'سنوية', english: 'annual' },
  { arabic: 'ثم ', english: 'another' },
  { arabic: 'بويع', english: 'apparent (in context of royalty?)' },
  { arabic: 'اقتربوا', english: 'aproached' },
  { arabic: 'فن', english: 'art' },
  { arabic: 'كما ', english: 'as ' },
  { arabic: 'اغتيال', english: 'assassination' },
  { arabic: 'نقابة ', english: 'association' },
  { arabic: 'على الأقل', english: 'at least' },
  { arabic: 'هتمام', english: 'attention' },
  { arabic: 'السلطة', english: 'authority' },
  { arabic: 'المعركة ', english: 'battle' },
  { arabic: 'معارك', english: 'battles' },
  { arabic: 'أصبح', english: 'become' },
  { arabic: 'صار ', english: 'become' },
  { arabic: 'ادة', english: 'birth ' },
  { arabic: 'ميلاده', english: 'birthday' },
  { arabic: 'منفذ الهجوم', english: 'bomber' },
  { arabic: 'قصف', english: 'bombing' },
  { arabic: 'صبي', english: 'boy' },
  { arabic: 'اتساع', english: 'breadth' },
  { arabic: 'سد ', english: 'bridge' },
  { arabic: 'لواء ', english: 'brigade' },
  { arabic: 'بريطاني ', english: 'British' },
  { arabic: 'بريطانية ', english: 'British' },
  { arabic: 'أخي', english: 'brother' },
  { arabic: 'شقيق ',
    english: 'brother (emphasises full not half?)' },
  { arabic: 'تصفح', english: 'browse' },
  { arabic: 'بناء', english: 'building' },
  { arabic: 'رصاصات', english: 'bullets' },
  { arabic: 'حافلة ', english: 'bus' },
  { arabic: 'غير ', english: 'but' },
  { arabic: 'ولكن ', english: 'but' },
  { arabic: 'تدعى', english: 'called' },
  { arabic: 'عاصمة ', english: 'capital city' },
  { arabic: 'سيارة', english: 'car' },
  { arabic: 'رعاية', english: 'care' },
  { arabic: 'حالة ', english: 'case (in the case of...)' },
  { arabic: 'القرن', english: 'century' },
  { arabic: 'شجع', english: 'cheer, comfort' },
  { arabic: 'حال', english: 'circumstance' },
  { arabic: 'بلور', english: 'clarify' },
  { arabic: 'تحالف ', english: 'coalition' },
  { arabic: 'ساحل', english: 'coast' },
  { arabic: 'الكلية ', english: 'college' },
  { arabic: 'قائد ', english: 'commander' },
  { arabic: 'المفوضية ', english: 'commission' },
  { arabic: 'جنة ', english: 'committee' },
  { arabic: 'بلاغ', english: 'communication' },
  { arabic: 'تماما', english: 'completely' },
  { arabic: 'ؤتمر ', english: 'conference' },
  { arabic: 'تآمر', english: 'conspiracy' },
  { arabic: 'دستور', english: 'constitution' },
  { arabic: 'بالقنصل ', english: 'consul ' },
  { arabic: 'شاورات', english: 'consultations' },
  { arabic: 'بلد', english: 'country' },
  { arabic: 'للديوان ', english: 'court' },
  { arabic: 'حرفة', english: 'craft' },
  { arabic: 'أبي', english: 'dad' },
  { arabic: 'يوم ', english: 'day' },
  { arabic: 'فاة ', english: 'death' },
  { arabic: 'إعلا ', english: 'declaration' },
  { arabic: 'دلتا', english: 'delta' },
  { arabic: 'خلع ', english: 'deposition, extraction' },
  { arabic: 'الصحراء', english: 'desert' },
  { arabic: 'رغم ', english: 'despite' },
  { arabic: 'يستغني ', english: 'dispense' },
]



ReactDOM.render(
	<ArabicQuiz vocab={vocab}/>,
	document.getElementById('root')
	)


