import { Divider, Grid, Link, Stack, Text } from "@chakra-ui/react";

import SpotifyListening from "lib/components/common/SpotifyListening";
import { trackEventToUmami } from "lib/utils/trackEvent";

import { links } from "./constants";
import FooterLink from "./FooterLink";

const Footer = () => {
  const handleClickFooterLink = (label: string) => () => {
    trackEventToUmami({
      eventValue: `Footer Link: ${label}`,
      eventType: "link",
    });
  };

  return (
    <Stack as="footer" layerStyle="layoutBlock" spacing={8}>
      <Divider />
      <SpotifyListening />

      <Grid
        display={{ base: "grid", md: "flex" }}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: `repeat(${links.length <= 4 ? links.length : 4}, 1fr)`,
        }}
        gap={{ base: 4, md: 6 }}
      >
        {links.map((link) => (
          <FooterLink
            {...link}
            onClick={handleClickFooterLink(link.label)}
            key={link.label}
          />
        ))}
      </Grid>
      <Text fontSize={["xs", "sm"]}>
        &copy; 2020 - {new Date().getFullYear()}{" "}
        <Link
          href="https://agustinusnathaniel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Agustinus Nathaniel
        </Link>
      </Text>
    </Stack>
  );
};

export default Footer;
