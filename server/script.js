import http from 'k6/http';
import { Rate } from 'k6/metrics';

let errorRate = new Rate('errorRate')

export let options = {
  discardResponseBodies: false,
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 1000,
      stages: [
        { target: 10, duration: '30s' },
        { target: 100, duration: '30s' },
        { target: 1000, duration: '30s' },
      ]
    }
  }
}
export default function () {
  let random = Math.floor(Math.random() * 2000000) + 1
  let res = http.get(`http://localhost:8080/reviews/${random}`, { tags: { name: 'ReviewsURL' } });


  errorRate.add(res.status >= 400)
}


// data_received..............: 15 MB  154 kB/s
// data_sent..................: 321 kB 3.3 kB/s
// dropped_iterations.........: 704    7.290542/s
// errorRate..................: 0.00%  ✓ 0     ✗ 5610
// http_req_blocked...........: avg=59.51µs  min=0s       med=5µs      max=10.66ms p(90)=13µs     p(95)=503.55µs
// http_req_connecting........: avg=23.39µs  min=0s       med=0s       max=1.33ms  p(90)=0s       p(95)=259µs
// http_req_duration..........: avg=203.64ms min=0s       med=55.09ms  max=2.32s   p(90)=890.06ms p(95)=1.08s
// http_req_receiving.........: avg=58.03µs  min=0s       med=77µs     max=2.75ms  p(90)=117µs    p(95)=136µs
// http_req_sending...........: avg=14.09ms  min=0s       med=30µs     max=2.31s   p(90)=70µs     p(95)=129µs
// http_req_tls_handshaking...: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s
// http_req_waiting...........: avg=189.49ms min=0s       med=46.61ms  max=2.16s   p(90)=856.95ms p(95)=1.07s
// http_reqs..................: 5610   58.096509/s
// iteration_duration.........: avg=570.1ms  min=385.47µs med=143.16ms max=14.59s  p(90)=1.28s    p(95)=1.43s
// iterations.................: 5610   58.096509/s
// vus........................: 268    min=100 max=268
// vus_max....................: 268    min=100 max=268