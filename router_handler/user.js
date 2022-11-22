const db = require('../db');
const bcrypt = require('bcryptjs');

// 注册处理
exports.register = (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  // 1.检查表单数据合并性
  if (!userInfo.username || !userInfo.password) {
    res.send({
      status: 1,
      message: '用户名或密码不能为空！',
    });
    return;
  }
  /* TODO:其他合法性检查
   *     ...
   */

  // 2.检查用户名是否被占用
  const sql = 'select * from ev_users where username=?';
  db.query(sql, [userInfo.username], (err, results) => {
    if (err) {
      res.send({
        status: 1,
        message: err.message,
      });
      return;
    }
    if (results.length > 0) {
      res.send({
        status: 1,
        message: '用户名已被占用，请更换其他！',
      });
      return;
    }

    // 3.密码加密
    userInfo.password = bcrypt.hashSync(userInfo.password);
    console.log(userInfo);

    // 4.插入数据库
    const sql = 'insert into ev_users set ?';
    db.query(sql, userInfo, (err, results) => {
      if (err) {
        res.send({
          status: 1,
          message: err.message,
        });
        return;
      }
      if (results.affectedRows !== 1) {
        res.send({
          status: 1,
          message: '注册用户失败，请稍后再试！',
        });
        return;
      }
      res.send({
        status: 0,
        message: '注册成功！',
      });
    });
  });
};

// 登录处理
exports.login = (req, res) => {
  console.log(req.query);
  // 1.检测表单数据合法性
  if (!req.username || !req.password) {
    return res.cc('用户名或密码不能为空！');
  }
  /* TODO:其他合法性检查
   *     ...
   */

  // 2.检测用户是否已注册
  const userInfo = {
    username: req.username,
    password: req.password,
  };
  const sql = 'select * from ev_users where username=?';
  db.query(sql, [userInfo.username], (err, results) => {
    if (results.length < 0) {
      return res.cc('用户名不存在，请重新输入！');
    }

    // 3.检测密码是否正确
  });

  // 4.生成JWT Token

  res.send('login ok');
};
