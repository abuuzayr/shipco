import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"
import { FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa"

const query = graphql`
  query {
    prismic {
      allProfiles {
        edges {
          node {
            name
            position
            resume {
              ... on PRISMIC__ExternalLink {
                url
              }
              ... on PRISMIC__FileLink {
                url
              }
              ... on PRISMIC__ImageLink {
                url
              }
            }
            resume_button_text
            linkedin_url {
              ... on PRISMIC__ExternalLink {
                url
              }
              ... on PRISMIC__FileLink {
                url
              }
              ... on PRISMIC__ImageLink {
                url
              }
            }
            linkedin_text
            instagram_url {
              ... on PRISMIC__ExternalLink {
                url
              }
              ... on PRISMIC__FileLink {
                url
              }
              ... on PRISMIC__ImageLink {
                url
              }
            }
            instagram_text
            email
            description
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
      } = data.prismic.allProfiles.edges[0].node
      return (
        <div class="md:flex my-40">
          <div class="md:w-1/4 w-0"></div>
          <div class="md:w-3/4 w-full">
            <div className="mb-8">
              <h2 className="font-bold text-blue-900 text-xl flex items-center">
                {name[0].text}
              </h2>
              <p className="font-bold my-4">
                {position[0].text}
              </p>
              <p><RichText render={description} /></p>
            </div>
            {
              linkedin_url && linkedin_text &&
              <p className="mb-2">
                <a href={linkedin_url.url} className="flex items-center text-orange-600" target="_blank">
                  <FaLinkedinIn className="mr-2" /> {linkedin_text[0].text}
                </a>
              </p>
            }
            {
              instagram_url && instagram_text &&
              <p className="mb-2">
                <a href={instagram_url.url} className="flex items-center text-orange-600" target="_blank">
                  <FaInstagram className="mr-2" /> {instagram_text[0].text}
                </a>
              </p>
            }
            {
              email &&
              <p className="mb-2">
                <a href={`mailto:${email[0].text}`} className="flex items-center text-orange-600" target="_blank">
                  <FaEnvelope className="mr-2" /> {email[0].text}
                </a>
              </p>
            }
            {
              resume_button_text && resume &&
              <p className="mt-10">
                <a href={resume.url} className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white" target="_blank">
                  {resume_button_text[0].text}
                </a>
              </p>
            }
          </div>
        </div>
      )
    }}
  />
);

export default Profile
