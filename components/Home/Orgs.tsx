import Image from 'next/image'


function Orgs() {
    
    

  return (
    <div className='w-full mt-20'>
        <div className='flex justify-between w-4/5   mx-auto flex-col lg:flex-row md:flex-row'>
            <div className='my-auto'>Trusted by 2.000+ organizations</div>
            <div className='grid lg:grid-cols-7 md:grid-cols-4 grid-cols-3 justify-between lg:gap-5 flex-wrap'>
                <div className='imagec flex justify-center my-auto'>
                   <Image className='h-full p-2 lg:p-4' src={'/havas.png'} alt='' width={555} height={555}></Image>
                </div>
                <div className='imagec flex justify-center my-auto'>
                   <Image className='h-full p-2 lg:p-4' src={'/wunderman.png'} alt='' width={555} height={555}></Image>
                </div>
                <div className='imagec flex justify-center my-auto'>
                   <Image className='h-full p-2 lg:p-4' src={'/diageo.png'} alt='' width={555} height={555}></Image>
                </div>
                <div className='imagec flex justify-center my-auto'>
                   <Image className='h-full pl-2 pr-2 pt-3 pb-3 lg:pl-4 lg:pr-4 lg:pt-5 lg:pb-5' src={'/GroupM.png'} alt='' width={555} height={555}></Image>
                </div>
                <div className='imagec flex justify-center my-auto'>
                   <Image className='h-full p-2 lg:p-4' src={'/dentsu.png'} alt='' width={555} height={555}></Image>
                </div>
                <div className='imagec flex justify-center my-auto'>
                   <Image className='h-full p-2 lg:p-4' src={'/pepsi.png'} alt='' width={555} height={555}></Image>
                </div>
                <div className='imagec flex justify-center my-auto'>
                   <Image className='h-full p-2 lg:p-4' src={'/ogilvy.png'} alt='' width={555} height={555}></Image>
                </div>


            </div>
        </div>
    </div>
  )
}

export default Orgs