import React, { useEffect } from 'react'
import { RenderSteps } from './RenderSteps'
import { useDispatch, useSelector } from 'react-redux';
import { setCourseStep } from '../../../../slices/courseSlice';

export const UpdateCourse = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCourseStep(1));
  }, [])
  

  return (
    // <>
        <div>
            <div>
                <h1 className='text-white'>Update Course</h1>
                <div>
                 <RenderSteps/>

                </div>
            </div>
        </div>
    // </>
   
  )
  }
