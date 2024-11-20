import { NextFunction, Request, Response } from "express"
import {JWT_SECRET} from './config'
import jwt from 'jsonwebtoken'


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token']

    const decodedData = jwt.verify(token as string, JWT_SECRET)

    if (decodedData) {
        // @ts-ignore
        req.userId = decodedData.id
        next()
    } else {
        res.status(403).send({
            message: "Invalid token",
        })
    }
}
