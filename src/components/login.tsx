"use client"
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 via-purple-50 to-blue-50 p-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-8">
          
            <SignedOut>
            <div className="text-center mb-6">
              <UserCircle size={48} className="text-blue-600 mx-auto mb-3" />
              <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
              <p className="text-gray-600 mt-2">Secure Access to Your Dashboard</p>
            </div>
              <div className="flex justify-center mt-8">
                <SignInButton mode='modal'>
                  <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="text-center mt-8" >           
                <UserButton/>
                <h1 className="text-xl font-semibold text-gray-700">Welcome, Admin!</h1>
                <p className="text-gray-500 mt-2">Manage your content and settings here.</p>
                <div className="mt-6">
                  <SignOutButton>
                    <Button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700">
                      Sign Out
                    </Button>
                  </SignOutButton>
                </div>
              </div>
            </SignedIn>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
