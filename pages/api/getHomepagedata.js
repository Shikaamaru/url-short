// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react";
import {database} from "@/lib/mongodb"; 
import { ClientPageRoot } from "next/dist/client/components/client-page";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
    try {
        ///const session = await getSession({ req });
        const session = await getServerSession(req, res, authOptions)
        if(!session){
          return res.status(400).json({error: "unauthorised" });
        }
        const urls = database.collection("urls");
        const query = { useremail: session.user.email }
        const options = {}
       // userEmail: session.user.email 

       // console.log("Query: ", query);
       
      
        const cursor = await urls.find(query, options).toArray()
        const final = cursor.map((i,idx)=> {
          return {
            key: idx,
            srno: idx+1,
            shortid: i.shortid,
            redirectUrl: i.redirectURL,
            no_of_clicks: i.visitHistory.length
          }
        })
        //console.log("Final", final);
    
        res.status(200).json({ success: true, data: final });
      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Error fetching data" });
      }
    
  }
  