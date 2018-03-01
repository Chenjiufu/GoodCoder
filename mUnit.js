/**
 * @file   mUnit.js 常用方法
 * @author chenjiufu@baidu.com
 */

/**
 * 存储localStorage
 *
 * @param {string} name     key值
 * @param {string} content  内容
 */
export const setStore = (name, content) => {
    if (!name) {
        return;
    }

    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
};

/**
 * 清除标点符号
 *
 * @param  {string} s  字符串
 * @return {string}    返回清除后的结果
 */
export const clearString = s => {
    let pattern = new RegExp('[:;,；："`”“ ！。，、？]');
    let rs = '';
    for (let i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
};

/**
 * 数组最大值
 *
 * @param {Array} arr 数组
 * @return {number} 返回最大值
 */
export const maxArr = arr =>
    Math.max.apply(null, arr);

/**
 * 获取localStorage
 *
 * @param {string}  name  key值
 * @return {string} 返回key所对应的值
 */
export const getStore = name => {
    if (!name) {
        return;
    }
    return window.localStorage.getItem(name);
};

/**
 * 获取query
 *
 * @param  {string} name queryName 需要获取query的key值
 * @return {string} 返回传入query所对应的值
 */
export const getQueryStringByName = name => {
    let result = document.URL.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
    if (result == null || result.length < 1) {
        return '';
    }
    return result[1];
};

/**
 * 删除localStorage
 *
 * @param {string} name 需要删除的key
 */
export const removeStore = name => {
    if (!name) {
        return;
    }
    window.localStorage.removeItem(name);
};

/**
 *  getStyle 获取样式
 *
 *  @param  {Object}   element               元素对象
 *  @param  {string}   attr                  属性
 *  @param  {string}   NumberMode = 'int'    模式
 *  @return {number}   属性的值
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    }
    else if (element.currentStyle) {
        target = element.currentStyle[attr];
    }
    else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    // 在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode === 'float' ? parseFloat(target) : parseInt(target, 0);
};


/**
 * 打乱数组
 *
 * @param  {Array} arr 目标数组
 * @return {Array}     重排后的数组
 */
export const upsetArr = arr => {
    let length = arr.length;
    let i;
    let index;
    let temp;
    for (i = 1; i <= length; i++) {
        // 产生随机数
        index = parseInt(Math.random() * (length - i), 0) + i;
        if (index !== i) {
            temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }
    return arr;
};



/**
 * 从数组中随机获取元素
 *
 * @param  {Array} arr 目标数组
 * @return {Array} 随机获取的元素组成的数组
 */
export const randomOne = arr =>
    arr[Math.floor(Math.random() * arr.length)];

/**
 * 数组求和
 *
 * @param  {Array} arr 目标数组
 * @return {number} 返回和
 */
export const sumArr = arr =>
    arr.reduce((pre, cur) => pre + cur);

/**
 * 数组扁平化
 *
 * @param  {Array} arr 目标数组
 * @return {Array} 新数组
 */
export const steamroller = arr => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            // 如果是数组，调用(递归)steamroller 将其扁平化
            // 然后再 push 到 newArr 中
            newArr.push.apply(newArr, steamroller(arr[i]));
        }
        else {
            // 不是数组直接 push 到 newArr 中
            newArr.push(arr[i]);
        }
    }
    return newArr;
};

/**
 * 手机类型判断
 *
 * @param  {string} type 手机类型
 * @return {string |boolean}      返回true 或 false 或 ua信息
 */
export const browserInfo = type => {
    switch (type) {
        case 'android':
            return navigator.userAgent.toLowerCase().indexOf('android') !== -1;
        case 'iphone':
            return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
        case 'ipad':
            return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;
        case 'weixin':
            return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
        default:
            return navigator.userAgent.toLowerCase();
    }
};

/**
 * 类型判断
 *
 * @param {*} o     需要判断的对象
 * @param {*} type  类型
 */

export const istype = (o, type) => {
    switch (type.toLowerCase()) {
        case 'string':
            return Object.prototype.toString.call(o) === '[object String]';
        case 'number':
            return Object.prototype.toString.call(o) === '[object Number]';
        case 'boolean':
            return Object.prototype.toString.call(o) === '[object Boolean]';
        case 'undefined':
            return Object.prototype.toString.call(o) === '[object Undefined]';
        case 'null':
            return Object.prototype.toString.call(o) === '[object Null]';
        case 'function':
            return Object.prototype.toString.call(o) === '[object Function]';
        case 'array':
            return Object.prototype.toString.call(o) === '[object Array]';
        case 'object':
            return Object.prototype.toString.call(o) === '[object Object]';
        case 'nan':
            return isNaN(o);
        case 'elements':
            return Object.prototype.toString.call(o).indexOf('HTML') !== -1;
        default:
            return Object.prototype.toString.call(o);
    }
};


/**
 * 现金额大写转换函数
 *
 * @param  {number} n  金额
 * @return {string}    大写中文
 */
export const upDigit = n => {
    let fraction = ['角', '分', '厘'];
    let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    let unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    let head = n < 0 ? '欠人民币' : '人民币';
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        // s = p + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
};


/**
 * 设置cookie
 *
 * @param {string} name  key名
 * @param {string} value 值
 * @param {string} iDay  过期时间
 */
export const setCookie = (name, value, iDay) => {
    let oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
};

/**
 * 获取cookie
 *
 * @param  {string} name key名
 * @return {sting}       返回key名对应的值
 */
export const getCookie = name => {
    let arr = document.cookie.split('; ');
    let arr2;
    for (let i = 0; i < arr.length; i++) {
        arr2 = arr[i].split('=');
        if (arr2[0] === name) {
            return arr2[1];
        }
    }
    return '';
};

/**
 * 删除cookie
 *
 * @param {string} name key名
 */
export const removeCookie = name => {
    setCookie(name, 1, -1);
};

/**
 * 随机返回一个范围的数字
 *
 * @param  {number} n1 起始数字
 * @param  {number} n2 结束数字
 * @return {number} 返回区间数字
 */
export const randomNumber = (n1, n2) => {
    // randomNumber(5,10)
    // 返回5-10的随机整数，包括5，10
    if (arguments.length === 2) {
        return Math.round(n1 + Math.random() * (n2 - n1));
    }
    // randomNumber(10)
    // 返回0-10的随机整数，包括0，10
    else if (arguments.length === 1) {
        return Math.round(Math.random() * n1);
    }
    // randomNumber()
    // 返回0-255的随机整数，包括0，255
    return Math.round(Math.random() * 255);
};

/**
 * 到某一个时间的倒计时
 *
 * @param  {string}    endTime 到某一个时间
 * @return {Objective}         返回{d,h,m,s} => "d天h小时m分钟s秒"
 */
export const getEndTime = endTime => {
    // 开始时间，当前时间
    let startDate = new Date();
    // 结束时间，需传入时间参数
    let endDate = new Date(endTime);
    // 时间差的毫秒数
    let t = endDate.getTime() - startDate.getTime();
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return {d, h, m, s};
};

/**
 *  大小写转换
 *
 * @param  {string} str  需要转换的字符串
 * @param  {number} type 1:首字母大写;2：首字母小写;3：大小写转换;4：全部大写;5：全部小写;
 * @return {string} 转换后结果
 */
export const changeCase = (str, type) => {
    const toggleCase = str => {
        let itemText = '';
        str.split('').forEach(item => {
            if (/^([a-z]+)/.test(item)) {
                itemText += item.toUpperCase();
            }
            else if (/^([A-Z]+)/.test(item)) {
                itemText += item.toLowerCase();
            }
            else {
                itemText += item;
            }
        });
        return itemText;
    };

    switch (type) {
        case 1:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

            });
        case 2:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case 3:
            return toggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
};
