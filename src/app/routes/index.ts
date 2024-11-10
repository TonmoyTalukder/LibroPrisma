import express, { Request, Response } from "express";
import { bookRoutes } from "../modules/book/book.routes";
import { memberRoutes } from "../modules/member/member.routes";
import { borrowRecordRoutes } from "../modules/borrowRecord/borrowRecord.routes";

const router = express.Router();

const moduleRoutes = [
    {
        path: '/books',
        route: bookRoutes
    },
    {
        path: '/members',
        route: memberRoutes
    },
    {
        path: '/borrow',
        route: borrowRecordRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;