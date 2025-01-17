import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import readingTime from "reading-time";
import rehypeRaw from "rehype-raw";
import remarkHtml from "remark-html";

const ReadTime = defineNestedType(() => ({
  name: "ReadTime",
  fields: {
    text: { type: "string", required: true },
    minutes: { type: "number", required: true },
    time: { type: "number", required: true },
    words: { type: "number", required: true },
  },
}));

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "posts/*.md",
  fields: {
    title: { type: "string", required: true },
    date: { type: "string", required: true },
    thumbnail: { type: "string" },
    description: { type: "string" },
    legacyID: { type: "string" },
    published: { type: "boolean", required: true },
    tags: { type: "list", of: { type: "string" } },
    cover_image: { type: "string" },
    readTime: {
      type: "nested",
      of: ReadTime,
    },
  },
  computedFields: {
    readTime: {
      type: "nested",
      of: ReadTime,
      resolve: (post) => readingTime(post.body.raw),
    },
    id: {
      type: "string",
      // eslint-disable-next-line no-underscore-dangle
      resolve: (post) => post._raw.sourceFileName.replace(/\.md$|\.mdx$/, ""),
    },
  },
}));

const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/*.md",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    published: { type: "boolean" },
    highlight: { type: "boolean" },
    featured: { type: "boolean" },
    sznmApps: { type: "boolean" },
    stacks: { type: "list", of: { type: "string" } },
    date: { type: "string" },
    projectLink: { type: "string" },
    repoLink: { type: "string" },
    appStoreLink: { type: "string" },
    playStoreLink: { type: "string" },
    icon: { type: "string" },
    thumbnail: { type: "string" },
    thumbnailDark: { type: "string" },
  },
  computedFields: {
    id: {
      type: "string",
      // eslint-disable-next-line no-underscore-dangle
      resolve: (post) => post._raw.sourceFileName.replace(/\.md$|\.mdx$/, ""),
    },
  },
}));

const contentLayerConfig = makeSource({
  contentDirPath: "content",
  documentTypes: [Blog, Project],
  markdown: {
    remarkPlugins: [remarkHtml],
    rehypePlugins: [rehypeRaw],
  },
});

export default contentLayerConfig;
