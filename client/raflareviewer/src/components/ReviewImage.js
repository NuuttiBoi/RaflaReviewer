const ReviewImage = url => {
    const defaultUrl = 'https://users.metropolia.fi/~matleek/star_b_full.png'

    let kuva = document.createElement("img");
            try {
                kuva.src = url;
            } catch (error) {
                kuva.src = defaultUrl;
            }
    return kuva
}

export default ReviewImage