import YellowButtonBg from '../../assets/animatedButtonBg.jpg'
import GrayButtonBg from '../../assets/animatedGrayButtonBg.jpg'

const Button = ({ text, submitFunction, color = 'yellow' }: { text: string, submitFunction: Function, color?: string }) => {
  return (
    <button
      className={`relative group flex w-full p-3 overflow-hidden bg-yellow-f justify-center items-center text-black text-sm font-extrabold bg-cover ${color === 'yellow' ? 'scrolling-btn-wrapper' : 'scrolling-btn-wrapper-gray'}`}
      style={{ backgroundImage: `url(${color === 'yellow' ? YellowButtonBg : GrayButtonBg})` }}
      onClick={() => submitFunction()}
    >
      <div className={`${color === 'yellow' ? 'scrolling-btn-image' : 'scrolling-btn-image-gray'} hidden group-hover:block absolute left-0 top-0`}></div>
      <div className='relative z-10 '>{text}</div>
    </button>
  )
}

export default Button
