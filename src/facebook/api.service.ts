import axios from 'axios';

import { API_VERSION } from './facebook.const';

export const getClient = async () => {
    type DopplerSecretResponse = { value: { raw: string } };

    const accessToken = await axios
        .request<DopplerSecretResponse>({
            method: 'GET',
            url: 'https://api.doppler.com/v3/configs/config/secret',
            params: { project: 'eaglytics', config: 'prd', name: 'FACEBOOK_ACCESS_TOKEN' },
            auth: { username: process.env.DOPPLER_TOKEN || '', password: '' },
        })
        .then(({ data }) => data.value.raw);

    return axios.create({
        baseURL: `https://graph.facebook.com/${API_VERSION}`,
        params: { access_token: accessToken },
    });
};
