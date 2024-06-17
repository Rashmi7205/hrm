import { getAllEmployee } from "@/actions/employee"

const page = async () => {
  await getAllEmployee();
  return (
    <main className='w-full flex flex-col h-min-[90vh]'>

    </main>
  )
}

export default page