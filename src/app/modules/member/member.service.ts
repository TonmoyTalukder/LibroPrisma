import { Member } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { IMember } from "./member.interface";

const getAllFromDB = async () => {

    const result = await prisma.member.findMany();

    return {
        data: result
    };
};

const getByIdFromDB = async (id: string): Promise<Member | null> => {
    const result = await prisma.member.findUniqueOrThrow({
        where: {
            memberId: id
        }
    });



    return result;
};

const createMember = async (data: IMember) => {
    const { name, email, phone, membershipDate } = data;
    const result = await prisma.member.create({
        data: {
            name,
            email,
            phone,
            membershipDate: new Date(membershipDate!)
        },
    });

    return {
        data: result
    };
};

const updateMember = async (id: string, data: IMember) => {
    const { name, email, phone } = data;
    console.log("Data: ", data);
    const result = await prisma.member.update({
        where: { memberId: id },
        data: {
            name,
            email,
            phone
        },
    });

    console.log("Result: ", result)

    return {
        data: result
    };
};

const deleteMember = async (id: string) => {
    await prisma.member.findUniqueOrThrow({
        where: {
            memberId: id
        }
    });
    
    const result = await prisma.member.delete({
        where: { memberId: id },
    });

    return {
        data: result
    };
};

export const memberService = {
    getAllFromDB,
    getByIdFromDB,
    createMember,
    updateMember,
    deleteMember
}