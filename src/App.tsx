import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './Game'

function App() {

  const question = useQuestionsStore(state => state.question);
  
  return (
    <main>
      <Container maxWidth='sm'>

          <Stack direction='row' gap={2} alignItems={'center'} justifyContent={'center'}>
            <JavaScriptLogo />
            <Typography variant='h2' component={'h1'}>
              Javascript Quizz
            </Typography>
          </Stack>   

          {question.length === 0 && <Start />}
          {question.length > 0 && <Game />}

      </Container>
  
    </main>
  )
}

export default App
