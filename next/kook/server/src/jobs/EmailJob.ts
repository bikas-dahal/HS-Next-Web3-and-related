import {Job, Queue, Worker} from "bullmq";
import {defaultJobOptions, redisConnection} from "../config/queue.js";
import {sendEmail} from "../config/mail.js";

export const emailQueueName = "emailQueue";

interface EmailJobDataType {
    to: string;
    subject: string;
    body: string;
}

export const emailQueue = new Queue(emailQueueName, {
    connection: redisConnection,
    defaultJobOptions,
})

// worker
export const queueWorker = new Worker(emailQueueName, async (job:Job) => {
    const data:EmailJobDataType = job.data
    await sendEmail(data.to, data.subject, data.body)
    // console.log('Job data is', data)
}, {
    connection: redisConnection
})