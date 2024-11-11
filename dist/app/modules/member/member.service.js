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
exports.memberService = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.findMany();
    return {
        data: result
    };
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.findUniqueOrThrow({
        where: {
            memberId: id
        }
    });
    return result;
});
const createMember = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, membershipDate } = data;
    const result = yield prisma_1.default.member.create({
        data: {
            name,
            email,
            phone,
            membershipDate: new Date(membershipDate)
        },
    });
    return {
        data: result
    };
});
const updateMember = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = data;
    console.log("Data: ", data);
    const result = yield prisma_1.default.member.update({
        where: { memberId: id },
        data: {
            name,
            email,
            phone
        },
    });
    console.log("Result: ", result);
    return {
        data: result
    };
});
const deleteMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.member.findUniqueOrThrow({
        where: {
            memberId: id
        }
    });
    const result = yield prisma_1.default.member.delete({
        where: { memberId: id },
    });
    return {
        data: result
    };
});
exports.memberService = {
    getAllFromDB,
    getByIdFromDB,
    createMember,
    updateMember,
    deleteMember
};
