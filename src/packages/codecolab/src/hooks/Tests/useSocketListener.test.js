import { renderHook } from '@testing-library/react';
import useSocketListener from '../useSocketListener';
import { getSession, Terminate } from '../../utils/getsession.js';
import { incomingChange } from '../../utils/monaco/handleChanges.js';
import { getApp } from '../useSetApp.js';

jest.mock('../../utils/getsession.js');
jest.mock('../../utils/monaco/handleChanges.js');
jest.mock('../useSetApp.js');
jest.mock('../../utils/username/updatelist.js');
jest.mock('../../utils/events/renderlist.js');

describe('useSocketListener', () => {
    it('handles sessioncreated messages correctly', () => {
        const navigate = jest.fn();
        const socket = { on: jest.fn() };
        const session = {};

        getSession.mockReturnValue(session);
        getApp.mockReturnValue({ options: {}, args: null });

        renderHook(() => useSocketListener(socket, navigate));

        const mockData = {
            type: 'sessioncreated',
            language: 'javascript',
            sharelink: 'testlink',
            sessionID: 'testID',
        };

        const mockEvent = {
            data: JSON.stringify(mockData),
        };

        const handleSocketData = socket.on.mock.calls[0][1];
        handleSocketData(mockEvent);

        expect(session.ProgrammaticChange).toBe(true);
        expect(session.language).toBe(mockData.language);
        expect(session.sharelink).toBe(mockData.sharelink);
        expect(session.isVisible).toBe(true);
        expect(session.sessionID).toBe(mockData.sessionID);
        expect(navigate).toHaveBeenCalledWith('/Session');
    });
    it('handles incoming code change', () => {
        const navigate = jest.fn();
        const socket = { on: jest.fn() };
        const session = {};

        getSession.mockReturnValue(session);
        getApp.mockReturnValue({ options: {}, args: null });

        renderHook(() => useSocketListener(socket, navigate));

        const mockData = {
            type: 'incodechange',
            action: 'testaction',
        };

        const mockEvent = {
            data: JSON.stringify(mockData),
        };

        const handleSocketData = socket.on.mock.calls[0][1];
        handleSocketData(mockEvent);
        expect(session.ProgrammaticChange).toBe(true);
        expect(incomingChange).toHaveBeenCalled();
    });
    it('handles release of a line correctly', () => {
        const navigate = jest.fn();
        const socket = { on: jest.fn() };
        const session = { lockedlines: new Set([1, 2, 3]) };

        getSession.mockReturnValue(session);

        renderHook(() => useSocketListener(socket, navigate));

        const mockData = {
            type: 'releaseline',
            line: 2,
        };

        const mockEvent = {
            data: JSON.stringify(mockData),
        };

        const handleSocketData = socket.on.mock.calls[0][1];
        handleSocketData(mockEvent);

        expect(session.lockedlines.has(2)).toBe(false);
    });
    it('handles the lock of a line correctly', () => {
        const navigate = jest.fn();
        const socket = { on: jest.fn() };
        const session = { 
            lockedlines: new Set([1, 2, 3]),
            editorRef: {
                getPosition: jest.fn().mockReturnValue({ lineNumber: 3 }),
                setPosition: jest.fn(),
            },
        };

        getSession.mockReturnValue(session);

        renderHook(() => useSocketListener(socket, navigate));

        const mockData = {
            type: 'hasline',
            line: 3,
        };

        const mockEvent = {
            data: JSON.stringify(mockData),
        };

        const handleSocketData = socket.on.mock.calls[0][1];
        handleSocketData(mockEvent);

        expect(session.lockedlines.has(3)).toBe(true);
        expect(session.editorRef.setPosition).toHaveBeenCalledWith({ lineNumber: 2, column: 1 });
    });
    

    // Add more tests for other message types...
});