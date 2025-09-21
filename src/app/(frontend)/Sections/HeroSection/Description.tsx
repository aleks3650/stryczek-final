import { getPayload } from 'payload'
import configPromise from '@payload-config'

const Description = async () => {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({
    collection: 'hero-description',
    limit: 1,
  })
  const text = data.docs[0]?.text

  return (
    <div className="hidden heightItem md:block mt-4 max-w-2xl opacity-0 bg-white bg-opacity-75 text-lg p-4 rounded-md animate-fade-in-delay-long">
      <span>
        {text
          ? text
          : 'Witamy w naszej słodkiej krainie! Tu każdy dzień smakuje lepiej — od pierwszego kęsa. Zapraszamy do świata wypieków tworzonych z pasją, według domowych receptur i z najlepszych składników. Czy masz ochotę na puszysty sernik, chrupiącą tartę, a może tort, który spełni marzenie? U nas znajdziesz coś na każdą okazję — i bez okazji też'}
      </span>
    </div>
  )
}

export default Description
export const dynamic = 'force-dynamic'

export const revalidate = 0 
