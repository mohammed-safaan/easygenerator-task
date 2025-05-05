import { LogOutIcon } from 'lucide-react'
import { Button } from './ui/button'

export default function LogoutButton() {
  return (
    <Button className="">
      <LogOutIcon className="h-4 w-4" />
      logout
    </Button>
  )
}
