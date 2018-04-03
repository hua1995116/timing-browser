export interface config {
    pid: string; // 项目上报id
    url: string; // 请求url
    level: Number; // 等级
    repeat: Number; // 重复上报次数
    ignore: Array<RegExp | Function>; // 过滤条件
}