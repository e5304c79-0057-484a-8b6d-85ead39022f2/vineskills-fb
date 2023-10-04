import axios from 'axios';

import { logger } from '../logging.service';
import { createSecretRepository } from '../secret-manager.service';
import { API_VERSION, FB_CLIENT_ID } from './facebook.const';

const tokenRepository = createSecretRepository('FB_ACCESS_TOKEN');
const fbClientSecretRepository = createSecretRepository('FB_CLIENT_SECRET');

const redirectURI = 'https://oauth.pstmn.io/v1/browser-callback';

const client = axios.create({ baseURL: `https://graph.facebook.com/${API_VERSION}/oauth` });

const getClientCode = async (token: string) => {
    type GetClientCodeResponse = { code: string };

    const clientSecret = await fbClientSecretRepository.get();

    return client
        .request<GetClientCodeResponse>({
            method: 'GET',
            url: '/client_code',
            params: {
                client_id: FB_CLIENT_ID,
                client_secret: clientSecret,
                redirect_uri: redirectURI,
                access_token: token,
            },
        })
        .then(({ data }) => data.code);
};

const getAccessToken = async (code: string) => {
    type GetAccessTokenResponse = { access_token: string; machine_id: string; expires_in: number };

    return client
        .request<GetAccessTokenResponse>({
            method: 'GET',
            url: '/access_token',
            params: {
                client_id: FB_CLIENT_ID,
                machine_id: 'eaglytics',
                redirect_uri: redirectURI,
                code,
            },
        })
        .then(({ data }) => data.access_token);
};

export const refreshToken = async () => {
    const existingAccessToken = await tokenRepository.get();
    logger.info({ existingAccessToken });

    const code = await getClientCode(existingAccessToken);
    logger.info({ code });

    const accessToken = await getAccessToken(code);
    logger.info({ accessToken });
    await tokenRepository.set(accessToken);

    return accessToken;
};
