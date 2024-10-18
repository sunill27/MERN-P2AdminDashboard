import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import {
  deleteProduct,
  fetchProducts,
  setDeleteProduct,
} from '../../store/dataSlice';

const TableTwo = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.data);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
    dispatch(setDeleteProduct({ productId: id }));
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Product Image</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 hidden md:flex items-center">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stocks</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Created At</p>
        </div>
      </div>

      {products.length > 0 &&
        products.map((product, key) => (
          <div
            className="grid grid-cols-12 border-t border-stroke py-4 px-4 dark:border-strokedark sm:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-2 flex items-center">
              <div className="h-12 w-12 rounded-md overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt="Product"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {product.productName}
              </p>
            </div>
            <div className="col-span-2 hidden md:flex items-center">
              <p className="text-sm text-black dark:text-white">
                {product?.Category?.categoryName}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">
                ${product.productPrice}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {product.productStock}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-meta-3">{product.createdAt}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TableTwo;
