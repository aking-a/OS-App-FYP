import { renderHook } from '@testing-library/react';
import listlistener from '../userListListener';
import { getSession } from '../../utils/getsession';

jest.mock('../../utils/getsession');

describe('listlistener', () => {
    it('should update session usernameslist and call itemlist when usernames change', () => {
        const mockUsernames = ['user1', 'user2'];
        const mockSession = {
            usernameslist: [],
            itemlist: jest.fn()
        };

        getSession.mockReturnValue(mockSession);

        const { rerender } = renderHook(({ usernames }) => listlistener(usernames), {
            initialProps: { usernames: [] }
        });

        // Simulate usernames changing
        rerender({ usernames: mockUsernames });

        expect(mockSession.usernameslist).toEqual(mockUsernames);
        expect(mockSession.itemlist).toHaveBeenCalledWith(mockUsernames);
    });

    it('should not call itemlist when itemlist is null', () => {
        const mockUsernames = ['user1', 'user2'];
        const mockSession = {
            usernameslist: [],
            itemlist: null
        };

        getSession.mockReturnValue(mockSession);

        const { rerender } = renderHook(({ usernames }) => listlistener(usernames), {
            initialProps: { usernames: [] }
        });

        // Simulate usernames changing
        rerender({ usernames: mockUsernames });

        expect(mockSession.usernameslist).toEqual(mockUsernames);
        expect(mockSession.itemlist).toBeNull();
    });
});