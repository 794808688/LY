/**
 * 服务器忙/未知错误
 */
const ERROR = 0;
/**
 * 成功
 */
const SUCCESS_200 = 200;
const SUCCESS_1 = 1;
const SUCCESS_0 = 0;
/**
 * 未登录
 */
const ERR_NOLOGIN = 401;
/**
 * 参数错误
 */
const ERR_WRONGPARAMS = 402;
/**
 * 无效的CMD
 */
const ERR_NOCMD = 403;
/**
 * 无记录
 */
const ERR_NOEXIST = 404;
/**
 * 权限不足
 */
const ERR_NOLV = 405;
/**
 * 已下架/关闭
 */
const ERR_STATUSCLOSE = 406;
/**
 * 错误的产品ID
 */
const ERR_NOPID = 410;
/**
 * 错误的批次ID
 */
const ERR_NOPLANID = 411;
/**
 * 未报名
 */
const ERR_NOMAPID = 412;
/**
 * 无法修改已确认的提档(重复操作)
 */
const ERR_NOREPEAT = 413;
/**
 * 等待确认
 */
const ERR_NOSURE = 414;
/**
 * 已经报名
 */
const ERR_NOSENDREPEAT = 415;
/**
 * 错误的短信验证码
 */
const ERR_WRONGSMS = 416;
/**
 * 验证码过期
 */
const ERR_SMSOUTTIME = 417;
/**
 * 上传失败
 */
const ERR_UPLOADFIELD = 418;
/**
 * 校区不存在
 */
const ERR_NOSCHOOL = 419;
/**
 * 校区不存在
 */
const ERR_WRONGWXOPENID = 420;
/**
 * 重复添加
 */
const ERR_REPEAT = 421;
/**
 * 名称为空
 */
const ERR_NAMENULL = 422;
/**
 * 未审核通过
 */
const ERR_UNREVIEWED = 423;
/**
 * 超出数量限制
 */
const ERR_EXCEEDNUM = 424;
/**
 * 记录已锁定
 */
const ERR_LOCK = 425;
/**
 * 没有简历
 */
const ERR_NORESUME = 426;
/**
 * 订单已经锁定
 */
const ERR_ORDERLOCK = 427;
/**
 * 库存不足
 */
const ERR_UNDERSTOCK = 428;
/**
 * 余额不足
 */
const ERR_NOTSUFFICIENTFUNDS = 429;
/**
 * 优选券不足
 */
const ERR_NOYOUXUAN = 430;
/**
 * 邀请码错误
 */
const ERR_ERRORYQ = 431;

export function error_code(code: number) {
  let errormsg: string = "服务器忙/未知错误";
  switch (code) {
    case ERROR:
      errormsg = "服务器忙";
      break;
    case SUCCESS_200:
      errormsg = "成功";
      break;
    case SUCCESS_1:
      errormsg = "成功";
      break;
    case SUCCESS_0:
      errormsg = "成功";
      break;
    case ERR_NOLOGIN:
      errormsg = "未登录";
      // window.location.href = `${
      //   window.location.origin
      // }/zfz/kw-admin/system/login?redirectURL=${encodeURIComponent(
      //   window.location.href
      // )}`;
      break;
    case ERR_WRONGPARAMS:
      errormsg = "参数错误";
      break;
    case ERR_NOCMD:
      errormsg = "无效服务";
      break;
    case ERR_NOEXIST:
      errormsg = "无记录";
      break;
    case ERR_NOLV:
      errormsg = "权限不足";
      break;
    case ERR_STATUSCLOSE:
      errormsg = "已下架/关闭";
      break;
    case ERR_NOPID:
      errormsg = "错误的产品ID";
      break;
    case ERR_NOPLANID:
      errormsg = "错误的批次ID";
      break;
    case ERR_NOMAPID:
      errormsg = "未报名";
      break;
    case ERR_NOREPEAT:
      errormsg = "重复操作";
      break;
    case ERR_NOSURE:
      errormsg = "等待确认";
      break;
    case ERR_NOSENDREPEAT:
      errormsg = "已经报名";
      break;
    case ERR_WRONGSMS:
      errormsg = "错误的短信验证码";
      break;
    case ERR_SMSOUTTIME:
      errormsg = "验证码过期";
      break;
    case ERR_UPLOADFIELD:
      errormsg = "上传失败";
      break;
    case ERR_NOSCHOOL:
      errormsg = "校区不存在";
      break;
    case ERR_WRONGWXOPENID:
      errormsg = "OPENID错误";
      break;
    case ERR_REPEAT:
      errormsg = "重复添加";
      break;
    case ERR_NAMENULL:
      errormsg = "名称为空";
      break;
    case ERR_UNREVIEWED:
      errormsg = "未审核通过";
      break;
    case ERR_EXCEEDNUM:
      errormsg = "超出数量限制";
      break;
    case ERR_LOCK:
      errormsg = "记录已锁定";
      break;
    case ERR_NORESUME:
      errormsg = "没有简历";
      break;
    case ERR_ORDERLOCK:
      errormsg = "订单已经锁定";
      break;
    case ERR_UNDERSTOCK:
      errormsg = "库存不足";
      break;
    case ERR_NOTSUFFICIENTFUNDS:
      errormsg = "余额不足";
      break;
    case ERR_NOYOUXUAN:
      errormsg = "优选券不足";
      break;
    case ERR_ERRORYQ:
      errormsg = "邀请码错误";
      break;
    default:
      errormsg = "服务器忙/未知错误";
      break;
  }
  return errormsg;
}

export {
  ERROR,
  SUCCESS_200,
  SUCCESS_1,
  ERR_NOLOGIN,
  ERR_WRONGPARAMS,
  ERR_NOCMD,
  ERR_NOEXIST,
  ERR_NOLV,
  ERR_STATUSCLOSE,
  ERR_NOPID,
  ERR_NOPLANID,
  ERR_NOMAPID,
  ERR_NOREPEAT,
  ERR_NOSURE,
  ERR_NOSENDREPEAT,
  ERR_WRONGSMS,
  ERR_SMSOUTTIME,
  ERR_UPLOADFIELD,
  ERR_NOSCHOOL,
  ERR_WRONGWXOPENID,
};
