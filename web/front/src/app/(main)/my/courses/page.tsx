"use client";

 import { Course } from "@/components/dashboard/course";
 const Page = () => {
   return (
     <div className="flex items-start justify-center flex-col p-4 w-full">
       <h2 className="text-xl font-semibold mb-3.5">My Courses</h2>
       <div className="grid lg:grid-cols-5  md:grid-cols-3 grid-cols-1 w-full gap-7">
         <Course  title="Mathematics" category="All" progress={67} modules={4} link="mathematics" />
         <Course  title="Physics" category="Science" progress={35} modules={2} link="physics" />
         <Course  title="Photography" category="Electives" progress={45} modules={3} link="photography" />
         <Course  title="Cosmetology" category="Electives" progress={80} modules={8} link="cosmetology" />
         <Course  title="Economics" category="Electives" progress={27} modules={2} link="economics" />
         <Course  title="Commerce" category="Electives" progress={93} modules={4} link="commerce" />
         <Course  title="Chemistry" category="Science" progress={56} modules={4} link="chemistry" />
         <Course  title="Biology" category="Science" progress={88} modules={3} link="biology" />
       </div>
     </div>
   );
 };
 export default Page;
