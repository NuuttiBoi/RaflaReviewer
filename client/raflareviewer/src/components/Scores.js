import Score from './Score'

const Scores = ({ scores }) => {
    const boxes = scores.map(score => {
        let formattedValue = (score.value/20).toFixed(1) // Numero muutetaan asteikkoon 1-5 ja pyöristetään       
        
        // Nollat pois tasaluvuista
        if (((formattedValue*10) % 10) === 0) {
            formattedValue = parseInt((score.value/20).toFixed(1));
        }

        return <Score key={score.title} label={score.title} score={formattedValue} max={score.max} />
    })

    return (
        <div className="scoresContainer">
            {boxes}
        </div>
    )
}

export default Scores