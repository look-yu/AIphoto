const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

/**
 * 用户登录云函数
 * 获取用户openid并创建/更新用户记录
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  try {
    // 获取用户信息
    const openid = wxContext.OPENID;
    const appid = wxContext.APPID;

    // 查询用户是否已存在
    const userResult = await db.collection('users')
      .where({ openid: openid })
      .get();

    let userInfo;

    if (userResult.data.length > 0) {
      // 用户已存在，更新登录时间
      userInfo = userResult.data[0];
      await db.collection('users')
        .doc(userInfo._id)
        .update({
          data: {
            lastLoginAt: new Date()
          }
        });
    } else {
      // 新用户，创建用户记录
      userInfo = {
        openid: openid,
        nickname: '摄影新手',
        avatar: '',
        level: '入门',
        worksCount: 0,
        reviewsCount: 0,
        coursesCount: 0,
        avgScore: 0,
        settings: {
          assistantEnabled: true,
          notificationsEnabled: true
        },
        createdAt: new Date(),
        lastLoginAt: new Date()
      };

      const addResult = await db.collection('users').add({
        data: userInfo
      });

      userInfo._id = addResult._id;
    }

    return {
      success: true,
      data: {
        openid: openid,
        userId: userInfo._id,
        userInfo: {
          nickname: userInfo.nickname,
          avatar: userInfo.avatar,
          level: userInfo.level,
          worksCount: userInfo.worksCount || 0,
          reviewsCount: userInfo.reviewsCount || 0,
          coursesCount: userInfo.coursesCount || 0,
          avgScore: userInfo.avgScore || 0,
          settings: userInfo.settings
        }
      }
    };

  } catch (err) {
    console.error('登录失败:', err);
    return {
      success: false,
      error: err.message || '登录失败'
    };
  }
};