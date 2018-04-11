export interface config {
    client: string; // 项目上报id
    imgUrl: string; // 请求url
    level: Number; // 等级
    repeat: Number; // 重复上报次数
    ignore: Array<RegExp | Function>; // 过滤条件
}