export const getData = () => {
    return fetch('http://localhost:3000/items/')
        .then((response) => response.json())
        .then((res) => {
            const shows = res.shows;
            console.log('shows',shows);
    })
};