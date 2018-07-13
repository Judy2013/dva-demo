import * as Api from '../services/products';
import queryString from 'query-string';

export default {
    namespace: 'products',
    state: {
        list: [],
        total: null,
        page: null
    },
    effects: {
        *query({ payload: {page = 1} }, { call, put }) {
            try {
                const { data } = yield call(Api.getProductList, page)
                yield put({
                    type: 'save', 
                    payload: { 
                        data, 
                        page: parseInt(page, 10), 
                        total: parseInt(data.length, 10)
                    }
                })
            } catch (error) {
                console.log('errpr', error)
            }
        }
    },
    reducers: {
        save(state, { payload: { data: list, page, total } }) {
            return {...state, list, total, page};
        },
        'delete'(state, { payload: id }) {
            return state.filter(item => item.id !== id);
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, search }) => {
                if (pathname === '/products') {
                    const query = queryString.parse(search);
                    dispatch({
                        type: 'query',
                        payload: query
                    })
                }
            })
        }
    }
}