'use client'
import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import CourseAccess from '@/app/components/Course/CourseAccess';
import Loader from '@/app/components/Loader';

type Props = {
    params: any;
};

const Page = ({ params }: Props) => {
    const id = params.id;

    // protected routes and check user logged in and purchased course

    const { data, isLoading, error } = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.find((item: any) => item._id === id);
            if (!isPurchased) {
                redirect('/');
            }
        }

        if (error) {
            redirect('/');
        }
    }, [data, error, id]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div   >
                    <CourseAccess id={id} data={data.user} />
                </div>
            )}
        </>
    );
};

export default Page;
