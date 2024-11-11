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
exports.bookController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = require("../../../utils/sendResponse");
const book_service_1 = require("./book.service");
const getAllFromDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.bookService.getAllFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Books retrieved successfully!",
        data: result.data
    });
}));
const getByIdFromDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield book_service_1.bookService.getByIdFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Book retrieved by bookId successfully!",
        data: result
    });
}));
const createBook = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;
    const data = {
        title,
        genre,
        publishedYear,
        totalCopies,
        availableCopies,
    };
    const result = yield book_service_1.bookService.createBook(data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Book created successfully!",
        data: result
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;
    const data = {
        title,
        genre,
        publishedYear,
        totalCopies,
        availableCopies,
    };
    const result = yield book_service_1.bookService.updateBook(bookId, data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Book updated successfully!",
        data: result.data
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const result = yield book_service_1.bookService.deleteBook(bookId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Book successfully deleted!",
        // data: result
    });
}));
exports.bookController = {
    getAllFromDB,
    getByIdFromDB,
    createBook,
    updateBook,
    deleteBook
};
