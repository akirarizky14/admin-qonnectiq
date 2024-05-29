import React from 'react'
import Table_Categories from './Table_Categories'

function Product() {
  return (
    <div className="container-product">
        <div className="wrapper-product">
            <div className="table-categories">
                <h1>Table Categories</h1>
                
                <Table_Categories/>
            </div>
        </div>
    </div>
  )
}

export default Product