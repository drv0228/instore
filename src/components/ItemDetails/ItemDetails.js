import './ItemDetails.scss';
import backLogo from '../../assets/images/arrow_back-24px.svg';
import editButton from '../../assets/images/edit-24px-white.svg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ItemDetails() {
    const [item, setItem] = useState(null);
    const { id } = useParams();

    function handleBackButton() {
        window.location.replace('/inventory');
    }

    function handleEditButton() {
        window.location.replace('/edititem/' + id);
    }

    const url = "http://localhost:5050/api/inventories/" + id;
    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setItem(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("axios call failed", error);
            });
    }, [url]);

    if (!item) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }

    const inStock = item.quantity !== 0;

    return (
        <section className='item-details-wrap'>
        <div className='item-details'>
            <section className='item-details__top'>
                <div className='item-details__back-button' onClick={handleBackButton}>
                    <img src={backLogo} alt='button used to go back'/>
                </div>
                <h1 className='item-details__h1'>{item.item_name}</h1>
                <div className='item-details__edit-button' onClick={handleEditButton}>
                    <img src={editButton} alt='button used to edit one item'/>
                </div>
            </section>
            <section className='item-details__bottom'>
                <div className='item-details__left-column'>
                    <p className='item-details__title'>ITEM DESCRIPTION:</p>
                    <p className='item-details__description'>{item.description}</p>
                    <p className='item-details__category-title'>CATEGORY:</p>
                    <p className='item-details__category-value'>{item.category}</p>
                </div>
                <div className='item-details__right-column'>
                    <div className='item-details__status-container'>
                        <div className='item-details__status-left'>
                            <p className='item-details__status-title'>Status</p>
                            {inStock ? <p className='item-details__status-value-green'>In Stock</p> : <p className='item-details__status-value-red'>Out of stock</p>}
                        </div>
                        <div className='item-details__status-right'>
                            <p className='item-details__quantity-title'>Quantity</p>
                            <p className='item-details__quantity-value'>{item.quantity}</p>
                        </div>
                    </div>
                    <p className='item-details__store-title'>STORE:</p>
                    <p className='item-details__store-value'>{item.warehouse_name}</p>
                </div>
            </section>
        </div>
        </section>
    );
}

export default ItemDetails;
