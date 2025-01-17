import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import type { Blog } from "contentlayer/generated";
import Link from "next/link";

import type { MotionBoxProps } from "lib/components/motion/MotionBox";
import MotionBox from "lib/components/motion/MotionBox";
import Twemoji from "lib/components/Twemoji";
import { dateFormatLong } from "lib/utils/dateFormat";
import { trackEventToUmami } from "lib/utils/trackEvent";

type BlogPostPreviewProps = {
  postData: Blog;
  wrapperProps?: MotionBoxProps;
};

const BlogPostPreview = ({ postData, wrapperProps }: BlogPostPreviewProps) => {
  const handleClickBlogPost = () => {
    trackEventToUmami({
      eventValue: `Blog Post: ${postData.title}`,
      eventType: "navigate",
    });
  };

  return (
    <MotionBox {...wrapperProps}>
      <Box
        width="100%"
        transition="0.2s ease-out"
        _hover={{
          transform: "scale(1.03, 1.03)",
        }}
      >
        <Link href={`/blog/${postData.id}`} passHref>
          <Flex
            as="a"
            onClick={handleClickBlogPost}
            flexWrap="wrap"
            alignItems="center"
            width="100%"
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              flexBasis={["10%"]}
            >
              <Box boxSize="60%">
                <Twemoji emoji={postData.thumbnail ?? "📘"} />
              </Box>
            </Flex>
            <Box flexBasis={["90%"]} paddingLeft={[11, 22]}>
              <Heading size="lg" marginBottom={2}>
                {postData.title}
              </Heading>
              <Text fontSize="sm">
                {dateFormatLong(postData.date)} - {postData.readTime?.text}
              </Text>
            </Box>
          </Flex>
        </Link>
      </Box>
    </MotionBox>
  );
};

export default BlogPostPreview;
