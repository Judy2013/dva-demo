import request from '../utils/request';

export async function getProductList(query) {
    return request(`/api/products/getList?current=${query.current}&size=${query.size}`);
}