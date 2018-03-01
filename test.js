/**
 * @file tese.js  单测
 * @author chenjiufu@baidu.com
 */
import * as m from './mUnit.js';
import {expect} from 'chai';


describe('清除标点测试', function () {
    it('"今天是，星期天。" => "今天是星期天"', function () {
        expect(m.clearString('今天是，星期天。').trim()).to.equal('今天是星期天');
    });
});



describe('重排数组测试', function () {
    let a = m.upsetArr([1, 2, 3, 4]);
    it('[1,2,3,4] => [' + a + ']', function () {
        expect(a).to.not.equal([1, 2, 3, 4]);
    });
});



describe('从数组中随机获取元素测试', function () {
    let a = m.randomOne([5, 2, 3, 4]);
    it('[1,2,3,4]随机取一个元素 => ' + a, function () {
        expect([5, 2, 3, 4]).include(a);
    });
});

describe('数组中获取最大值测试', function () {
    let a = m.maxArr([5, 2, 3, 4]);
    it('[5,2,3,4]随机取一个元素 => ' + a, function () {
        expect(a).to.equal(5);
    });
});

describe('数组求和测试', function () {
    let a = m.sumArr([5, 2, 3, 4]);
    it('[5,2,3,4]各元素之和 => ' + a, function () {
        expect(a).to.equal(14);
    });
});



describe('数组拍扁测试', function () {
    it('[5, [2, 3, [2, 3]], 3, 4] => [5, 2, 3, 2, 3, 3, 4]', function () {
        expect(m.steamroller([5, [2, 3, [2, 3]], 3, 4]).length).to.equal(7);
    });
});



describe('类型判断测试', function () {
    it('[] => "array"', function () {
        expect(m.istype([], 'array')).to.equal(true);
    });
});

describe('现金额大写转换函数测试', function () {
    it('123 => "人民币壹佰贰拾叁元整"', function () {
        expect(m.upDigit(123)).to.equal('人民币壹佰贰拾叁元整');
    });
});

describe('随机返回一个范围的数字测试', function () {
    it('randomNumber(5,10)', function () {
        expect(5 <= m.randomNumber(5, 10) <= 10).to.equal(true);
    });
});

describe('到某一个时间的倒计时测试', function () {
    it('getEndTime("2018/3/10 16:0:0")', function () {
        let startDate = new Date();
        let endDate = new Date('2018/3/10 16:0:0');
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
        expect(m.getEndTime('2018/3/10 16:0:0')).to.equal({d: d, h: h, m: m, s: s});
    });
});

describe('大小写转换测试1', function () {
    it('changeCase("sasas",1)', function () {
        expect(m.changeCase('sasas', 1)).to.equal('Sasas');
    });
});

describe('大小写转换测试2', function () {
    it('changeCase("sas as",2)', function () {
        expect(m.changeCase('sas as', 1)).to.equal('Sas As');
    });
});

describe('大小写转换测试3', function () {
    it('changeCase("saS as",3)', function () {
        expect(m.changeCase('saS as', 3)).to.equal('SAs AS');
    });
});

describe('大小写转换测试4', function () {
    it('changeCase("saS as",4)', function () {
        expect(m.changeCase('saS as', 4)).to.equal('SAS AS');
    });
});

describe('大小写转换测试5', function () {
    it('changeCase("saS as",5)', function () {
        expect(m.changeCase('saS as', 5)).to.equal('sas as');
    });
});
