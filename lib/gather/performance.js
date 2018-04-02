function performance() {
    const timing_data = ["", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "", "domInteractive", "", "domContentLoadedEventEnd", "", "loadEventStart", "", "msFirstPaint", "secureConnectionStart"];
    const data = {
        dns: [3, 2], // DNS 解析耗时
        tcp: [5, 4], // TCP 连接耗时
        ssl: [5, 17], // SSL 安全连接耗时
        ttfb: [7, 6], // Time to First Byte（TTFB），网络请求耗时
        trans: [8, 7], // 数据传输耗时
        dom: [10, 8], // DOM 解析耗时
        res: [14, 12], // 资源加载耗时
        firstbyte: [7, 2],// 首包时间
        fpt: [8, 1], // First Paint Time, 首次渲染时间 / 白屏时间
        tti: [10, 1], // Time to Interact，首次可交互时间
        ready: [12, 1], // 	HTML 加载完成时间， 即 DOM Ready 时间
        load: [14, 1] //	页面完全加载时间
    }
    const getData = {};
    const performance = window.performance ||  window.msPerformance || window.webkitPerformance;
    const timing = performance.timing;
    Object.keys(data).map((item) => {
        const firstParams = timing[timing_data[data[item][0]]];
        const secondParams = timing[timing_data[data[item][1]]];
        const value = Math.round(firstParams - secondParams);
        value >= 0 && value< 36e5 && (getData[item] = value);
    });
    return getData;
}

export default performance;