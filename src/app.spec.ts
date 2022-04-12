import { APP } from './app';

describe('Teste de Integração', () => {
    test('SendTransaction', () => {
        APP.start(1, 1, false);
    });
});
