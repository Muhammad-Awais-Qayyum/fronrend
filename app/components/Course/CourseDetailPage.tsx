import { useGetCourseDetailsQuery } from '@/redux/features/course/courseApi'
import { useGridApiOptionHandler } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import Heading from '@/app/utils/Heading'
import Header from '../Header'
import Footer from '../Footer/Footer'
import CourseDetails from './CourseDetails'
import { useGetStripePublishableKeyQuery, useStripePaymentMutation } from '@/redux/features/Order/orderApi'
import { loadStripe } from '@stripe/stripe-js'
type Props = {
    id: string
}

const CourseDetailPage = (id: Props) => {
    const [route, setRoute] = useState('Login')
    const [open, setOpen] = useState(false)
    const { data: config } = useGetStripePublishableKeyQuery(id)
    const { data, isLoading } = useGetCourseDetailsQuery(id)
    const [stripePayment, { data: paymentIntentData }] = useStripePaymentMutation()
    const [stripePromise, setStripePromise] = useState<any>(null)

    const [clientsecret, setClientSecret] = useState('')

    useEffect(() => {
        if (config) {
            const publishableKey = config?.publishableKey;
            setStripePromise(loadStripe(publishableKey))
        }
        if (data) {
            const amount = Math.round(data.course.price * 100)
            stripePayment(amount)
        }
    }, [config, data, stripePayment])


    useEffect(() => {
        if (paymentIntentData) {
            setClientSecret(paymentIntentData?.client_secret)
        }
    }, [paymentIntentData])
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Heading
                            title={data.course.name + " SmartStudy"}
                            description='
                            "SmartStudy is  a programming community which is developed by Muhammad Awais for helping Programmers "
                            '
                            keywords={data?.course?.tags}
                        />
                        <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
                        {
                            stripePromise && (
                                <CourseDetails
                                    data={data.course}
                                    stripePromise={stripePromise}
                                    clientSecret={clientsecret}
                                    setRoute={setRoute}
                                    setOpen={setOpen}
                                />
                            )
                        }
                        <Footer />
                    </div>
                )
            }
        </>
    )
}

export default CourseDetailPage;