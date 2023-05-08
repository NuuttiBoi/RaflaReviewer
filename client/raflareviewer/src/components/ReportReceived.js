const ReportReceived = () => {
    /**
     * Sulkee popupin
     */
    function closePopup() {
        document.getElementById("reportReceived").classList.add('visuallyhidden')
        document.querySelector('body').classList.remove('locked')
    }

    return (
        <div id="reportReceived" className="visuallyhidden popup">
            <p className="center">Ilmoituksesi on vastaanotettu. Tarkistamme asian mahdollisimman pian.</p>
            <button className="button center" onClick={closePopup}>Sulje</button>
        </div>
    )
}

export default ReportReceived