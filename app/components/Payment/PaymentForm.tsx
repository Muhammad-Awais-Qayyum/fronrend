import { styles } from '@/app/styles/style';
import { useCreateOrderMutation } from '@/redux/features/Order/orderApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import socketio from 'socket.io-client';
const ENDPOINT=process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketid=socketio(ENDPOINT,{transports:['websocket']});

type Props = {
    data: any;
    setOpen: any
    user:any
}

const PaymentForm = ({ data, setOpen ,user}: Props) => {
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState('')
    const [createOrder, { data: orderdata, error: orderError }] = useCreateOrderMutation()
    const [loadUser, setLoadUser] = useState(false)
    const { } = useLoadUserQuery({ skip: loadUser ? false : true })
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });

        if (error) {
            setMessage(error?.message || '');
            setIsLoading(false)
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setIsLoading(false)
            createOrder({ courseId: data._id, payment_info: paymentIntent })

        }



    }

    useEffect(() => {
        if (orderdata) {
            setLoadUser(true)
            socketid.emit('notification',{
                title:'New Order',
                message:`You have  a new order from ${data.name}`,
                userId:user._id
            })
            redirect(`/course-access/${data._id}`)
        }
        if (orderError) {
            if ("data" in orderError) {
                const errorMessage = orderError as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [data._id, data.name,orderError,user._id ,orderdata])
    return (
        <form id='payment-form' onSubmit={handleSubmit}>
            <LinkAuthenticationElement id='link-authentication-element' />
            <PaymentElement id='payment-element' />
            <button disabled={isLoading || !stripe || !elements} id='submit'>
                <span id='button-text' className={`${styles.button} mt-2 !h-[35px]`}>
                    {isLoading ? 'Paying...' : 'Pay Now'}
                </span>

                {/* show any error*/}
                {
                    message && (
                        <div id='payment-message' className=' text-[red] font-Poppins pt-2'>
                            {message}
                        </div>
                    )
                }
            </button>
        </form>
    )
}

export default PaymentForm;