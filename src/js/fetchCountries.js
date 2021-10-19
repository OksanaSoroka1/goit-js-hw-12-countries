
 export default function fetchCountries(searchQuery){
    return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
    .then(
        responce => {
           return responce.json()
        })
        .then(data => {
            if (data.status === 404) {
              throw new Error(data.status)
            } else {
              return data
            }
          })
    }

    