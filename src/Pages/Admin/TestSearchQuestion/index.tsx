// React Imports
import React, { Component } from 'react';

// Redux
//import { connect } from 'react-redux';
//import store, { IStore } from '../../Store/index';
//import * as Actions from '../../Store/actions';

// Styles
import './styles.css';

// Material-UI Components
import Button from '@material-ui/core/Button';

// Components

// Model
//import Question, {BibleSection, QuestionDificulty, Testament} from '../../.. quiz-biblia/Model/Question';

import Question, {BibleSection, QuestionDificulty, Testament, QuestionFilter} from '../../../base/Model/Question';

// Services
import QuestionDB from '../../../base/Services/Firebase/CloudFirestore/QuestionDB';
import User from '../../../base/Model/User';

// Icons

// Enums

// Interfaces
interface IProps {
    dispatch: any
}

interface IState {
    
}

class TestSearchQuestion extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            
        };
    }

    componentDidMount = () => {
        //let question = new Question('Quem matou Abel?', 0, ['Caim', 'Deus', 'Adão', 'Jó'], 'Gênesis', QuestionDificulty.Easy, Testament.Velho, BibleSection.Pentateuco, "Gn 3");
        //QuestionDB.createQuestion(question);
        //QuestionsDB_old.copyQuestionsFromRealtimeToFirestore();
        console.log('Hello World!');
    }

    async loadQuestion() {
        const user = new User('claudineibjr@hotmail.com', 'Claudinei BJr');
        const questionFilter = new QuestionFilter(QuestionDificulty.Hard, Testament.Novo, undefined)
        QuestionDB.getQuestion(user, questionFilter).then(value => {
            console.log(value);
        }).catch(error => {
            console.log(error);
        });
    }
    
    render(){
        return(
            <div className="mainContainer">
                <Button variant="contained" onClick = {this.loadQuestion} >Default</Button>
            </div>
        );
    }
}

export default TestSearchQuestion;
//export default connect((state: IStore) => ({
//    }) ) (TestSearchQuestion)