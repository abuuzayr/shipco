import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import { FaInstagram, FaLinkedinIn } from "react-icons/fa"

const Header = () => (
  <div className="relative bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center md:justify-start md:space-x-10 mb-20 py-5 md:px-20">
        <div className="lg:w-0 lg:flex-1">
          <Link to="/" className="flex">
            <svg width="42" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5306 0C17.6888 0 18.6276 0.938863 18.6276 2.09701C18.6276 3.25516 17.6888 4.19402 16.5306 4.19402H7.32482C6.23439 4.19402 5.44028 4.46651 4.94247 5.0115C4.44467 5.53279 4.19577 6.2081 4.19577 7.03742C4.19577 7.39285 4.24318 7.74828 4.338 8.1037C4.45652 8.43543 4.64616 8.74347 4.90692 9.02781C5.19138 9.28845 5.5588 9.50171 6.0092 9.66757C6.45959 9.80974 7.04036 9.88083 7.75151 9.88083H12.3695C14.0052 9.88083 15.3445 10.0941 16.3875 10.5206C17.4305 10.9234 18.2483 11.4565 18.841 12.12C19.4573 12.7835 19.8721 13.5417 20.0855 14.3947C20.3225 15.2478 20.441 16.1008 20.441 16.9538C20.441 17.9727 20.2988 18.9086 20.0144 19.7617C19.7299 20.6147 19.2795 21.3611 18.6632 22.0008C18.0468 22.6169 17.2527 23.1027 16.2808 23.4581C15.3326 23.8135 14.1711 23.9912 12.7962 23.9912H2.5237C1.36555 23.9912 0.426688 23.0524 0.426688 21.8942C0.426688 20.7361 1.36555 19.7972 2.5237 19.7972H12.9384C14.0763 19.7972 14.9059 19.5247 15.4275 18.9797C15.9727 18.411 16.2453 17.6883 16.2453 16.8116C16.2453 16.4325 16.186 16.0652 16.0675 15.7098C15.949 15.3307 15.7475 15.0108 15.463 14.7502C15.1786 14.4658 14.7874 14.2407 14.2896 14.0749C13.8155 13.909 13.211 13.8261 12.4762 13.8261H7.89374C6.2818 13.8261 4.96618 13.6246 3.94687 13.2218C2.92756 12.819 2.12159 12.2859 1.52897 11.6224C0.960049 10.959 0.557065 10.2126 0.320016 9.38323C0.106672 8.55391 0 7.72458 0 6.89525C0 5.90006 0.130377 4.9878 0.391131 4.15848C0.67559 3.30546 1.11413 2.57091 1.70675 1.95484C2.32308 1.33877 3.10534 0.864867 4.05354 0.533137C5.00174 0.177712 6.13957 0 7.46705 0H16.5306Z" fill="#062D5B" />
              <path d="M34.2841 0C35.6353 0 36.7968 0.201407 37.7687 0.604222C38.7406 0.983343 39.5347 1.50463 40.151 2.16809C40.7911 2.80786 41.2533 3.5661 41.5378 4.44282C41.8459 5.31954 42 6.23179 42 7.1796C42 8.08001 41.8578 8.98042 41.5733 9.88083C41.3126 10.7812 40.874 11.5869 40.2577 12.2977C39.6414 13.0086 38.8354 13.5891 37.8398 14.0393C36.8679 14.4895 35.6827 14.7146 34.2841 14.7146H27.8171C27.4141 14.7146 27.2126 14.916 27.2126 15.3188V21.8933C27.2126 23.052 26.2734 23.9912 25.1147 23.9912C23.9561 23.9912 23.0168 23.052 23.0168 21.8933V14.5014C23.0168 13.1507 23.3132 12.1792 23.9058 11.5869C24.4984 10.9945 25.4584 10.6983 26.7859 10.6983H34.4263C35.0189 10.6983 35.5286 10.6035 35.9553 10.414C36.382 10.2244 36.7257 9.97561 36.9864 9.66757C37.2472 9.35954 37.4368 9.01596 37.5554 8.63684C37.6976 8.23402 37.7687 7.81936 37.7687 7.39285C37.7687 6.51613 37.4961 5.76974 36.9509 5.15367C36.4294 4.5139 35.5997 4.19402 34.4619 4.19402H25.0783C23.9201 4.19402 22.9813 3.25516 22.9813 2.09701C22.9813 0.938863 23.9201 0 25.0783 0H34.2841Z" fill="#062D5B" />
            </svg>
          </Link>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
          <span className="inline-flex">
            <a href="#" className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2">
              <FaLinkedinIn size="20" className="text-blue-900" />
            </a>
            <a href="#" className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2">
              <FaInstagram size="20" className="text-blue-900" />
            </a>
            <a href="#" className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-full text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:border-blue focus:shadow-outline-blue active:bg-blue-900 transition ease-in-out duration-150 ml-4">
              Work with me
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
