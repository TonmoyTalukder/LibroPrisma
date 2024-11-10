import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../../utils/sendResponse";
import { memberService } from "./member.service";


const getAllFromDB: RequestHandler = catchAsync(async (req, res, next) => {

    const result = await memberService.getAllFromDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Members retrieved successfully!",
        data: result.data
    });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await memberService.getByIdFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Member retrieved by memberId successfully!",
        data: result
    });

});

const createMember: RequestHandler = catchAsync(async (req, res, next) => {
    const { name, email, phone, membershipDate } = req.body;

    const data = {
        name,
        email,
        phone,
        membershipDate
    }

    const result = await memberService.createMember(data);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Member created successfully!",
        data: result
    });
});

const updateMember: RequestHandler = catchAsync(async (req, res, next) => {
    const { memberId } = req.params;
    const { name, email, phone } = req.body;

    const data = {
        name,
        email,
        phone
    }

    const result = await memberService.updateMember(memberId, data);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Member updated successfully!",
        data: result
    });
});

const deleteMember: RequestHandler = catchAsync(async (req, res, next) => {
    const { memberId } = req.params;

    const result = await memberService.deleteMember(memberId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Member successfully deleted!",
        data: result
    });
});

export const memberController = {
    getAllFromDB,
    getByIdFromDB,
    createMember,
    updateMember,
    deleteMember
}