import { arch as sysAarch, type } from "node:os";
import { getInput, addPath, info } from "@actions/core";
import { downloadTool, extractTar } from "@actions/tool-cache";
import { readdirSync } from "node:fs";
import { join, dirname } from "node:path";

export default async function action() {
	const version = getInput("version");
	const os = type();
	const aarch = sysAarch();
	const url = downloadUrl(version, os, aarch);
	await downloadAndInstall(os, url);
}

function downloadUrl(version: string, os: string, aarch: string) {
	return `${downloadUrlBase()}${version}${downloadType(
		aarch,
	)}${downloadExtension(os)}`;
}

function downloadExtension(os: string) {
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

function downloadType(arch: string) {
	return arch === "arm64" ? "-aarch64" : "";
}

function downloadUrlBase() {
	return "https://download-cdn.jetbrains.com/idea/ideaIC-";
}

function downloadAndInstall(os: string, url: string) {
	switch (os) {
		case "Linux":
			return downloadAndInstallLinux(url);
		default:
			throw new Error(`Unsupported OS '${os}'`);
	}
}

async function downloadAndInstallLinux(url: string) {
	const tarball = await downloadTool(url);
	const dir = await extractTar(tarball);
	const pathToIdea = join(dir, readdirSync(dir)[0], "bin");
	addPath(pathToIdea);
	info(`IntelliJ IDEA has been installed at ${dirname(pathToIdea)}`);
}
