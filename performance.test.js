import http from "k6/http";
import {sleep, check} from "k6";

// A user making calls for 10 seconds
/*
export const options = {
    vus: 1,
    duration: "10s"
};
*/

/*
# Load: 
* Ramp to 200 users in 10 seconds
* Hold 200 users for 40 seconds
* 10 seconds cool down to 0 users
*/

export const options = {
    stages: [
        { duration: "10s", target: 200 }, // ramp up
        { duration: "40s", target: 200 }, // stable
        { duration: "10s", target: 0 } // cool down to 0 users
    ],
    thresholds: {
        http_req_duration: ["p(99)<100"], // 99% of request must complete within 100 ms
    }
};

/* 
# Stress:
* Ramp to 200 users in 10 seconds & hold for 20 seconds
* Double users in 10 seconds & hold for 20 seconds
* Double users in 10 seconds & hold for 20 seconds
* 20 seconds cool down to 0 users
*/

/*
export const options = {
    stages: [
        { duration: "10s", target: 200 }, // ramp up
        { duration: "20s", target: 200 }, // stable
        { duration: "10s", target: 400 }, // ramp up
        { duration: "20s", target: 400 }, // stable
        { duration: "10s", target: 800 }, // ramp up
        { duration: "20s", target: 800 }, // stable
        { duration: "20s", target: 0 } // cool down to 0 users
    ],
    thresholds: {
        http_req_duration: ["p(99)<100"], // 99% of request must complete within 100 ms
    }
};
*/

/*
# Spike:
* Ramp to 1000 users in 10 seconds
* Hold 1000 users for 20 seconds
* 10 seconds cool down to 0 users
*/

/*
export const options = {
    stages: [
        { duration: "10s", target: 1000 }, // ramp up
        { duration: "20s", target: 1000 }, // stable
        { duration: "10s", target: 0 } // cool down to 0 users
    ],
    thresholds: {
        http_req_duration: ["p(99)<100"], // 99% of request must complete within 100 ms
    }
};
*/

/*
# Functions to Add:
* Soak Test (5 minute ramp to peak users for 8 hours, then 5 minute cool down)
*/

// Get request to MTG Collection Database
export default () => {
   const res = http.get("http://localhost:8080/collection");
   check(res, {"200": (r) => r.status === 200});
   sleep(1);
};