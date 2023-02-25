import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'
import { useFetchFeaturedProductsQuery } from '../store'

const FeaturedProducts = () => {
  const {data, error, isLoading} = useFetchFeaturedProductsQuery();

    if (isLoading) {
      return <Loading />
    }
    if (error) {
      return <Error />
    }
    return (
      <Wrapper className='section'>
        <div className='title'>
          <h2>featured products</h2>
          <div className='underline'></div>
        </div>
        <div className='section-center featured'>
          { data.slice(0, 3).map((product) => {
               return <Product key={product.id} {...product} />
           })}
        </div>
        <Link to='/products' className='btn'>
          all products
        </Link>
      </Wrapper>
    )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: auto;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
