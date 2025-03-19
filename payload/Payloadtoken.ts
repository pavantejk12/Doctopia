
import {verify,sign} from 'jsonwebtoken';
import crypto from 'crypto';

export default function Payloadtoken(user:any):{}{

    const secret = crypto.createHash('sha256').update(process.env.PAYLOAD_SECRET??'').digest('hex').slice(0, 32);


    try{
    
       var token = sign({ ...user }, secret, { algorithm: 'HS256' });
       
       return {
        token:token
       }

    }
    catch (error) {

        return {}
    }

   


}