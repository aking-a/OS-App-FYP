import { useSetApp, getApp } from '../useSetApp';
import { AppData } from '../../data/appdata.js';
// Mock data
const win = {
    id: 'window1',
    title: 'Window 1',
    // Add other window properties as needed
};

const args = {
    arg1: 'value1',
    arg2: 'value2',
    // Add other argument properties as needed
};

const options = {
    option1: 'value1',
    option2: 'value2',
    // Add other option properties as needed
};

const proc = {
    id: 'process1',
    name: 'Process 1',
    // Add other process properties as needed
};

const osjs = {
    version: 'v1',
    platform: 'linux',
    // Add other OS.js properties as needed
};

const socket = {
    id: 'socket1',
    connected: true,
    // Add other socket properties as needed
};

const core = {
    id: 'core1',
    name: 'Core 1',
    // Add other core properties as needed
};
describe('useSetApp and getApp', () => {
    it('should set and get the app value correctly', () => {
        // Initially, getApp should return an empty object
        expect(getApp()).toEqual('');

        // Use useSetApp to set a new value
        const app_data = new AppData(win, args, options, proc, osjs, socket, core);
        useSetApp(app_data);

        // getApp should now return the new value
        expect(getApp()).toEqual(app_data);
    });

    it('should not change the app value when called with null', () => {
        // Set an initial value
         const app_data = new AppData(win, args, options, proc, osjs, socket, core);
        useSetApp(app_data);

        // Call useSetApp with null
        useSetApp(null);

        // getApp should still return the initial value
        expect(getApp()).toEqual(app_data);
    });
});