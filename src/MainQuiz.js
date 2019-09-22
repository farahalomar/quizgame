import React from "react";
import { Data } from "./data";

class MainQuiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 1,
    disabled: true,
    isEnd: false
  };
  

  loadData = () => {
    // console.log(Data[0].question)
    this.setState(() => {
      return {
        questions: Data[this.state.currentQuestion].question,
        answer: Data[this.state.currentQuestion].answer,
        options: Data[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    this.loadData();
  }
  nextQuestionHandler = () => {
    // console.log('test')
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state.currentQuestion);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: Data[this.state.currentQuestion].question,
          options: Data[this.state.currentQuestion].options,
          answer: Data[this.state.currentQuestion].answer
        };
      });
    }
  }
  //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
    if (this.state.currentQuestion === Data.length - 1) {
      this.setState({
        isEnd: true
      });
    }
  };
  refreshpage(){
    window.location.reload()
  }
  render() {
   
    
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className="result">
          <h3>أنتهت اللعبة! حصلت على {this.state.score} نقاط </h3>
          <p>
           : الإجابات الصحيحة
            <ul>
              {Data.map((item, index) => (
                <li className="ui floating message options" key={index}>
                  
                  {item.answer}
                </li>
              ))}
            </ul>
          </p>
          <input type="button" value="مرة أخرى" onClick={this.refreshpage}></input>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>{this.state.questions} </h1>
          <span>{`السؤال  ${currentQuestion+1} من أصل ${Data.length}  `}</span>
          {options.map(option => (
            
            <p
              key={option.id}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}

              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion < Data.length - 1 && (
            <button
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              التالي
            </button>
          )}
          {/* finish button here */}
          {currentQuestion === Data.length - 1 && (
            <button className="ui inverted button" onClick={this.finishHandler}>
              الإنهاء
            </button>
          )}
        </div>
      );
    }
  }
}

export default MainQuiz;
