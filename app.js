const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(
  express.urlencoded({
    extended: false,
  })
);

// 全局中间件，处理响应失败问题
// app.use((req, res, next) => {
//   res.cc = (err, status = 1) => {
//     res.send({
//       status,
//       message: err instanceof Error ? err.message : err
//     })
//   }
//   next()
// })

const userRouter = require('./router/user');
app.use('/api', userRouter);

app.listen(3007, () => {
  console.log('api server is running on http://127.0.0.1');
});
