import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa"

const query = graphql`
  query {
    allPrismicProfile {
      nodes {
        data {
          git_text {
            text
          }
          git_subtext {
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
        }
      }
    }
  }
`;

const ProfileLite = () => (
  <StaticQuery
    query={query}
    render={data => {
      const {
        git_text,
        git_subtext,
        linkedin_url,
        linkedin_text,
        instagram_url,
        instagram_text,
        email,
      } = data.allPrismicProfile.nodes[0].data
      return (
        <div>
          <div className="mb-8">
            <h2 className="font-bold text-blue-900 text-xl flex items-center">
              {git_text.text}
            </h2>
            <p>{git_subtext.text}</p>
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
        </div>
      )
    }}
  />
);

export default ProfileLite
