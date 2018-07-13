import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
import styles from './products.css'


const Products = ({dispatch}) => {
    function handleDelete(id) {
        dispatch({
            type: 'products/delete',
            payload: id
        })
    }
    return (
        <div className={styles.wrapper}>
            <h2>List of Products</h2>
            <ProductList onDelete={handleDelete}/>
        </div>
    )
}


export default connect()(Products);