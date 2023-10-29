import React from 'react'
import { RenderSteps } from './RenderSteps'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetCourseState, setCourseStep } from '../../../../slices/courseSlice';


export const AddCourse = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCourseState());
  }, [])
  return (
    // <>
        <div>
            <div>
                <h1 className='text-white'>Add Course</h1>
                <div>
                 <RenderSteps/>

                </div>
            </div>
        </div>
    // </>
   
  )
  }
