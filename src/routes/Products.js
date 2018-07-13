import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
import styles from './products.css'


const Products = () => {
    return (
        <div className={styles.wrapper}>
            <h2>List of Products</h2>
            <ProductList/>
        </div>
    )
}


export default connect()(Products);