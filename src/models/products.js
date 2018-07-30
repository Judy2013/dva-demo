import * as Api from '../services/products';
import queryString from 'query-string';
import CONSTANTS from '../constants'

export default {
    namespace: 'products',
    state: {
        records: [],
        total: null,
        size: null,
        current: null
    },
    effects: {
        *query({ payload: {current = 1, size = CONSTANTS.PAGE_SIZE} }, { call, put }) {
            try {
                const { records, total } = yield call(Api.getProductList, {current, size})
                yield put({
                    type: 'save', 
                    payload: { 
                        records: records || [], 
                        size,
                        current: parseInt(current, 10), 
                        total
                    }
                })
            } catch (error) {
                console.log('errpr', error)
            }
        }
    },
    reducers: {
        save(state, { payload: { records, current, total, size } }) {
            return {...state, records, total, current, size};
        },
        'delete'(state, { payload: id }) {
            if(!id) return;
            const records = state.records.filter(item => item.id !== id)
            state.records = [...records];
            return {...state};
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, search }) => {
                if (pathname === '/products') {
                    const query = queryString.parse(search);
                    dispatch({
                        type: 'query',
                        payload: query || {
                            current: 1,
                            size: 10
                        }
                    })
                }
            })
        }
    }
}