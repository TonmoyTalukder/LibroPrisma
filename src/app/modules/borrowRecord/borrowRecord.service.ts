import { BorrowRecord, Member } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { IBorrowRecord } from "./borrowRecord.interface";

const borrowABook = async (data: IBorrowRecord) => {
    const { bookId, memberId } = data;
    const existingRecord = await prisma.borrowRecord.findFirst({
        where: {
            bookId: bookId!,
            memberId: memberId!,
            returnDate: null, // Not yet returned
        },
    });

    if (existingRecord) {
        return {
            success: false,
            message: `This book is already borrowed by this member on ${existingRecord.borrowDate} and has not been returned yet.`,
        };
    }

    const result = await prisma.borrowRecord.create({
        data: {
            bookId: bookId!,
            memberId: memberId!,
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
};

const returnABook = async (data: IBorrowRecord) => {
    const { borrowId } = data;

    const existingRecord = await prisma.borrowRecord.findUniqueOrThrow({
        where: { borrowId },
    });

    if (existingRecord.returnDate !== null) {
        return {
            success: false,
            message: "This book has already been returned.",
        };
    }

    const result = await prisma.borrowRecord.update({
        where: { borrowId },
        data: {
            returnDate: new Date()
        },
    });

    return {
        data: result
    };
};

const getOverdueBooks = async () => {
    const currentDate = new Date();

    const overdueRecords = await prisma.borrowRecord.findMany({
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
        }
    } else {
        return {
            data: {
                message: "Overdue borrow list fetched!",
                data: overdueBooks
            }
        };
    }
};


const getAllFromDB = async () => {

    const result = await prisma.borrowRecord.findMany();

    return {
        data: result
    };
};

const getByIdFromDB = async (id: string): Promise<BorrowRecord | null> => {
    const result = await prisma.borrowRecord.findUnique({
        where: {
            borrowId: id
        }
    });

    return result;
};

export const borrowRecordService = {
    borrowABook,
    returnABook,
    getOverdueBooks,
    getAllFromDB,
    getByIdFromDB
}