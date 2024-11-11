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
exports.borrowRecordController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = require("../../../utils/sendResponse");
const borrowRecord_service_1 = require("./borrowRecord.service");
const getAllFromDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield borrowRecord_service_1.borrowRecordService.getAllFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Borrow Record retrieved successfully!",
        data: result.data
    });
}));
const getByIdFromDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield borrowRecord_service_1.borrowRecordService.getByIdFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Borrow Record retrieved by borrowId successfully!",
        data: result
    });
}));
const borrowABook = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, memberId } = req.body;
    const data = {
        bookId,
        memberId
    };
    const result = yield borrowRecord_service_1.borrowRecordService.borrowABook(data);
    if (result.success === false) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: false,
            message: result.message
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Book borrowed successfully!",
            data: result
        });
    }
}));
const returnABook = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = req.body;
    const data = {
        borrowId
    };
    const result = yield borrowRecord_service_1.borrowRecordService.returnABook(data);
    if (result.success === false) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: false,
            message: result.message
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Book returned successfully!",
            // data: result
        });
    }
}));
const getOverdueBooks = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield borrowRecord_service_1.borrowRecordService.getOverdueBooks();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: result.data.message,
        data: result.data.data
    });
}));
exports.borrowRecordController = {
    borrowABook,
    returnABook,
    getOverdueBooks,
    getAllFromDB,
    getByIdFromDB
};
