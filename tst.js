
import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 300,
  duration: '50s',
};
export default function () {
  http.get('https://massarservice.men.gov.ma/moutamadris/Account');
  sleep(1);
}