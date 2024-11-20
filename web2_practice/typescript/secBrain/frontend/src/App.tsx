
import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'

function App() {

  return (
    <>
    <Button startIcon={<PlusIcon size='lg' />} variant='default' text='hi' size='sm' />
    <Button variant='outline' text='hi' size='md' />
    <Button variant='ghost' text='hi' size='lg' />
    <Button variant='link' text='hi' size='md' />
    </>
  )
}

export default App
