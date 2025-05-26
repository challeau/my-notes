var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { readdirSync } from "node:fs";
import { open } from "node:fs/promises";
import path from "path";
import { sortTopicCollectiontByPriority, } from "./index.js";
/**
 * Parse the metadata found in the first few lines of a file
 * The parsing stops at the first occurence of a non-comment line (ie, one that doesn't
 * start with "[//]: #"). This includes empty lines.
 *
 * -> This function will be replaced when super-parser is functional
 */
export function getNoteFileMetadata(parentPath, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var filepath, file, defaultName, metadata, _a, _b, _c, line, data, key, value, e_1_1;
        var _d, e_1, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    filepath = path.join(parentPath, filename);
                    return [4 /*yield*/, open(filepath)];
                case 1:
                    file = _g.sent();
                    defaultName = path.parse(filename).name;
                    metadata = {
                        filename: filename,
                        filepath: filepath,
                        title: defaultName,
                        endpoint: "/" + defaultName,
                    };
                    _g.label = 2;
                case 2:
                    _g.trys.push([2, 7, 8, 13]);
                    _a = true, _b = __asyncValues(file.readLines());
                    _g.label = 3;
                case 3: return [4 /*yield*/, _b.next()];
                case 4:
                    if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 6];
                    _f = _c.value;
                    _a = false;
                    line = _f;
                    if (!line.startsWith("[//]: #")) {
                        file.close();
                        return [2 /*return*/, metadata];
                    }
                    data = line.match(/(?<=((?<=\()[A-Z]* )).*(?=\))/);
                    if (data && data[0] !== null && data[1] !== null) {
                        key = data[1].toLowerCase().trim();
                        value = data[0];
                        metadata[key] = value;
                    }
                    _g.label = 5;
                case 5:
                    _a = true;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _g.trys.push([8, , 11, 12]);
                    if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _e.call(_b)];
                case 9:
                    _g.sent();
                    _g.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13:
                    file.close();
                    return [2 /*return*/, metadata];
            }
        });
    });
}
/**
 * Recursively parse the filepath to get a list of all markdown files (and their metadata)
 * sorted by subject.
 */
export function getTopicsFromFilepath(filepath) {
    return __awaiter(this, void 0, void 0, function () {
        var topics, dirents, _i, dirents_1, dirent, parentDirnameMatch, parentDirname, fileMetadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topics = {};
                    dirents = readdirSync(filepath, { withFileTypes: true, recursive: true });
                    _i = 0, dirents_1 = dirents;
                    _a.label = 1;
                case 1:
                    if (!(_i < dirents_1.length)) return [3 /*break*/, 4];
                    dirent = dirents_1[_i];
                    if (dirent.isDirectory()) {
                        topics[dirent.name] = [];
                        return [3 /*break*/, 3];
                    }
                    if (!(dirent.isFile() && dirent.name.match(".md$"))) return [3 /*break*/, 3];
                    parentDirnameMatch = dirent.parentPath.match("([^/]*)/*$");
                    parentDirname = parentDirnameMatch ? parentDirnameMatch[1] : 'Other';
                    return [4 /*yield*/, getNoteFileMetadata(dirent.parentPath, dirent.name)];
                case 2:
                    fileMetadata = _a.sent();
                    if (parentDirname in topics) {
                        topics[parentDirname].push(fileMetadata);
                        return [3 /*break*/, 3];
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    sortTopicCollectiontByPriority(topics);
                    return [2 /*return*/, topics];
            }
        });
    });
}
