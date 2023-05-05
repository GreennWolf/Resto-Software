const {
    contextBridge,
    ipcRenderer,
    BrowserWindow
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["link"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["link"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args)); 
            }
        }
    }
);

contextBridge.exposeInMainWorld(
    "api2", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["addProd"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["addProd"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args)); 
            }
        }
    }
);

contextBridge.exposeInMainWorld(
    "api3", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["addIng"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["addIng"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args)); 
            }
        }
    }
);

contextBridge.exposeInMainWorld(
    "api4", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["addAcc"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["addAcc"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args)); 
            }
        }
    }
);

contextBridge.exposeInMainWorld(
    "printer", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["printer"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["printer"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args)); 
            }
        }
    }
);

contextBridge.exposeInMainWorld(
    "impresoras", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["impresoras"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["impresoras"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args)); 
            }
        }
    }
);


contextBridge.exposeInMainWorld(
    "GetPrinter", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["GetPrinter"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["GetPrinter"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args)); 
            }
        }
    }
);
