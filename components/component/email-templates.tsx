import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface KoalaWelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const KoalaWelcomeEmail = ({
  userFirstname,
}: KoalaWelcomeEmailProps) => (
  <Html>
  <Head />
  <Preview>
    Welcome to AostaHub - Your Journey Begins Here!
  </Preview>
  <Body style={main}>
    <Container style={container}>
      <Img
        src={`https://aostahub.vercel.app/ass/logo.png`}
        width="170"
        height="50"
        alt="AostaHub Logo"
        style={logo}
      />
      <Text style={paragraph}>Hello {userFirstname},</Text>
      <Text style={paragraph}>
        We`re thrilled to welcome you to AostaHub! You’ve just joined a community that’s all about connection, collaboration, and discovering new opportunities.
      </Text>
      <Text style={paragraph}>
        Explore our platform and connect with others in Aosta. Whether you`re here to make friends, exchange ideas, or learn something new, we’re here to help every step of the way.
      </Text>
      <Section style={btnContainer}>
        <Button style={button} href="https://aostahub.vercel.app">
          Get Started on AostaHub
        </Button>
      </Section>
      <Text style={paragraph}>
        Welcome aboard!
        <br />
        The AostaHub Team
      </Text>
      <Hr style={hr} />
      <Text style={footer}>
        AostaHub, Aosta, Italy
      </Text>
    </Container>
  </Body>
</Html>

);

KoalaWelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
} as KoalaWelcomeEmailProps;

export default KoalaWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
