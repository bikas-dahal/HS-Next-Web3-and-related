import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'

const Canvas = () => {
  return (
    <div className='flex items-center justify-evenly'>
        <Card className='bg-red-400'>
            <CardHeader>Quiz</CardHeader>
            <CardContent>Checking</CardContent>
        </Card>
    </div>
  )
}

export default Canvas
