import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Category,
  InitialState,
  OrderData,
  Product,
  User,
} from '../types/data';
import { Status } from '../types/status';
import { AppDispatch } from './store';
import { APIAuthenticated } from '../http';

const initialState: InitialState = {
  orders: [],
  products: [],
  users: [],
  categories: [],
  status: Status.LOADING,
  singleProduct: null,
};

interface DeleteProduct {
  productId: string;
}
interface DeleteUser {
  userId: string;
}
interface DeleteOrder {
  orderId: string;
}
interface DeleteCategory {
  categoryId: string;
}

export interface AddProduct {
  productName: string;
  productDescription: string;
  productPrice: number;
  productStock: number;
  image: null;
  categoryId: string;
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setStatus(state: InitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setProduct(state: InitialState, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setOrders(state: InitialState, action: PayloadAction<OrderData[]>) {
      state.orders = action.payload;
    },
    setCategories(state: InitialState, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    setUsers(state: InitialState, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setSingleProduct(state: InitialState, action: PayloadAction<Product>) {
      state.singleProduct = action.payload;
    },
    setDeleteProduct(
      state: InitialState,
      action: PayloadAction<DeleteProduct>,
    ) {
      const index = state.products.findIndex(
        (item) => (item.id = action.payload.productId),
      );
      state.products.splice(index, 1);
    },
    setDeleteOrder(state: InitialState, action: PayloadAction<DeleteOrder>) {
      const index = state.orders.findIndex(
        (item) => (item.id = action.payload.orderId),
      );
      state.orders.splice(index, 1);
    },
    setDeleteUser(state: InitialState, action: PayloadAction<DeleteUser>) {
      const index = state.users.findIndex(
        (item) => (item.id = action.payload.userId),
      );
      state.users.splice(index, 1);
    },
    setDeleteCategory(
      state: InitialState,
      action: PayloadAction<DeleteCategory>,
    ) {
      const index = state.users.findIndex(
        (item) => (item.id = action.payload.categoryId),
      );
      state.categories.splice(index, 1);
    },
  },
});

export const {
  setStatus,
  setProduct,
  setOrders,
  setUsers,
  setCategories,
  setDeleteCategory,
  setSingleProduct,
  setDeleteProduct,
  setDeleteOrder,
  setDeleteUser,
} = dataSlice.actions;
export default dataSlice.reducer;

//To fetch products:
export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get('admin/product');
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProduct(data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//To fetch orders:
export function fetchOrders() {
  return async function fetchOrdersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get('/order');

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setOrders(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//To order item:
// export function orderItem() {
//   return async function orderItemThunk(dispatch: AppDispatch) {
//     dispatch(setStatus(Status.LOADING));
//     try {
//       const response = await APIAuthenticated.get('/order');
//       if (response.status === 200) {
//         dispatch(setStatus(Status.SUCCESS));
//         dispatch(setOrders(response.data.data));
//       } else {
//         dispatch(setStatus(Status.ERROR));
//       }
//     } catch (error) {
//       dispatch(setStatus(Status.ERROR));
//     }
//   };
// }

//To fetch Users:
export function fetchUsers() {
  return async function fetchUsersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get('/users');
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUsers(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//To add products:
export function addProduct(data: AddProduct) {
  return async function addProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post('/admin/product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUsers(response.data.data));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//To add category:
export function addCategory(data: { categoryName: string }) {
  return async function addCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post('/admin/category', data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setCategories(response.data.data));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
//To fetch Categories:
export function fetchCategories() {
  return async function fetchCategoriesThuhnk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get('/admin/category');
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setCategories(data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//To delete Category:
export function deleteCategory(id: string) {
  return async function deleteCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete('/admin/category/' + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteCategory({ categoryId: id }));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
//To delete products:
export function deleteProduct(id: string) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete('/admin/product/' + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        // dispatch(setDeleteProduct({ productId: id }));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//To delete User:
export function deleteUser(id: string) {
  return async function deleteUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete('/users' + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteUser({ userId: id }));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//To delete orders:
export function deleteOrder(id: string) {
  return async function deleteOrderThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete('/order/admin' + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteOrder({ orderId: id }));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//To get single products:
export function singleProduct(id: string) {
  return async function singleProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get('/admin/product' + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSingleProduct(response.data.data));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
