import CourseVideoPage from './courses/[courseId]/videos/page';

export default function Home() {
  return (
    <div className="flex flex-col justify-center w-full mt-20">
      <CourseVideoPage />
    </div>
  )
}
