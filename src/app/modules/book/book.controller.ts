import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../../utils/sendResponse";
import { bookService } from "./book.service";


const getAllFromDB: RequestHandler = catchAsync(async (req, res, next) => {

    const result = await bookService.getAllFromDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Books retrieved successfully!",
        data: result.data
    });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await bookService.getByIdFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Book retrieved by bookId successfully!",
        data: result
    });
    
});

const createBook: RequestHandler = catchAsync(async (req, res, next) => {
    const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;

    const data = {
        title,
        genre,
        publishedYear,
        totalCopies,
        availableCopies,
    }

    const result = await bookService.createBook(data);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Book created successfully!",
        data: result
    });
});

const updateBook: RequestHandler = catchAsync(async (req, res, next) => {
    const { bookId } = req.params;
    const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;

    const data = {
        title,
        genre,
        publishedYear,
        totalCopies,
        availableCopies,
    }

    const result = await bookService.updateBook(bookId, data);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Book updated successfully!",
        data: result
    });
});

const deleteBook: RequestHandler = catchAsync(async (req, res, next) => {
    const { bookId } = req.params;

    const result = await bookService.deleteBook(bookId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Book successfully deleted!",
        data: result
    });
});

export const bookController = {
    getAllFromDB,
    getByIdFromDB,
    createBook,
    updateBook,
    deleteBook
}