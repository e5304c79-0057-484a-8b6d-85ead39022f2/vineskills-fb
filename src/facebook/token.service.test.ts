import { refreshToken } from './token.service';

it('refreshToken', async () => {
    return refreshToken()
        .then((result) => expect(result).toBeDefined())
        .catch((error) => {
            console.error(error);
            throw error;
        });
});
