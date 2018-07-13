import React from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'qs';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import CONSTANTS from '../constants'

const ProductList = ({ dispatch, onDelete, list: datasource, loading, total, page: current }) => {
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
                    <Popconfirm title='title?' onConfirm={() => onDelete(record.id)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                )
            }
        }
    ]
    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/products',
            search: stringify({ page })
        }))
    }
    return (
        <div>
            <Table
                dataSource={datasource}
                columns={columns}
                loading={loading}
                rowKey={record => record.id}
            />
            <Pagination
            className="ant-table-pagination"
            total={total}
            current={current}
            pageSize={CONSTANTS.PAGE_SIZE}
            onChange={pageChangeHandler}
            />
        </div>
    )
}

ProductList.propTypes = {
    onDelete: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    const { list, total, page } = state.products
    return {
        list,
        total,
        page,
        loading: state.loading.models.products
    }
}
export default connect(mapStateToProps)(ProductList);