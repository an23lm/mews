// import axios from 'axios';

class _RedditApi {
    constructor() {
        this.baseUrl = 'http://www.reddit.com';
    }

    async getFrontPage(lastName) {
        return new Promise((resolve, reject) => {
            let url = this.baseUrl + `/r/all.json?raw_json=1&after=${lastName}`;
            fetch(url, {
                mode: "cors",
                method: "GET",
                headers: {
                    "Accept": "application/json",
                }
            })
            .then(response => {
                if (response.ok)
                    return response.json();

                reject({ kind: 'Request Error', status: response.status, statusText: response.statusText });
            }).then(json => {
                resolve(json);
            }).catch(err => {
                reject({ kind: 'Error', error: err });
            });
        });
    }

    // async getFrontPage() {
    //     let url = this.baseUrl + "/r/all.json?raw_json=1";
    //     console.log(url);
    //     const response = await axios.get(url);
    //     console.log(response)
    // }
}

const RedditApi = new _RedditApi();

export default RedditApi;