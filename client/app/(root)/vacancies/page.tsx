import { DataTableDemo } from '@/components/Datatable';
import { columns, data} from './columns';
import { getAllVacancies } from '@/actions/jobs/job.actions';

const page = () => {

  return (
    <main className='w-full flex flex-col overflow-hidden h-[90vh]'>
        <section>Top nav</section>
        <div className='overflow-y-auto h-4/5'>
          <DataTableDemo data={data} columns={columns}/>
        </div>
    </main> 
  )
}

export default page