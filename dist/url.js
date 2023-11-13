"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadUrl = void 0;
const base = "https://download-cdn.jetbrains.com/idea/ideaIC-";
function downloadUrl(version, os, arch) {
    return `${base}${version}${downloadType(arch)}${downloadExtension(os)}`;
}
exports.downloadUrl = downloadUrl;
exports.default = downloadUrl;
function downloadType(arch) {
    return arch === "arm64" ? "-aarch64" : "";
}
function downloadExtension(os) {
    switch (os) {
        case "Linux":
            return ".tar.gz";
        case "Windows_NT":
            return ".exe";
        case "Darwin":
            return ".dmg";
        default:
            throw new Error(`Unsupported OS '${os}'`);
    }
}
