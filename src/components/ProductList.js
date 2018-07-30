import React from 'react';
import { stringify } from 'qs';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({ dispatch, records: datasource, loading, total, current }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Address',
            dataIndex: 'adress'
        },
        {
            title: 'Actions',
            render: (text, record) => {
                return (
                    <Popconfirm title='title?' onConfirm={() => handleDelete(record.id)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                )
            }
        }
    ]
    function pageChangeHandler(current) {
        dispatch(routerRedux.push({
            pathname: '/products',
            search: stringify({ current })
        }))
    }
    function handleDelete(id) {
        dispatch({
            type: 'products/delete',
            payload: id
        })
    }
    const paginationObj = {
        total,
        current,
        onChange: pageChangeHandler
    }
    return (
        <div>
            <Table
                pagination={paginationObj}
                dataSource={datasource}
                columns={columns}
                loading={loading}
                rowKey={record => record.id}
            />
        </div>
    )
}

ProductList.propTypes = {
}

const mapStateToProps = (state) => {
    const { records, total, current } = state.products
    return {
        records,
        total,
        current,
        loading: state.loading.models.products
    }
}
export default connect(mapStateToProps)(ProductList);