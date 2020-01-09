// React Imports
import React, { Component } from 'react';

// Redux
//import { connect } from 'react-redux';
//import store, { IStore } from '../../Store/index';
//import * as Actions from '../../Store/actions';

// Styles
import './styles.css'

// Components

// Model
import Question, {QuestionFilter, QuestionDificulty, Testament} from '../../../base/Model/Question';
import User from '../../../base/Model/User';

// Services
import QuestionDB from '../../../base/Services/Firebase/CloudFirestore/QuestionDB';

// Icons

// Enums

// Interfaces
interface IProps {
    dispatch: any
}

interface IState {
    question?: Question,
    timer: Timer;
}

class Timer {
    isOn: boolean;
    maxTime: number;
    timeLeft: number;
    private endTimerCallBack: () => void;
    private timerTickCallBack: () => void;

    constructor(maxTime: number, endTimerCallBack: () => void, timerTickCallBack: () => void, isOn?: boolean){
        this.isOn = (isOn === undefined) ? false : isOn!;
        this.maxTime = maxTime;
        this.timeLeft = maxTime;
        this.endTimerCallBack = endTimerCallBack;
        this.timerTickCallBack = timerTickCallBack;

        if (isOn)
            this.startTimer();
    }

    startTimer = () => {
        this.isOn = true;
        this.countDownTimer();
    }
    
    stopTimer = () => {
        this.isOn = false;
        this.endTimerCallBack();
    }

    resetTimer = () => {
        this.stopTimer();
        this.timeLeft = this.maxTime;
    }

    countDownTimer = () => {
        let timerTick = setInterval(() => {
            if (this.isOn){
                if (this.timeLeft == 0){
                    clearInterval(timerTick);
                    this.stopTimer();
                }else{
                    this.timerTickCallBack();
                    this.timeLeft -= 1;
                }
            }
        }, 1000);
    }
}

class QuestionPlay extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            question: undefined,
            timer: new Timer(20, this.timerEndTime, this.timerTimeTick, true)
        };
    }

    componentWillMount = () => {
        const user = new User('claudineibjr@hotmail.com', 'Claudinei BJr');
        const questionFilter = new QuestionFilter(QuestionDificulty.Hard, Testament.Novo, undefined)
        QuestionDB.getQuestion(user, questionFilter).then(question => {
            this.setState({question: question});
        }).catch(error => {
            console.log(error);
        });
    }

    // #region Timer
    timerTimeTick = () => {
        console.log(this.state.timer.timeLeft)
    }

    timerEndTime = () => {
        console.log('tchau');
    }
    // #endregion

    try = (answerIndex: number) => {
        console.log(answerIndex);
    }

    render(){
        return(
            <div className="mainContainer">
                <div className="headerGame">
                    
                </div>
                
                <div className="mainGame">
                    <div className="questionContainer">
                        <div className="questionText">
                            {this.state.question === undefined ? "" : this.state.question.getTextQuestion()}
                        </div>

                        <div className="questionInfo">
                            <div>
                                {this.state.question === undefined ? "" : this.state.question.getBibleSectionTestament()}
                            </div>
                            
                            <div>
                                {this.state.question === undefined ? "" : this.state.question.getDificulty_string()}
                            </div>
                        </div>
                    </div>

                    {this.state.question !== undefined &&
                        <div className="questionAlternatives">
                            <button disabled = {!this.state.timer.isOn} type="button" onClick = {() => this.try(0)}>{this.state.question!.getAlternatives()[0]}</button>
                            <button disabled = {!this.state.timer.isOn} type="button" onClick = {() => this.try(1)}>{this.state.question!.getAlternatives()[1]}</button>
                            <button disabled = {!this.state.timer.isOn} type="button" onClick = {() => this.try(2)}>{this.state.question!.getAlternatives()[2]}</button>
                            <button disabled = {!this.state.timer.isOn} type="button" onClick = {() => this.try(3)}>{this.state.question!.getAlternatives()[3]}</button>
                        </div>
                    }
                </div>

                <div className="footerGame">
                    
                </div>
            </div>
        );
    }
}

export default QuestionPlay;
//export default connect((state: IStore) => ({
//    }) ) (QuestionPlay)