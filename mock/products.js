import Mock from 'mockjs';

export default {
    getList:Mock.mock({
        code:"0000",
        'data|10': [{
            'id|+1': '@guid',
            'name':'@cname',
            'email':'@email',
            'adress':'@city(true)',
            'zip':'@zip'
        }],
        total:58
    })
}