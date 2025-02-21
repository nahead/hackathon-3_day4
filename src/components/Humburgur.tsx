"use client"
import { TiThMenu } from "react-icons/ti";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenuDemo } from "./navigationMenu";

const SHEET_SIDES = ["left"] as const;

export function SheetSide() {
  return (
    <div className="sm:hidden">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <TiThMenu className="text-3xl cursor-pointer" />
          </SheetTrigger>
          <SheetContent side={side} className="bg-white">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold text-gray-800">SHOP.CO</SheetTitle>
            </SheetHeader>

            {/* Navigation Links */}
            <nav className="mt-6">
              <ul className="space-y-5 text-lg font-medium text-gray-700">
                <li>
                  <NavigationMenuDemo />
                </li>
                <li>
                  <Link href="/casual" className="block px-4 py-2 hover:text-black">On Sale</Link>
                </li>
                <li>
                  <Link href="/product" className="block px-4 py-2 hover:text-black">New Arrivals</Link>
                </li>
                <li>
                  <Link href="/brands" className="block px-4 py-2 hover:text-black">Brands</Link>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
