import { database } from "@/lib/mongodb";
  

  export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { shortenUrl } = JSON.parse(req.body); // Get the shortenUrl from the request body
        console.log("r", shortenUrl)
        if (!shortenUrl) {
          return res.status(400).json({ error: 'shortenUrl is required' });
        }
        const urls = database.collection('urls'); 
        const query= {shortid : shortenUrl};
        const doc = await urls.findOne(query);
        console.log(doc)

        return res.status(200).json(doc);
    
      } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }

    }
