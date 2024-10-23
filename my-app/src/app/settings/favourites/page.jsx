'use client'
import { Item } from '../../components/content/Item'
import { getFavorite } from '@/app/state/slice/UserSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Favourites() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavorite())
  },[])

  const favourites = useSelector((state) => state.user.favorites)
  console.log(favourites)
  return (
    <>
      {
        favourites.length > 0 ?
        <div className='mt-[54px] flex justify-between items-center flex-wrap w-full px-[22px]'>
          {
            favourites.map((elem) => {
              return(
                <Item
                  key={elem.id}
                  id={elem.id}
                  price={elem.price}
                  title={elem.title}
                  picture={elem.picture}
                />
              )
            })
          }
        </div>
          : <p className='mt-[54px]'>
              Currently you have no favorites
          </p>
      }
    </>
  )
}

export default Favourites