
import { database } from "@/lib/mongodb";
import { getSession } from 'next-auth/react';
import shortid from "shortid";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
    if (req.method === 'POST') {
     // const session1 = await getSession({req});
     
    // console.log(user_email);
    const session = await getServerSession(req, res, authOptions)
  if(!session){
    return res.status(400).json({error: "unauthorised" });
  }

  const user_email = session.user.email
  console.log("user",user_email);
        const body = req.body
        //console.log("Body", body);

        if (!body.redirectURL) return res.status(400).json({ error: "url is required" });
        const urls = database.collection("urls");
        
        const shortID = shortid.generate(); 
        //console.log("ShortID", shortID);
        
        const doc = {
          shortid: shortID,
          redirectURL: body.redirectURL,
          visitHistory: [],
          //
          
          useremail: user_email

        };
       // console.log("doc :",doc);
        
        await urls.insertOne(doc);
        console.log("Shortid". shortID)
        const final_url = `${process.env.NEXTAUTH_URL}/${shortID}`
        return res.status(200).json({ id: final_url });
    } else {
    return res.status(500).json({ message: "method not allowed"  });
  }
}
