import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import SyntaxHighLighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionTypes } from "./types"
import { ArrowBackIosNew, ArrowForwardIos, Circle, CircleOutlined } from "@mui/icons-material"
import { Footer } from "./footer"

//funcion que se ejecuta una vez
const getBackgroundColor = (info: QuestionTypes, index: number) => {
    const {userSelectedAnswer, correctAnswer} = info
     //usuario no ha seleccionado nada
    if(userSelectedAnswer == null) return 'transparent'
    //si la solucion es incorrenta
    if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    //si es la solucion correcta
    if(index === correctAnswer) return 'green'
    //si esta es la seleccion del usuario pero no es correcta
    if(index === userSelectedAnswer) return 'red'
    //si no es ninguna de las anteriores
    return 'transparent'
}

const Question = ({info}: {info: QuestionTypes}) => {

    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

   

    return (
        <Card variant="outlined" sx={{bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4}}>

            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighLighter language="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighLighter>
            
            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton 
                                        disabled={info.userSelectedAnswer !== undefined}
                                        onClick={createHandleClick(index)}
                                        sx={{backgroundColor: getBackgroundColor(info, index)}}
                                        >
                            <ListItemText primary={answer} sx={{textAlign: 'center' }}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Card>
    )
}

export const Game = () => {

    const question = useQuestionsStore(state => state.question)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

    const questionInfo = question[currentQuestion]

    return (
        <>
            <Stack direction={'row'} gap={2} alignItems={"center"} justifyContent={'center'}>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew />
                </IconButton>
                {currentQuestion + 1} / {question.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= question.length - 1}>
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Question info={questionInfo}/>
            <Footer />
        </>
    )
}