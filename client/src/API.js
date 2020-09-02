const API_URL = 'http://localhost:1400';
const COVID_API_URL = 'https://www.trackcorona.live/api/countries'



export async function listLogEntries(){
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}


export async function listCovidEntries(){
    const response = await fetch(`${COVID_API_URL}`);
    const res  = await response.json();
    const re = res.data;
    // console.log(res);

    // fetch('https://www.trackcorona.live/api/countries')
    // .then(res => res.json()).then(data => {
    // console.log(data.data[0]);
    // return data.data[0];
    // });

    return re;
}


export async function createLogEntry(entry){
    // const Entry = {
    //     entry: entry,
    //     type: "delete",
    // }
    entry.type = "create";
    const response = await fetch(`${API_URL}/api/logs/`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}



export async function deleteLogEntry(entry){
    entry.type = "delete";
    console.log(entry._id);
    const response = await fetch(`${API_URL}/api/logs`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}