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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = require("../../../utils/sendResponse");
const member_service_1 = require("./member.service");
const getAllFromDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.memberService.getAllFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Members retrieved successfully!",
        data: result.data
    });
}));
const getByIdFromDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield member_service_1.memberService.getByIdFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Member retrieved by memberId successfully!",
        data: result
    });
}));
const createMember = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, membershipDate } = req.body;
    const data = {
        name,
        email,
        phone,
        membershipDate
    };
    const result = yield member_service_1.memberService.createMember(data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Member created successfully!",
        data: result.data
    });
}));
const updateMember = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const { name, email, phone } = req.body;
    const data = {
        name,
        email,
        phone
    };
    const result = yield member_service_1.memberService.updateMember(memberId, data);
    const _a = result.data, { membershipDate } = _a, dataWithoutMembershipDate = __rest(_a, ["membershipDate"]);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Member updated successfully!",
        data: dataWithoutMembershipDate
    });
}));
const deleteMember = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const result = yield member_service_1.memberService.deleteMember(memberId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Member successfully deleted!",
        // data: result
    });
}));
exports.memberController = {
    getAllFromDB,
    getByIdFromDB,
    createMember,
    updateMember,
    deleteMember
};
