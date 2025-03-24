import { getPayload } from 'payload'
import config from '@/payload.config'

const OpinionsSection = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const data = await payload.find({ collection: 'opinion' })
  const testimonials = data.docs

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-amber-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="bg-gray-50 py-16 rounded-lg shadow-lg mb-12" itemScope>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Co mówią nasi goście</h2>
        <p className="text-gray-600 text-center mb-8">
          Przeczytaj opinie naszych gości, którzy odwiedzili nasz obiekt
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-md transition-shadow"
              itemScope
              itemProp="review"
            >
              <div
                className="flex mb-4"
                aria-label={`Ocena: ${testimonial.stars} na 5 gwiazdek`}
                itemScope
              >
                <meta itemProp="ratingValue" content={testimonial.stars.toString()} />
                <meta itemProp="bestRating" content="5" />
                {renderStars(testimonial.stars)}
              </div>
              <p className="text-gray-600 italic mb-4" itemProp="reviewBody">
                {testimonial.opinion}
              </p>
              <div itemScope itemType="https://schema.org/Person" itemProp="author">
                <p className="font-medium text-gray-900">
                  — <span itemProp="name">{testimonial.name}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OpinionsSection
