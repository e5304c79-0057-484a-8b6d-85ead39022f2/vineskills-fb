import { createSecretRepository } from '../secret-manager.service';

export const tokenRepository = createSecretRepository('FB_ACCESS_TOKEN');
