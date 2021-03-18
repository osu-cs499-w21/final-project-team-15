import { getYearEndChart } from '../../src/billboard-year-end';
 
// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  getYearEndChart(req.body.name, req.body.year, (err, chart) => {
    if (err) console.log(err);
    res.status(200).json(chart);
  });
}
 