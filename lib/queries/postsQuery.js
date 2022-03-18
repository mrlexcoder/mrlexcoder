export default  `
query Posts ($limit: Int, $start: Int){
    posts(sort: "date:desc", pagination:{limit:$limit, start:$start}, filters:{status:{eq:"publish"}, type:{eq:"article"}}) {
    meta {
        pagination {
          total
          pageSize
          page
          pageCount
        }
    }
    data {
      attributes {
        title
        status
        slug
        excerpt
        date
        legacyFeaturedImage{
          id
          mediaItemUrl
          srcSet
          thumb
        }
        author {
          data {
            attributes {
              displayName
              firstName
              lastName
              avatar
            }
          }
        }
      }
    }
  }
}
`