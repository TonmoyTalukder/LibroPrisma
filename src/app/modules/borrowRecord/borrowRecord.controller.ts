import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../../utils/sendResponse";
import { borrowRecordService } from "./borrowRecord.service";


const getAllFromDB: RequestHandler = catchAsync(async (req, res, next) => {

    const result = await borrowRecordService.getAllFromDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Borrow Record retrieved successfully!",
        data: result.data
    });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await borrowRecordService.getByIdFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Borrow Record retrieved by borrowId successfully!",
        data: result
    });

});

const borrowABook: RequestHandler = catchAsync(async (req, res, next) => {
    const { bookId, memberId } = req.body;

    const data = {
        bookId,
        memberId
    }

    const result = await borrowRecordService.borrowABook(data);

    if (result.success === false) {
        sendResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: result.message
        });
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Book borrowed successfully!",
            data: result
        });
    }
});

const returnABook: RequestHandler = catchAsync(async (req, res, next) => {
    const { borrowId } = req.body;

    const data = {
        borrowId
    }

    const result = await borrowRecordService.returnABook(data);

    if (result.success === false) {
        sendResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: result.message
        });
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Book returned successfully!",
            // data: result
        });
    }
});


const getOverdueBooks: RequestHandler = catchAsync(async (req, res, next) => {

    const result = await borrowRecordService.getOverdueBooks();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: result.data.message,
        data: result.data.data
    });
});

export const borrowRecordController = {
    borrowABook,
    returnABook,
    getOverdueBooks,
    getAllFromDB,
    getByIdFromDB
}