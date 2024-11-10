import { z } from "zod";

const borrowABook = z.object({
    body: z.object({
        bookId: z.string().optional(),
        memberId: z.string().optional()
    })
})

const returnABook = z.object({
    body: z.object({
        borrowId: z.string().optional()
    })
})

export const borrowRecordValidationSchemas = {
    borrowABook,
    returnABook
}