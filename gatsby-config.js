module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
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
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: 'gatsby-source-prismic-graphql',
      options: {
        repositoryName: 'shipco',
        defaultLang: 'en-us',
        shortenUrlLangs: true,
        path: '/preview',
        previews: true,
        extraPageFields: 'category',
        // pages: [
        //   {
        //     type: 'Post',
        //     match: '/:lang/post/:uid',
        //     path: '/post-preview',
        //     component: require.resolve('./src/templates/post.js'),
        //     sortBy: 'meta_lastPublicationDate_ASC',
        //     filter: data => data.node.category === 'news',
        //   },
        //   {
        //     type: 'Article',
        //     match: '/:lang/article/:uid',
        //     path: '/article-preview',
        //     component: require.resolve('./src/templates/article.js'),
        //     filter: data => data.node._meta.uid.includes('music'),
        //   }
        // ],
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
