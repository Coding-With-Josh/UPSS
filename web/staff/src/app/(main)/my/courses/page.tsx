// "use client";

//  import { Course } from "@/components/dashboard/course";
import CourseManagement from "@/components/dashboard/course/CourseManagement";
 const Page = () => {
   return (
    //  <div className="flex items-start justify-center flex-col p-4 w-full">
    //    <h2 className="text-xl font-semibold mb-3.5">My Courses</h2>
    //    <div className="grid lg:grid-cols-5  md:grid-cols-3 grid-cols-1 w-full gap-7">
    //      <Course  title="Mathematics" category="All" progress={67} modules={4} />
    //      <Course  title="Physics" category="Science" progress={35} modules={2} />
    //      <Course  title="Photography" category="Electives" progress={88} modules={7} />
    //      <Course  title="Cosmetology" category="Electives" progress={88} modules={7} />
    //      <Course  title="Economics" category="Electives" progress={88} modules={7} />
    //      <Course  title="Commerce" category="Electives" progress={88} modules={7} />
    //      <Course  title="Chemistry" category="Science" progress={88} modules={7} />
    //      <Course  title="Biology" category="Science" progress={88} modules={7} />
    //    </div>
    //  </div>
    <CourseManagement/>
   );
 };
 export default Page;
