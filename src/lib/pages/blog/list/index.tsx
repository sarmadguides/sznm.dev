import {
  Heading,
  Box,
  Text,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import debounce from "lodash-es/debounce";
import { NextSeo } from "next-seo";
import * as React from "react";
import { FaSearch } from "react-icons/fa";

import BlogPostPreview from "lib/components/blog/BlogPostPreview";
import MotionGrid from "lib/components/motion/MotionGrid";
import {
  childAnimationProps,
  staggerAnimationProps,
} from "lib/constants/animation";
import { baseUrl } from "lib/constants/baseUrl";
import { sznmOgImage } from "lib/utils/sznmOgImage";

import type { BlogPostListProps } from "./types";

const BlogPostList = ({ allPostsData }: BlogPostListProps) => {
  const [keyword, setKeyword] = React.useState<string>("");

  const filteredPosts = allPostsData.filter((post) =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleChangeKeyword = React.useCallback(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
      }, 150),
    []
  );

  return (
    <Box>
      <NextSeo
        title="Blog Posts"
        canonical={`${baseUrl}/blog`}
        openGraph={{
          title: "Blog Posts | sozonome",
          images: [
            {
              url: sznmOgImage({
                heading: "Blog Posts | sozonome",
                text: "https://sznm.dev",
              }),
              alt: "Blog Posts | sozonome og-image",
            },
          ],
        }}
      />

      <Grid marginBottom={22} gap={2}>
        <Heading as="h1" size="xl">
          Blog Posts
        </Heading>
        <Text>Just some writings</Text>
      </Grid>

      <InputGroup>
        <Input
          variant="filled"
          type="text"
          defaultValue={keyword}
          onChange={handleChangeKeyword()}
          placeholder="Search posts"
        />
        <InputRightElement>
          <FaSearch />
        </InputRightElement>
      </InputGroup>

      <MotionGrid {...staggerAnimationProps} gap={16} marginY={12}>
        {!filteredPosts.length && <Text>No posts found.</Text>}
        {filteredPosts.map((postData) => (
          <BlogPostPreview
            wrapperProps={childAnimationProps}
            postData={postData}
            key={postData.title}
          />
        ))}
      </MotionGrid>
    </Box>
  );
};

export default BlogPostList;
