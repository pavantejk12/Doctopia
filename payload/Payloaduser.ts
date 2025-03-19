
import {verify} from 'jsonwebtoken';
import crypto from 'crypto';

export default function Payloaduser(token:string):{}{

    const secret = crypto.createHash('sha256').update(process.env.PAYLOAD_SECRET??'').digest('hex').slice(0, 32);


    try{
      const user = verify(token, secret,
            {
                algorithms: ["HS256"],
            }
       )
       
       return user
    }
    catch (error) {

        return {
            id:''
        }
    }

   


}