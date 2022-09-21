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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
// Suite for endpoint testing
describe('Test for endpoint responses', () => {
    // main route
    describe('main route', () => {
        it('gets the / endpoint with status(200)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/');
            expect(response.status).toBe(200);
        }));
    });
    // api route
    describe('api route', () => {
        const fileName = 'palmtunnel';
        const width = 800;
        const height = 400;
        it('gets the /api endpoint with status(200)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api');
            expect(response.status).toBe(200);
        }));
        it('/api should return a message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api');
            expect(response.text).toEqual('Main route');
        }));
        it('Respond with 200 endpoint is working', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api/images?filename=${fileName}&width=${width}&height=${height}`);
            expect(response.status).toBe(200);
        }));
        it('Respond with 400 parameter is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=fjord&width=100');
            expect(response.status).toEqual(400);
        }));
        it('Respond with 400 width and height must be number ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=fjord&width=xx&height=x');
            expect(response.status).toBe(400);
        }));
    });
});
