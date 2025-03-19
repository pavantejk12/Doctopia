import { create } from 'zustand'
import { persist,createJSONStorage,devtools } from 'zustand/middleware'




interface BearState<T> {
    carts: T[],
    addItem: (item: T) => void,
    remove:(n:number)=>void
}


type Item={
    name:string,
    id:string|number,
    price:string|number,
    brand:string,
    search:string,
    image:string,
    quantity:number,
    size:string,
}



export const useShopcart = create<BearState<Item>>()(
    devtools(
      persist(
        (set) => ({
            carts: [],
            addItem: (item) => set((state)=>({carts:[...state.carts,item]})),
            remove:(n) => set((state)=>({carts: [...state.carts.slice(0, n), ...state.carts.slice(n + 1)]}))
        
        }),
        {
          name: 'card-store',
        }
      )
    )
)






type Wish={
  name:string,
  id:string|number,
  price:string|number,
  image:string,
  brand:string,
  search:string
}


export const useShopwish = create<BearState<Wish>>()(
  devtools(
    persist(
      (set) => ({
          carts: [],
          addItem: (item) => set((state)=>({carts:[...state.carts,item]})),
          remove:(n) => set((state)=>({carts: [...state.carts.slice(0, n), ...state.carts.slice(n + 1)]}))
      
      }),
      {
        name: 'card-wish',
      }
    )
  )
)

interface UrlState<T> {
  stringNumbers: T[],
  addString: (url: string) => void,
  
}

type Urls={
  url: string;
  number?: number;
}




export const useUrl = create<UrlState<Urls>>()(
  devtools(
    persist(
      (set) => ({
        stringNumbers:[],
        addString(url) {
          set((state)=>{
            if(state.stringNumbers.length > 20){
              const newst = state.stringNumbers.splice(0, 10);
              console.log(state.stringNumbers.length)

              return { newst }

            }
            
            if(url === '/?'){
              return { stringNumbers:[...state.stringNumbers]}
            }
            if(url === '/cart'){
              return { stringNumbers:[...state.stringNumbers]}
            }
            if(url === '/wish'){
              return { stringNumbers:[...state.stringNumbers]}
            }

            if(url === '/products?'){
              return { stringNumbers:[...state.stringNumbers]}
            }
            
            if(url === '?'){
              return { stringNumbers:[...state.stringNumbers]}
            }
            
            const existingString = state.stringNumbers.find(
              (item) => item.url === url
            );

            if (existingString) {
              // If the string already exists, increment the number by 1
              const updatedStringNumbers = state.stringNumbers.map((item) =>
                item.url === url
                  ? { ...item, number: item.number! + 1 }
                  : item
              );

              return { stringNumbers: updatedStringNumbers };
            }else {
              // If the string doesn't exist, add a new object with number set to 1
              const newStringObject = { url: url, number: 1 };
              return { stringNumbers: [...state.stringNumbers, newStringObject] };
            }

          })
          
        },
      }),
      
      {
        name: 'card-string',
      }
    )
  )
)


interface SuggestState {
  data: [],
  addList: (data: []) => void,
  
}



export const useSugges = create<SuggestState>()(
  devtools(
    persist(
      (set) => ({
        
        data:[],
        addList(data) {
          set((state)=>{
            
            return { data:[...data] }

          })
          
          
        },
        
      }),
      {
        name: 'state-suggest',
      }
      
    ))
      
)