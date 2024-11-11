"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberValidationSchemas = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        memberShipDate: zod_1.z.date().optional(),
    })
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
    })
});
exports.memberValidationSchemas = {
    create,
    update
};
