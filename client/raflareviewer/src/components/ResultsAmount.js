const ResultsAmount = ({ number, filterWords }) => {
    let tulos = (number === 1) ? 'tulos' : 'tulosta'

    let filterWordsText = []
    for (let i = 0; i < filterWords.length; i++) {
        filterWordsText[i] = `'${filterWords[i]}'`

        if (i < (filterWords.length-1)) {
            filterWordsText[i] += ', '
        }
    }

    if (filterWords.length === 0) {
        return null
    }

    return (
        <p>{number} {tulos} haulla {filterWordsText}</p>
    )
}

export default ResultsAmount