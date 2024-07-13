"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversData = void 0;
const base_1 = __importDefault(require("./base"));
const domain2_1 = __importDefault(require("./domain2"));
exports.resolversData = {
    domain1: base_1.default,
    domain2: domain2_1.default,
};
