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
exports.borrowRecordService = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const borrowABook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, memberId } = data;
    const existingRecord = yield prisma_1.default.borrowRecord.findFirst({
        where: {
            bookId: bookId,
            memberId: memberId,
            returnDate: null, // Not yet returned
        },
    });
    if (existingRecord) {
        return {
            success: false,
            message: `This book is already borrowed by this member on ${existingRecord.borrowDate} and has not been returned yet.`,
        };
    }
    const result = yield prisma_1.default.borrowRecord.create({
        data: {
            bookId: bookId,
            memberId: memberId,
            borrowDate: new Date()
        },
    });
    return {
        data: {
            borrowId: result.borrowId,
            bookId: result.bookId,
            memberId: result.memberId,
            borrowDate: result.borrowDate
        }
    };
});
const returnABook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = data;
    const existingRecord = yield prisma_1.default.borrowRecord.findUniqueOrThrow({
        where: { borrowId },
    });
    if (existingRecord.returnDate !== null) {
        return {
            success: false,
            message: "This book has already been returned.",
        };
    }
    const result = yield prisma_1.default.borrowRecord.update({
        where: { borrowId },
        data: {
            returnDate: new Date()
        },
    });
    return {
        data: result
    };
});
const getOverdueBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const overdueRecords = yield prisma_1.default.borrowRecord.findMany({
        where: {
            returnDate: null, // Not returned yet
            borrowDate: {
                lte: new Date(currentDate.setDate(currentDate.getDate() - 14)) // Borrowed more than 14 days ago
            }
        },
        include: {
            book: true,
            member: true
        }
    });
    const overdueBooks = overdueRecords.map(record => {
        const overdueDays = Math.floor((currentDate.getTime() - record.borrowDate.getTime()) / (1000 * 3600 * 24));
        return {
            borrowId: record.borrowId,
            bookTitle: record.book.title,
            borrowerName: record.member.name,
            overdueDays: overdueDays
        };
    });
    if (overdueBooks.length === 0) {
        return {
            data: {
                message: "No overdue books",
                data: overdueBooks
            }
        };
    }
    else {
        return {
            data: {
                message: "Overdue borrow list fetched!",
                data: overdueBooks
            }
        };
    }
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.borrowRecord.findMany();
    return {
        data: result
    };
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.borrowRecord.findUnique({
        where: {
            borrowId: id
        }
    });
    return result;
});
exports.borrowRecordService = {
    borrowABook,
    returnABook,
    getOverdueBooks,
    getAllFromDB,
    getByIdFromDB
};
