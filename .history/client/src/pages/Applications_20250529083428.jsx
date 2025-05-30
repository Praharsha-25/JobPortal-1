import React, { useContext } from 'react'
import {useState} from'react'
import { assets, jobsApplied } from '../assets/assets'
import Navbar from '../components/Navbar'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'

const Applications = () => {

  const { user } = useUser()
  const { getToken } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const {backendUrl, userData, userApplications, fetchUserData} = useContext(AppContext)

  const updateResume = async() => {

    try{
      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()
      
      const { data } = await axios.post(backendUrl+'/api/users/update-resume',
        formData,
        {headers:{ Authorization : `Bearer ${token}`}}
      )

      if(data.success){
        toast.success(data.message)
        await fetchUserData()
      }
      else{
        toast.error(data.message)
      }

    }
    catch(error){
      toast.error(error.message)
    }

    setIsEdit(false)
    setResume(null)

  }

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdit || userData && userData.resume === ""
            ? <>
            <label className='flex items-center' htmlFor="resumeUpload">
              <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : "Select Resume"}</p>  
              <input type="file" hidden accept='application/pdf' onChange={e => setResume(e.target.files[0])} id='resumeUpload' />
              <img src={assets.profile_upload_icon} alt="" />
            </label>
            <button onClick={e => setIsEdit(false)} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>

            </> 
            : <div className='flex gap-2 '>
              <a href="" className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg '>
                Resume
              </a>
              <button onClick={() => setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer'>
                Edit
              </button>
            </div>
          }
        </div>
        <h2 className='text-xl font-semibold mb-4 '>Applied Jobs</h2>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left '>Company</th>
              <th className='py-3 px-4 border-b text-left '>Job Title</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left '>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => true ? (
              <tr>
                <td className='py-3 px-4 flex items-center gap-2 border-b'>
                  <img className='w-8 h-8' src={job.logo} alt="" />
                  {job.company}
                </td>
                <td className='px-4 py-2 border-b'>{job.title}</td>
                <td className='px-4 py-2 border-b max-sm:hidden'>{job.location}</td>
                <td className='px-4 py-2 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='px-4 py-2 border-b'>
                  <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded font-semibold`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ) : (null))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  )
}

export default Applications
