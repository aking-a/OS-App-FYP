import { renderHook, act } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import useSocketListener from '../../useSocketListener';

describe('useSocketListener', () => {
    let server = new WS("ws://localhost:1234");
    let client = new WebSocket("ws://localhost:1234");



    it('creates a session and returns the session values', async () => {
        const navigate = jest.fn();

        renderHook(() => useSocketListener(server, navigate));
        await server.connected;
        act(() => {
            client.send(JSON.stringify({ type: 'startsession', file: 'newfile', username: 'username' }));
        });

        await expect(server).toReceiveMessage(JSON.stringify({ type: 'startsession', file: 'newfile', username: 'username' }));

        let message;
        client.onmessage = (e) => {
            message = JSON.parse(e.data);
        };
        server.send(JSON.stringify({ type: 'sessioncreated', sharelink: 'test', language: 'javascript', sessionID: '1' }));
        expect(message.type).toBe('sessioncreated');
        expect(message.sharelink).toBe('test');
        expect(message.language).toBe('javascript');
        expect(message.sessionID).toBe('1');
    });
    it('apply incoming code change', async () => {
        
        await server.connected;
        act(() => {
            client.send(JSON.stringify({ type: 'codechange', actions: 'testaction', sessionID: 'testID', code: 'fgacgaa' }));
        });

        await expect(server).toReceiveMessage(JSON.stringify({ type: 'codechange', actions: 'testaction', sessionID: 'testID', code: 'fgacgaa' }));

        let message;
        client.onmessage = (e) => {
            message = JSON.parse(e.data);
        };
        server.send(JSON.stringify({ type: 'incodechange', actions: 'fgacgaa' }));
        expect(message.type).toBe('incodechange');
        expect(message.actions).toBe('fgacgaa');

    });
    it('acquires the line and updates the lock list', async () => {

        await server.connected;
        act(() => {
            client.send(JSON.stringify({ type: 'acquirelock', sessionID: '1',line: '2',timestamp: '1234'}));
        });

        await expect(server).toReceiveMessage(JSON.stringify({ type: 'acquirelock', sessionID: '1',line: '2',timestamp: '1234'}));

        let message;
        client.onmessage = (e) => {
            message = JSON.parse(e.data);
        };
        server.send(JSON.stringify({ type: 'hasline', line: '2' }));
        expect(message.type).toBe('hasline');
        expect(message.line).toBe('2');
    });
    it('releases the line in the lock list', async () => {

        await server.connected;
        act(() => {
            client.send(JSON.stringify({ type: 'releaselock', sessionID: '1', line: '2' }));
        });

        await expect(server).toReceiveMessage(JSON.stringify({ type: 'releaselock', sessionID: '1', line: '2' }));

        let message;
        client.onmessage = (e) => {
            message = JSON.parse(e.data);
        };
        server.send(JSON.stringify({ type: 'releaseline', line: '2' }));
        expect(message.type).toBe('releaseline');
        expect(message.line).toBe('2');
    });

});