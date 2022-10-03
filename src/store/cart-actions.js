import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://redux-b9491-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Could not fetch cart data.');
            };

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    tilte: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                tilte: 'Sending...',
                message: 'Sending cart data',
            })
        );

        const sendRequest = async (dispatch) => {
            const response = await fetch(
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        };

        try {
            await sendRequest();

            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    tilte: 'success!',
                    message: 'Sent cart data successfully!',
                }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    tilte: 'Error!',
                    message: 'Sending cart data failed!',
                }));
        };
    };
};