import React from 'react'
import TableCategories from './TableCategories'

function Product() {
  return (
    <div className="container-product">
        <div className="wrapper-product">
            <div className="table-categories">
                <h1>Table Categories</h1>
                <TableCategories/>
            </div>
        </div>
    </div>
  )
}

export default Product