import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const heroQuery = graphql`
  query {
    prismic {
      allHeros {
        edges {
          node {
            title
          }
        }
      }
    }
  }
`;

const IndexPage = () => (
  <StaticQuery
    query={heroQuery}
    render={data => {
      return (
        <Layout>
          <SEO title="Home" />
          <h1 className="text-6xl text-blue-900 font-bold">
            {data.prismic.allHeros.edges[0].node.title[0].text}
          </h1>
          <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
            <Image />
          </div>
          <Link to="/page-2/">Go to page 2</Link> <br />
          <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
        </Layout>
      )
    }}
  />
);

export default IndexPage
