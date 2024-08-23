export const redisConnection = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    username: 'default',
    password: process.env.REDIS_PASSWORD,
};
export const defaultJobOptions = {
    removeOnComplete: {
        count: 20,
        age: 60 * 60
    },
    attempts: 3,
    backoff: {
        type: 'exponential',
        delay: 3000
    },
    removeOnFail: false
};
