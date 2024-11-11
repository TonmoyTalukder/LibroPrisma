"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRecordValidationSchemas = void 0;
const zod_1 = require("zod");
const borrowABook = zod_1.z.object({
    body: zod_1.z.object({
        bookId: zod_1.z.string().optional(),
        memberId: zod_1.z.string().optional()
    })
});
const returnABook = zod_1.z.object({
    body: zod_1.z.object({
        borrowId: zod_1.z.string().optional()
    })
});
exports.borrowRecordValidationSchemas = {
    borrowABook,
    returnABook
};
