import axios from 'axios';

const url = 'https://transfermarkt-354320.lm.r.appspot.com';
//const url = 'http://localhost:5000';

export const searchTeam = async (teamName) => {
    
    return (await axios.get(`${url}/search?team_name=${teamName.replace(' ', '+')}`)).data;
};

export const getResults = async (teamId) => {
    let data = null;
    try {
        data = (await axios.get(`${url}/teams/results?id=${teamId}`)).data;
    } catch (error) {
        data = error.response.data;
    }
    return data;
}