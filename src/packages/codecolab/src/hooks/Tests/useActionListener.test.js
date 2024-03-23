import { renderHook } from '@testing-library/react';
import useActionListener from '../useActionListener';
import { getSession } from '../../utils/getsession';
import { clientChange } from '../../utils/monaco/handleChanges.js';

jest.mock('../../utils/getsession');
jest.mock('../../utils/monaco/handleChanges.js');

describe('useActionListener', () => {
    const mockEditorRef = {
        onDidChangeModelContent: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call clientChange when ProgrammaticChange is false', () => {
        getSession.mockReturnValue({
            editorRef: mockEditorRef,
            ProgrammaticChange: false
        });

        mockEditorRef.onDidChangeModelContent.mockImplementationOnce((callback) => {
            callback({
                changes: [{
                    range: {
                        startLineNumber: 1,
                        endLineNumber: 1,
                        startColumn: 1,
                        endColumn: 1
                    },text: 'mock text'
                }]
            });
        });

        renderHook(() => useActionListener(true));

        expect(clientChange).toHaveBeenCalled();
    });

    it('should not call clientChange when ProgrammaticChange is true', () => {
        getSession.mockReturnValue({
            editorRef: mockEditorRef,
            ProgrammaticChange: true
        });

        mockEditorRef.onDidChangeModelContent.mockImplementationOnce((callback) => {
            callback({
                changes: [{
                    range: {
                        startLineNumber: 1,
                        endLineNumber: 1,
                        startColumn: 1,
                        endColumn: 1
                    },text: 'mock text'
                }]
            });
        });

        renderHook(() => useActionListener(true));

        expect(clientChange).not.toHaveBeenCalled();
    });
});