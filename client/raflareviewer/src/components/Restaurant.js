const Restaurant = ({ name, address }) => {
    return (
      <article className="restaurantArticle">
        <h2>{name}</h2>
        <p>📍 {address}</p>
      </article>
    )
  }  

export default Restaurant