import { createContext, useState, useContext } from "react";

interface CollectionContextProps {
  collection: any
  setCollection: Function
}

export const CollectionContext = createContext<CollectionContextProps>({
  collection: undefined,
  setCollection: () => { }
})

export const CollectionProvider = ({ children }: any) => {

  const [collection, setCollection] = useState()

  return (
    <CollectionContext.Provider value={{ collection, setCollection }}>
      {children}
    </CollectionContext.Provider>
  )
}

/**
 * Hook to get and update configs state
 */
 export const useCollection = () => {
  const collectionManager = useContext(CollectionContext)
  return collectionManager || [{}, async () => { }]
}