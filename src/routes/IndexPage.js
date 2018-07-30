import React, { PureComponent } from 'react';
import styles from './IndexPage.css';

export default class IndexPage extends PureComponent{
  render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li><a href="/products">ProductList</a></li>
        </ul>
      </div>
    )
  }
}
