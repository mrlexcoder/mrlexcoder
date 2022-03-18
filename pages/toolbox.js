import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/tools/intro'
import Layout from '@/components/layout'
import NewPagination from '@/components/pagination'
import { getAllPostsForToolsPage } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
const PAGE_SIZE = 12;

export default function Index({ allPosts, preview }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  const coverImage = heroPost.attributes.legacyFeaturedImage ? heroPost.attributes.legacyFeaturedImage:''
  const [currentPage, setCurrentPage] = useState(0)
  const router = useRouter();

  const onPageNumChange = (pageNo) => {
    router.push({
      pathname: `/toolbox/page/${pageNo}`,
      // query: {
      //   totalCount
      // }
    })
  }
  return (
    <>
      <Layout activeNav={'toolbox'} preview={preview}>
        <Head>
          <title>Prototypr Toolbox - new design, UX and coding tools.</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.attributes.title}
              coverImage={coverImage}
              date={heroPost.attributes.date}
              author={(heroPost.attributes.author &&heroPost.attributes.author.data) ?heroPost.attributes.author.data.attributes:'https://prototypr.gumlet.io/wp-content/uploads/2021/09/2021-09-17-10-09-02.2021-09-17-10_10_54-f3ijc-1.gif'}
              slug={heroPost.attributes.slug}
              excerpt={heroPost.attributes.excerpt}
              type="toolbox"
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} type="toolbox" />}
          <NewPagination 
            pageSize={PAGE_SIZE}
            currentPage={currentPage}
            onPageNumChange={(pageNum) => {onPageNumChange(pageNum)}}
          />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = null, size = PAGE_SIZE, offset = 0 }) {
  const allPosts = (await getAllPostsForToolsPage(preview, size, offset)) || []
  return {
    props: { allPosts:allPosts.data, preview },
  }
}