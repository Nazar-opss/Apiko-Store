'use client'
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import Favorite_CTA from "../modals/Favorite_CTA"
import { useEffect, useState } from "react"
import { addFavorite, deleteFavorite, getFavorite } from "../../state/slice/UserSlice"
import Like from "../../../../public/like.svg"
import ModalItem from "../modals/ModalItem"
import { fetchItemDetails } from "../../state/slice/FetchSlice"

export const Item = (props) => { 
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenItem, setIsOpenItem] = useState(false)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const favorites = useSelector((state) => state.user.favorites)
    
    const dispatch = useDispatch()
    const {id} = props
    
    let isLiked = favorites.some(product => product.id === id);
    
    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);

    const closeModal = () => {
        setIsOpen(false)
    };
    
    const [liked, setLiked] = useState(isLiked);
    const handleLike = (id) => {

        if (isLoggedIn === false) {
            setIsOpen(true);
        } else if (liked) {
            dispatch(deleteFavorite(id));
            console.log(`Deleting ${id}`);
            setLiked(false);
            dispatch(getFavorite());
        } else {
            dispatch(addFavorite(id));
            console.log(`Adding ${id}`);
            setLiked(true);  
            dispatch(getFavorite());
        }
    }
    const closeModalItem = () => {
        setIsOpenItem(false)
      };
    const handleItem = (id) => {
        setIsOpenItem(true)
        dispatch(fetchItemDetails(id))
    }

    return(
        <div className="w-full max-w-[209px] h-[212px] mb-2.5 flex flex-col relative justify-between bg-white border border-dark_3 rounded-sm shadow item-shadow " >
            <a className='flex justify-center cursor-pointer'>
                <Image
                    onClick={() => handleItem(props.id)}
                    className='max-w-[201px] max-h-[147px] mt-1 rounded-[3px] mb-[6px] object-contain'
                    src={props.picture}
                    alt={props.title}
                    width={201}
                    height={147}
                />
            </a>
            
            {
                isLoggedIn === false && isOpen && <Favorite_CTA close={closeModal} isOpen={isOpen}/>
            }
            <div className='w-full h-full max-w-[30px] max-h-[30px] right-[8px] drop-shadow-md absolute rounded-[100%] bottom-[46px] bg-white flex justify-center items-center'>
                <Like
                    width='18' 
                    onClick={() => handleLike(id)} 
                    height='17' 
                    className={liked ? `fill-orange_main stroke stroke-orange_main overflow-visible hover:cursor-pointer hover:fill-dark_2` : ` stroke-dark_2 hover:fill-dark_2 overflow-visible hover:cursor-pointer` }
                />
            </div>
            <div className="px-3">
                <a href="#">
                    <h5 className="truncate text-[15px] tracking-tight text-gray-900 dark:text-dark_1" onClick={() => setIsOpenItem(true)}>{props.title}</h5>
                </a>
                <ModalItem isOpen={isOpenItem} close={closeModalItem} id={id}/>
                <div className="flex items-center justify-between align-text-bottom mb-[5px]">
                    <span className="text-lg font-bold text-gray-900 dark:text-dark_1">${props.price}</span>
                </div>
            </div>
        </div>
    )
}