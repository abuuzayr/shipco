module.exports = {
  siteMetadata: {
    title: `Ng Shi Peng's UI/UX Designer Portfolio`,
    description: `User Interface & Experience Designer with over 8 years of experience based in Singapore`,
    author: `@shipengng`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/sp.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: "shipco",
        linkResolver: ({ node, key, value }) => doc => {
          return "/"
        },
        schemas: {
          homepage: require("./src/schemas/homepage.json"),
          projects: require("./src/schemas/projects.json"),
          footer: require("./src/schemas/footer.json"),
          profile: require("./src/schemas/profile.json"),
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Open Sans\:400,400i,600,700`, `Merriweather\:900`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-30335104-1",
        head: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
