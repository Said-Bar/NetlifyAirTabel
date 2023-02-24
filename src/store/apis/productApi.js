import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const productApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: '/.netlify/functions',
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchProducts: builder.query({
        providesTags: () => {
          return ['Products'];
        },
        query: () => {
          return {
            url: '/products',
            method: 'GET',
          };
        },
      }),
      fetchFeaturedProducts: builder.query({
        providesTags: () => {
          return ['Products'];
        },
        query: () => {
          return {
            url: '/products',
            method: 'GET',
          };
        },
        transformResponse: (response) => {
            let newResponse = response.filter((product) => {
                return product.featured === true
            })
            newResponse = newResponse.slice(0, 3)
            return newResponse;
        }
      }),
      fetchProduct: builder.query({
        providesTags: () => {
          return ['Product'];
        },
        query: (id) => {
          return {
            url: `/single-product`,
            params: {
                id: id,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});


export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  useFetchFeaturedProductsQuery,
} = productApi;
export { productApi };