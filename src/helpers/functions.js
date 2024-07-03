const md5 = require('md5');

export function delayAndRun(callback, delay = 250) {
    const key = md5(callback);

    if (!window.delayAndRunTasks) window.delayAndRunTasks = [];

    clearTimeout(window.delayAndRunTasks[key]);
    window.delayAndRunTasks[key] = setTimeout(() => callback(), delay);
}