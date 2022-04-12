import { APP } from './app';

describe('Teste de Integração', () => {
    test('SendTransaction', () => {
        const returnAPI = APP.start(1, 1, false);
        console.log(returnAPI);
    });
});
