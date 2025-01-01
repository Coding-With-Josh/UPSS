import Image from "next/image";

export const CourseBanner = (params?: { name: string }) => {
  return (
    <>
      <div className="sticky relative w-full h-[15rem] lg:h-[18rem]">
        <Image
          className="w-full h-[15rem] lg:h-[18rem]"
          src={require("@/assets/images/courses/Untitled design (1).png")}
          alt="Course Image"
        />
        <Image
          src={require("@/assets/images/avatars/avatar1.png")}
          alt="..."
          className="cursor-pointer size-[3.5rem] lg:size-[5rem] rounded-full absolute top-[12rem] lg:top-[15rem] right-[3rem] border-4 border-gray-700"
        />
      </div>
    </>
  );
};
