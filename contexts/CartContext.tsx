'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'sonner'

export interface CartItem {
  productId: string
  name: string
  slug: string
  image: string
  priceRSD?: number
  priceEUR?: number
  selectedColor?: {
    _id: string
    name: string
    hexCode: string
  }
  selectedSize?: {
    _id: string
    name: string
  }
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string, colorId?: string, sizeId?: string) => void
  updateQuantity: (productId: string, quantity: number, colorId?: string, sizeId?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPriceRSD: () => number
  getTotalPriceEUR: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      // Check if item with same product, color, and size already exists
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.selectedColor?._id === newItem.selectedColor?._id &&
          item.selectedSize?._id === newItem.selectedSize?._id
      )

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        toast.success('Količina ažurirana u korpi')
        return updatedItems
      } else {
        // Add new item
        toast.success('Proizvod dodat u korpu')
        return [...prevItems, newItem]
      }
    })
  }

  const removeFromCart = (productId: string, colorId?: string, sizeId?: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.selectedColor?._id === colorId &&
            item.selectedSize?._id === sizeId
          )
      )
    )
    toast.success('Proizvod uklonjen iz korpe')
  }

  const updateQuantity = (
    productId: string,
    quantity: number,
    colorId?: string,
    sizeId?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorId, sizeId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId &&
        item.selectedColor?._id === colorId &&
        item.selectedSize?._id === sizeId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    toast.success('Korpa je ispražnjena')
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPriceRSD = () => {
    return items.reduce((total, item) => {
      const price = item.priceRSD || 0
      return total + price * item.quantity
    }, 0)
  }

  const getTotalPriceEUR = () => {
    return items.reduce((total, item) => {
      const price = item.priceEUR || 0
      return total + price * item.quantity
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPriceRSD,
        getTotalPriceEUR,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
