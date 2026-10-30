// Builds a signed APK: mobile/dist/Learn-and-Play.apk
//   npm run apk
// Needs a JDK 21 and the Android SDK. By default they are looked for in
// %LOCALAPPDATA%\lp-android\{jdk,sdk} (set JAVA_HOME / ANDROID_HOME to use others).
//
// The signing key is kept OUTSIDE the repo, in %USERPROFILE%\learn-and-play-keys\
// (made the first time). Keep a backup of that folder: an APK update must be
// signed with the same key, or phones refuse to install it over the old one.
// The app opens the live website, so a new APK is only needed when this
// Android wrapper itself changes (name, icon, Capacitor version).
import { execFileSync, execSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const tools = join(process.env.LOCALAPPDATA ?? homedir(), "lp-android");
const jdkRoot = join(tools, "jdk");
const JAVA_HOME =
  process.env.JAVA_HOME ?? (existsSync(jdkRoot) ? join(jdkRoot, readdirSync(jdkRoot)[0]) : "");
const ANDROID_HOME = process.env.ANDROID_HOME ?? join(tools, "sdk");
if (!existsSync(join(JAVA_HOME, "bin"))) throw new Error(`JDK not found (${JAVA_HOME}). Set JAVA_HOME.`);
if (!existsSync(join(ANDROID_HOME, "platforms"))) throw new Error(`Android SDK not found (${ANDROID_HOME}). Set ANDROID_HOME.`);

const env = { ...process.env, JAVA_HOME, ANDROID_HOME, ANDROID_SDK_ROOT: ANDROID_HOME };
const run = (cmd, cwd = here) => execSync(cmd, { cwd, env, stdio: "inherit" });
const bin = (dir, name) => join(dir, process.platform === "win32" ? `${name}.exe` : name);
const bat = (dir, name) => join(dir, process.platform === "win32" ? `${name}.bat` : name);

// 1. Signing key (made once, then reused for every build).
const keys = join(homedir(), "learn-and-play-keys");
const keystore = join(keys, "learn-and-play.keystore");
const passFile = join(keys, "keystore-password.txt");
if (!existsSync(keystore)) {
  mkdirSync(keys, { recursive: true });
  const pass = randomBytes(18).toString("base64url");
  execFileSync(bin(join(JAVA_HOME, "bin"), "keytool"), [
    "-genkeypair", "-keystore", keystore, "-alias", "learnandplay", "-keyalg", "RSA", "-keysize", "2048",
    "-validity", "10000", "-storepass", pass, "-keypass", pass,
    "-dname", "CN=Learn and Play, O=Govt Girls School, C=PK",
  ], { env, stdio: "inherit" });
  writeFileSync(passFile, `${pass}\n`);
  console.log(`\nNew signing key: ${keystore}\nBACK UP the folder ${keys} — it is needed for future APK updates.\n`);
}
const pass = readFileSync(passFile, "utf8").trim();

// 2. Copy the web shell + config into the Android project, then build.
run("npx cap sync android");
run(`"${bat(join(here, "android"), "gradlew")}" assembleRelease --no-daemon`, join(here, "android"));

// 3. Align and sign.
const buildTools = join(ANDROID_HOME, "build-tools");
const bt = join(buildTools, readdirSync(buildTools).sort().at(-1));
const unsigned = join(here, "android/app/build/outputs/apk/release/app-release-unsigned.apk");
const aligned = join(here, "android/app/build/outputs/apk/release/app-release-aligned.apk");
mkdirSync(join(here, "dist"), { recursive: true });
const out = join(here, "dist/Learn-and-Play.apk");
execFileSync(bin(bt, "zipalign"), ["-f", "-p", "4", unsigned, aligned], { env, stdio: "inherit" });
// apksigner's .bat cannot be started from Node on Windows, so run its jar with the JDK.
const apksigner = (...args) =>
  execFileSync(bin(join(JAVA_HOME, "bin"), "java"), ["-jar", join(bt, "lib", "apksigner.jar"), ...args], { env, stdio: "inherit" });
apksigner("sign", "--ks", keystore, "--ks-pass", `pass:${pass}`, "--out", out, aligned);
apksigner("verify", "--print-certs", out);
console.log(`\n✓ ${out}\n`);
