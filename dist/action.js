"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
const downloadAndInstall_1 = __importDefault(require("./downloadAndInstall"));
async function action() {
    const version = (0, jamesons_actions_toolkit_1.getInput)("version", { type: jamesons_actions_toolkit_1.string });
    await (0, downloadAndInstall_1.default)(version);
}
exports.default = action;
