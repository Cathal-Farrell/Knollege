export async function GET(req, res) {

        let results = {"id": "before"}

        console.log('Found documents =>', results);

 

   //==========================================================

 

        // at the end of the process we need to send something back.

        return Response.json(results)

  }

 

 

