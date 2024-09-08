import { useSession, signIn, signOut } from "next-auth/react"
import {Button} from "@nextui-org/react";
export default function Loginbtn() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
       <div>
        <Button onClick={() => signOut()} color="danger" variant="shadow">
        Sign out
      </Button>
      </div>
      
       
      </>
    )
  }
  return (
    <>
     <div>
     <Button onClick={() => signIn("google")} color="primary" variant="shadow">
        Sign in
      </Button> 
      </div> 
    </>
  )
}