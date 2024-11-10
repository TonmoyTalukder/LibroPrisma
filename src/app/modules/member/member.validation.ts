import { z } from "zod";

const create = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        memberShipDate: z.date().optional(),
    })
})

const update = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
    })
})

export const memberValidationSchemas = {
    create,
    update
}