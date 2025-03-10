"use client"
import {HeroUIProvider} from "@heroui/react";


const Provider = ({children}) => {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}

export default Provider;