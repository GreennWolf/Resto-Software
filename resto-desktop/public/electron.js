const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain

const path = require('path');
const isDev = require('electron-is-dev');;
const fs = require("fs");

let mainWindow;
let crearAccWindow;
let listAccWindow;
let crearProdWindow;
let listProdWindow;
let crearIngWindow;
let listIngWindow;
let createMesaWindows;
let listMesaWindow;
let crearCatWindow;
let listCatWindow;
let impresoraConfigWin;

function createWindow() {
  mainWindow = new BrowserWindow({
      width:1366,
      height:768,
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        preload: path.join(__dirname, "preload.js")
      }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, 'index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  });
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);
}




function createAccWindows(){
  crearAccWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:500,
    height:430,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    title: 'Agregar Cuenta'
});
crearAccWindow.loadURL(isDev ? 'http://localhost:3000#/admin-menu/cuentas/crear' : `file://${path.join(__dirname, '../build/index.html')}#/admin-menu/cuentas/crear`);

crearAccWindow.on('closed', ()=>{
    crearAccWindow = null;
});
}

function impresoraConfigWindows(){
  impresoraConfigWin = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js"),
        webSecurity: false
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    title: 'imprimir'
});
impresoraConfigWin.loadURL(isDev ? 'http://localhost:3000#/impresoras' : `file://${path.join(__dirname, '../build/index.html')}#/impresoras`);
impresoraConfigWin.loadURL(
  
);

console.log(  url.format({
  pathname: path.join(__dirname, 'index.html'),
  protocol: 'file:',
  slashes: true,
  hash: '#/impresoras'
}))

impresoraConfigWin.once('ready-to-show', () => {
  impresoraConfigWin.webContents.openDevTools();
});
impresoraConfigWin.on('closed', ()=>{
    impresoraConfigWin = null;
});
}




function listAccWindows(){
  listAccWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:950,
    height:630,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    title: 'Lista Cuentas'
});
listAccWindow.loadURL(isDev ? 'http://localhost:3000#/admin-menu/cuentas/list' : `file://${path.join(__dirname, '../build/index.html')}#/admin-menu/cuentas/list`);

listAccWindow.on('closed', ()=>{
    listAccWindow = null;
});
}

function createProdWindows(){
  crearProdWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:500,
    height:430,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    title: 'Agregar Producto'
});
crearProdWindow.loadURL(isDev ? 'http://localhost:3000#/admin-menu/productos/crear' : `file://${path.join(__dirname, '../build/index.html')}#/admin-menu/productos/crear`);

crearProdWindow.on('closed', ()=>{
    crearProdWindow = null;
});
}

function listProdWindows(){
  listProdWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js"),
      },
    width:950,
    height:630,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    title: 'Agregar Producto'
});
listProdWindow.loadURL(isDev ? 'http://localhost:3000#/admin-menu/productos/list' : `file://${path.join(__dirname, '../build/index.html')}#/admin-menu/productos/list`);

listProdWindow.on('closed', ()=>{
    listProdWindow = null;
});
}

function createIngWindows(){
  crearIngWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:500,
    height:430,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    title: 'Agregar ingredientes'
});
crearIngWindow.loadURL(isDev ? 'http://localhost:3000#/admin-menu/ingredientes/crear' : `file://${path.join(__dirname, '../build/index.html')}#/admin-menu/ingredientes/crear`);

crearIngWindow.on('closed', ()=>{
    crearIngWindow = null;
});
}

function listIngWindows(){
  listIngWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:950,
    height:630,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    title: 'Lista Ingredientes'
});
listIngWindow.loadURL(isDev ? 'http://localhost:3000#/admin-menu/ingredientes/list' : `file://${path.join(__dirname, '../build/index.html')}#/admin-menu/ingredientes/list`);

listIngWindow.on('closed', ()=>{
    listIngWindow = null;
});
}

function createMesaWin(){
  createMesaWindows = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:500,
    height:430,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    title: 'Agregar Mesa'
});
createMesaWindows.loadURL(isDev ? 'http://localhost:3000#/admin-menu/mesas/crear' : `file://${path.join(__dirname, '../build/index.html')}#/admin-menu/mesas/crear`);

createMesaWindows.on('closed', ()=>{
    createMesaWindows = null;
});
}

function listMesaWin(){
  listMesaWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:500,
    height:430,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    title: 'Lista Mesas'
});
listMesaWindow.loadURL(isDev ? 'http://localhost:3000#/admin-menu/mesas/list' : `file://${path.join(__dirname, '../build/index.html')}#/admin-menu/mesas/list`);

listMesaWindow.on('closed', ()=>{
    listMesaWindow = null;
});
}

function createCatWindows(){
  crearCatWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:500,
    height:300,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    title: 'Agregar Categorias'
});
crearCatWindow.loadURL(isDev ? 'http://localhost:3000#/admin-menu/categorias/crear' : `file://${path.join(__dirname, '../build/index.html')}#/admin-menu/categorias/crear`);

crearCatWindow.on('closed', ()=>{
    crearCatWindow = null;
});
}

function listCatWindows(){
  listCatWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:500,
    height:430,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    title: 'Lista Categorias'
});
listCatWindow.loadURL(isDev ? 'http://localhost:3000#/admin-menu/categorias/list' : `file://${path.join(__dirname, '../build/index.html')}#/admin-menu/categorias/list`);

listCatWindow.on('closed', ()=>{
    listCatWindow = null;
});
}

const templateMenu = [
  {
      label:'File',
      submenu:[
          {
            label:'Cerrar Sesion',
            click(){
              mainWindow.loadURL(isDev ? 'http://localhost:3000#/' : `file://${path.join(__dirname, '../build/index.html')}`);
            }
          },
          {
            label:'Mesas',
            click(){
              fs.readFile("path/to/file", (error, data) => {
                var link ='/mesas'
                mainWindow.webContents.send("link", link);
              });
            }
          },
          {
            label:'Impresoras',
            async click(){
                impresoraConfigWindows()
            } 
          },
          {
              label:'Exit',
              accelerator:process.platform =='darwin' ? 'command+Q':'Ctrl + Q',
              click(){
                  app.quit();
              }
          }
      ]
  },
  {
    label:'Caja',
    submenu:[
      {
        label:'Planilla Diaria',
        click(){
          var link ='/planilla-diaria/'
          mainWindow.webContents.send("link", link);
        }
      },
      {
        label:'Cerrar Mozo',
        click(){
          fs.readFile("path/to/file", (error, data) => {
            var link ='/planilla-diaria/mozos'
            mainWindow.webContents.send("link", link);
          });
        }
      },
      {
        label:'Historial Mesas',
        click(){
          fs.readFile("path/to/file", (error, data) => {
            var link ='/historial-mesas/mozos'
            mainWindow.webContents.send("link", link);
          });
        }
      },
    ]
  },
  {
    label:'Cuentas',
    submenu:[
      {
        label:'Crear Cuenta',
        click(){
          createAccWindows()
        }
      },
      {
        label:'Lista Cuentas',
        click(){
          listAccWindows()
        }
      },
    ]
  },
  {
    label:'Productos',
    submenu:[
      {
        label:'Agregar Producto',
        click(){
          createProdWindows()
        }
    },
    {
      label:'Lista Productos',
      click(){
        listProdWindows()
      }
    },
    {
      label:'Agregar Ingrediente',
      click(){
        createIngWindows()
      }
    },
    {
      label:'Lista Ingredientes',
      click(){
        listIngWindows()
      }
    },
    ]
  },
  {
    label:'Mesas',
    submenu:[
      {
        label:'Crear Mesa',
        click(){
          createMesaWin()
        }
      },
      {
        label:'Lista Mesas',
        click(){
          listMesaWin()
        }
      },
    ]
  },
  {
    label:'Categorias',
    submenu:[
      {
        label:'Agregar Categoria',
        click(){
          createCatWindows()
        }
      },
      {
        label:'Lista Categorias',
        click(){
          listCatWindows()
        }
      },
    ]
  },
];

if(process.platform == 'darwin'){
  templateMenu.unshift({
      label: app.getName()
  });
}

if(process.env.NODE_ENV !== 'production'){
  templateMenu.push({
      label:'DevTools',
      submenu:[
          {
              label:'Show/Hide Dev Tools',
              accelerator:'Ctrl+D',
              click(item, focusedWindow){
                  focusedWindow.toggleDevTools();
              }
          },
          {
              role:'reload'
          }
      ]
  })
}


app.on('ready', createWindow);

ipcMain.on('addProd',()=>{
  createProdWindows()
})

ipcMain.on('addIng',()=>{
  createIngWindows()
})

ipcMain.on('addAcc',()=>{
  createAccWindows()
})

ipcMain.on('printer',async (event,arg)=>{
  var datas = JSON.parse(arg)
  
  const {idmesa,idcuenta,cocinaList,printer} = datas
  console.log(printer)

  mainWindow.webContents.print({silent: true ,deviceName:printer, margins:{marginType:'none'}}  , (success) => {
    console.log(success)
    if(success){        
        console.log(success)
    }
  })
})

ipcMain.on('GetPrinter',async ()=>{
  fs.readFile("path/to/file",async (error, data) => {
    var printers = await mainWindow.webContents.getPrintersAsync()
    mainWindow.webContents.send("GetPrinter", printers);
    if(impresoraConfigWin != undefined){
      impresoraConfigWin.webContents.send("GetPrinter", printers);
    }
  });
  

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});