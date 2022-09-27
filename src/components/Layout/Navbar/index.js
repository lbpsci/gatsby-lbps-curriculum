import * as React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { HiChevronRight, HiMenu, HiX } from 'react-icons/hi'
import Heading from '../../Heading'
import SiteSettings from '../SiteSettings'

const Navbar = ({
  activeDocMeta,
  districtName,
  path,
  siteWrapper,
  siteTitle,
  sideDrawer,
  topMenu: {
    top_menu_dark_mode,
    top_menu_light_mode_text,
    top_menu_right_side_logo,
    top_menu_logo_link,
  },
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const curriculumHome = React.useRef(null)
  const settingsBtn = React.useRef(null)
  const toggleMenu = e => {
    if (e.type === 'keydown' && e.code === 'Escape') {
      setIsOpen(false)
    } else if (
      (e.type === 'keydown' && e.code === 'Space') ||
      e.code === 'Enter'
    ) {
      setIsOpen(true)
      curriculumHome.current.focus()
    } else if (e.type === 'click') {
      setIsOpen(!isOpen)
    }
  }
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [isOpen])

  let linkProps = !isOpen ? { tabIndex: -1 } : {}

  return (
    <>
      <nav className="shadow-sm text-emerald-900 dark:bg-emerald-900 dark:text-white py-6">
        <div className="px-3 sm:px-6 lg:px-10 xl:px-12  flex justify-between items-center  max-w-screen-2xl mx-auto">
          {/* NAVBAR LEFT - MENU */}
          <button
            onClick={toggleMenu}
            onKeyDown={toggleMenu}
            className="flex items-center"
          >
            <HiMenu className="w-6 h-6 sm:w-7 sm:h-7 mr-3" />
            <span className="sr-only sm:not-sr-only sm:inline">Menu</span>
          </button>

          {/* NAVBAR CENTER - TITLE */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <Heading
              level={1}
              className="sm:text-xl md:text-2xl lg:text-3xl font-semibold dark:text-white"
            >
              {siteTitle}
            </Heading>
            <p className="prose prose-sm dark:prose-invert">{districtName}</p>
          </div>
          {/* NAVBAR RIGHT - LOGO */}
          <div className="grid sm:grid-cols-2 gap-x-4 relative items-center">
            <SiteSettings
              settingsOpen={settingsOpen}
              setSettingsOpen={setSettingsOpen}
              siteWrapper={siteWrapper}
              ref={settingsBtn}
              activeDocMeta={activeDocMeta}
              path={path}
              lightMode={top_menu_light_mode_text}
              darkMode={top_menu_dark_mode}
            />
            <Link to={top_menu_logo_link.url} className="hidden sm:block">
              <GatsbyImage
                image={getImage(top_menu_right_side_logo.gatsbyImageData)}
                alt={top_menu_right_side_logo.alt || ''}
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <span className="sr-only">Return to Curriculum Home Page</span>
            </Link>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div
          className={`absolute top-0 z-10 bg-slate-900 bg-opacity-20 h-screen w-full `}
          onClick={toggleMenu}
          onKeyDown={toggleMenu}
          role="button"
          tabIndex={-1}
        >
          <span className="sr-only">close menu</span>
        </div>
      )}
      {/* OFF-CANVAS / SIDE DRAWER MENU */}
      <aside
        className={`fixed top-0 z-10 min-h-screen max-h-full overflow-y-auto bg-gradient-to-b from-emerald-800 via-emerald-900 to-gray-900 transition ease-in-out duration-500 w-[260px] md:w-[400px] flex flex-col justify-center items-center text-white ${
          isOpen
            ? ' -translate-x-[0px]'
            : ' -translate-x-[260px] md:-translate-x-[400px]'
        }`}
      >
        <button onClick={toggleMenu} {...linkProps}>
          <HiX className="absolute top-4 right-4 text-slate-300 w-6 h-6" />
          <span className="sr-only">Close navigation menu</span>
        </button>
        <GatsbyImage
          image={getImage(sideDrawer.side_drawer_menu_logo.gatsbyImageData)}
          alt={sideDrawer.side_drawer_menu_logo.alt || ''}
        />
        <ul className="p-4">
          {sideDrawer.upper_side_drawer_menu_items.map(
            ({ menu_item, upper_side_drawer_menu_item_text }) => {
              return (
                <li key={menu_item.id} className="my-8">
                  {menu_item.type ? (
                    <Link
                      to={menu_item.url}
                      className="text-2xl capitalize"
                      activeClassName="active-page "
                      {...linkProps}
                    >
                      {upper_side_drawer_menu_item_text}
                    </Link>
                  ) : (
                    <a href={menu_item.url} className="text-2xl" {...linkProps}>
                      {upper_side_drawer_menu_item_text}
                    </a>
                  )}
                </li>
              )
            }
          )}
          {sideDrawer.side_drawer_grade_spans.length && (
            <li>
              <ul className="pl-4">
                {sideDrawer.side_drawer_grade_spans.map(
                  ({
                    side_drawer_grade_spans,
                    side_drawer_grade_span_text,
                  }) => {
                    return (
                      <li
                        key={side_drawer_grade_spans.id}
                        className="my-4 flex items-center"
                      >
                        <HiChevronRight className="w-4 h-4" />
                        {side_drawer_grade_spans.type ? (
                          <Link
                            to={side_drawer_grade_spans.url}
                            className="text-2xl"
                            activeClassName="active-page"
                            {...linkProps}
                          >
                            {side_drawer_grade_span_text}
                          </Link>
                        ) : (
                          <a href={side_drawer_grade_spans.url} {...linkProps}>
                            {side_drawer_grade_span_text}
                          </a>
                        )}
                      </li>
                    )
                  }
                )}
              </ul>
            </li>
          )}
          {sideDrawer.lower_side_drawer_menu_items.map(
            ({ lower_menu_items, lower_side_drawer_menu_item_text }) => {
              return (
                <li key={lower_menu_items.id} className="my-8">
                  {lower_menu_items.type ? (
                    <Link
                      to={lower_menu_items.url}
                      className="text-2xl capitalize"
                      activeClassName="active-page "
                      {...linkProps}
                    >
                      {lower_side_drawer_menu_item_text}
                    </Link>
                  ) : (
                    <a
                      href={lower_menu_items.url}
                      className="text-2xl"
                      {...linkProps}
                    >
                      {lower_side_drawer_menu_item_text}
                    </a>
                  )}
                </li>
              )
            }
          )}
          {sideDrawer.lower_side_drawer_sub_items.length && (
            <li>
              <ul className="pl-4">
                {sideDrawer.lower_side_drawer_sub_items.map(
                  ({
                    lower_menu_sub_item,
                    lower_side_drawer_sub_item_text,
                  }) => {
                    return (
                      <li
                        key={lower_menu_sub_item.id}
                        className="my-4 flex items-center"
                      >
                        <HiChevronRight className="w-4 h-4" />
                        {lower_menu_sub_item.type ? (
                          <Link
                            to={lower_menu_sub_item.url}
                            className="text-2xl"
                            activeClassName="active-page"
                            {...linkProps}
                          >
                            {lower_side_drawer_sub_item_text}
                          </Link>
                        ) : (
                          <a href={lower_menu_sub_item.url} {...linkProps}>
                            {lower_side_drawer_sub_item_text}
                          </a>
                        )}
                      </li>
                    )
                  }
                )}
              </ul>
            </li>
          )}
          {sideDrawer.bottom_side_drawer_menu_items.map(
            ({ bottom_menu_item, bottom_menu_item_text }) => {
              return (
                <li key={bottom_menu_item.id} className="my-8">
                  {bottom_menu_item.type ? (
                    <Link
                      to={bottom_menu_item.url}
                      className="text-2xl capitalize"
                      activeClassName="active-page "
                      {...linkProps}
                    >
                      {bottom_menu_item_text}
                    </Link>
                  ) : (
                    <a
                      href={bottom_menu_item.url}
                      className="text-2xl"
                      {...linkProps}
                    >
                      {bottom_menu_item_text}
                    </a>
                  )}
                </li>
              )
            }
          )}
          <li>
            <button
              onClick={() => {
                settingsBtn.current.focus()
              }}
              onBlur={() => {
                settingsBtn.current.focus()
                setIsOpen(false)
              }}
              {...linkProps}
            >
              {sideDrawer.close_menu_button}
            </button>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default Navbar
