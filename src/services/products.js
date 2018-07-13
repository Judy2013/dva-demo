import request from '../utils/request';
import CONSTANTS from '../constants'

export function getProductList(page) {
    return request(`/api/products/getList?_page=${page}&_limit=${CONSTANTS.PAGE_SIZE}`);
}