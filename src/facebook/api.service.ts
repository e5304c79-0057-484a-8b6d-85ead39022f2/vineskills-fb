import axios from 'axios';

import { API_VERSION } from './facebook.const';
import { tokenRepository } from './token.service';

export const getClient = async () => {
    const token = await tokenRepository.get();

    return axios.create({
        baseURL: `https://graph.facebook.com/${API_VERSION}`,
        params: { access_token: token },
    });
};
