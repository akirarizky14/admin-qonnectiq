import React from 'react'
import TableCategories from './TableCategories'
import TableCourse from './TableCourse'

function Product() {
  return (
    <div className="container-product">
        <div className="wrapper-product">
            <div className="table-categories">
                <TableCategories/>
                <TableCourse/>
            </div>
        </div>
    </div>
  )
}

export default Product