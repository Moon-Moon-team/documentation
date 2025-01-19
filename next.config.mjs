import nextra from 'nextra'
 
const withNextra = nextra({
    contentDirBasePath: '/' // Or even nested e.g. `/docs/advanced`
})
 
// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  // ... Other Next.js config options
})