import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as React from 'react'
import { PrismicRichText } from '@prismicio/react'
import Heading from '../Heading'

const Hero = ({
  hero_admin,
  hero_admin_title,
  hero_image,
  hero_introductory_paragraph,
  hero_office_address,
  hero_office_information_title,
  hero_office_phone,
  hero_office_secretary,
  hero_secretary_title,
  hero_title,
}) => {
  const components = {
    paragraph: ({ node, children }) => (
      <p className="prose md:prose-lg lg:prose-xl xl:prose-2xl dark:prose-invert px-2 md:px-3 lg:px-4">
        {children}
      </p>
    ),
  }

  const address = {
    paragraph: ({ node, children }) => (
      <p className="prose prose-sm dark:prose-invert text-center italic my-4 md:my-2 mx-auto">
        {children}
      </p>
    ),
  }

  return (
    <>
      <div className="grid md:grid-rows-3 md:grid-cols-5 min-h-[250px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-12 py-3 sm:py-4 md:py-5 lg:py-6 max-w-screen-2xl justify-center">
        <div className="md:col-span-2 md:row-span-2 flex items-end justify-center motion-safe:animate-fade-down motion-safe:md:animate-fade-right">
          <GatsbyImage image={getImage(hero_image)} alt="" className="mb-4" />
        </div>
        <div className="prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl md:col-span-3 row-span-1 text-center self-center motion-safe:animate-fade-up motion-safe:md:animate-fade-left">
          <Heading level={2}>{hero_title.text}</Heading>
        </div>
        <div className="md:col-span-3 row-span-1 motion-safe:animate-fade-up motion-safe:md:animate-fade-left">
          <PrismicRichText
            components={components}
            field={hero_introductory_paragraph.richText}
          />
        </div>
        <div className="md:col-span-2 row-span-1 p-2 mb-2 md:mb-0 self-end motion-safe:animate-fade-up motion-safe:md:animate-fade-right">
          <Heading level={3} className="text-center">
            <span>
              {hero_admin.text} <br />
              {hero_admin_title.text}
            </span>
          </Heading>
        </div>
        <div className="md:col-span-3 row-span-1 p-2 mb-2 md:mb-0 self-end motion-safe:md:animate-fade-left">
          <Heading
            level={4}
            className="dark:text-emerald-200 text-center pb-2 border-b dark:border-b-gray-600"
          >
            {hero_office_information_title.text}
          </Heading>
          <PrismicRichText
            components={address}
            field={hero_office_address.richText}
          />

          <Heading level={5} className="text-center">
            {hero_office_secretary.text}
          </Heading>
          <ul className="text-center prose prose-sm dark:prose-invert mx-auto">
            <li>{hero_secretary_title.text}</li>
            <li>{hero_office_phone.text}</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Hero
