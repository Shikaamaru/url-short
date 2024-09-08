import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [redirectUrl, setRedirectUrl] = useState(null)
  const { shortenUrl } = router.query

  useEffect(() => {
    if (shortenUrl) {
      const run = async () => {
        const res = await fetch("/api/convertURL",{
          method: "POST",
          body: JSON.stringify({
            shortenUrl: shortenUrl
          })
        })
        const abc = await res.json();
        console.log("abc", abc);
        setRedirectUrl(abc.redirectURL)
        
      }
      run()
  
      
    }
  }, [shortenUrl])

  useEffect(() => {
    if (redirectUrl) {
      console.log("Redirect url", redirectUrl)
      // Redirect to the URL
      router.push(redirectUrl)
    }
  }, [redirectUrl, router])

  if (loading) {
    return <p>Loading...</p>
  }

  return <p>Redirecting...</p>
}
