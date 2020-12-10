import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa"

const query = graphql`
  query {
    allPrismicProfile {
      nodes {
        data {
          name {
            text
          }
          position {
            text
          }
          resume {
            url
          }
          resume_button_text {
            text
          }
          linkedin_url {
            url
          }
          linkedin_text {
            text
          }
          instagram_url {
            url
          }
          instagram_text {
            text
          }
          email {
            text
          }
          description {
            text
          }
        }
      }
    }
  }
`;

const Profile = () => (
  <StaticQuery
    query={query}
    render={data => {
      const {
        name,
        position,
        resume,
        resume_button_text,
        linkedin_url,
        linkedin_text,
        instagram_url,
        instagram_text,
        email,
        description,
      } = data.allPrismicProfile.nodes[0].data
      return (
        <div class="md:flex my-40" id="profile">
          <div class="md:w-1/4 w-0"></div>
          <div class="md:w-3/4 w-full">
            <div className="mb-8">
              <h2 className="font-bold text-blue-900 text-xl flex items-center">
                {name.text}
              </h2>
              <p className="font-bold my-4">{position.text}</p>
              <p>{description.text}</p>
            </div>
            {linkedin_url && linkedin_text && (
              <p className="mb-2" style={{ color: "#D74000" }}>
                <a
                  href={linkedin_url.url}
                  className="flex items-center text-orange-600"
                  target="_blank"
                >
                  <FaLinkedinIn className="mr-2" /> {linkedin_text.text}
                </a>
              </p>
            )}
            {instagram_url && instagram_text && (
              <p className="mb-2" style={{ color: "#D74000" }}>
                <a
                  href={instagram_url.url}
                  className="flex items-center text-orange-600"
                  target="_blank"
                >
                  <FaInstagram className="mr-2" /> {instagram_text.text}
                </a>
              </p>
            )}
            {email && (
              <p className="mb-2" style={{ color: "#D74000" }}>
                <a
                  href={`mailto:${email.text}`}
                  className="flex items-center text-orange-600"
                  target="_blank"
                >
                  <FaEnvelope className="mr-2" /> {email.text}
                </a>
              </p>
            )}
            {resume_button_text && resume && (
              <p className="mt-10">
                <a
                  href={resume.url}
                  className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white"
                  target="_blank"
                >
                  {resume_button_text.text}
                </a>
              </p>
            )}
          </div>
        </div>
      )
    }}
  />
);

export default Profile
