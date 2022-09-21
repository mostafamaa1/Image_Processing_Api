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
const express_1 = __importDefault(require("express"));
const imageprocess_1 = __importDefault(require("../../utils/imageprocess"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../../middlewares/logger"));
const images = express_1.default.Router();
// Images route
images.get('/', logger_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Create query param
    const { filename, width, height } = req.query;
    // Creating thumbnails folder and check if folder exists
    const thumbPath = path_1.default.join(__dirname, '../../../images/thumb');
    const thumbExists = fs_1.default.existsSync(thumbPath);
    try {
        if (!thumbExists) {
            fs_1.default.mkdirSync(thumbPath);
        }
    }
    catch (err) {
        console.error(err);
    }
    // original image path
    const originalImgPath = path_1.default.resolve(__dirname, '../../../images/original', `${filename}.jpg`);
    // processed image path
    const processedImgPath = path_1.default.resolve(__dirname, '../../../images/thumb', `${filename}_${width}_${height}.jpg`);
    // check if original image exists or not
    const originalImgExists = fs_1.default.existsSync(originalImgPath);
    if (!originalImgExists) {
        return res.send('An Image with this name does not exist!');
    }
    try {
        // check if processed image exists
        const processedImgExists = fs_1.default.existsSync(processedImgPath);
        // if the image does not exist, resize it
        if (!processedImgExists) {
            yield (0, imageprocess_1.default)({
                width: +width,
                height: +height,
                originalImgPath,
                processedImgPath,
            });
        }
        //send the processed image
        return res.sendFile(processedImgPath);
    }
    catch (err) {
        return 'Cannot resize image. Please enter valid parameters';
    }
}));
exports.default = images;
