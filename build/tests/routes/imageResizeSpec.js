"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageprocess_1 = __importDefault(require("../../utils/imageprocess"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Resizing image suite
describe('Resize Image suite', () => {
    // Img path parameters
    const filename = 'fjord';
    const width = 800;
    const height = 400;
    const invalidPath = path_1.default.resolve(__dirname, '../../../images/original', 'test.jpg');
    const originalImgPath = path_1.default.resolve(__dirname, '../../../images/original', `${filename}.jpg`);
    const processedImgPath = path_1.default.resolve(__dirname, '../../../images/thumb', `${filename}_${width}_${height}.jpg`);
    it('Image should be processed Successfully!', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, imageprocess_1.default)({
            width,
            height,
            originalImgPath,
            processedImgPath,
        })).toBeResolved();
    }));
    it('Image must return processedImgPath!', () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(yield (0, imageprocess_1.default)({
            width,
            height,
            originalImgPath,
            processedImgPath,
        })).toEqual(processedImgPath);
    }));
    it('Should be rejected due to false img path!', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, imageprocess_1.default)({
            width,
            height,
            invalidPath,
            processedImgPath,
        })).toBeRejected();
    }));
    it('Should be falsy if the original image does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const imgPath = yield fs_1.default.existsSync('images/original/test.jpg');
        expect(imgPath).toBeFalsy();
    }));
});
