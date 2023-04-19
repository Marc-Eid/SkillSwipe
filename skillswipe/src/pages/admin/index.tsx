import { AdminHome } from '@/components/admin/home'
import SidebarWithHeader from '@/components/admin/sidebar'
import React, { useState } from 'react'

const Admin = () => {
  return (
    <SidebarWithHeader>
      <AdminHome />
    </SidebarWithHeader>
  )
}
export default Admin
