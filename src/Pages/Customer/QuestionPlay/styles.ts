import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },

    mainGame: {
        //display: 'flex',
        //flexDirection: 'column',
        flex: 'auto',
        margin: '50px'
    },

    questionContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4px',
        border: '0.5px solid gray',
        padding: '10px'
    },

    headerGame: {

    },

    questionText: {
        fontSize: '28px',
        fontWeight: 600,
        marginBottom: '16px',
        textAlign: 'center'
    },

    questionInfo: {
        fontSize: '18px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    questionAlternatives: {
        display: 'flex',
        flexDirection: 'column'
    },

    questionAlternativeButton: {
        margin: '10px',
        paddingTop: '15px',
        paddingBottom: '15px',
        borderRadius: '4px',
        fontSize: '22px',
        borderWidth: '2px',
        borderStyle: 'solid'
    },

    questionAlternativeButton_enabled: {
        WebkitTransitionDuration: '0.4s',
        transitionDuration: '0.4s',
        borderColor: 'blue',
        backgroundColor: 'blue',
        color: 'white',
        
        ':hover': {
            backgroundColor: 'white',
            color: 'blue',
            fontSize: '26px'
        }
    },

    questionAlternativeButton_correct: {
        borderColor: 'blue',
        backgroundColor: 'blue',
        color: 'white',
        fontSize: '32px'
    },

    questionAlternativeButton_wrong: {
        borderColor: 'grey',
        backgroundColor: 'grey',
        color: 'black',
    }
});

export default styles;