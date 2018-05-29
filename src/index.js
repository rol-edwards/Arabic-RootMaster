import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ArabicGenius extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showArabic: true,
      results: [],
      vocab: [
        {arabic: 'ktb', english: 'to write'},
        {arabic: 'qr*', english: 'to read'},
        {arabic: '*kl', english: 'to eat'},
        {arabic: '3ml', english: 'to work'},
        {arabic: 'zhb', english: 'to go'},
        {arabic: 'hbb', english: 'to love'},
        {arabic: 'kwn', english: 'to be'},
        
      ]
    }
    this.handleLangSwitch = this.handleLangSwitch.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleReset = this.handleReset.bind(this)

  }
 
  handleLangSwitch(showArabic){
    this.setState({showArabic: !showArabic, results: []})
  } 
  
  handleReset(){
    //newArray = [];
    //vocabToShuffle = newArray.concat(this.state.vocab);

    this.setState({results: []})
  }
  handleAnswer(word, answer){
    const emptyArray = [];
    const newResults = emptyArray.concat(this.state.results);
    if (this.state.showArabic){
      if (word.english === answer){
        newResults.push(word.arabic);
        this.setState({results: newResults})
        console.log('answer correct, results are now: ' + this.state.results)
      }
      else {
        console.log('answer was incorrect, results should be empty: ' + this.state.results)
        }
    }
    else {
      if (word.arabic === answer){
        newResults.push(word.english);
        this.setState({results: newResults})
        console.log('answer correct, results are now: ' + this.state.results)
      }
      else {
        console.log('answer was incorrect, results should be empty: ' + this.state.results)
        }
    }
  }

  render(){
    return (
      <div>
        <h1>Arabic Genius</h1>
        <LangSwitch onLangSwitch={this.handleLangSwitch}/>
        <VocabTable 
          vocab={this.state.vocab} 
           showArabic={this.state.showArabic}
           handleAnswer={this.handleAnswer}
           results={this.state.results}
           />
        <Reset
          onReset={this.handleReset}
          />
        <p>* denotes hamza</p>
      </div>
    )
  }
}

class LangSwitch extends React.Component{
  //props: onLangeSwitch
  constructor(props){
    super(props);
    this.handleLangSwitch = this.handleLangSwitch.bind(this);
  }
    handleLangSwitch(e) {
    this.props.onLangSwitch(e.target.checked)
  
  };
  render(){
    return (
      <div>
        <input 
          type='checkbox' 
          id='box' 
          checked={this.props.showArabic} 
          onChange={this.handleLangSwitch}
        />
        <label htmlFor='box'>Switch language</label>
      </div>)
  }
}

class Reset extends React.Component {
  constructor(props){
    super(props);
    this.handleReset = this.handleReset.bind(this)
  }

  handleReset(e){
    this.props.onReset()
  }
  render(){
    return(
      <button onClick={this.handleReset}>Reset</button>
      )
    
  }
}

class VocabTable extends React.Component{
  //props are vocab, showArabic, handleAnswer, results
  render(){
    const showArabic=this.props.showArabic;
    const rows = [];
    const handleAnswer = this.props.handleAnswer;
    const results=this.props.results;
    console.log('vocab table results: ' + results)
    this.props.vocab.forEach(function(item){
          rows.push(<VocabItem 
                      item={item} 
                      showArabic={showArabic} 
                      key={item.arabic}
                      onAnswer={handleAnswer}
                      results={results}
                    />)
    })
    const heading = showArabic ? (<th>Arabic</th>) : (<th>English</th>)
      return(
          <table>
            <thead>
              <tr>
                {heading}
                <th>Translation</th>
                <th>Correct?</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
         
      )
  }
}

class VocabItem extends React.Component{
  constructor(props){
    super(props);
    this.handleAnswer = this.handleAnswer.bind(this)
    
  }
 
  handleAnswer(answer){
    console.log('first answer handler; passing to main component')
   this.props.onAnswer(this.props.item, answer.target.value)
}
  
  render(){
    const item = this.props.item;
    const results = this.props.results;
    const showArabic = this.props.showArabic;
    const row = showArabic ? (<td>{item.arabic}</td>) :
        (<td>{item.english}</td>);
    const expected = showArabic ? (item.arabic) : (item.english);
    const answer = showArabic ? (item.english) : (item.arabic)
    const input = results.indexOf(expected) !== -1 ?
    (<td><p>{answer}</p></td>) :
    (<td><input type='text' onChange={this.handleAnswer}/></td>);

    const correct = results.indexOf(expected) !== -1 ?
    (<td>Correct</td>) : (<td></td>);
    
    return(
      <tr>
        {row}
        {input}
        {correct}
      </tr>
    )
  }
}


ReactDOM.render(
  <ArabicGenius />,
  document.getElementById('root')
);
