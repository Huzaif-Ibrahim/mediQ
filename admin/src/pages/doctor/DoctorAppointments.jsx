import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/context'

const DoctorAppointments = () => {

  const { getAllAppointments, appointments, cancelAppointment, loading, dtoken, completeAppointments } = useContext(DoctorContext)
  const { ageCalculate, slotDateFormat, CircularProgress } = useContext(AppContext)

  useEffect(() => {
    getAllAppointments()
  }, [])

  return (
    <div className='p-4 lg:p-8 bg-[#4fd19f]/5 h-[calc(100vh-64px)] w-full overflow-y-scroll pb-8 lg:pb-0'>
      <p className='text-zinc-900 font-medium mb-6'>All Appointments</p>

      {
      loading ? <div className='w-full h-full flex items-center justify-center'><CircularProgress varient="determinate" /></div> : <div className='w-full bg-white lg:mt-8 rounded-lg border border-zinc-300'>
        <div className='hidden w-full p-4 flex-col items-center justify-center lg:justify-start lg:grid lg:grid-cols-[0.3fr_2fr_1fr_2fr_1fr_1fr] border-b border-zinc-300'>
          <p className='font-mediun text-zinc-900'>#</p>
          <p className='font-mediun text-zinc-900'>Patient</p>
          <p className='font-mediun text-zinc-900 text-center'>Age</p>
          <p className='font-mediun text-zinc-900'>Date & Time</p>
          <p className='font-mediun text-zinc-900'>Fees</p>
        </div>
        {
          appointments.reverse().map((item, indx) => {
            return <div key={indx} className='w-full p-4 flex flex-col items-start lg:items-center justify-center lg:justify-start lg:grid lg:grid-cols-[0.3fr_2fr_1fr_2fr_1fr_1fr] border-b border-zinc-300 lg:border-b-0'>
              <p className='text-zinc-600 hidden lg:block'>{indx + 1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='hidden lg:block h-10 w-10 rounded-full' alt="" />
                <p className='text-zinc-600 flex items-center'><span className='block lg:hidden font-medium text-zinc-900 mr-2'>Patient:</span>{item.userData.name}</p>
              </div>
              <p className='text-zinc-600 flex items-center justify-center text-center'><span className='block lg:hidden font-medium text-zinc-900 mr-2'>Age:</span>{ageCalculate(item.userData.dob)}</p>
              <p className='text-zinc-600 flex items-center'><span className='block lg:hidden font-medium text-zinc-900 mr-2'>Date:</span>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p className='text-zinc-600 flex items-center'><span className='block lg:hidden font-medium text-zinc-900 mr-2'>Fees:</span>{item.amount}</p>
              <div className='flex items-center justify-center w-full'>
                {
                  item.isCompleted ? <p className='text-green-500 mt-2 lg:mt-0 text-sm'>Completed</p> : item.cancelled ? <p className='text-red-500 text-xs lg:text-sm'>Cancelled</p> : <div className='flex flex-col lg:flex-row gap-0 lg:gap-4 items-center justify-center'>
                        <button onClick={() => cancelAppointment(item._id)} className='cursor-pointer'>
                          <svg
                            width={40}
                            height={40}
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className='hidden lg:block'
                          >
                            <g filter="url(#filter0_d_1_859)">
                              <circle cx={25} cy={21} r={21} fill="#FEF7F5" />
                              <circle cx={25} cy={21} r={20.5} stroke="#FFE7E2" />
                            </g>
                            <rect
                              x={20}
                              y={24.7451}
                              width={12.2106}
                              height={1.46527}
                              rx={0.732635}
                              transform="rotate(-45.7402 20 24.7451)"
                              fill="#FFA2A2"
                            />
                            <rect
                              x={28.7461}
                              y={25.7097}
                              width={12.2106}
                              height={1.46527}
                              rx={0.732635}
                              transform="rotate(-135.74 28.7461 25.7097)"
                              fill="#FFA2A2"
                            />
                            <defs>
                              <filter
                                id="filter0_d_1_859"
                                x={0}
                                y={0}
                                width={50}
                                height={50}
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                              >
                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dy={4} />
                                <feGaussianBlur stdDeviation={2} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0.972549 0 0 0 0 0.745098 0 0 0 0 0.701961 0 0 0 0.2 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_1_859"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_1_859"
                                  result="shape"
                                />
                              </filter>
                            </defs>
                          </svg>
                          <div className='mt-4 flex justify-center w-28 lg:hidden border border-[#FFA2A2] bg-[#FEF7F5] text-center py-1 px-8 rounded-full'>
                            <p className='text-[#FFA2A2] text-xs'>Cancel</p>
                          </div>
                        </button>
                        <button onClick={() => completeAppointments(item._id)} className='cursor-pointer'>
                          <svg fill="green" className='hidden lg:block' width={32} height={32} viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                            <path d="M960 1807.059c-467.125 0-847.059-379.934-847.059-847.059 0-467.125 379.934-847.059 847.059-847.059 467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059M960 0C430.645 0 0 430.645 0 960s430.645 960 960 960 960-430.645 960-960S1489.355 0 960 0M854.344 1157.975 583.059 886.69l-79.85 79.85 351.135 351.133L1454.4 717.617l-79.85-79.85-520.206 520.208Z" fillRule="evenodd" />
                          </svg>
                          <div className='mt-4 lg:hidden w-28 border border-green-700 bg-green-200 text-center py-1 flex justify-center rounded-full'>
                            <p className='text-white text-xs'>Complete</p>
                          </div>
                        </button>
                      </div>
                }
              </div>
            </div>
          })
        }
      </div>
}
    </div>
  )
}

export default DoctorAppointments