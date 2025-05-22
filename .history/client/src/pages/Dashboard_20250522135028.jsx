import React from 'react'
import { Outlet } from 'react-router-dom'
import { assets } from '../assets/assets'

const Dashboard = () => {
  return (
    <div className='min-h-screen'>
      {/* Navbar for Recruiter Panel */}
      <div>
        <div>
            <img src={assets.logo} alt="" />
            <div>
                <p>Welcome</p>
                <div>
                    <img src={assets.company_icon} alt="" />
                    <div>
                        <ul>
                            <li>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
