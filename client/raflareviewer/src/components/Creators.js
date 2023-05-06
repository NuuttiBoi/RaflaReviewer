function Creators() {
  
    return (
    <div className="container">
      <h1>Tietoa</h1>
      <section className="about-info">
        <h2>Mikä on RaflaReviewer?</h2>
        <p>RaflaReviewer-sovelluksella voit etsiä arvosteluja ravintoloista ja lähettää myös omia arvostelujasi.</p>
      </section>

      <section className="full-width-mobile about-login">
        <div>
        <h2>Tarvitsenko käyttäjätunnuksen?</h2>
        <p>Arvostelun lisääminen vaatii käyttäjätunnuksen luomisen. Tykkäysten antaminen muiden tekemille arvosteluille vaatii sisäänkirjautumisen. Arvosteluja voi kommentoida joko kirjautuneena käyttäjänimellä tai vierailijana.</p>
        </div>
      </section>

      <section className="about-creators">
          <h2>Tekijät</h2>
          <p>Onni Pajula</p>
          <p>Nuutti Turunen</p>
          <p>Matleena Kankaanpää</p>
          <p>Kuvakkeiden lähde: <a target="__blank" href="https://www.svgrepo.com/">SVG Repo</a></p>
          </section>
    </div>
  );
}

export default Creators
