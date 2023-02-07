import React from 'react'
import GrayButtonBg from '../../assets/animatedGrayButtonBg.jpg'
import YellowButtonBg from '../../assets/animatedButtonBg.jpg'

const Divider = ({ progressClasses }: { progressClasses?: string }) => (
        <div
      className={'flex justify-evenly w-full h-[3px] absolute top-[180px] left-0'}
      style={{ backgroundImage: `url(${GrayButtonBg})` }} >
        <div
         style={{ backgroundImage: `url(${YellowButtonBg})` }}
        className={progressClasses ?? 'absolute h-full w-1/3 left-0'}/>
        <span className='bg-yellow-f w-[22px] h-[22px] rounded-full flex items-center justify-center transform -translate-y-1/2 z-20 text-sm font-extrabold '>1</span>
        <span className='bg-gray-8a w-[22px] h-[22px] rounded-full flex items-center justify-center transform -translate-y-1/2 z-20 text-sm font-extrabold '>2</span>
      </div>
)

export default Divider
