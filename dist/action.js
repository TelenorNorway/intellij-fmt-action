"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_os_1 = require("node:os");
const core_1 = require("@actions/core");
const tool_cache_1 = require("@actions/tool-cache");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
async function action() {
    const version = (0, core_1.getInput)("version");
    const os = (0, node_os_1.type)();
    const aarch = (0, node_os_1.arch)();
    const url = downloadUrl(version, os, aarch);
    await downloadAndInstall(os, url);
}
exports.default = action;
function downloadUrl(version, os, aarch) {
    return `${downloadUrlBase()}${version}${downloadType(aarch)}${downloadExtension(os)}`;
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
function downloadType(arch) {
    return arch === "arm64" ? "-aarch64" : "";
}
function downloadUrlBase() {
    return "https://download-cdn.jetbrains.com/idea/ideaIC-";
}
function downloadAndInstall(os, url) {
    switch (os) {
        case "Linux":
            return downloadAndInstallLinux(url);
        default:
            throw new Error(`Unsupported OS '${os}'`);
    }
}
async function downloadAndInstallLinux(url) {
    const tarball = await (0, tool_cache_1.downloadTool)(url);
    const dir = await (0, tool_cache_1.extractTar)(tarball);
    const pathToIdea = (0, node_path_1.join)(dir, (0, node_fs_1.readdirSync)(dir)[0], "bin");
    (0, core_1.addPath)(pathToIdea);
    (0, core_1.info)(`IntelliJ IDEA has been installed at ${(0, node_path_1.dirname)(pathToIdea)}`);
}
