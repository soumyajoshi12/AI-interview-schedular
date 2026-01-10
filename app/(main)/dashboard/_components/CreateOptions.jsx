import { Camera, Phone, Video } from 'lucide-react'
import React from 'react'

const CreateOptions = () => {
    return (
        <div className='grid grid-cols-2 gap-4 mt-5'>
            <div className="bg-white flex flex-col p-6 gap-2 rounded-lg shadow-sm">
                <div className='bg-secondary p-3 rounded-lg w-fit'><Video /></div>
                <h3 className='text-md font-semibold'>Create New Interview</h3>
                <p className="mt-1 text-sm text-gray-600">Create AI interview and schedule it with candidates</p>
            </div>
            <div className='bg-white flex flex-col p-6 gap-2 rounded-lg shadow-sm'> <div className='bg-secondary p-3 rounded-lg w-fit'><Phone /></div>
                <h3 className='text-md font-semibold'>Create Phone Screening Call</h3>
                <p className="mt-1 text-sm text-gray-600">Schedule Phone screening calls with potential candidates</p>
            </div>
        </div>
    )
}

export default CreateOptions