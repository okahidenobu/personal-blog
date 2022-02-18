import type { NextPage } from 'next'
import type { InferGetStaticPropsType } from 'next'
import useSWR, { SWRConfig } from 'swr'
import Layout from '../components/Layout'
import {
  Box,
  Container,
  Text,
  Divider,
  Grid,
  GridItem,
  HStack,
  Image,
} from '@chakra-ui/react'
// import { fetcher, githubApi, qiitaApiUrl, QiitaArticles } from '../lib/api'
import { fetcher, qiitaApiUrl, QiitaArticles } from '../lib/api'
import dayjs from 'dayjs'

export const getStaticProps = async () => {
  const articles = await fetcher(qiitaApiUrl)

  return {
    props: {
      fallback: {
        'https://qiita.com/api/v2/authenticated_user/items': articles,
      },
    },
  }
}

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  fallback,
}) => {
  const { data: articles, error } = useSWR<QiitaArticles>(qiitaApiUrl, fetcher)
  const filteredArray = articles?.filter(a => !a.private)

  // const { data: issues } = useSWR<any>(githubApi, fetcher)

  return (
    <Layout>
      <Container marginY={'10'} maxW="container.md">
        <Box textAlign={'center'}>
          <Image
            src="/IMG_0335.JPG"
            borderRadius="full"
            boxSize="200px"
            marginX={'auto'}
            alt="海の写真"
          />
          <Text marginY={'4'} fontSize={'2xl'} fontWeight={'bold'}>
            岡　秀信
          </Text>
          <Text>福岡在住のエンジニアです</Text>
        </Box>
        <Divider borderColor={'gray.400'} marginY={'16'} />
        <SWRConfig value={{ fallback }}>
          {error ? (
            <Box>failed to load</Box>
          ) : !articles ? (
            <Box textAlign={'center'}>loading...</Box>
          ) : (
            <Grid templateColumns="repeat(2, 2fr)" gap={8}>
              {filteredArray?.map(b => (
                <GridItem key={b.id} bgColor={'card'} padding={'20px 26px'}>
                  <Box as={'article'}>
                    <Box as={'a'} href={b.url}>
                      <HStack spacing="16px">
                        <Box
                          as={'div'}
                          bgColor={'gray.400'}
                          height={'50px'}
                          width={'50px'}
                          borderRadius={'full'}
                        />
                        <Box>
                          <Box as={'div'} fontSize="sm" textAlign={'left'}>
                            {b.user.id}
                          </Box>
                          <Box as={'div'} fontSize="sm">
                            {dayjs(b.updated_at).format('YYYY-MM-DD')}
                          </Box>
                        </Box>
                      </HStack>
                      <Box
                        as={'div'}
                        fontSize="xl"
                        marginY={'24px'}
                        fontWeight={'extrabold'}
                        textColor={'text'}
                      >
                        {b.title}
                      </Box>
                      <Box as={'div'} fontSize="sm">
                        {b.url.includes('qiita.com') ? 'qiita' : null}
                      </Box>
                    </Box>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          )}
        </SWRConfig>
      </Container>
    </Layout>
  )
}

export default Index
