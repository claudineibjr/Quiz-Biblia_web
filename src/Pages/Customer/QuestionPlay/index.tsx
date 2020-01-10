// React Imports
import React, { Component } from 'react';

// Redux
//import { connect } from 'react-redux';
//import store, { IStore } from '../../Store/index';
//import * as Actions from '../../Store/actions';

// Styles
import { css } from 'aphrodite';
import style from './styles';

// Components
import SweetAlert from 'react-bootstrap-sweetalert';
import { SweetAlertType } from 'react-bootstrap-sweetalert/dist/components/SweetAlert';

// Model
import Question, {QuestionFilter, QuestionDificulty, Testament} from '../../../base/Model/Question';
import User from '../../../base/Model/User';
import Timer from './Timer';

// Services
import QuestionDB from '../../../base/Services/Firebase/CloudFirestore/QuestionDB';
import QuestionServices from '../../../base/Services/QuestionServices';

// Icons

// Enums

// Interfaces
interface IProps {
    dispatch: any
}

interface IState {
    question?: Question,
    timer: Timer,
    alertInfo: AlertInfo
}

class QuestionPlay extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = this.initialState();
    }

    initialState = (): IState => {
        return {
            question: undefined,
            timer: new Timer(this, 5, this.timerEndTime, this.timerTimeTick, false),
            alertInfo: new AlertInfo()
        }
    }

    loadQuestion = () => {
        const user = new User('claudineibjr@hotmail.com', 'Claudinei BJr');
        const questionFilter = new QuestionFilter(undefined, undefined, undefined)
        QuestionDB.getQuestion(user, questionFilter).then(question => {
            this.state.timer.startTimer();
            this.setState({question: question});
        }).catch(error => {
            console.log(error);
        });
    }

    // #region Component LifeCycle
    componentWillMount = () => {
        this.loadQuestion();
    }
    // #endregion

    // #region Timer
    timerTimeTick = () => {
        
    }

    timerEndTime = () => {
        this.try(-1);
    }
    // #endregion

    // #region Component Handlers
    try = async (answerIndex: number) => {
        // Pára com o timer
        this.state.timer.stopTimer();
        
        // Identifica se a resposta está correta ou não
        const correct = this.state.question!.getAnswer() === answerIndex;

        // Calcula e identifica as informações que serão exibidas no alerta
        const score = QuestionServices.getPointsForQuestion(this.state.question!, correct, this.state.timer.timeLeft);
        let alertTitle: string = correct ? 'Parabéns, você acertou!' : 'Que pena, você errou!';
        alertTitle = alertTitle + ' ' + (correct ? '+' : '') + score + ' pontos';

        // Exibe o alerta com a resposta
        this.state.alertInfo.alertTitle = alertTitle;
        this.state.alertInfo.alertMessage = this.state.question!.getTextBiblical();
        this.state.alertInfo.alertType = correct ? 'success' : 'error';
        this.state.alertInfo.showAlert = true;
        
        // Quando a tentativa for por tempo acabado, o component não é renderizado
        //if (answerIndex === -1)
        //    this.forceUpdate();
    }

    proceedNextQuestion = () => {
        this.setState(this.initialState);
        this.loadQuestion();
    }
    // #endregion

    alternativesButtons = () => {
        const alternatives: Array<string> = this.state.question === undefined ? ['', '', '', ''] : this.state.question!.getAlternatives() as Array<string>;
        const disabled = !this.state.timer.isOn;

        return alternatives.map((alternativeText, index) =>
            <button
                className={css(style.questionAlternativeButton,
                    !disabled ? style.questionAlternativeButton_enabled :
                        index === this.state.question!.getAnswer() ? style.questionAlternativeButton_correct : style.questionAlternativeButton_wrong )}
                key={index}
                disabled = {disabled}
                type="button"
                onClick = {() => this.try(index)}>
                    {alternativeText}
                </button>
        );
    }

    render(){
        console.log('Render');
        return(
            <div className={css(style.mainContainer)}>
                <SweetAlert
                    type = {this.state.alertInfo.alertType}
                    title={this.state.alertInfo.alertTitle}
                    show={this.state.alertInfo.showAlert}
                    onConfirm={this.proceedNextQuestion}>
                    {this.state.alertInfo.alertMessage}
                </SweetAlert>

                <div className={css(style.headerGame)}>
                    {this.state.timer.timeLeft}
                </div>
                
                <div className={css(style.mainGame)}>
                    <div className={css(style.questionContainer)}>
                        <div className={css(style.questionText)}>
                            {this.state.question === undefined ? "" : this.state.question.getTextQuestion()}
                        </div>

                        <div className={css(style.questionInfo)}>
                            <div>
                                {this.state.question === undefined ? "" : this.state.question.getBibleSectionTestament()}
                            </div>
                            
                            <div>
                                {this.state.question === undefined ? "" : this.state.question.getDificulty_string()}
                            </div>
                        </div>
                    </div>

                    {this.state.question !== undefined &&
                        <div className={css(style.questionAlternatives)}>
                            {this.alternativesButtons()}
                        </div>
                    }
                </div>

                <div className="footerGame" style={{display: 'xxs' }} >
                    
                </div>
            </div>
        );
    }
}

class AlertInfo { 
    alertTitle: string = '';
    alertMessage: string = '';
    alertType: 'success' | 'error' | undefined = undefined;
    showAlert: boolean = false;

    constructor(){}
}

export default QuestionPlay;
//export default connect((state: IStore) => ({
//    }) ) (QuestionPlay)