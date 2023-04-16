const Restaurant = ({ name, address, comment }) => {
    return (
      <article className="restaurantArticle">
        <h2>{name}</h2>
        <p>📍 {address}</p>
        <p>{comment}</p>
      </article>
    )
  }  

export default Restaurant