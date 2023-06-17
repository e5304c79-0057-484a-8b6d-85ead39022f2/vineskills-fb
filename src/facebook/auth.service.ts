import axios from 'axios';

import { setSecret } from '../secret-manager.service';
import { API_VERSION, FB_CLIENT_ID } from './facebook.const';

export const AUTH_ROUTE = '/auth';
export const AUTH_CALLBACK_ROUTE = `/auth/callback`;

const REDIRECT_URI = (process.env.PUBLIC_URL || '') + AUTH_CALLBACK_ROUTE;

export const getAuthUrl = () => {
    const url = new URL(`https://www.facebook.com/${API_VERSION}/dialog/oauth`);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('client_id', FB_CLIENT_ID);
    url.searchParams.append('redirect_uri', REDIRECT_URI);
    url.searchParams.append('scope', ['ads_read', 'ads_management', 'read_insights'].join(','));

    return url.toString();
};

export const authenticate = async (code: string) => {
    type AccessTokenResponse = {
        access_token: string;
        token_type: string;
        expires_in: number;
    };

    const accessToken = await axios
        .request<AccessTokenResponse>({
            method: 'GET',
            url: `https://graph.facebook.com/${API_VERSION}/oauth/access_token`,
            params: {
                code,
                client_id: FB_CLIENT_ID,
                client_secret: process.env.FB_CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
            },
        })
        .then((response) => response.data);

    await setSecret('FB_ACCESS_TOKEN', accessToken.access_token);

    return accessToken;
};
