"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagesResize_1 = __importDefault(require("./api/imagesResize"));
const validateInputs_1 = __importDefault(require("../middlewares/validateInputs"));
const routes = express_1.default.Router();
// api route
routes.get('/', (req, res) => {
    res.send('Main route');
});
// images list route
routes.get('/imageslist', (req, res) => {
    res.json({
        image1: 'encenadaport',
        image2: 'fjord',
        image3: 'icelandwaterfall',
        image4: 'palmtunnel',
        image5: 'santamonica',
    });
});
// using images route
routes.use('/images', validateInputs_1.default, imagesResize_1.default);
exports.default = routes;
