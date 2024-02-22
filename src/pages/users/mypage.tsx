/* eslint-disable @next/next/no-img-element */
import { useSession,signOut } from "next-auth/react";

export default function MyPage() {
    const{data:session} = useSession();
  return (
    <div className="md:max-w-5xl mx-auto px-4 py-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">My Page</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">User Information</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session?.user?.name ?? "user"}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">E-mail</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session?.user?.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Image</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <img 
                    alt="profile image" 
                    width={48} 
                    height={48} 
                    className="rounded-full" 
                    src={session?.user.image || '/images/markers/default.png'
                }/>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Setting</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <button type="button" className="underline hover:text-gray-500" onClick={()=>signOut()}>Logout</button>
            </dd>
          </div>
          
         
        </dl>
      </div>
    </div>
  )
}
