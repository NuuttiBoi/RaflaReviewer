/**
 * Komponentti, joka renderöi yksittäisen pisteiden laatikon.
 * @param label - otsikkoteksti laatikolle.
 * @param score - pistemäärä.
 * @param max - suurin mahdollinen pistemäärä.
 * @returns {JSX.Element}
 * @constructor
 */
const Score = ({ label, score, max }) => {
    return (
        <div className="scoreBox">
            <p>{label}</p>
            <p><span className="scoreNumber">{score}</span>/ {max}</p>
        </div>
    )
}

export default Score