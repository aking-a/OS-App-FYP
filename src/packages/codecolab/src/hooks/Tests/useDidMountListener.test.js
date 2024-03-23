import { renderHook } from '@testing-library/react';
import useDidMountListener from '../useDidMountListener';
import { getSession } from '../../utils/getsession';

jest.mock('../../utils/getsession');

describe('useDidMountListener', () => {
    it('should set session states when editor is mounted', () => {
        const setSid = jest.fn();
        const setUser = jest.fn();
        const setCode = jest.fn();
        const setLanguage = jest.fn();
        const setPopupMessage = jest.fn();
        const setShowPopup = jest.fn();
        const setIsVisible = jest.fn();
        const setLink = jest.fn();

        getSession.mockReturnValue({
            editorRef: {},
            sessionID: 'mockSessionID',
            username: 'mockUsername',
            code: 'mockCode',
            language: 'mockLanguage',
            isVisible: true,
            sharelink: 'mockSharelink'
        });

        renderHook(() => useDidMountListener(true, setSid, setUser, setCode, setLanguage, setPopupMessage, setShowPopup, setIsVisible, setLink));

        expect(setSid).toHaveBeenCalledWith('mockSessionID');
        expect(setUser).toHaveBeenCalledWith('mockUsername');
        expect(setCode).toHaveBeenCalledWith('mockCode');
        expect(setLanguage).toHaveBeenCalledWith('mockLanguage');
        expect(setIsVisible).toHaveBeenCalledWith(true);
        expect(setLink).toHaveBeenCalledWith('mockSharelink');
    });
});