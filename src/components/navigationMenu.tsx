"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const categories = [
  { title: "Men's Clothes", href: "/men", description: "Attractive and spectacular colors and designs." },
  { title: "Women's Clothes", href: "/women", description: "Ladies, your style and taste matter to us." },
  { title: "Kids' Clothes", href: "/kids", description: "Happy and beautiful colors for all ages." },
  { title: "Bags & Shoes", href: "/accessories", description: "Stylish options for men and women." },
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg font-medium">Shop</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white shadow-lg rounded-lg">
            <ul className="grid gap-3 p-4 sm:w-[400px] md:w-[500px] lg:w-[600px] md:grid-cols-2">
              {categories.map((category, index) => (
                <Link href={category.href} key={index}>
                  <ListItem title={category.title}>{category.description}</ListItem>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 transition-all hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900",
            className
          )}
          {...props}
        >
          <div className="text-base font-semibold">{title}</div>
          <p className="text-sm text-gray-600">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
