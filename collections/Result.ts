import { Payload } from 'payload';
import { CollectionConfig } from 'payload/types';


const Results:CollectionConfig = {
    slug: "results",
    admin:{
        group:'Exams'

    },
    access: { 
        read: ({req}) => {
            
            if(req.user.collection === 'users'){
                return true
            }
            
            return {
                owner:{
                    equals:req.user.id,
                }
            }
        },

        // update:({req})=>{
        //     if(req.user.collection === 'users'){
        //         return true
        //     }
            
        //     return {
        //         owner:{
        //             equals:req.user.id,
        //         }
        //     }
        // },
        // delete:({req}) =>{
        //     if(req.user.collection === 'users'){
        //         return true
        //     }
            
        //     return {
        //         owner:{
        //             equals:req.user.id,
        //         }
        //     }
        // },
        
        create:() => true,
    },


    fields: [
        
        {
            name: 'owner',
            type: 'relationship',
            relationTo: 'customers',
            hasMany: false,
            defaultValue: ({ user, locale }:{user:any,locale:any}) => {
                
                return (`${user.id}`)
            },
            validate: (val, {user,args}) => {
                if(user.collection === 'users'){
                    return true
                }

                if(val === user.id){
                    return true
                }

                
                return "Your cand create order as provided User"
            },

            // admin:{
            //     readOnly: true,
            // }
        },

        {
            name: 'test',
            label: 'Test Name',
            type: 'relationship',
            relationTo: 'tests',
            required: true,
            
        },
        {
            name: 'selectedoptions', // required
            type: 'json', // required
            required: true,
        },
        
        
        {
            name: 'score',
            type: 'json',
            label: 'Total Score',
            admin:{
                readOnly: true,
            },
            hooks: {
                
             beforeValidate: [async ({req,data}) => {
                const payload: Payload = req.payload;
            
                const selectedOptions:any = data?.selectedoptions ??[]

                const test = await payload.findByID({
                    id: data!.test,
                    collection: 'tests',
                });

                
                let score = 0
                test.questions!.forEach((question:any) => {

                    const userAnswers = selectedOptions[question.id] || [];
                    
                    const correctAnswers = question.options.filter((item:any) => item.isoption === "True").map((item:any) => item.id);
                    console.log(JSON.stringify(correctAnswers))

                    if (userAnswers.length === correctAnswers.length && userAnswers.every((opt:any) => correctAnswers.includes(opt))) {
                      score += 1;
                      console.log("incresed")
                    }
                });

                const emptyKeysCount = Object.values(selectedOptions).filter((arr:any) => arr.length === 0).length;
                const nottouched = test?.questions?.length! - Object.keys(selectedOptions).length
                
                const total = test?.questions?.length!
                const notanswered = nottouched + emptyKeysCount
                const wrongans = test?.questions?.length! - (score + notanswered)
                

                const correctPercentage = (score / total) * 100;
                const wrongPercentage = (wrongans / total) * 100;
                const notAnsweredPercentage = (notanswered / total) * 100;
                const totalScorePercentage = ((score / test?.questions?.length!) * 100).toFixed(2);
                
                
                const user = await payload.findByID({
                    collection:'customers',
                    id:req.user.id
                })

                let tq = total + (user?.totalQuestions || 0) as number;
                let tc = score + (user?.totalCorrectanswer || 0) as number;
                let tw = wrongans + (user?.totalWronganswer || 0) as number;
                let tn = notanswered + (user?.totalNotAttempted || 0) as number;
                
                const testval = test.exam === "test"? 1 : 0
                const qbank = test.exam === "qbank"? 1 : 0
                
                const update = await payload.update({
                    collection:'customers',
                    id:req.user.id,
                    data:{
                        totalQuestions: tq ,
                        totalCorrectanswer: tc,
                        totalWronganswer: tw,
                        totalNotAttempted: tn,
                        totalTest: (user?.totalTest || 0) + testval,
                        totalQbank: (user?.totalQbank || 0) + qbank
                    },
                    overrideAccess: true,

                })

                
                return {
                    nofquestion: total,
                    score: score,
                    wrongans: wrongans,
                    notanswered: notanswered,
                    percentage: totalScorePercentage,
                    correctPercentage: correctPercentage,
                    wrongPercentage: wrongPercentage,
                    notAnsweredPercentage: notAnsweredPercentage
                    
                }
                       
         
            }
            
            ],
            },

            
        }

       
    ],

    


}

export default Results;