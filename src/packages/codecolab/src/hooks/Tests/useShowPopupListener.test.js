import { renderHook, act } from '@testing-library/react';
import useShowPopupListener from '../useShowPopupListener';

jest.useFakeTimers();

describe('useShowPopupListener', () => {
    it('should reset showPopup after 3 seconds', () => {
        const setShowPopup = jest.fn();
        const { rerender } = renderHook(({ showPopup }) => useShowPopupListener(showPopup, setShowPopup), {
            initialProps: { showPopup: false }
        });

        // Simulate showPopup becoming true
        rerender({ showPopup: true });

        expect(setShowPopup).not.toHaveBeenCalled();

        // Fast-forward 3 seconds
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(setShowPopup).toHaveBeenCalledWith(false);
    });
});