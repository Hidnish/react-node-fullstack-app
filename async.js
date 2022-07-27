// function fetchAlbums () {
//     fetch('https://swapi.dev/api/films')
//         .then(res => res.json())
//         .then(json => console.log(json))
// }

const fetchAlbums = async () => {
    const res = await fetch('https://api.github.com/users/xiaotian/repos');
    const json = await res.json();
    console.log(json);
}

fetchAlbums();