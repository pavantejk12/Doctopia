import { CollectionConfig } from 'payload/types'

// a collection of 'orders' with an additional route for tracking details, reachable at /api/orders/:id/tracking
export const OTP: CollectionConfig = {
  access:{
    read: ()=>true
  },
  slug: 'otp',
  fields: [
    /* ... */
  ],
  endpoints: [
    {
      path: '/hello',
      method: 'post',
      handler: async (req, res, next) => {
        //const tracking = await getTrackingInfo(req.params.id)
        // if (tracking) {
        //   res.status(200).send({ tracking })
        // } else {
        //   res.status(404).send({ error: 'not found' })
        // }
        res.send({ otp: "hello" })
      },
    },
  ],
}