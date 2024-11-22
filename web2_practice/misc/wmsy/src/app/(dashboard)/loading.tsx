import { Loader2, LoaderPinwheel } from 'lucide-react'
import React from 'react'

const DashboardLoading = () => {
  return (
    <div className='h-full flex items-center justify-center'>
        <LoaderPinwheel className='size-6 animate-spin text-muted-foreground' />
    </div>
  )
}

export default DashboardLoading
