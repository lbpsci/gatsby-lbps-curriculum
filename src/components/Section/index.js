import * as React from 'react'
import SectionHeader from '../SectionHeader'

export default function Section({ children, headerText, id, className }) {
  return (
    <section id={id} className={` ${className}`}>
      {headerText && <SectionHeader headerText={headerText} />}
      <div className="mx-auto py-2 px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-screen-2xl">
        {children}
      </div>
    </section>
  )
}
