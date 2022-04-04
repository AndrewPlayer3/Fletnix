export default function Login() {
   return (
     <div className='h-full items-center justify-center'>
        <a href='/api/auth/signin'>
          <button className='bg-[#D77A61] hover:bg-[#D8B4A0] text-[#EFF1F3] font-bold py-2 px-4 rounded-full'>
            Login to Continue
          </button>
        </a>
      </div>
   ) 
}