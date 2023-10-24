import { message, Modal } from "antd"
import { resolve } from "dns"
import { apiGetClasList, apiGetSchoolList } from "~/api/service"
import AdminConfig from "~/config"
import store from "~/store"
import jobAgeList from "~/mock/home/jobAgeList.json"
import jobEduList from "~/mock/home/jobEduList.json"
import chinaPositionList from "~/utils/chinaPositionList.json"
import { sourceType } from "~/api/service"

const { confirm } = Modal
const user = store.getState().user
/**
 * @description: 根据子集标识符获取父集标识符数组，常用于多级(级联)选择器回显数据，只需用最下层子集数据，即可获取父级数据。饭栗: getParentIdArr(initData, '100101', true) = ['100000', '100100', '100101']
 * @param data 需要处理的数据
 * @param contrastVal 对比值
 * @param isAddThis 是否将对比值传入递归数组
 * @param nowNode 当前节点
 * @param parentNode 父节点
 * @param initData 原始数据
 * @param direction 查找方向
 * @param resultArr 递归数组
 * @return {Array}
 */
export const getParentIdArr = (
  data: any,
  contrastVal: string,
  nowNode: string = "value",
  parentNode: string = "parent",
  initData: any[] = [...data],
  direction: string = "down",
  resultArr: string[] = []
) => {
  if (data && data.length) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i]

      if (item[nowNode] === contrastVal) {
        resultArr.unshift(contrastVal)

        if (item[parentNode] && item[parentNode] > 0) {
          getParentIdArr(initData, item[parentNode], nowNode, parentNode, initData, "up", resultArr)
        }
      } else if (item.children) {
        if (direction === "down") {
          getParentIdArr(item.children, contrastVal, nowNode, parentNode, initData, "up", resultArr)
        } else {
          getParentIdArr(item.children, contrastVal, nowNode, parentNode, initData, "up", resultArr)
        }
      }
    }
  }
  return resultArr
}

const alertMsg = (msg: string = "", title: string = "提示", onOk: Function, onCancel: Function, oktext = "确定", canceltext = "取消", ontype = "danger") => {
  confirm({
    title: title ? title : "提示",
    icon: "<ExclamationCircleOutlined />",
    content: msg ? msg : "",
    okText: oktext ? oktext : "确定",
    okType: "danger",
    cancelText: canceltext,
    onOk() {
      onOk()
    },
    onCancel() {
      onCancel()
    },
  })
}

// /**
//  * @description: 根据用户权限获取校区列表
//  * @param {*}
//  * @return {*}
//  */
// export const getSchoolListByAuth = async () => {
//   let schoollist: any[] = [],
//     user = store.getState().user
//   const res = await apiGetSchoolList({})
//   const list = res.data.list || []
//   if (user.lv >= 3) {
//     schoollist = list
//   } else {
//     switch (parseInt(user.authid + '')) {
//       case 7: //管理员
//         schoollist = list
//         break
//       case 10: //就业老师
//         schoollist = list
//         break
//       default:
//         schoollist = list.filter((s: any) => {
//           return s.schoolid == user.schoolid
//         })
//         break
//     }
//   }
//   return Promise.resolve(schoollist)
// }

// console.log('校区：', await getSchoolListByAuth())

// /**
//  * @description: 根据用户权限获取班级列表
//  * @param {*}
//  * @return {*}
//  */
// export const getClasslListByAuth = async (schoolid: number | string) => {
//   let classlist: any = [],
//     user = store.getState().user
//   const res: any = await apiGetClasList({ schoolid: schoolid })
//   const list: any = res.data.list || []
//   if (user.lv >= 3) {
//     classlist = list
//   } else {
//     switch (parseInt(user.authid + '')) {
//       case 7: //管理员
//         classlist = list
//         break
//       case 10: //就业老师
//         classlist = list
//         break
//       default:
//         classlist = list.filter((s: any) => {
//           return s.classid == user.classid
//         })
//         break
//     }
//   }
//   return Promise.resolve(classlist)
// }

/**
 * @description: 获取当前校区域名
 * @param {*}
 * @return {*}
 */
export const getSchoolOriginName = () => {
  const SchoolOriginName = location.origin.includes("localhost:") ? "http://124.70.199.68" : location.origin
  return SchoolOriginName
}

/**
 * @description: 通过时间戳计算分钟时长
 * @param {number} timestamp 秒
 * @return {*}
 */
export const getPlayDuration = (timestamp: number) => {
  let minute = Math.floor(timestamp / 60)
  let second = timestamp % 60
  return `${minute}分${second}秒`
}

/**
 * @description: 获取时间显示
 * @param {any} timestamp 时间戳(毫秒)
 * @param {string} isDate 显示需求
 * @return {*} 结果
 */
const getDateAll = function (timestamp: number, isDate: string) {
  let date: any
  let output: any
  timestamp > 0 ? (date = new Date(timestamp)) : (date = new Date())
  let y: any = date.getFullYear()
  let m: any = date.getMonth() + 1
  let d: any = date.getDate()
  let h: any = date.getHours()
  let f: any = date.getMinutes()
  let s: any = date.getSeconds()

  if (m < 10) {
    m = `0${m}`
  }
  if (d < 10) {
    d = `0${d}`
  }
  if (h < 10) {
    h = `0${h}`
  }
  if (f < 10) {
    f = `0${f}`
  }
  if (s < 10) {
    s = `0${s}`
  }

  switch (isDate) {
    case "y-m-d 时:分:秒":
      output = `${y}-${m}-${d} ${h}:${f}:${s}`
      break
    case "y-m-d 时:分":
      output = `${y}-${m}-${d} ${h}:${f}`
      break
    case "y-m-d 时":
      output = `${y}-${m}-${d} ${h}`
      break
    case "y-m-d":
      output = `${y}-${m}-${d}`
      break
    case "m-d":
      output = `${m}-${d}`
      break
    case "m-d 时:分:秒":
      output = `${m}-${d} ${h}:${f}:${s}`
      break
    case "m-d 时:分":
      output = `${m}-${d} ${h}:${f}`
      break
    case "y年m月d日 时:分:秒":
      output = `${y}年${m}月${d}日 ${h}:${f}:${s}`
      break
    case "y年m月d日 时:分":
      output = `${y}年${m}月${d}日 ${h}:${f}`
      break
    case "y年m月d日 时":
      output = `${y}年${m}月${d}日 ${h}`
      break
    case "y年m月d日":
      output = `${y}年${m}月${d}日`
      break
    case "y年m月":
      output = `${y}年${m}月`
      break
    case "m月d日":
      output = `${m}月${d}日`
      break
    case "时:分:秒":
      output = `${h}:${f}:${s}`
      break
    case "时:分":
      output = `${h}:${f}`
      break
    case "分:秒":
      output = `${f}:${s}`
      break
    case "ymd":
      output = `${y}${m}${d}`
      break
    default:
      output = `${y}-${m}-${d} ${h}:${f}:${s}`
      break
  }

  return output
}

/**
 * @description: 数组去重
 * @param {any} arr
 * @return {*}
 */
export const arrayUnique = (arr: any[]) => {
  // console.log('arr', arr)
  // const NewArr = []
  // for (let i = 0; i < arr.length; i++) {
  //   const Item = arr[i]
  //   NewArr.push({ id: Item.id && Item.id, icloud_gid: Item.icloud_gid && Item.icloud_gid, fname: Item.fname || Item.name || Item.title })
  // }
  // console.log('NewArr', NewArr)
  const NewArr = arr
  return Array.from(new Set(NewArr.map(t => JSON.stringify(t)))).map(s => JSON.parse(s))
}

/**
 * 获取当月第一天|最后一天|下月第一天 的时间戳(毫秒)
 * @param t
 * @returns
 */
const getMonthDayTime = (t: string, type: string) => {
  let date, y, m
  date = t ? new Date(t) : new Date()
  y = date.getFullYear()
  m = date.getMonth()

  if (type === "first") {
    return new Date(y, m, 1).getTime()
  } else if (type === "last") {
    return new Date(y, m + 1, 0).getTime()
  } else if (type === "next") {
    return new Date(y, m + 1, 1).getTime()
  } else {
    return new Date(y, m, 1).getTime()
  }
}

/**
 * 获取当月第一天时间戳
 * @param t
 * @returns
 */
const getMonthFirstDay = (t: string) => {
  if (!t) t = new Date().getFullYear() + "-" + new Date().getMonth()
  return Math.floor(new Date(new Date(t + "-01").toLocaleDateString()).getTime() / 1000)
}

/**
 * 获取当天某时时间戳
 * @param value 标准时间
 * @param s 当天某时
 * @returns
 */
const getTodayTime = (value: string | null, s: number) => {
  const t: number = value
    ? Math.floor(new Date(new Date(value).toLocaleDateString()).getTime() / 1000)
    : Math.floor(new Date(new Date().toLocaleDateString()).getTime() / 1000)
  return s === 24 ? t + s * 3600 - 1 : t + s * 3600
}

/**
 * @description: 手机号隐藏
 * @param {string} numStr
 * @return {*} 结果
 */
const phoneNumHide = (numStr: string) => {
  let output = !numStr ? "" : numStr.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
  return output
}

const formatSeconds = (value: any) => {
  let result = parseInt(value)
  let h = Math.floor(result / 3600) < 10 ? "0" + Math.floor(result / 3600) : Math.floor(result / 3600)
  let m = Math.floor((result / 60) % 60) < 10 ? "0" + Math.floor((result / 60) % 60) : Math.floor((result / 60) % 60)
  let s = Math.floor(result % 60) < 10 ? "0" + Math.floor(result % 60) : Math.floor(result % 60)

  let res = ""
  if (h !== "00") res += `${h}h`
  if (m !== "00") res += `${m}min`
  res += `${s}s`
  return res
}

/**
 * @description: 打分规则纠正
 * @param {any} mark 待纠正的打分
 * @return {*} 成品分数
 */
const markCorrect = (mark: any) => {
  mark = mark || "0"
  // return Math.abs((mark.toString().replace(/^(-)/, '') > 100 ? '100' : mark.toString().replace(/^(-)/, '')) * 1).toFixed(0)
  return mark.toString().replace(/^(-)/, "") >= 100 ? "100.00" : (mark.toString().replace(/^(-)/, "") * 1).toFixed(2).toString().replace(/\.00/, "") // 保留两位小数
}

/**
 * @description: 获取文件格式
 * @param {string} fileStr
 * @return {*} 文件格式
 */
const fileTypeMatching = (fileStr: string) => {
  return fileStr.replace(/.+\./, "")
}

/**
 * @description: 文件类型操作
 * @param {string} fileUrl
 * @return {*}
 */
const fileTypeAction = (fileUrl: string) => {
  console.log(fileUrl)
  const fileType = fileTypeMatching(fileUrl).toLowerCase()
  // if (fileType === 'zip') {
  // zip预览
  // `${AdminConfig.API_URL}/clsc/webedu/Connect/zip_see?uid=2072&zipadr=${AdminConfig.API_URL}/clsc/webedu/uploadplan/work/2072_1639966122.zip`
  // }
  if (fileType === "rar" || fileType === "7z" || fileType === "zip") {
    window.open(fileUrl)
  } else if (
    fileType === "txt" ||
    fileType === "scss" ||
    fileType === "less" ||
    fileType === "ejs" ||
    fileType === "css" ||
    fileType === "php" ||
    fileType === "js" ||
    fileType === "java" ||
    fileType === "cs" ||
    fileType === "asp" ||
    fileType === "aspx" ||
    fileType === "html" ||
    fileType === "htm"
  ) {
    window.open(`${AdminConfig.API_URL}/clsc/webedu/Connect/getfileinfo?url=${fileUrl}`)
  } else {
    window.open(fileUrl)
  }
}

/**
 * 导出CSV表格数据
 */
const downLoadcsv = (data: any, title: string) => {
  let eleLink = document.createElement("a")
  eleLink.download = (title ? title : "") + new Date().toLocaleDateString() + ".csv"

  eleLink.style.display = "none"
  // 字符内容转变成blob地址
  let blob = new Blob([data], { type: "text/csv" })
  eleLink.href = URL.createObjectURL(blob)
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}

const _keyStr: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
// public method for encoding
const base64_encode = (input: string) => {
  let output = ""
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4
  let i = 0
  input = _utf8_encode(input)
  while (i < input.length) {
    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)
    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63
    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }
    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
  }
  return output
}
// public method for decoding
const base64_decode = (input: string) => {
  let output = ""
  let chr1, chr2, chr3
  let enc1, enc2, enc3, enc4
  let i = 0
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "")
  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++))
    enc2 = _keyStr.indexOf(input.charAt(i++))
    enc3 = _keyStr.indexOf(input.charAt(i++))
    enc4 = _keyStr.indexOf(input.charAt(i++))
    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4
    output = output + String.fromCharCode(chr1)
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2)
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3)
    }
  }
  output = _utf8_decode(output)
  return output
}
// private method for UTF-8 encoding
const _utf8_encode = (string: string) => {
  string = string.replace(/\r\n/g, "\n")
  let utftext = ""
  for (let n = 0; n < string.length; n++) {
    let c = string.charCodeAt(n)
    if (c < 128) {
      utftext += String.fromCharCode(c)
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192)
      utftext += String.fromCharCode((c & 63) | 128)
    } else {
      utftext += String.fromCharCode((c >> 12) | 224)
      utftext += String.fromCharCode(((c >> 6) & 63) | 128)
      utftext += String.fromCharCode((c & 63) | 128)
    }
  }
  return utftext
}
// private method for UTF-8 decoding
const _utf8_decode = (utftext: string) => {
  let string = ""
  let i = 0
  let c = 0
  let c1 = 0
  let c2 = 0
  let c3 = 0
  while (i < utftext.length) {
    c = utftext.charCodeAt(i)
    if (c < 128) {
      string += String.fromCharCode(c)
      i++
    } else if (c > 191 && c < 224) {
      c2 = utftext.charCodeAt(i + 1)
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
      i += 2
    } else {
      c2 = utftext.charCodeAt(i + 1)
      c3 = utftext.charCodeAt(i + 2)
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
      i += 3
    }
  }
  return string
}

/**
 * @description: 正则去除image标签
 * @param str
 * @return {*} 去除结果
 */
const removeImageTag = (str: string) => {
  return str.replace(/<img.*?>/g, "[图片]")
}

// 正则去除标签内样式
const removeStyle = (str: string) => {
  return str.replace(/style=".*?"/g, "")
}

/**
 * @description: 正则提取第一个image标签src
 * @param str
 * @return {*} 提取结果
 */
const getImageSrc = (str: string) => {
  const reg = /<img.*?src="(.*?)"/
  const result = str.match(reg)
  if (result && result.length > 1) {
    return result[1]
  }
  return result
}

/**
 * @description: 去除html所有标签与样式
 * @param str
 * @return {*} 去除结果
 */
const removeHtmlTag = (str: string) => {
  return removeStyle(str).replace(/<\/?.+?\/?>/g, "")
}

/**
 * @description: 正则替换超长隐藏
 * @param str
 * @return {*} 提取结果
 */
const getLessinfo = (str: string, len: number = 150, is: boolean = true) => {
  let result = ""
  let cont = removeHtmlTag(removeImageTag(str))
  if (cont.length > len && is) {
    result = cont.substr(0, len) + "..."
  } else {
    result = cont
  }
  console.log(result)
  return result
}
/**
 * 获取工作经验label
 * @param value
 * @returns
 */
const getJobageLabel = (value: string) => {
  return jobAgeList.filter(item => {
    return item.value === value
  })[0]?.label
}

/**
 * 获取学历要求label
 * @param value
 * @returns
 */
const getJobeduLabel = (value: string) => {
  return jobEduList.filter(item => {
    return item.value === value
  })[0]?.label
}

/**
 *
 */
const getPostCh = (namestr: string) => {
  // if (!namestr) return ''
  // console.log(namestr);

  let post: string = ""
  let namearr: any[] = namestr.split(",")
  // console.log(namearr);
  if (namearr[0]) {
    let s1: any[], s2: any[], s3: any[]
    s1 = chinaPositionList.filter((item: any) => {
      return item.value == namearr[0]
    })
    post += s1[0] ? s1[0].label : ""

    if (namearr[1]) {
      s2 = s1[0].children.filter((item1: any) => {
        return item1.value == namearr[1]
      })

      post += s2[0] ? "/" + s2[0].label : ""

      if (namearr[2]) {
        s3 = s2[0].children.filter((item2: any) => {
          return item2.value == namearr[2]
        })

        post += s3[0] ? "/" + s3[0].label : ""
      }
    }
  }
  return post
}
// const typelist:any = {}
// const GetTypeNameString = (id:string)=>{
//   if(!typelist.list){
//     sourceType({})
//     .then((res:any) =>{
//       typelist.list=res.data
//       let object:any={}
//       object=findtype(typelist.list,object)
//       console.log(object);
//       console.log(id);
//       return  Promise.resolve(object[id]?.label)
//     })
//   }

// }

const findtype = (list: Array<any>, obj: any) => {
  list.map((item: any) => {
    obj[item.value] = item
    if (item.children && item.children.length > 0) {
      findtype(item.children, obj)
    }
  })
  return obj
}

//管理员权限验证
const userpermissions = (lv: number) => {
  if (user.lv < lv) {
    message.warning("暂无权限，请联系超级管理员")
    throw ""
  }
}
const userlv = (text: any) => {
  return text == "0"
    ? "普通用户"
    : text == "1"
      ? "一级经销商"
      : text == "2"
        ? "二级经销商"
        : text == "3"
          ? "三级经销商"
          : text == "4"
            ? "四级经销商"
            : text == "5"
              ? "五级经销商"
              : text == "6"
                ? "六级经销商"
                : text == "7"
                  ? "七级经销商"
                  : text == "8"
                    ? "八级经销商"
                    : text == "9"
                      ? "九级经销商"
                      : ""
}

/**
 * @description: 设置Head图标
 * @return {type}
 */
export const setHeadFavicon = (url: string) => {
  const favicon: any = document.querySelector('link[rel="icon"]')
  if (favicon) {
    favicon.href = url
  } else {
    const newFavicon = document.createElement("link")
    newFavicon.rel = "icon"
    newFavicon.href = url
    document.head.appendChild(newFavicon)
  }
}

/**
 * @description: 递归查数据
 * @param {any} arr 被查询的数据
 * @param {any} aid 数据中被查询的唯一标识
 * @param {any} id 需要的数据的唯一标识
 * @return {*}
 */
const DataQuery = (arr: any, aid: any, id: any) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].aid === id) {
      return arr[i];
    } else if (arr[i].children && arr[i].children.length > 0) {
      const result: any = DataQuery(arr[i].children, aid, id);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

export {
  base64_encode,
  base64_decode,
  downLoadcsv,
  getDateAll,
  getMonthFirstDay,
  getMonthDayTime,
  getTodayTime,
  phoneNumHide,
  formatSeconds,
  alertMsg,
  markCorrect,
  fileTypeMatching,
  fileTypeAction,
  removeImageTag,
  removeStyle,
  getImageSrc,
  removeHtmlTag,
  getLessinfo,
  getJobageLabel,
  getJobeduLabel,
  getPostCh,
  findtype,
  userpermissions,
  userlv,
  DataQuery,
}
