import { Button } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import { useQuestionData } from "./hook/useQuestionsData"

export const Footer = () => {

    const {correct, incorrect, unanswered } = useQuestionData()
    const reset = useQuestionsStore(state => state.reset)

    return(
        <footer style={{marginTop: '16px'}}>
            <strong>{`Corrects ${correct} - Incorrects ${incorrect} - Unanswered ${unanswered}`}</strong>
            <div style={{marginTop: '16px'}}>
                <Button onClick={() => reset()}>
                    Resetear juego
                </Button>
            </div>
        </footer>
    )
}