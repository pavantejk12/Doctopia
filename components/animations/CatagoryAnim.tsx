"use client"
import React, { useLayoutEffect, useRef,useContext} from 'react'
import { gsap } from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);



function CatagoryAnim({
    children,
  }: {
    children: React.ReactNode
  }) {
    
    
    
    const catagoryRef = useRef<HTMLDivElement>(null);

    //console.log(catagoryRef)

    useLayoutEffect(() => {

        ScrollTrigger.create({
            start:"top 82px",
            end:"bottom top",

            trigger:catagoryRef.current,
            toggleClass:{
                targets:".bg-mediumyellow",
                className:"header2"
            },


        });

        ScrollTrigger.create({
          start:"top 82px",
          end:"bottom top",

          trigger:catagoryRef.current,
          toggleClass:{
              targets:".buttonbg",
              className:"buttonbgtrigger"
          },


        });

        ScrollTrigger.matchMedia({
            // large
            "(min-width: 960px)": function () {
              // setup animations and ScrollTriggers for screens 960px wide or greater...
              // These ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
              gsap.to(catagoryRef.current,{
            
                scrollTrigger:{
                    trigger:catagoryRef.current,
                    start:"top 82px",
                    
                    
                    pin:true,
                    pinSpacing:false,
    
                    
                }
            })
            
            },})

  
        
        
        return () => { 
          // cleanup code (optional)
        }
        
      }, []);

  return (
    <div className='catagoryanim' ref={catagoryRef} >{children}</div>
  )
}

export default CatagoryAnim