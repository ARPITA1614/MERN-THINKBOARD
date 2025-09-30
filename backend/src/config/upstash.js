import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// Create Redis client directly from env
const redis = Redis.fromEnv();
// Use REST API mode ratelimiter
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "20 s"),  //create ratelimiter allowing 100 requests per 60 sec
});


export default ratelimit;

// // backend/config/upstash.js
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
// import dotenv from "dotenv";

// dotenv.config();

// // Explicitly use REST API credentials
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

// const ratelimit = new Ratelimit({
//   redis,
//   limiter: Ratelimit.slidingWindow(10, "20 s"),
//   analytics: true,
// });

// export default ratelimit;
