import { Book } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { IBook } from "./book.interface";

const getAllFromDB = async () => {

    const result = await prisma.book.findMany();

    return {
        data: result
    };
};

const getByIdFromDB = async (id: string): Promise<Book | null> => {
    const result = await prisma.book.findUnique({
        where: {
            bookId: id
        }
    });
    
    return result;
};

const createBook = async (data: IBook) => {
    const { title, genre, publishedYear, totalCopies, availableCopies } = data;
    const result = await prisma.book.create({
        data: {
            title,
            genre,
            publishedYear,
            totalCopies,
            availableCopies,
        },
    });

    return {
        data: result
    };
};

const updateBook = async (id: string, data: IBook) => {
    const { title, genre, publishedYear, totalCopies, availableCopies } = data;
    const result = await prisma.book.update({
        where: { bookId: id },
        data: {
            title,
            genre,
            publishedYear,
            totalCopies,
            availableCopies,
        },
    });

    return {
        data: result
    };
};

const deleteBook = async (id: string) => {
    const result = await prisma.book.delete({
        where: { bookId: id },
    });

    return {
        data: result
    };
};

export const bookService = {
    getAllFromDB,
    getByIdFromDB,
    createBook,
    updateBook,
    deleteBook
}