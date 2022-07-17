import { Box, Button, Grid, Heading, Stack } from "@chakra-ui/react";
import type { Project } from "contentlayer/generated";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { FaArrowRight } from "react-icons/fa";

import Card from "lib/components/projects/Card";
import { trackEventToUmami } from "lib/utils/trackEvent";

export type ProjectsSectionProps = { data: Array<Project> };

const ProjectsSection = ({ data }: ProjectsSectionProps) => {
  const router = useRouter();

  React.useEffect(() => {
    data
      .filter((project) => project.highlight && project)
      .forEach(({ id }) => {
        router.prefetch("/projects/[id]", `/projects/${id}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleClickViewAllProjects = (projects) => {
    trackEventToUmami({
      eventValue: "Home: View All Projects",
      eventType: "navigate",
    });
  };

  return (
    <Stack as="section" marginBottom={16} spacing={4}>
      <Link href="/projects" passHref>
        <Heading as="h1" size="lg" cursor="pointer" marginBottom={2}>
          Projects
        </Heading>
      </Link>

      <Grid
        gap={8}
        templateColumns={["repeat(1)", "repeat(1)", "repeat(3, 1fr)"]}
        marginY={8}
      >
        {data
          .filter(
            (unfilteredProject) =>
              unfilteredProject.highlight && unfilteredProject
          )
          .map((project) => (
            <Card project={project} key={project.id} />
          ))}
      </Grid>

      <Box>
        <Link href="/projects" passHref>
          <Button
            as="a"
            rightIcon={<FaArrowRight />}
            paddingX={0}
            variant="ghost"
            fontFamily="heading"
            onClick={handleClickViewAllProjects}
          >
            view all projects
          </Button>
        </Link>
      </Box>
    </Stack>
  );
};

export default ProjectsSection;
