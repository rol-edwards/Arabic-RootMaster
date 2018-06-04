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
        {arabic: 'ktb', c1: 'k', c2: 't', c3: 'b', english: 'to write', forms: ['2']},
        {arabic: 'qr*', c1: 'x', c2: 'x', c3: 'x', english: 'to read', forms: []},
        {arabic: '*kl', c1: 'x', c2: 'x', c3: 'x', english: 'to eat', forms: []},
        {arabic: '3ml', c1: 'x', c2: 'x', c3: 'x', english: 'to work', forms: []},
        {arabic: 'zhb', c1: 'x', c2: 'x', c3: 'x', english: 'to go', forms: []},
        {arabic: 'hbb', c1: 'x', c2: 'x', c3: 'x', english: 'to love', forms: []},
        {arabic: 'kwn', c1: 'x', c2: 'x', c3: 'x', english: 'to be', forms: []},
        {arabic: 'qbl', c1: 'q', c2: 'b', c3: 'l', english: 'to accept', forms: ['3', '4']},
        {arabic: '3dd', c1: '3', c2: 'd', c3: 'd', english: 'to count', forms: ['4', '10']}
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

//swaps languages and resets. Should be a button! 
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

//resets
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

//table with word, translation input, and verb forms I-X
class VocabTable extends React.Component{
  //props are vocab, showArabic, handleAnswer, results
  render(){
    const showArabic=this.props.showArabic;
    const rows = [];
    const handleAnswer = this.props.handleAnswer;
    const results=this.props.results;
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
                <th>II</th>
                <th>III</th>
                <th>IV</th>
                <th>V</th>
                <th>VI</th>
                <th>VII</th>
                <th>VIII</th>
                <th>IX</th>
                <th>X</th>
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
    const answer = showArabic ? (item.english) : (item.arabic);

    const input = results.indexOf(expected) !== -1 ?
    (<td><p>{answer}</p></td>) :
    (<td><input type='text' onChange={this.handleAnswer}/></td>);

    const correct = results.indexOf(expected) !== -1 ?
    (<td>Correct</td>) : (<td></td>);

    //automatic generation of verb forms
    const templates = {
      2: ['', 'a', 'a', ''],
      3: ['', 'aa', 'i', ''],
      4: ['aa', '', 'a', ''],
      5: 'something',
      6: 'something',
      7: 'something',
      8: 'something',
      9: 'something',
      10: ['Ista', '', 'a', '']
    }
    const createForm = function(c1, c2, c3, template){
      console.log('form being created');
      return template[0] + c1 + template[1] + c2 + template[2] + c3 + template[3];
    }

    const createFormSpecial = function(c1, c2, c3, template){
      return template[0] + c1 + template[1] + c2 + c2 + template[2] + c3 + template[3];
    }
    const columns = [];
    console.log(Object.keys(templates))
    Object.keys(templates).forEach(function(template){
      if (template == '2' | '5') {
        if (item.forms.indexOf(template) !== -1){
        const columnString = (createFormSpecial(item.c1, item.c2, item.c3, templates[template]))
        columns.push(<td key={item.arabic}>{columnString}</td>)
        }
        else {
          columns.push(<td></td>)
        }
      }
      else {
        if (item.forms.indexOf(template) !== -1){
        const columnString = (createForm(item.c1, item.c2, item.c3, templates[template]))
        columns.push(<td key={item.arabic}>{columnString}</td>)
        }
        else {
          columns.push(<td></td>)
        }
      }
      
    })
    
    return(
      <tr>
        {row}
        {input}
        {correct}
        {columns}
      </tr>
    )
  }
}


ReactDOM.render(
  <ArabicGenius />,
  document.getElementById('root')
);
