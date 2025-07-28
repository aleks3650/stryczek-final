import Link from 'next/link'
export default function NewsPage() {
  return (
    <div className=" p-2 rounded-2xl mt-4 flex justify-center items-center cursor-pointer shadow-md h-fit opacity-90 mx-auto w-fit bg-gradient-to-b from-slate-200 to-gray-200">
      <Link href="/news">
        <h3 className="text-4xl p-4 font-bold">Wszystkie aktualności</h3>
      </Link>
    </div>
  )
}
