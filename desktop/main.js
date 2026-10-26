// Learn & Play for Windows: a window that shows the website from files packed
// inside the app (desktop/site), so it works with no internet connection.
const { app, BrowserWindow, protocol, net, shell } = require("electron");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const fs = require("node:fs");

const SITE = path.join(__dirname, "site");
const ORIGIN = "app://learn-and-play";

// A proper "web origin" so localStorage (progress, scores) is kept between runs.
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);

/** /en/quiz/ → site/en/quiz/index.html; unknown pages → site/404.html. */
function fileFor(urlPath) {
  let p = path.normalize(path.join(SITE, decodeURIComponent(urlPath)));
  if (!p.startsWith(SITE)) return path.join(SITE, "404.html");
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, "index.html");
  else if (!fs.existsSync(p) && fs.existsSync(p + ".html")) p += ".html";
  return fs.existsSync(p) ? p : path.join(SITE, "404.html");
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 360,
    minHeight: 500,
    title: "Learn & Play",
    backgroundColor: "#f2f7fe",
    icon: path.join(SITE, "icon-512.png"),
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, sandbox: true },
  });

  // Links to other sites and e-mail (contact form) open in the normal browser / mail app.
  const external = (url) => !url.startsWith(ORIGIN);
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (external(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (external(url)) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  win.loadURL(ORIGIN + "/");
}

app.whenReady().then(() => {
  protocol.handle("app", (req) => net.fetch(pathToFileURL(fileFor(new URL(req.url).pathname)).toString()));
  createWindow();
  app.on("activate", () => BrowserWindow.getAllWindows().length === 0 && createWindow());
});

app.on("window-all-closed", () => app.quit());
